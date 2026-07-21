import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, ChevronLeft, Send, AlertCircle } from 'lucide-react'

const questions = [
  {
    id: 'type',
    question: 'Quel type de projet ?',
    options: [
      { value: 'vitrine', label: 'Site Vitrine', emoji: '🌐' },
      { value: 'ecommerce', label: 'Site E-commerce', emoji: '🛒' },
      { value: 'app', label: 'Application Web & Mobile', emoji: '📱' },
      { value: 'autre', label: 'Autre / Je ne sais pas', emoji: '💬' },
    ],
  },
  {
    id: 'secteur',
    question: 'Votre secteur d\'activité ?',
    options: [
      { value: 'commerce', label: 'Commerce & Retail', emoji: '🛍️' },
      { value: 'restauration', label: 'Restauration & Food', emoji: '🍽️' },
      { value: 'sante-beaute', label: 'Santé & Beauté', emoji: '💆' },
      { value: 'tech', label: 'Tech & Startup', emoji: '🚀' },
      { value: 'services', label: 'Services professionnels', emoji: '💼' },
      { value: 'art-mode', label: 'Art, Mode & Créatif', emoji: '🎨' },
    ],
  },
  {
    id: 'situation',
    question: 'Quelle est votre situation actuelle ?',
    options: [
      { value: 'creation', label: 'Création from scratch', sub: 'Je n\'ai pas encore de site', emoji: '✨' },
      { value: 'refonte', label: 'Refonte complète', sub: 'Mon site existe, je veux tout repenser', emoji: '🔄' },
      { value: 'amelioration', label: 'Amélioration ciblée', sub: 'Quelques pages ou fonctions à revoir', emoji: '⚙️' },
    ],
  },
  {
    id: 'objectif',
    question: 'Votre objectif principal ?',
    options: [
      { value: 'visibilite', label: 'Gagner en visibilité', sub: 'SEO, réseaux, trafic organique', emoji: '📈' },
      { value: 'credibilite', label: 'Asseoir ma crédibilité', sub: 'Paraître pro, inspirer confiance', emoji: '🏆' },
      { value: 'ventes', label: 'Booster mes ventes', sub: 'Convertir plus de visiteurs en clients', emoji: '💰' },
      { value: 'lancement', label: 'Lancer mon activité', sub: 'Partir de zéro avec une base solide', emoji: '🚀' },
    ],
  },
  {
    id: 'budget',
    question: 'Quel est votre budget ?',
    options: [
      { value: 'moins-1k', label: '< 1 000€', emoji: '💶' },
      { value: '1k-3k', label: '1 000 – 3 000€', emoji: '💶' },
      { value: '3k-8k', label: '3 000 – 8 000€', emoji: '💶' },
      { value: '8k+', label: '8 000€+', emoji: '💶' },
      { value: 'unknown', label: 'À définir ensemble', emoji: '🤝' },
    ],
  },
  {
    id: 'delai',
    question: 'Quel est votre délai ?',
    options: [
      { value: 'urgent', label: 'Urgent', sub: '< 1 mois', emoji: '⚡' },
      { value: '1-3', label: '1 à 3 mois', emoji: '📅' },
      { value: '3-6', label: '3 à 6 mois', emoji: '🗓️' },
      { value: 'flexible', label: 'Flexible', sub: 'Pas de contrainte', emoji: '😌' },
    ],
  },
  {
    id: 'preparation',
    question: 'Où en êtes-vous dans la préparation ?',
    options: [
      { value: 'tout-pret', label: 'Tout est prêt', sub: 'Logo, textes, photos disponibles', emoji: '✅' },
      { value: 'partiel', label: 'Partiellement prêt', sub: 'Certains éléments manquent encore', emoji: '🔧' },
      { value: 'rien', label: 'Rien de prêt', sub: 'J\'ai besoin d\'un accompagnement complet', emoji: '🤲' },
    ],
  },
]

const LABELS = {
  type: { vitrine: 'Site Vitrine', ecommerce: 'Site E-commerce', app: 'Application Web & Mobile', autre: 'Autre' },
  secteur: { commerce: 'Commerce & Retail', restauration: 'Restauration & Food', 'sante-beaute': 'Santé & Beauté', tech: 'Tech & Startup', services: 'Services professionnels', 'art-mode': 'Art, Mode & Créatif' },
  situation: { creation: 'Création from scratch', refonte: 'Refonte complète', amelioration: 'Amélioration ciblée' },
  objectif: { visibilite: 'Gagner en visibilité', credibilite: 'Asseoir ma crédibilité', ventes: 'Booster mes ventes', lancement: 'Lancer mon activité' },
  budget: { 'moins-1k': '< 1 000€', '1k-3k': '1 000 – 3 000€', '3k-8k': '3 000 – 8 000€', '8k+': '8 000€+', unknown: 'À définir ensemble' },
  delai: { urgent: 'Urgent (< 1 mois)', '1-3': '1 à 3 mois', '3-6': '3 à 6 mois', flexible: 'Flexible' },
  preparation: { 'tout-pret': 'Tout est prêt', partiel: 'Partiellement prêt', rien: 'Rien de prêt' },
}

function playSwoop() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime
    const bufferSize = Math.floor(ctx.sampleRate * 0.9)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1400, now)
    filter.frequency.exponentialRampToValueAtTime(280, now + 0.75)
    filter.Q.value = 1.2
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0, now)
    noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.04)
    noiseGain.gain.setValueAtTime(0.08, now + 0.15)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(520, now)
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.7)
    oscGain.gain.setValueAtTime(0, now)
    oscGain.gain.linearRampToValueAtTime(0.05, now + 0.05)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7)
    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    const osc2 = ctx.createOscillator()
    const osc2Gain = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(900, now)
    osc2.frequency.exponentialRampToValueAtTime(220, now + 0.6)
    osc2Gain.gain.setValueAtTime(0, now)
    osc2Gain.gain.linearRampToValueAtTime(0.025, now + 0.03)
    osc2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55)
    osc2.connect(osc2Gain)
    osc2Gain.connect(ctx.destination)
    noise.start(now)
    osc.start(now)
    osc2.start(now)
    noise.stop(now + 0.9)
    osc.stop(now + 0.75)
    osc2.stop(now + 0.6)
    setTimeout(() => ctx.close(), 1800)
  } catch (_) {}
}

const inputClass =
  'w-full px-5 py-4 rounded-xl font-inter text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-brand transition-colors duration-200'

export default function Contact({ preselect }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [direction, setDirection] = useState(1)
  const firstInputRef = useRef(null)

  const totalSteps = questions.length + 1
  const isLastStep = step === questions.length
  const currentQ = questions[step]

  useEffect(() => {
    if (!preselect?.type) return
    setAnswers({ type: preselect.type })
    setDirection(1)
    setStep(1)
  }, [preselect])

  useEffect(() => {
    if (isLastStep) {
      setTimeout(() => firstInputRef.current?.focus(), 300)
    }
  }, [isLastStep])

  const gridCols = (opts) => (opts.length <= 3 ? 'grid-cols-1' : 'grid-cols-2')

  const handleSelect = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))
    setDirection(1)
    setTimeout(() => setStep((s) => s + 1), 220)
  }

  const handleBack = () => {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, form }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erreur serveur')
      }
      playSwoop()
      setSent(true)
    } catch (err) {
      setError(err.message || "Une erreur s'est produite. Réessayez ou contactez-moi directement.")
    } finally {
      setLoading(false)
    }
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  return (
    <section id="contact" className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-syne font-semibold text-xs uppercase tracking-widest text-brand mb-3 block">
            Contact
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-white mb-3">
            Démarrons votre projet
          </h2>
          <p className="font-inter text-white/45 max-w-md mx-auto text-sm">
            Répondez à quelques questions — je reviens vers vous sous 24h.
          </p>
          <div
            className="mx-auto mt-5 w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 rounded-2xl py-16"
                style={{ border: '1px solid rgba(201,126,253,0.3)', background: 'rgba(201,126,253,0.05)' }}
              >
                <div className="text-5xl">🎉</div>
                <h3 className="font-grotesk font-bold text-white text-xl">Message envoyé !</h3>
                <p className="font-inter text-white/50 text-sm max-w-xs">
                  Je reviens vers vous sous 24h pour discuter de votre projet.
                </p>
              </motion.div>
            ) : (
              <div
                className="rounded-2xl p-8 flex flex-col"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Barre de progression */}
                <div
                  className="flex items-center gap-2 mb-8"
                  role="progressbar"
                  aria-valuenow={step}
                  aria-valuemin={0}
                  aria-valuemax={totalSteps - 1}
                  aria-label={`Étape ${step + 1} sur ${totalSteps}`}
                >
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full flex-1 transition-all duration-500"
                      style={{
                        background:
                          i <= step
                            ? 'linear-gradient(90deg, #c97efd, #ff8e06)'
                            : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  {!isLastStep ? (
                    <motion.div
                      key={`step-${step}`}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex flex-col"
                    >
                      <div className="mb-6">
                        <span className="font-syne text-xs text-brand/70 uppercase tracking-widest">
                          Étape {step + 1} / {totalSteps}
                        </span>
                        <h3 className="font-grotesk font-bold text-white text-xl mt-1">
                          {currentQ.question}
                        </h3>
                      </div>

                      <div className={`grid gap-3 ${gridCols(currentQ.options)}`}>
                        {currentQ.options.map((opt) => {
                          const isSelected = answers[currentQ.id] === opt.value
                          return (
                            <motion.button
                              key={opt.value}
                              type="button"
                              onClick={() => handleSelect(opt.value)}
                              aria-pressed={isSelected}
                              className="rounded-xl p-4 text-left transition-all duration-200"
                              style={
                                isSelected
                                  ? { background: 'rgba(201,126,253,0.15)', border: '1px solid rgba(201,126,253,0.5)' }
                                  : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
                              }
                              whileHover={{
                                background: 'rgba(201,126,253,0.1)',
                                borderColor: 'rgba(201,126,253,0.4)',
                                y: -2,
                              }}
                              whileTap={{ scale: 0.97 }}
                            >
                              {opt.emoji && (
                                <span className="text-xl mb-2 block">{opt.emoji}</span>
                              )}
                              <span className="font-grotesk font-bold text-white text-sm block">
                                {opt.label}
                              </span>
                              {opt.sub && (
                                <span className="font-inter text-white/40 text-xs mt-0.5 block">
                                  {opt.sub}
                                </span>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>

                      {step > 0 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="mt-6 flex items-center gap-2 font-inter text-sm text-white/35 hover:text-white/60 transition-colors"
                        >
                          <ChevronLeft size={15} /> Retour
                        </button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="final-step"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex flex-col"
                    >
                      <div className="mb-6">
                        <span className="font-syne text-xs text-brand/70 uppercase tracking-widest">
                          Étape {totalSteps} / {totalSteps}
                        </span>
                        <h3 className="font-grotesk font-bold text-white text-xl mt-1">
                          Vos coordonnées
                        </h3>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                          ref={firstInputRef}
                          type="text"
                          name="name"
                          autoComplete="name"
                          placeholder="Votre nom complet"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          required
                          className={inputClass}
                        />
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="Votre adresse email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          required
                          className={inputClass}
                        />
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          placeholder="Téléphone (optionnel)"
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                          className={inputClass}
                        />
                        <textarea
                          name="message"
                          placeholder="Décrivez votre projet en quelques mots... (optionnel)"
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />

                        {error && (
                          <div className="flex items-center gap-2 text-red-400 text-xs font-inter bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                            <AlertCircle size={14} className="flex-shrink-0" />
                            {error}
                          </div>
                        )}

                        <div className="flex items-center gap-4 mt-2">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center gap-2 font-inter text-sm text-white/35 hover:text-white/60 transition-colors"
                          >
                            <ChevronLeft size={15} /> Retour
                          </button>
                          <motion.button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 rounded-xl font-inter font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70"
                            style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
                            whileHover={{
                              scale: loading ? 1 : 1.02,
                              boxShadow: '0 0 32px rgba(201,126,253,0.42)',
                            }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                          >
                            <Send size={16} />
                            {loading ? 'Envoi...' : 'Envoyer ma demande'}
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Infos de contact */}
          <motion.div
            className="flex flex-col justify-center gap-9"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {[
              { Icon: Mail, label: 'Email', value: 'contact@thomasmvrinho.com', href: 'mailto:contact@thomasmvrinho.com' },
              { Icon: Phone, label: 'Téléphone', value: '07 82 64 21 08', href: 'tel:+33782642108' },
              { Icon: MapPin, label: 'Localisation', value: 'Basé en Île-de-France 🇫🇷', href: null },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,126,253,0.14)' }}
                >
                  <Icon size={19} color="#c97efd" />
                </div>
                <div>
                  <div className="font-syne font-semibold text-white/40 text-[11px] uppercase tracking-widest mb-1">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="font-inter text-white/80 hover:text-brand transition-colors text-sm"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-inter text-white/80 text-sm">{value}</span>
                  )}
                </div>
              </div>
            ))}

            <div>
              <div className="font-syne font-semibold text-white/40 text-[11px] uppercase tracking-widest mb-4">
                Réseaux sociaux
              </div>
              <div className="flex gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/thomas-marinho-421848415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white/40 transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  whileHover={{ scale: 1.1, y: -2, color: '#c97efd', borderColor: 'rgba(201,126,253,0.4)' }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={19} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
