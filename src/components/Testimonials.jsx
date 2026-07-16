import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Adrien Lafarge',
    role: 'Directeur — ADMARKETING',
    text: "Un travail remarquable, livré dans les temps et dans le budget. Thomas a su comprendre parfaitement nos besoins et créer un site qui dépasse toutes nos attentes. Professionnalisme irréprochable.",
    img: 'https://placehold.co/80x80/ff8e06/ffffff?text=AL',
    stars: 5,
  },
  {
    name: 'Emma.M',
    role: 'Gérante — By-Emma',
    text: "J'avais un vieux site qui faisait vraiment amateur. Thomas a tout refait de zéro, il m'a même proposé des idées pour mieux mettre en avant mes collections. Le résultat est exactement ce que je voulais sans savoir comment l'expliquer.",
    img: 'https://placehold.co/80x80/c97efd/ffffff?text=EM',
    stars: 5,
  },
  {
    name: 'Léa Fontaine',
    role: 'Fondatrice — Studio Lotus',
    text: "Ce qui m'a convaincue c'est qu'il a pris le temps de comprendre mon activité avant de commencer quoi que ce soit. Pas de template générique, tout a été pensé pour mon studio. Les retours clients depuis le lancement sont vraiment positifs.",
    img: 'https://placehold.co/80x80/c97efd/ffffff?text=LF',
    stars: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section id="testimonials" className="py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-syne font-semibold text-xs uppercase tracking-widest text-brand mb-3 block">
            Témoignages
          </span>
          <h2 className="font-grotesk font-bold text-3xl md:text-4xl text-white mb-4">
            Ce que disent mes clients
          </h2>
          <div
            className="mx-auto w-20 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #c97efd, #ff8e06)' }}
          />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                className="rounded-2xl p-8 md:p-10"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonials[current].stars)].map((_, j) => (
                    <Star key={j} size={16} fill="#ff8e06" color="#ff8e06" />
                  ))}
                </div>
                <p className="font-inter text-white/75 text-base md:text-lg leading-relaxed mb-7 italic">
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].img}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-grotesk font-bold text-white text-sm">
                      {testimonials[current].name}
                    </div>
                    <div className="font-inter text-white/45 text-xs">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, j) => (
                <button
                  key={j}
                  onClick={() => setCurrent(j)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: j === current ? 26 : 8,
                    height: 8,
                    background: j === current
                      ? 'linear-gradient(90deg, #c97efd, #ff8e06)'
                      : 'rgba(255,255,255,0.18)',
                  }}
                  aria-label={`Témoignage ${j + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
