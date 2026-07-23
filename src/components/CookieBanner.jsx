import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CookieBanner({ onConsent }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    onConsent?.('accepted')
    setVisible(false)
  }

  const refuse = () => {
    localStorage.setItem('cookie_consent', 'refused')
    onConsent?.('refused')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 z-[9999] md:left-auto md:right-6 md:bottom-6 md:max-w-md"
        >
          <div
            className="rounded-2xl p-5 md:p-6"
            style={{
              background: 'rgba(15, 5, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,126,253,0.25)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            <p className="font-inter text-white/80 text-sm leading-relaxed mb-4">
              Ce site utilise une mesure d'audience anonyme pour comprendre sa fréquentation. Vous êtes libre de
              l'accepter ou de la refuser.{' '}
              <Link
                to="/cookies"
                className="text-brand underline underline-offset-2 hover:text-white transition-colors"
              >
                En savoir plus
              </Link>
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={refuse}
                className="flex-1 py-2.5 rounded-xl font-inter font-semibold text-sm text-white/60 border border-white/15 hover:border-white/30 hover:text-white transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Refuser
              </motion.button>
              <motion.button
                onClick={accept}
                className="flex-1 py-2.5 rounded-xl font-inter font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Accepter
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
