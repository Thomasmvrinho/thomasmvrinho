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
import CursorFollower from './components/CursorFollower'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  return (
    <div>
      <CursorFollower />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Portfolio />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
