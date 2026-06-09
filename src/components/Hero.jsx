import { motion } from 'framer-motion'

const titleWords = [
  { text: 'Je', color: null },
  { text: 'crée', color: null },
  { text: 'des', color: null },
  { text: 'sites', color: '#c97efd' },
  { text: 'qui', color: null },
  { text: 'transforment', color: null },
  { text: 'vos', color: null },
  { text: 'visiteurs', color: null },
  { text: 'en', color: '#ff8e06' },
  { text: 'clients', color: '#c97efd' },
]

const sparkles = [
  { top: '18%', left: '6%', delay: 0, color: '#c97efd' },
  { top: '28%', right: '12%', delay: 0.6, color: '#ff8e06' },
  { top: '62%', left: '9%', delay: 1.1, color: '#ff8e06' },
  { top: '72%', right: '8%', delay: 1.7, color: '#c97efd' },
  { top: '44%', left: '22%', delay: 0.9, color: '#c97efd' },
  { top: '35%', right: '28%', delay: 1.4, color: '#ff8e06' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-ink flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-8%] right-[-6%] w-[520px] h-[520px] rounded-full opacity-20 animate-float"
        style={{ background: 'radial-gradient(circle, #c97efd 0%, transparent 70%)', filter: 'blur(70px)' }}
      />
      <div
        className="absolute bottom-[-4%] left-[-6%] w-[420px] h-[420px] rounded-full opacity-12 animate-float-slow"
        style={{ background: 'radial-gradient(circle, #ff8e06 0%, transparent 70%)', filter: 'blur(70px)' }}
      />
      <div
        className="absolute top-[42%] left-[42%] w-[220px] h-[220px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #c97efd, #ff8e06)', filter: 'blur(55px)' }}
      />

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ top: s.top, left: s.left, right: s.right, background: s.color }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: 2.8, delay: s.delay, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="font-syne text-xs text-brand font-semibold uppercase tracking-widest">
              Freelance Créatif — Disponible
            </span>
          </motion.div>

          <h1 className="font-grotesk font-bold text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.12] text-white mb-6">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                style={word.color ? { color: word.color } : {}}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="font-inter text-white/55 text-lg mb-10 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
          >
            Sites vitrines & e-commerce sur-mesure, pensés pour performer et impressionner.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.45 }}
          >
            <motion.a
              href="#portfolio"
              className="px-7 py-3.5 rounded-full font-inter font-semibold text-brand border-2 border-brand hover:bg-brand hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Voir mes réalisations
            </motion.a>
            <motion.a
              href="#contact"
              className="px-7 py-3.5 rounded-full font-inter font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(201,126,253,0.55)' }}
              whileTap={{ scale: 0.97 }}
            >
              Parlons de votre projet
            </motion.a>
          </motion.div>
        </div>

        {/* Right: Mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(201,126,253,0.18), rgba(255,142,6,0.08))' }}
            />
            <img
              src="https://placehold.co/800x500/0f0f14/c97efd?text=Votre+Futur+Site"
              alt="Aperçu d'un site web moderne"
              className="w-full h-auto relative z-10 opacity-90"
              loading="lazy"
            />
          </div>

          {/* Floating badges */}
          <motion.div
            className="absolute -bottom-4 -left-4 md:-left-8 bg-ink rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
          >
            <span className="text-xl">⭐</span>
            <div>
              <div className="font-grotesk font-bold text-white text-sm">50+ projets</div>
              <div className="font-inter text-white/45 text-xs">réalisés avec succès</div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -top-4 -right-4 md:-right-8 bg-ink rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.65 }}
          >
            <span className="text-xl">💜</span>
            <div>
              <div className="font-grotesk font-bold text-white text-sm">100%</div>
              <div className="font-inter text-white/45 text-xs">satisfaction client</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
