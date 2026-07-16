import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Accueil', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'À propos', href: '#process' },
  { label: 'Réalisations', href: '#portfolio' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Fermer le menu au scroll + bloquer le scroll de la page
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const closeOnScroll = () => setOpen(false)
      window.addEventListener('scroll', closeOnScroll, { passive: true })
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('scroll', closeOnScroll)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/85 backdrop-blur-xl shadow-sm border-b border-white/20'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="font-grotesk font-bold text-xl select-none">
            <span style={{ color: '#c97efd' }}>T</span>
            <span className={scrolled ? 'text-ink' : 'text-white'}>homasmvrinh</span>
            <span style={{ color: '#ff8e06' }}>o</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`font-inter text-sm font-medium transition-colors duration-200 hover:text-brand ${
                  scrolled ? 'text-ink/70' : 'text-white/80'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <motion.a
            href="#contact"
            className="hidden md:block px-5 py-2.5 rounded-full font-inter font-semibold text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(201,126,253,0.45)' }}
            whileTap={{ scale: 0.95 }}
          >
            Demander un devis
          </motion.a>

          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <motion.div
              animate={{ rotate: open ? 135 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Overlay sombre derrière le menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-black/60"
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm flex flex-col"
            style={{
              background: '#0f0518',
              borderLeft: '1px solid rgba(201,126,253,0.15)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header du menu */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <span className="font-grotesk font-bold text-white text-lg">
                <span style={{ color: '#c97efd' }}>T</span>
                homasmvrinh
                <span style={{ color: '#ff8e06' }}>o</span>
              </span>
              <button
                onClick={close}
                className="p-2 rounded-lg text-white/60 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <motion.div
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={22} />
                </motion.div>
              </button>
            </div>

            {/* Liens */}
            <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={close}
                  className="group flex items-center justify-between py-4 border-b border-white/6 font-inter font-semibold text-lg text-white/70 hover:text-white transition-colors duration-200"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{l.label}</span>
                  <motion.span
                    className="text-brand opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </nav>

            {/* CTA en bas */}
            <div className="px-6 pb-10">
              <motion.a
                href="#contact"
                onClick={close}
                className="block w-full py-4 rounded-2xl font-inter font-bold text-base text-white text-center"
                style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 + links.length * 0.07 }}
                whileTap={{ scale: 0.97 }}
              >
                Demander un devis
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
