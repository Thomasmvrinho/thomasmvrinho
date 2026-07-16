import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: "Le devis est-il gratuit et sans engagement ?",
    a: "Oui, totalement. Remplissez le formulaire de contact avec votre projet, je vous réponds sous 24h avec une estimation détaillée. Aucun engagement de votre côté avant la signature du devis.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Je demande un acompte de 30 à 50 % à la signature du devis pour démarrer le projet. Le solde est réglé à la livraison finale, une fois que vous avez validé le résultat. Je peux aussi proposer un échéancier en 3 fois pour les projets au-dessus de 3 000 €.",
  },
  {
    q: "Les délais affichés sont-ils garantis ?",
    a: "Oui — à condition que les éléments de votre côté (textes, photos, retours sur maquettes) arrivent dans les délais convenus. Dès la signature, je vous fournis un planning avec des jalons précis. Si un imprévu de ma part retarde la livraison, je vous en informe immédiatement.",
  },
  {
    q: "L'hébergement et le nom de domaine sont-ils inclus ?",
    a: "Ils ne sont pas inclus dans le prix affiché, mais je m'occupe de tout configurer pour vous. Le coût d'un hébergement de qualité tourne autour de 5 à 15 €/mois selon le projet, et un nom de domaine coûte environ 10 à 15 €/an. Je vous conseille les meilleures options selon votre budget.",
  },
  {
    q: "Dois-je fournir les textes et les photos ?",
    a: "C'est idéal, car vous connaissez votre activité mieux que personne. Si vous n'avez pas de photos professionnelles, je peux intégrer des visuels libres de droits adaptés à votre secteur. Pour les textes, je peux vous aider à les structurer ou vous orienter vers un rédacteur.",
  },
  {
    q: "Combien de modifications puis-je demander ?",
    a: "Deux tours de retours sont inclus après chaque étape clé (maquette, développement). En dehors de ça, les modifications mineures sont traitées rapidement et gratuitement dans les 14 à 30 jours suivant la livraison selon la formule. Au-delà, elles sont facturées à un tarif horaire transparent.",
  },
  {
    q: "Que comprend exactement la maintenance et à quel prix ?",
    a: "Le tarif varie selon votre projet : 80 €/mois pour un site vitrine, 150 €/mois pour un e-commerce, 200 €/mois pour une application web. Chaque formule inclut les mises à jour de sécurité, la surveillance de disponibilité, les sauvegardes hebdomadaires et jusqu'à 1h de modifications de contenu par mois. C'est optionnel — si vous préférez gérer votre site vous-même, je vous forme à son utilisation à la livraison.",
  },
  {
    q: "Pourquoi choisir un freelance plutôt qu'une agence ?",
    a: "Vous travaillez directement avec moi du brief à la mise en ligne — pas d'intermédiaire, pas de chef de projet qui transmet vos retours à un développeur que vous n'avez jamais rencontré. La communication est directe, les délais sont plus courts, et le prix reflète le travail réel sans les frais de structure d'une agence.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 bg-cloud">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-syne font-semibold text-xs uppercase tracking-widest text-brand mb-3 block">
            FAQ
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-ink mb-4">
            Questions fréquentes
          </h2>
          <div
            className="mx-auto w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-grotesk font-semibold text-ink pr-4 group-hover:text-brand transition-colors duration-200">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                  style={{ color: open === i ? '#c97efd' : '#0a0a0a80' }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 pb-6">
                      <div
                        className="w-full h-px mb-4"
                        style={{ background: 'linear-gradient(90deg, #c97efd22, #ff8e0622)' }}
                      />
                      <p className="font-inter text-ink/55 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
