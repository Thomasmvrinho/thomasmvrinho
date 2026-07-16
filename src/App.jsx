import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import ScrollProgress from './components/ScrollProgress'
import CookieBanner from './components/CookieBanner'

// Sections du bas de page chargées en lazy
const Process = lazy(() => import('./components/Process'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Stats = lazy(() => import('./components/Stats'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Pricing = lazy(() => import('./components/Pricing'))
const FAQ = lazy(() => import('./components/FAQ'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const CookiesPage = lazy(() => import('./pages/CookiesPage'))

function HomePage() {
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
        <Suspense fallback={null}>
          <Process />
          <Portfolio />
          <Stats />
          <Testimonials />
          <Pricing onSelect={handleSelect} />
          <FAQ />
          <Contact preselect={preselect} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<Suspense fallback={null}><MentionsLegales /></Suspense>} />
        <Route path="/cookies" element={<Suspense fallback={null}><CookiesPage /></Suspense>} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
