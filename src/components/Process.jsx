import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: '💬',
    title: 'Échange & Brief',
    desc: "On prend le temps de parler de votre activité, de vos objectifs et de vos clients. Pas de jargon, pas de commercial : juste vous et moi, autour de votre besoin réel.",
  },
  {
    num: '02',
    icon: '🎨',
    title: 'Maquette & Design',
    desc: "Je conçois les maquettes de votre futur site et vous validez chaque écran avant qu'une seule ligne de code ne soit écrite. Vous voyez exactement où l'on va, rien à l'aveugle.",
  },
  {
    num: '03',
    icon: '⚡',
    title: 'Développement',
    desc: "Je code votre site à la main, avec des technologies rapides et sécurisées, et un rendu impeccable sur mobile. Une question en cours de route ? Je reste disponible et vous tiens informé de l'avancement.",
  },
  {
    num: '04',
    icon: '🚀',
    title: 'Livraison & Suivi',
    desc: "Je mets votre site en ligne et je vous explique simplement comment il fonctionne. Ensuite, je reste votre contact : une évolution, une question, un doute, vous savez toujours à qui vous adresser.",
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-syne font-semibold text-xs uppercase tracking-widest text-brand mb-3 block">
            Ma méthode
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-white mb-4">
            Une méthode claire, transparente à chaque étape
          </h2>
          <div
            className="mx-auto w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="relative grid md:grid-cols-4 gap-10">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-8 left-[14%] right-[14%] h-px"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)', opacity: 0.35 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative flex flex-col items-center text-center z-10"
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.14 }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-grotesk font-bold text-lg text-white mb-5 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #c97efd, #ff8e06)' }}
              >
                {step.num}
              </div>
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="font-syne font-bold text-lg text-white mb-3">{step.title}</h3>
              <p className="font-inter text-white/45 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
