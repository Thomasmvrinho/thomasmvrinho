import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const LABELS = {
  type: { vitrine: 'Site Vitrine', ecommerce: 'E-commerce', app: 'Application', autre: 'Autre' },
  secteur: { commerce: 'Commerce', restauration: 'Restauration', 'sante-beaute': 'Santé & Beauté', tech: 'Tech', services: 'Services', 'art-mode': 'Art & Mode' },
  situation: { creation: 'Création', refonte: 'Refonte', amelioration: 'Amélioration' },
  objectif: { visibilite: 'Visibilité', credibilite: 'Crédibilité', ventes: 'Ventes', lancement: 'Lancement' },
  budget: { 'moins-1k': '< 1k€', '1k-3k': '1–3k€', '3k-8k': '3–8k€', '8k+': '8k€+', unknown: 'À définir' },
  delai: { urgent: 'Urgent', '1-3': '1–3 mois', '3-6': '3–6 mois', flexible: 'Flexible' },
  preparation: { 'tout-pret': 'Tout prêt', partiel: 'Partiel', rien: 'Rien' },
}

const STATUS_CONFIG = {
  nouveau: { label: 'Nouveau', color: 'bg-blue-500/15 text-blue-300 border-blue-500/20' },
  en_discussion: { label: 'En discussion', color: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/20' },
  signe: { label: 'Signé', color: 'bg-green-500/15 text-green-300 border-green-500/20' },
  perdu: { label: 'Perdu', color: 'bg-red-500/15 text-red-400 border-red-500/20' },
  supprime: { label: 'Supprimé', color: 'bg-white/5 text-white/25 border-white/10' },
}

function lbl(key, val) { return LABELS[key]?.[val] ?? val ?? '—' }

function Tag({ children }) {
  return <span className="inline-block text-[11px] bg-white/5 border border-white/10 text-white/50 rounded-md px-2 py-0.5">{children}</span>
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.nouveau
  return <span className={`inline-block text-[11px] font-semibold border rounded-full px-2.5 py-0.5 ${cfg.color}`}>{cfg.label}</span>
}

function isOlderThan48h(dateStr) {
  return Date.now() - new Date(dateStr).getTime() > 48 * 60 * 60 * 1000
}

function LeadCard({ lead, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [montant, setMontant] = useState(lead.montant ?? '')
  const notesTimer = useRef(null)
  const token = localStorage.getItem('admin_token')

  const needsRelance = lead.status === 'nouveau' && isOlderThan48h(lead.created_at)

  async function patch(fields) {
    setUpdating(true)
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: lead.id, ...fields }),
      })
      onUpdate(lead.id, fields)
    } finally {
      setUpdating(false)
    }
  }

  function handleNotesChange(val) {
    setNotes(val)
    clearTimeout(notesTimer.current)
    notesTimer.current = setTimeout(() => patch({ notes: val }), 800)
  }

  function handleMontantBlur() {
    const val = montant === '' ? null : parseInt(montant, 10)
    patch({ montant: val })
  }

  const date = new Date(lead.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all hover:border-white/[0.14] ${
      needsRelance ? 'bg-orange-500/[0.04] border-orange-500/30' : 'bg-white/[0.03] border-white/[0.08]'
    }`}>
      {/* Alerte relance */}
      {needsRelance && (
        <div className="px-5 pt-3 flex items-center gap-1.5">
          <span className="text-orange-400 text-[11px] font-semibold">⚡ À relancer — plus de 48h sans action</span>
        </div>
      )}

      {/* Header */}
      <div className="p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand/30 to-energy/30 flex items-center justify-center text-white font-grotesk font-bold text-sm flex-shrink-0">
          {lead.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-grotesk font-semibold text-white text-sm">{lead.name}</span>
            <StatusBadge status={lead.status} />
          </div>
          <a href={`mailto:${lead.email}`} className="text-brand text-xs hover:underline">{lead.email}</a>
          {lead.phone && <span className="text-white/30 text-xs"> · {lead.phone}</span>}
          <p className="text-white/30 text-[11px] mt-0.5">{date}</p>
        </div>
        {lead.montant && (
          <div className="text-right flex-shrink-0">
            <span className="text-green-400 font-grotesk font-bold text-sm">{lead.montant.toLocaleString('fr-FR')} €</span>
          </div>
        )}
        <button onClick={() => setOpen(v => !v)} className="text-white/30 hover:text-white transition-colors flex-shrink-0 p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d={open ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}/>
          </svg>
        </button>
      </div>

      {/* Tags */}
      <div className="px-5 pb-4 flex flex-wrap gap-1.5">
        {lead.type && <Tag>{lbl('type', lead.type)}</Tag>}
        {lead.secteur && <Tag>{lbl('secteur', lead.secteur)}</Tag>}
        {lead.situation && <Tag>{lbl('situation', lead.situation)}</Tag>}
        {lead.objectif && <Tag>{lbl('objectif', lead.objectif)}</Tag>}
        {lead.budget && <Tag>{lbl('budget', lead.budget)}</Tag>}
        {lead.delai && <Tag>{lbl('delai', lead.delai)}</Tag>}
        {lead.preparation && <Tag>{lbl('preparation', lead.preparation)}</Tag>}
      </div>

      {/* Expanded */}
      {open && (
        <div className="border-t border-white/[0.06] px-5 py-4 space-y-4">
          {lead.message && (
            <div>
              <p className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">Message</p>
              <p className="text-white/70 text-sm leading-relaxed">{lead.message}</p>
            </div>
          )}
          {lead.auto_reply && (
            <div>
              <p className="text-[11px] font-semibold text-brand/60 uppercase tracking-wider mb-1.5">Réponse envoyée par Claude</p>
              <div className="bg-brand/5 border border-brand/10 rounded-xl p-4 text-white/70 text-sm leading-relaxed whitespace-pre-line">
                {lead.auto_reply}
              </div>
            </div>
          )}

          {/* Montant */}
          <div>
            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">Montant du devis (€)</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={montant}
                onChange={e => setMontant(e.target.value)}
                onBlur={handleMontantBlur}
                placeholder="Ex : 2500"
                className="w-40 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-brand/40 transition-colors placeholder-white/20"
              />
              <span className="text-white/30 text-sm">€</span>
              {updating && <span className="text-white/20 text-xs">Sauvegarde…</span>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">Notes privées</p>
            <textarea
              value={notes}
              onChange={e => handleNotesChange(e.target.value)}
              placeholder="Tes notes sur ce prospect — sauvegarde automatique"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white/80 text-sm outline-none focus:border-brand/40 transition-colors placeholder-white/20 resize-none"
            />
          </div>

          {/* Status changer */}
          <div>
            <p className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2">Changer le statut</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => patch({ status: key })}
                  disabled={updating || lead.status === key}
                  className={`text-xs border rounded-full px-3 py-1 transition-all disabled:opacity-40 ${
                    lead.status === key ? cfg.color : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('tous')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('admin_token')

  const fetchLeads = useCallback(async () => {
    if (!token) { navigate('/admin/login'); return }
    try {
      const res = await fetch('/api/admin/leads', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { navigate('/admin/login'); return }
      setLeads(await res.json())
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [token, navigate])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  function handleUpdate(id, fields) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...fields } : l))
  }

  function logout() {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  const visibleLeads = leads.filter(l => l.status !== 'supprime')
  const filtered = filter === 'supprime'
    ? leads.filter(l => l.status === 'supprime')
    : filter === 'tous' ? visibleLeads : visibleLeads.filter(l => l.status === filter)

  const searched = search.trim()
    ? filtered.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase())
      )
    : filtered

  const counts = visibleLeads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {})

  const caSign = leads
    .filter(l => l.status === 'signe' && l.montant)
    .reduce((sum, l) => sum + l.montant, 0)

  const relanceCount = visibleLeads.filter(l => l.status === 'nouveau' && isOlderThan48h(l.created_at)).length

  return (
    <div className="min-h-screen bg-pitch text-white">
      {/* Topbar */}
      <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand to-energy flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="none">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="font-grotesk font-semibold text-sm">Dashboard Leads</span>
        </div>
        <div className="flex items-center gap-4">
          {caSign > 0 && (
            <span className="text-green-400 text-sm font-grotesk font-semibold">
              CA signé : {caSign.toLocaleString('fr-FR')} €
            </span>
          )}
          <button onClick={logout} className="text-white/30 hover:text-white/60 text-xs transition-colors">Déconnexion</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {[
            { key: 'tous', label: 'Total', count: visibleLeads.length, color: 'text-white' },
            { key: 'nouveau', label: 'Nouveaux', count: counts.nouveau ?? 0, color: 'text-blue-400' },
            { key: 'en_discussion', label: 'En discussion', count: counts.en_discussion ?? 0, color: 'text-yellow-400' },
            { key: 'signe', label: 'Signés', count: counts.signe ?? 0, color: 'text-green-400' },
            { key: 'perdu', label: 'Perdus', count: counts.perdu ?? 0, color: 'text-red-400' },
            { key: 'supprime', label: 'Supprimés', count: leads.filter(l => l.status === 'supprime').length, color: 'text-white/25' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`bg-white/[0.03] border rounded-xl p-4 text-left transition-all ${
                filter === s.key ? 'border-brand/40 bg-brand/5' : 'border-white/[0.08] hover:border-white/[0.14]'
              }`}
            >
              <p className={`text-2xl font-grotesk font-bold ${s.color}`}>{s.count}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </button>
          ))}
        </div>

        {/* Alerte relance globale */}
        {relanceCount > 0 && filter !== 'supprime' && (
          <div className="mb-4 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3 flex items-center gap-2">
            <span className="text-orange-400 text-sm">⚡ {relanceCount} lead{relanceCount > 1 ? 's' : ''} à relancer — en attente depuis plus de 48h</span>
          </div>
        )}

        {/* Recherche */}
        <div className="relative mb-6">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email…"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm outline-none focus:border-brand/40 transition-colors placeholder-white/25"
          />
        </div>

        {/* Leads list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
          </div>
        ) : searched.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">{search ? 'Aucun résultat.' : filter === 'tous' ? 'Aucun lead pour le moment.' : 'Aucun lead dans cette catégorie.'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {searched.map(lead => (
              <LeadCard key={lead.id} lead={lead} onUpdate={handleUpdate} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
