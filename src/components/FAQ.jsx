import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: "Combien de temps faut-il pour créer un site ?",
    a: "Cela dépend de la complexité du projet. Un site vitrine simple est généralement livré en 1 à 2 semaines, tandis qu'un site e-commerce complet peut nécessiter 4 à 8 semaines. Je vous fournis un planning précis dès la validation du devis, avec des étapes claires.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    a: "J'utilise principalement React et Next.js pour les sites modernes et performants, WordPress pour les projets nécessitant un CMS accessible, et Shopify pour l'e-commerce. Chaque projet reçoit la technologie la mieux adaptée à ses objectifs et à son budget.",
  },
  {
    q: "Le site sera-t-il responsive (mobile) ?",
    a: "Absolument. Tous mes sites sont développés avec une approche mobile-first : l'expérience est optimisée en priorité pour les smartphones, puis adaptée aux tablettes et aux ordinateurs. Aujourd'hui, plus de 60% du trafic web vient du mobile — c'est non négociable.",
  },
  {
    q: "Proposez-vous la maintenance après la livraison ?",
    a: "Oui, je propose des contrats de maintenance mensuelle incluant les mises à jour de sécurité, les sauvegardes régulières, les modifications mineures de contenu et l'assistance technique. Différents forfaits sont disponibles selon vos besoins.",
  },
  {
    q: "Comment se passe le processus de création ?",
    a: "Le projet se déroule en 4 étapes : un échange approfondi pour comprendre votre vision, la création de maquettes que vous validez avant tout développement, la phase de développement avec des points réguliers, puis la mise en ligne et une formation à l'utilisation de votre site.",
  },
  {
    q: "Puis-je modifier mon site moi-même après la livraison ?",
    a: "Oui, si votre projet intègre un CMS (WordPress, Shopify…), vous pourrez modifier vos textes, images et produits de façon totalement autonome. Je vous forme à son utilisation et vous fournis une documentation personnalisée pour prendre votre site en main sereinement.",
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
