import { useEffect } from 'react'
import { motion, useMotionValue, useVelocity, useTransform, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Vélocité sur chaque axe
  const velX = useVelocity(x)
  const velY = useVelocity(y)

  // Vitesse totale (norme du vecteur vitesse)
  const speed = useTransform([velX, velY], ([vx, vy]) =>
    Math.sqrt(vx ** 2 + vy ** 2)
  )

  // Mapping vitesse → scale : au repos = 1, vite = jusqu'à 4
  const rawScale = useTransform(speed, [0, 500, 2000], [1, 1.6, 2.5], { clamp: true })

  // Spring sur le scale uniquement pour un retour fluide
  const scale = useSpring(rawScale, { stiffness: 350, damping: 28 })

  useEffect(() => {
    const onMove = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden md:block rounded-full"
      style={{
        width: 10,
        height: 10,
        background: 'linear-gradient(135deg, #c97efd, #ff8e06)',
        top: -5,
        left: -5,
        x,
        y,
        scale,
      }}
    />
  )
}
