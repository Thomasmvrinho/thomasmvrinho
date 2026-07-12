import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const services = [
  {
    emoji: '🌐',
    title: 'Site Vitrine',
    desc: "Un site élégant et professionnel qui présente votre activité, inspire confiance et convertit vos visiteurs en prospects qualifiés.",
    features: [
      'Design sur-mesure',
      'Responsive mobile',
      'Optimisé SEO',
      'Chargement rapide',
      'Pages illimitées',
      'Formulaire de contact',
      'Intégration réseaux sociaux',
    ],
    badge: 'À partir de 990€',
    accent: '#c97efd',
  },
  {
    emoji: '🛒',
    title: 'Site E-commerce',
    desc: "Une boutique en ligne performante, intuitive et sécurisée pour vendre vos produits 24h/24, partout dans le monde.",
    features: [
      'Catalogue produits',
      'Paiement sécurisé',
      'Gestion des stocks',
      'Suivi des commandes',
      'Tableau de bord',
      'Design premium',
      'Pages illimitées',
      'Formulaire de contact',
      'Intégration réseaux sociaux',
    ],
    badge: 'À partir de 1 990€',
    accent: '#ff8e06',
  },
  {
    emoji: '🔧',
    title: 'Refonte & Optimisation',
    desc: "Votre site actuel ne vous satisfait plus ? Je le transforme en une machine à convertir avec un design moderne et des performances optimales.",
    features: [
      'Audit complet',
      'Redesign moderne',
      'Vitesse optimisée',
      'SEO technique',
      'Pages illimitées',
      'Formulaire de contact',
      'Intégration réseaux sociaux',
    ],
    badge: 'À partir de 790€',
    accent: '#c97efd',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="services" className="py-24 bg-cloud">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-syne font-semibold text-xs uppercase tracking-widest text-brand mb-3 block">
            Mes Services
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-ink mb-4">
            Ce que je fais pour vous
          </h2>
          <div
            className="mx-auto w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {services.map((s, i) => {
            const isHov = hovered === i
            return (
              <motion.div
                key={s.title}
                className="rounded-2xl"
                style={{
                  padding: '2px',
                  background: isHov
                    ? 'linear-gradient(135deg, #c97efd, #ff8e06)'
                    : 'linear-gradient(135deg, rgba(201,126,253,0.3), rgba(255,142,6,0.3))',
                  boxShadow: isHov
                    ? '0 24px 60px rgba(0,0,0,0.28)'
                    : '0 2px 20px rgba(0,0,0,0.06)',
                  transition: 'background 0.35s ease, box-shadow 0.35s ease',
                }}
                initial={{ opacity: 0, y: 38, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.14 }}
                whileHover={{ y: -7 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="rounded-[14px] p-8 h-full"
                  style={{
                    background: isHov ? '#0a0a0a' : '#ffffff',
                    transition: 'background 0.35s ease',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                    style={{
                      background: isHov ? 'rgba(255,255,255,0.08)' : `${s.accent}18`,
                      transition: 'background 0.35s ease',
                    }}
                  >
                    {s.emoji}
                  </div>

                  <h3
                    className="font-grotesk font-bold text-xl mb-3"
                    style={{
                      color: isHov ? '#ffffff' : '#0a0a0a',
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {s.title}
                  </h3>

                  <p
                    className="font-inter text-sm leading-relaxed mb-6"
                    style={{
                      color: isHov ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.55)',
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {s.desc}
                  </p>

                  <ul className="space-y-2.5 mb-7">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 font-inter text-sm"
                        style={{
                          color: isHov ? 'rgba(255,255,255,0.72)' : 'rgba(10,10,10,0.65)',
                          transition: 'color 0.35s ease',
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: s.accent }}
                        >
                          <Check size={10} color="white" strokeWidth={3} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span
                    className="inline-block px-4 py-1.5 rounded-full font-inter font-bold text-xs text-white"
                    style={{ background: '#ff8e06' }}
                  >
                    {s.badge}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
