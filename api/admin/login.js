import crypto from 'node:crypto'
import { rateLimit, clientIp } from '../_ratelimit.js'

// Comparaison à temps constant : évite toute fuite d'information par canal temporel.
function safeEqual(a, b) {
  const ba = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Rate-limit anti-brute-force : 10 tentatives / 15 min / IP (actif si Upstash est configuré).
  const rl = await rateLimit({ key: `login:${clientIp(req)}`, limit: 10, windowSec: 900 })
  if (!rl.ok) return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' })

  const { password } = req.body ?? {}
  if (!password) return res.status(400).json({ error: 'Mot de passe requis.' })

  if (!process.env.ADMIN_PASSWORD || !safeEqual(password, process.env.ADMIN_PASSWORD)) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' })
  }

  return res.status(200).json({ token: process.env.ADMIN_SECRET })
}
