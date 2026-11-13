import { useState } from 'react'
import { FaBars, FaTimes, FaGamepad } from 'react-icons/fa'
import { worldStore } from './world/worldStore'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="text-2xl font-extrabold text-blue-400 hover:text-blue-300 transition-colors tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 rounded px-1"
            style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)' }}
          >
            HEP&apos;S PORTFOLIO
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-blue-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 rounded px-1"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => worldStore.setOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/60 text-cyan-300 hover:bg-cyan-500 hover:text-gray-900 transition-colors font-medium text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label="Explore the interactive 3D map"
            >
              <FaGamepad size={14} aria-hidden="true" />
              Explore
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 p-2 rounded hover:bg-gray-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-2 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-blue-400 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false)
                worldStore.setOpen(true)
              }}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-cyan-500/60 text-cyan-300 hover:bg-cyan-500 hover:text-gray-900 transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label="Explore the interactive 3D map"
            >
              <FaGamepad size={14} aria-hidden="true" />
              Explore Map
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
