import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DOTS = [
  { x: '10%', y: '20%', size: 12, color: '#c97efd', delay: 0 },
  { x: '78%', y: '12%', size: 8, color: '#ff8e06', delay: 0.3 },
  { x: '88%', y: '65%', size: 14, color: '#c97efd', delay: 0.6 },
  { x: '8%',  y: '72%', size: 10, color: '#ff8e06', delay: 0.9 },
  { x: '48%', y: '8%',  size: 7,  color: '#c97efd', delay: 1.1 },
  { x: '65%', y: '82%', size: 12, color: '#ff8e06', delay: 0.4 },
  { x: '25%', y: '88%', size: 9,  color: '#c97efd', delay: 0.7 },
  { x: '92%', y: '30%', size: 10, color: '#ff8e06', delay: 1.3 },
  { x: '35%', y: '5%',  size: 6,  color: '#ff8e06', delay: 0.5 },
  { x: '55%', y: '90%', size: 8,  color: '#c97efd', delay: 1.0 },
  { x: '3%',  y: '45%', size: 11, color: '#c97efd', delay: 0.2 },
  { x: '95%', y: '50%', size: 7,  color: '#ff8e06', delay: 0.8 },
]

const LETTERS = ['T', 'h', 'o', 'm', 'a', 's', 'm', 'v', 'r', 'i', 'n', 'h', 'o']

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(interval); return p }
        return Math.min(p + Math.random() * 9, 90)
      })
    }, 140)

    const finish = () => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => setVisible(false), 600)
    }

    const minDelay = setTimeout(finish, 3000)
    window.addEventListener('load', () => { clearTimeout(minDelay); finish() })

    return () => { clearInterval(interval); clearTimeout(minDelay) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050505' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Particules flottantes */}
          {DOTS.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: dot.x,
                top: dot.y,
                width: dot.size,
                height: dot.size,
                background: dot.color,
                boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
              }}
              animate={{
                y: [0, -30, 10, -20, 0],
                x: [0, 15, -10, 20, 0],
                opacity: [0.4, 1, 0.6, 1, 0.4],
                scale: [1, 1.4, 0.8, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.4,
                delay: dot.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Orbe central pulsant */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(201,126,253,0.08) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 200,
              height: 200,
              background: 'radial-gradient(circle, rgba(255,142,6,0.07) 0%, transparent 70%)',
            }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo lettre par lettre */}
          <div className="font-grotesk font-bold text-4xl mb-8 select-none flex">
            {LETTERS.map((letter, i) => {
              const isT = i === 0
              const isLastO = i === 12
              return (
                <motion.span
                  key={i}
                  style={{ color: isT || isLastO ? (isT ? '#c97efd' : '#ff8e06') : 'white' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
                >
                  {letter}
                </motion.span>
              )
            })}
          </div>

          {/* Barre de progression */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="w-56 h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #c97efd, #ff8e06)',
                width: `${progress}%`,
                transition: 'width 0.15s ease',
              }}
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-grotesk font-bold text-2xl mt-4"
            style={{ color: 'white' }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
