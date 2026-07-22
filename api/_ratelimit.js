// Rate-limiter partagé (helper interne — le préfixe _ empêche Vercel d'en faire une route).
// Backend : Upstash Redis via son API REST path-style (aucune dépendance npm, compatible serverless).
// Configuration : définir UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN dans les env vars.
// Tant que ces variables ne sont pas définies (ou en cas d'erreur), le limiteur laisse passer
// (fail-open) et log la raison, pour ne jamais casser le site.

export function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim()
  return req.headers['x-real-ip'] || 'unknown'
}

// Renvoie { ok: true } si la requête est autorisée, { ok: false } si le quota est dépassé.
// Fenêtre fixe : `limit` requêtes par `windowSec` secondes pour une même clé.
export async function rateLimit({ key, limit, windowSec }) {
  const rawUrl = process.env.UPSTASH_REDIS_REST_URL
  const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!rawUrl || !rawToken) {
    console.warn('[ratelimit] Upstash non configuré (variables absentes) — fail-open.')
    return { ok: true, skipped: true }
  }
  // Nettoie d'éventuels guillemets / espaces / slash finaux collés lors du copier-coller.
  const url = rawUrl.trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '')
  const token = rawToken.trim().replace(/^["']|["']$/g, '')
  const headers = { Authorization: `Bearer ${token}` }

  try {
    const incRes = await fetch(`${url}/incr/${encodeURIComponent(key)}`, { headers })
    if (!incRes.ok) {
      const body = await incRes.text().catch(() => '')
      console.error(`[ratelimit] Upstash a répondu HTTP ${incRes.status} : ${body.slice(0, 200)}`)
      return { ok: true, skipped: true }
    }
    const count = (await incRes.json())?.result ?? 0
    // Sur la première requête de la fenêtre, on pose l'expiration.
    if (count === 1) {
      await fetch(`${url}/expire/${encodeURIComponent(key)}/${windowSec}`, { headers }).catch(() => {})
    }
    console.log(`[ratelimit] ${key} → ${count}/${limit}`)
    return { ok: count <= limit, count, limit }
  } catch (err) {
    console.error('[ratelimit] erreur réseau/store :', err?.message || err)
    return { ok: true, skipped: true }
  }
}
