import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

function Profile() {
  const { profile, social } = portfolioData

  return (
    <section id="profile" className="pt-20 min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-blue-400">{profile.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-2">
          {profile.title}
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          {profile.description}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors"
          >
            <FaGithub size={20} />
            GitHub
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            <FaEnvelope size={20} />
            Contact
          </a>
        </div>
      </div>
    </section>
  )
}

export default Profile
