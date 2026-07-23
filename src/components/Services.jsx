import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    emoji: '🌐',
    title: 'Site Vitrine',
    type: 'vitrine',
    desc: "Un site clair et professionnel qui inspire confiance à vos futurs clients : soigné pour le référencement, rapide et parfait sur mobile.",
    formulas: [
      { name: 'Essentiel', detail: '1 page (landing), design sur-mesure, formulaire de contact', price: '800 – 1 200€' },
      { name: 'Standard', detail: '3 à 5 pages, design sur-mesure, SEO de base', price: '1 500 – 2 500€' },
      { name: 'Premium', detail: '6+ pages, blog, animations, multilingue', price: '2 500 – 4 000€' },
    ],
    accent: '#c97efd',
  },
  {
    emoji: '🛒',
    title: 'Site E-commerce',
    type: 'ecommerce',
    desc: "Une boutique simple à gérer, ouverte 24 h/24, avec un paiement sécurisé — sur Shopify, WooCommerce ou une solution sur mesure.",
    formulas: [
      { name: 'Essentiel', detail: 'Boutique Shopify, thème personnalisé, jusqu\'à 30 produits', price: '2 000 – 3 500€' },
      { name: 'Standard', detail: 'Catalogue large, filtres avancés, newsletter & avis clients', price: '3 500 – 6 000€' },
      { name: 'Sur-mesure', detail: 'Fonctionnalités spécifiques, intégrations complexes', price: 'Sur devis (6 000€+)' },
    ],
    accent: '#ff8e06',
  },
  {
    emoji: '🧩',
    title: 'Fonctionnalités sur-mesure',
    type: 'app',
    desc: "Besoin de plus qu'un site ? J'ajoute les outils qui vous font gagner du temps : réservation en ligne, espace client, automatisations.",
    formulas: [
      { name: 'Essentiel', detail: 'Une fonctionnalité ajoutée à votre site existant', price: '1 000 – 2 000€' },
      { name: 'Standard', detail: 'Espace client, réservation ou prise de rendez-vous en ligne', price: '2 500 – 5 000€' },
      { name: 'Sur-mesure', detail: 'Plusieurs modules, automatisations et intégrations (agenda, paiement…)', price: 'Sur devis (5 000€+)' },
    ],
    accent: '#c97efd',
  },
]

export default function Services({ onSelect }) {
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
            Des sites web pensés pour faire grandir votre activité
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
                  className="rounded-[14px] p-8 h-full flex flex-col items-center text-center"
                  style={{
                    background: isHov ? '#0a0a0a' : '#ffffff',
                    transition: 'background 0.35s ease',
                  }}
                >
                  {/* Icône */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
                    style={{
                      background: isHov ? 'rgba(255,255,255,0.08)' : `${s.accent}18`,
                      transition: 'background 0.35s ease',
                    }}
                  >
                    {s.emoji}
                  </div>

                  {/* Titre */}
                  <h3
                    className="font-grotesk font-bold text-xl mb-3"
                    style={{ color: isHov ? '#ffffff' : '#0a0a0a', transition: 'color 0.35s ease' }}
                  >
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-inter text-sm leading-relaxed mb-6 md:min-h-[5.5rem]"
                    style={{
                      color: isHov ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.55)',
                      transition: 'color 0.35s ease',
                    }}
                  >
                    {s.desc}
                  </p>

                  {/* Formules */}
                  <div className="w-full space-y-3 mb-7 flex-1">
                    {s.formulas.map((f) => (
                      <div
                        key={f.name}
                        className="rounded-xl p-4 text-left"
                        style={{
                          background: isHov ? 'rgba(255,255,255,0.06)' : `${s.accent}0d`,
                          border: `1px solid ${isHov ? 'rgba(255,255,255,0.08)' : `${s.accent}22`}`,
                          transition: 'background 0.35s ease, border-color 0.35s ease',
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className="font-grotesk font-bold text-xs uppercase tracking-wide"
                            style={{ color: s.accent }}
                          >
                            {f.name}
                          </span>
                          <span
                            className="font-inter font-bold text-xs whitespace-nowrap"
                            style={{
                              color: isHov ? 'rgba(255,255,255,0.9)' : '#0a0a0a',
                              transition: 'color 0.35s ease',
                            }}
                          >
                            {f.price}
                          </span>
                        </div>
                        <p
                          className="font-inter text-xs leading-relaxed"
                          style={{
                            color: isHov ? 'rgba(255,255,255,0.4)' : 'rgba(10,10,10,0.45)',
                            transition: 'color 0.35s ease',
                          }}
                        >
                          {f.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => onSelect({ type: s.type })}
                    className="w-full py-3 rounded-xl font-inter font-semibold text-sm transition-all duration-300"
                    style={
                      isHov
                        ? { background: s.accent, color: 'white' }
                        : { border: `2px solid ${s.accent}`, color: s.accent, background: 'transparent' }
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Démarrer ce projet
                  </motion.button>

                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Maintenance note */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-inter text-sm text-ink/40">
            🔧 Maintenance optionnelle disponible — à partir de <span className="font-semibold text-ink/60">80€/mois</span> après livraison
          </p>
        </motion.div>
      </div>
    </section>
  )
}
