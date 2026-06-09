import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Essentiel',
    desc: 'Site Vitrine — 1 à 5 pages',
    price: 'À partir de XXX€',
    features: [
      'Design personnalisé',
      'Responsive mobile',
      'SEO de base',
      'Formulaire de contact',
      'Livraison sous 2 semaines',
    ],
    cta: 'Choisir cette offre',
    highlight: false,
  },
  {
    name: 'Business',
    desc: 'Site Vitrine avancé — 5 à 10 pages',
    price: 'À partir de XXX€',
    features: [
      'Tout de Essentiel',
      'Blog intégré',
      'Animations avancées',
      'Galerie & CMS',
      'Livraison sous 3 semaines',
      'Support 14 jours',
    ],
    cta: 'Choisir cette offre',
    highlight: true,
    badge: 'Populaire',
  },
  {
    name: 'E-commerce',
    desc: 'Boutique en ligne complète',
    price: 'À partir de XXX€',
    features: [
      'Catalogue produits',
      'Paiement sécurisé',
      'Gestion commandes',
      'Tableau de bord',
      'SEO e-commerce',
      'Support 30 jours',
    ],
    cta: 'Choisir cette offre',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-syne font-semibold text-xs uppercase tracking-widest text-brand mb-3 block">
            Tarifs
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-ink mb-4">
            Des offres claires, sans surprise
          </h2>
          <div
            className="mx-auto w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.14 }}
              whileHover={{ y: -8 }}
            >
              {/* Gradient border wrapper for highlighted plan */}
              {plan.highlight ? (
                <div
                  className="relative rounded-2xl p-[2px]"
                  style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)', boxShadow: '0 16px 60px rgba(201,126,253,0.22)' }}
                >
                  {plan.badge && (
                    <span
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-inter font-bold text-xs text-white z-10"
                      style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <PlanCard plan={plan} highlighted />
                </div>
              ) : (
                <div
                  className="rounded-2xl"
                  style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.07)' }}
                >
                  <PlanCard plan={plan} highlighted={false} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan, highlighted }) {
  return (
    <div
      className="rounded-[14px] p-8"
      style={{ background: highlighted ? 'rgba(201,126,253,0.04)' : 'white' }}
    >
      <h3 className="font-grotesk font-bold text-xl text-ink mb-1">{plan.name}</h3>
      <p className="font-inter text-ink/45 text-sm mb-5">{plan.desc}</p>
      <div
        className="font-grotesk font-bold text-3xl mb-8"
        style={
          highlighted
            ? { background: 'linear-gradient(135deg, #c97efd, #ff8e06)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
            : { color: '#0a0a0a' }
        }
      >
        {plan.price}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 font-inter text-sm text-ink/65">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: highlighted ? 'linear-gradient(135deg, #c97efd, #ff8e06)' : '#f0f0f0',
              }}
            >
              <Check
                size={11}
                strokeWidth={3}
                color={highlighted ? 'white' : '#0a0a0a'}
              />
            </div>
            {f}
          </li>
        ))}
      </ul>

      <motion.button
        className="w-full py-3.5 rounded-xl font-inter font-semibold text-sm transition-all duration-300"
        style={
          highlighted
            ? { background: 'linear-gradient(135deg, #c97efd, #ff8e06)', color: 'white' }
            : { border: '2px solid #c97efd', color: '#c97efd', background: 'transparent' }
        }
        whileHover={{
          scale: 1.02,
          ...(highlighted ? { boxShadow: '0 0 24px rgba(201,126,253,0.4)' } : { background: '#c97efd', color: 'white' }),
        }}
        whileTap={{ scale: 0.98 }}
      >
        {plan.cta}
      </motion.button>
    </div>
  )
}
