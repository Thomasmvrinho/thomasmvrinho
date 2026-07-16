import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  return (
    <BrowserRouter>
      <Preloader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
