import Navbar from './components/Navbar'
import Home from './components/Home'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import AuroraBg from './components/AuroraBg'
import ScrollToTop from './components/ScrollToTop'
import WorldLauncher from './components/world/WorldLauncher'

function App() {
  return (
    <div className="min-h-screen text-gray-100">
      <AuroraBg />
      <CursorGlow />
      <Navbar />
      <main>
        <Home />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WorldLauncher />
    </div>
  )
}

export default App
