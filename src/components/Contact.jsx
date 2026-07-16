import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, ChevronLeft, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

const formulasByType = {
  vitrine: [
    { value: 'essentiel', label: 'Essentiel', sub: '800 – 1 200€' },
    { value: 'standard', label: 'Standard', sub: '1 500 – 2 500€' },
    { value: 'premium', label: 'Premium', sub: '2 500 – 4 000€' },
  ],
  ecommerce: [
    { value: 'essentiel', label: 'Essentiel', sub: '2 000 – 3 500€' },
    { value: 'standard', label: 'Standard', sub: '3 500 – 6 000€' },
    { value: 'sur-mesure', label: 'Sur-mesure', sub: 'Sur devis (6 000€+)' },
  ],
  app: [
    { value: 'mvp', label: 'MVP simple', sub: '4 000 – 8 000€' },
    { value: 'complete', label: 'Complète', sub: '8 000 – 20 000€' },
  ],
}

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
    id: 'formule',
    question: 'Quelle formule vous correspond ?',
    dynamic: true,
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
]

const inputClass = 'w-full px-5 py-4 rounded-xl font-inter text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-brand transition-colors duration-200'

export default function Contact({ preselect }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (!preselect?.type) return
    setDirection(1)
    setStep(0)
    setAnswers(preselect.formule
      ? { type: preselect.type, formule: preselect.formule }
      : { type: preselect.type }
    )
  }, [preselect])

  // Skip formule step si type = 'autre'
  const getSteps = () => {
    if (answers.type === 'autre') return questions.filter(q => q.id !== 'formule')
    return questions
  }

  const activeSteps = getSteps()
  const currentQ = activeSteps[step]
  const isLastStep = step === activeSteps.length
  const totalSteps = activeSteps.length + 1 // +1 pour le formulaire final

  const getOptions = (q) => {
    if (q.dynamic) return formulasByType[answers.type] || []
    return q.options
  }

  const handleSelect = (value) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }))
    setDirection(1)
    setTimeout(() => setStep(s => s + 1), 220)
  }

  const handleBack = () => {
    setDirection(-1)
    setStep(s => s - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const typeLabel = { vitrine: 'Site Vitrine', ecommerce: 'Site E-commerce', app: 'Application Web & Mobile', autre: 'Autre' }[answers.type] || answers.type
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      type: typeLabel,
      formule: answers.formule || 'Non précisé',
      budget: answers.budget || 'Non précisé',
      delai: answers.delai || 'Non précisé',
      message: form.message || '—',
    }
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => { setSent(true); setLoading(false) })
      .catch(() => { setLoading(false); alert('Erreur lors de l\'envoi. Réessayez ou contactez-moi directement.') })
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  return (
    <section id="contact" className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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
          <div className="mx-auto mt-5 w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Formulaire multi-étapes */}
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
                className="rounded-2xl p-8 min-h-[420px] flex flex-col"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Barre de progression */}
                <div className="flex items-center gap-2 mb-8">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full flex-1 transition-all duration-400"
                      style={{
                        background: i < step + (isLastStep ? 1 : 0)
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
                      className="flex flex-col flex-1"
                    >
                      {/* Numéro + question */}
                      <div className="mb-6">
                        <span className="font-syne text-xs text-brand/70 uppercase tracking-widest">
                          Étape {step + 1} / {totalSteps}
                        </span>
                        <h3 className="font-grotesk font-bold text-white text-xl mt-1">
                          {currentQ.question}
                        </h3>
                      </div>

                      {/* Options */}
                      <div className={`grid gap-3 flex-1 ${getOptions(currentQ).length <= 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {getOptions(currentQ).map((opt) => {
                          const isPreselected = answers[currentQ.id] === opt.value
                          return (
                          <motion.button
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            className="rounded-xl p-4 text-left transition-all duration-200 group"
                            style={isPreselected
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
                            {opt.emoji && <span className="text-xl mb-2 block">{opt.emoji}</span>}
                            <span className="font-grotesk font-bold text-white text-sm block">{opt.label}</span>
                            {opt.sub && <span className="font-inter text-white/40 text-xs mt-0.5 block">{opt.sub}</span>}
                          </motion.button>
                        )})}
                      </div>

                      {/* Bouton retour */}
                      {step > 0 && (
                        <button
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
                      className="flex flex-col flex-1"
                    >
                      <div className="mb-6">
                        <span className="font-syne text-xs text-brand/70 uppercase tracking-widest">
                          Étape {totalSteps} / {totalSteps}
                        </span>
                        <h3 className="font-grotesk font-bold text-white text-xl mt-1">
                          Vos coordonnées
                        </h3>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
                        <input
                          type="text"
                          placeholder="Votre nom complet"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          required
                          className={inputClass}
                        />
                        <input
                          type="email"
                          placeholder="Votre adresse email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          required
                          className={inputClass}
                        />
                        <textarea
                          placeholder="Décrivez votre projet en quelques mots... (optionnel)"
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          rows={3}
                          className={`${inputClass} resize-none`}
                        />
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
                            whileHover={{ scale: loading ? 1 : 1.02, boxShadow: '0 0 32px rgba(201,126,253,0.42)' }}
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
              { Icon: Mail, label: 'Email', value: 'Thomasmvrinho@outlook.com', href: 'mailto:Thomasmvrinho@outlook.com' },
              { Icon: Phone, label: 'Téléphone', value: '07 82 64 21 08', href: 'tel:+33782642108' },
              { Icon: MapPin, label: 'Localisation', value: 'Basé en Île-de-France 🇫🇷', href: null },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,126,253,0.14)' }}>
                  <Icon size={19} color="#c97efd" />
                </div>
                <div>
                  <div className="font-syne font-semibold text-white/40 text-[11px] uppercase tracking-widest mb-1">{label}</div>
                  {href ? (
                    <a href={href} className="font-inter text-white/80 hover:text-brand transition-colors text-sm">{value}</a>
                  ) : (
                    <span className="font-inter text-white/80 text-sm">{value}</span>
                  )}
                </div>
              </div>
            ))}

            <div>
              <div className="font-syne font-semibold text-white/40 text-[11px] uppercase tracking-widest mb-4">Réseaux sociaux</div>
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
