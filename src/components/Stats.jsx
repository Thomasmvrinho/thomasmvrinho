import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedCounter({ to, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(to)
    }
    requestAnimationFrame(step)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// Engagements réels et défendables (pas de compteurs de clients inventés)
const stats = [
  { to: 100, suffix: ' %', label: 'Responsive mobile' },
  { text: 'Sur mesure', label: 'Codé à la main' },
  { text: 'Support', label: 'Inclus après livraison' },
  { text: '0 €', label: 'Devis & 1er échange' },
]

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(201,126,253,0.06) 0%, rgba(255,142,6,0.06) 100%)' }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,126,253,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,142,6,0.12) 0%, transparent 50%)' }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const isText = stat.to === undefined
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.13 }}
              >
                <div
                  className={`font-grotesk font-bold mb-2 flex items-center justify-center min-h-[3rem] md:min-h-[3.75rem] ${isText ? 'text-3xl md:text-4xl' : 'text-5xl md:text-6xl'}`}
                  style={{
                    background: 'linear-gradient(135deg, #c97efd, #ff8e06)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {isText ? stat.text : <AnimatedCounter to={stat.to} suffix={stat.suffix} />}
                </div>
                <div className="font-inter text-ink/50 font-medium text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
