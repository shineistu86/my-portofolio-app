import { useState, useEffect } from 'react'
import { portfolioData } from '../data/portfolioData'
import fotoSyam from '../assets/images/foto-syam.png'
import pythonIcon from '../assets/images/python-icon.png'
import reactIcon from '../assets/images/react-icon.png'
import htmlIcon from '../assets/images/html-icon.png'
import cssIcon from '../assets/images/css-icon.png'
import tailwindIcon from '../assets/images/tailwind-icon.png'
import colabIcon from '../assets/images/colab-icon.png'
import streamlitIcon from '../assets/images/streamlit-icon.png'
import { FaGithub, FaInstagram } from 'react-icons/fa'

const orbitIcons = [
  { icon: cssIcon, name: 'CSS', position: { left: '5%', top: '50%' } },
  { icon: pythonIcon, name: 'Python', position: { left: '15%', top: '80%' } },
  { icon: reactIcon, name: 'React', position: { left: '45%', top: '92%' } },
  { icon: tailwindIcon, name: 'Tailwind', position: { left: '75%', top: '80%' } },
  { icon: htmlIcon, name: 'HTML', position: { left: '88%', top: '50%' } },
  { icon: streamlitIcon, name: 'Streamlit', position: { left: '75%', top: '8%' } },
  { icon: colabIcon, name: 'Colab', position: { left: '15%', top: '8%' } },
]

function Home() {
  const { profile } = portfolioData
  const roles = profile.heroRoles

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!isDeleting && displayText === current) {
      // Finished typing — pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText === '') {
      // Finished deleting — brief pause, then move to next role
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((i) => (i + 1) % roles.length)
      }, 350)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(current.substring(0, displayText.length + (isDeleting ? -1 : 1)))
      }, isDeleting ? 40 : 90)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex, roles])

  return (
    <section id="home" className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements - Varied Positions */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Text & CTA */}
          <div className="text-left space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-yellow-400 text-3xl md:text-4xl lg:text-5xl font-medium">Hello,</p>
              <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white leading-tight">
                I Am{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {profile.name}
                </span>
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-green-400 h-[48px] md:h-[56px]" aria-live="polite">
                <span aria-hidden="true">{displayText || '\u00A0'}</span>
                <span className="animate-pulse" aria-hidden="true">|</span>
              </p>
            </div>

            <div className="h-2"></div>

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              {profile.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-green-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-300"
              >
                Explore More
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-6">
              <a
                href={portfolioData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex items-center justify-center w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full transition-all transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                <FaGithub size={24} className="text-white" aria-hidden="true" />
              </a>
              <a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center justify-center w-14 h-14 bg-gray-800 hover:bg-blue-600 rounded-full transition-all transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={portfolioData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="flex items-center justify-center w-14 h-14 bg-gray-800 hover:bg-pink-600 rounded-full transition-all transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-400"
              >
                <FaInstagram size={24} className="text-white" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Side - Visual with Glossy Water Sphere & Static Tech Icons */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative profile-container w-[350px] h-[450px] md:w-[400px] md:h-[500px] flex justify-center items-center">
              {/* Glossy Water Sphere Effect */}
              <div className="water-sphere absolute w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400 via-blue-600 to-purple-700 rounded-[45%_55%_50%_50%/50%_45%_55%_50%] blur-md z-10 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.5),_0_0_50px_rgba(59,130,246,0.6)] animate-liquid" aria-hidden="true"></div>

              {/* Outer Glow Ring */}
              <div className="absolute w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[45%_55%_50%_50%/50%_45%_55%_50%] blur-xl opacity-50 animate-pulse z-0" aria-hidden="true"></div>

              {/* Profile Image */}
              <div className="relative z-20 profile-img" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', transform: 'translateY(-65px)' }}>
                <img
                  src={fotoSyam}
                  alt="Hisyam Eka Pramudita"
                  width={384}
                  height={384}
                  className="w-72 md:w-80 lg:w-96 h-auto object-contain"
                />
              </div>

              {/* Static Tech Icons with tooltips */}
              <div className="absolute inset-0 z-30" aria-hidden="true">
                {orbitIcons.map((item, index) => (
                  <div
                    key={item.name}
                    className="tech-icon group absolute"
                    style={{
                      left: item.position.left,
                      top: item.position.top,
                      animationDelay: `${index * 0.15}s`,
                    }}
                  >
                    <img src={item.icon} alt="" className="w-full h-full pointer-events-none" />
                    <span className="tech-icon-label absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 px-2 py-1 rounded border border-gray-700">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Home
