// Rate-limiter partagé (helper interne — le préfixe _ empêche Vercel d'en faire une route).
// Backend : Upstash Redis via son API REST (aucune dépendance npm, compatible serverless).
// Configuration : définir UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN dans les env vars.
// Tant que ces variables ne sont pas définies, le limiteur laisse passer (fail-open) et log un avertissement,
// pour ne jamais casser le site — mais la protection n'est active qu'une fois Upstash configuré.

export function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim()
  return req.headers['x-real-ip'] || 'unknown'
}

// Renvoie { ok: true } si la requête est autorisée, { ok: false } si le quota est dépassé.
// Fenêtre fixe : `limit` requêtes par `windowSec` secondes pour une même clé.
export async function rateLimit({ key, limit, windowSec }) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    console.warn('[ratelimit] Upstash non configuré — rate-limiting désactivé (fail-open).')
    return { ok: true, skipped: true }
  }
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, windowSec, 'NX'],
      ]),
    })
    if (!res.ok) return { ok: true, skipped: true } // fail-open si le store répond mal
    const data = await res.json()
    const count = Array.isArray(data) ? data[0]?.result ?? 0 : 0
    return { ok: count <= limit, count, limit }
  } catch (err) {
    console.error('[ratelimit] erreur store :', err)
    return { ok: true, skipped: true } // fail-open sur erreur réseau
  }
}
