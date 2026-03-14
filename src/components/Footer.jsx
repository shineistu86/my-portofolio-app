import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

function Footer() {
  const { social } = portfolioData

  return (
    <footer className="py-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href={social.email}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Hisyam Eka Pramudita. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
