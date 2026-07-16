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
      className="relative min-h-screen bg-ink flex items-center pt-28 pb-16"
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-8%] right-[-6%] w-[520px] h-[520px] rounded-full opacity-20 animate-float pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c97efd 0%, transparent 70%)', filter: 'blur(70px)' }}
      />
      <div
        className="absolute bottom-[-4%] left-[-6%] w-[420px] h-[420px] rounded-full opacity-12 animate-float-slow pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff8e06 0%, transparent 70%)', filter: 'blur(70px)' }}
      />
      <div
        className="absolute top-[42%] left-[42%] w-[220px] h-[220px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c97efd, #ff8e06)', filter: 'blur(55px)' }}
      />

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
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
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault()
                setTimeout(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }, 0)
              }}
              className="px-7 py-3.5 rounded-full font-inter font-semibold text-brand border-2 border-brand hover:bg-brand hover:text-white transition-all duration-300"
            >
              Voir mes réalisations
            </a>
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

        {/* Right: Mac Mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mac frame */}
          <div className="relative w-full select-none">
            <div style={{
              background: 'linear-gradient(160deg, #3a3a3a, #1c1c1c)',
              borderRadius: '14px 14px 0 0',
              padding: '14px 14px 10px',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px rgba(201,126,253,0.1)',
            }}>
              <div className="flex justify-center mb-2">
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2a2a2a', border: '1px solid #3a3a3a' }} />
              </div>
              <div style={{ background: '#ffffff', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  background: '#f1f3f4',
                  padding: '7px 10px',
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
                  </div>
                  <div style={{
                    flex: 1,
                    background: 'white',
                    borderRadius: '20px',
                    padding: '3px 10px',
                    border: '1px solid #dadce0',
                    fontSize: '9px',
                    color: '#bbb',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                  }}>&nbsp;</div>
                </div>
                <div style={{ height: '300px', overflow: 'hidden' }}>
                  <img
                    src="/logo-thomas.png"
                    alt="Thomasmvrinho"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(180deg, #1c1c1c, #252525)', height: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '28%', right: '28%', height: '3px', background: '#141414', borderRadius: '0 0 6px 6px' }} />
            </div>
            <div style={{
              background: 'linear-gradient(180deg, #252525, #1c1c1c)',
              height: '20px',
              borderRadius: '0 0 10px 10px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderTop: 'none',
            }} />
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
              <div className="font-grotesk font-bold text-white text-sm">+8 projets</div>
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
