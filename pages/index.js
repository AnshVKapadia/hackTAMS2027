import Navbar from '../components/navbar'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ProgramSection from '../components/sections/ProgramSection'
import TracksAndPrizesSection from '../components/sections/TracksAndPrizesSection'
import FaqSection from '../components/sections/FaqSection'
import SponsorsSection from '../components/sections/SponsorsSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <div className="about-background">
          <AboutSection />
          <ProgramSection />
        </div>
        <TracksAndPrizesSection />
        <FaqSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}
