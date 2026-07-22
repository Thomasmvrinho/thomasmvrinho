import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import MentionsLegales from './pages/MentionsLegales'
import CookiesPage from './pages/CookiesPage'
import CookieBanner from './components/CookieBanner'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
}

function HomePage() {
  useLenis()
  const [preselect, setPreselect] = useState(null)

  const handleSelect = (selection) => {
    setPreselect(selection)
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services onSelect={handleSelect} />
        <Process />
        <Portfolio />
        <Stats />
        <Testimonials />
        <Pricing onSelect={handleSelect} />
        <FAQ />
        <Contact preselect={preselect} />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const [consent, setConsent] = useState(() => localStorage.getItem('cookie_consent'))

  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <Preloader />
      <CookieBanner onConsent={setConsent} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Analytics chargé uniquement après consentement explicite (RGPD/CNIL) */}
      {consent === 'accepted' && <Analytics />}
    </BrowserRouter>
    </MotionConfig>
  )
}
