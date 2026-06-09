import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'

const footerLinks = [
  { label: 'Accueil', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#portfolio' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-pitch pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <a href="#home" className="font-grotesk font-bold text-xl select-none">
            <span style={{ color: '#c97efd' }}>T</span>
            <span className="text-white">homasmvrinh</span>
            <span style={{ color: '#ff8e06' }}>o</span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-inter text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {[Instagram, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/35 hover:text-white/70 transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.09)' }}
                whileHover={{ scale: 1.12, y: -2 }}
                aria-label="Social"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div
          className="h-px mb-6"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(201,126,253,0.5), rgba(255,142,6,0.5), transparent)',
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-inter text-white/25 text-sm">
            © 2026 Thomasmvrinho — Tous droits réservés
          </span>
          <span className="font-inter text-white/25 text-sm">
            Fait avec passion 💜🧡
          </span>
        </div>
      </div>
    </footer>
  )
}
