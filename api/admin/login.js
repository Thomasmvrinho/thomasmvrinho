export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { password } = req.body ?? {}
  if (!password) return res.status(400).json({ error: 'Mot de passe requis.' })

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' })
  }

  return res.status(200).json({ token: process.env.ADMIN_SECRET })
}
