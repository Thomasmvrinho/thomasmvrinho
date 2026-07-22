import crypto from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
)

// Comparaison à temps constant du token Bearer.
function safeEqual(a, b) {
  const ba = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

function checkAuth(req) {
  const auth = req.headers.authorization ?? ''
  const token = auth.replace('Bearer ', '')
  return !!process.env.ADMIN_SECRET && safeEqual(token, process.env.ADMIN_SECRET)
}

export default async function handler(req, res) {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Non autorisé.' })

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[leads] select :', error.message)
      return res.status(500).json({ error: 'Erreur serveur.' })
    }
    return res.status(200).json(data)
  }

  if (req.method === 'PATCH') {
    const { id, ...updates } = req.body ?? {}
    if (!id) return res.status(400).json({ error: 'id requis.' })

    const ALLOWED_FIELDS = ['status', 'notes', 'montant', 'relance_at']
    const patch = Object.fromEntries(
      Object.entries(updates).filter(([k]) => ALLOWED_FIELDS.includes(k))
    )

    if (patch.status) {
      const VALID = ['nouveau', 'en_discussion', 'signe', 'perdu', 'supprime']
      if (!VALID.includes(patch.status)) return res.status(400).json({ error: 'Status invalide.' })
    }

    const { error } = await supabase.from('leads').update(patch).eq('id', id)
    if (error) {
      console.error('[leads] update :', error.message)
      return res.status(500).json({ error: 'Erreur serveur.' })
    }
    return res.status(200).json({ ok: true })
  }

  // Suppression définitive (RGPD art. 17) : efface réellement la ligne en base.
  if (req.method === 'DELETE') {
    const { id } = req.body ?? {}
    if (!id) return res.status(400).json({ error: 'id requis.' })

    const { error } = await supabase.from('leads').delete().eq('id', id)
    if (error) {
      console.error('[leads] delete :', error.message)
      return res.status(500).json({ error: 'Erreur serveur.' })
    }
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
