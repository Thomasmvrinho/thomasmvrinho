import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

function checkAuth(req) {
  const auth = req.headers.authorization ?? ''
  return auth.replace('Bearer ', '') === process.env.ADMIN_SECRET
}

export default async function handler(req, res) {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Non autorisé.' })

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body ?? {}
    if (!id || !status) return res.status(400).json({ error: 'id et status requis.' })

    const VALID = ['nouveau', 'en_discussion', 'signe', 'perdu', 'supprime']
    if (!VALID.includes(status)) return res.status(400).json({ error: 'Status invalide.' })

    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
