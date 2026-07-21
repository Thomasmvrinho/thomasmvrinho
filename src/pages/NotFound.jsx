import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pitch flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[120px] font-grotesk font-bold leading-none gradient-text mb-4">404</p>
        <h1 className="text-2xl font-grotesk font-semibold text-white mb-3">
          Page introuvable
        </h1>
        <p className="text-white/40 text-sm max-w-xs mx-auto mb-8">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-energy text-white font-grotesk font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          ← Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  )
}
