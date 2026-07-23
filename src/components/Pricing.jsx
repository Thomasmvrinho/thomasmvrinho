import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Vitrine Standard',
    desc: 'Site Vitrine — 3 à 5 pages',
    price: '1 500 – 2 500€',
    type: 'vitrine',
    formule: 'standard',
    features: [
      'Design sur-mesure',
      '3 à 5 pages',
      'Animations avancées',
      'SEO optimisé',
      'Blog intégré',
      'Support 14 jours',
    ],
    cta: 'Démarrer ce projet',
    highlight: false,
  },
  {
    name: 'E-commerce',
    desc: 'Boutique Shopify — jusqu\'à 30 produits',
    price: '2 000 – 3 500€',
    type: 'ecommerce',
    formule: 'essentiel',
    features: [
      'Thème Shopify personnalisé',
      'Catalogue produits',
      'Paiement sécurisé',
      'Gestion commandes',
      'SEO e-commerce',
      'Support 30 jours',
    ],
    cta: 'Démarrer ce projet',
    highlight: true,
    badge: 'Populaire',
  },
  {
    name: 'Fonctionnalités sur-mesure',
    desc: 'Réservation, espace client, automatisations…',
    price: '2 500 – 5 000€',
    type: 'app',
    formule: 'standard',
    features: [
      'Réservation / prise de RDV en ligne',
      'Espace client sécurisé',
      'Petit back-office simple à gérer',
      'Automatisations & intégrations',
      'Codé sur-mesure',
    ],
    cta: 'Démarrer ce projet',
    highlight: false,
  },
]

export default function Pricing({ onSelect }) {
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
            Des tarifs clairs, sans surprise
          </h2>
          <p className="font-inter text-ink/55 max-w-2xl mx-auto text-sm md:text-base mb-6 leading-relaxed">
            Les prix affichés sont nets : pas de TVA à ajouter, aucun coût caché. Un site vitrine démarre à 800 €, une boutique en ligne à 2 000 €. Et vous validez toujours la maquette avant que je développe la moindre ligne de code.
          </p>
          <div
            className="mx-auto w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="h-full"
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.14 }}
              whileHover={{ y: -8 }}
            >
              {plan.highlight ? (
                <div
                  className="relative rounded-2xl p-[2px] h-full"
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
                  <PlanCard plan={plan} highlighted onSelect={onSelect} />
                </div>
              ) : (
                <div
                  className="rounded-2xl h-full"
                  style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.07)' }}
                >
                  <PlanCard plan={plan} highlighted={false} onSelect={onSelect} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan, highlighted, onSelect }) {
  return (
    <div
      className="rounded-[14px] p-8 flex flex-col h-full"
      style={{ background: highlighted ? 'rgba(201,126,253,0.04)' : 'white' }}
    >
      <h3 className="font-grotesk font-bold text-xl text-ink mb-1">{plan.name}</h3>
      <p className="font-inter text-ink/45 text-sm mb-5">{plan.desc}</p>
      <div className="mb-8">
        <span className="font-inter text-xs font-medium text-ink/40 uppercase tracking-widest block mb-1">
          À partir de
        </span>
        <span
          className="font-grotesk font-bold text-2xl"
          style={{ color: '#0a0a0a' }}
        >
          {plan.price}
        </span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
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
        onClick={() => onSelect({ type: plan.type })}
        className="w-full py-3.5 rounded-xl font-inter font-semibold text-sm transition-all duration-300 flex items-center justify-center"
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
