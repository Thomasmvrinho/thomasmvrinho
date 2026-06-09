import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    const onOver = (e) => {
      const el = e.target
      setHovered(
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        !!el.closest('a') ||
        !!el.closest('button')
      )
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block rounded-full"
        style={{
          width: 10,
          height: 10,
          background: 'linear-gradient(135deg, #c97efd, #ff8e06)',
          top: 0,
          left: 0,
        }}
        animate={{ x: pos.x - 5, y: pos.y - 5, scale: hovered ? 3 : 1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 32 }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block rounded-full"
        style={{
          width: 38,
          height: 38,
          border: '1.5px solid rgba(201,126,253,0.45)',
          top: 0,
          left: 0,
        }}
        animate={{ x: pos.x - 19, y: pos.y - 19, scale: hovered ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
      />
    </>
  )
}
