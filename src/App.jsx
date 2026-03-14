import Navbar from './components/Navbar'
import Home from './components/Home'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import AuroraBg from './components/AuroraBg'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen text-gray-100">
      <AuroraBg />
      <CursorGlow />
      <Navbar />
      <Home />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
