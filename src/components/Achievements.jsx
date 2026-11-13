import { portfolioData } from '../data/portfolioData'
import { FaCertificate, FaTrophy } from 'react-icons/fa'

function Achievements() {
  const { certifications, awards } = portfolioData

  return (
    <section id="achievements" className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Certifications & Awards
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Formal learning milestones and recognitions I have earned along the way.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Certifications */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaCertificate className="text-cyan-400" aria-hidden="true" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={`${cert.name}-${cert.issuer}`}
                  className="edu-card bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                    <FaCertificate className="text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold leading-snug">{cert.name}</h4>
                    <p className="text-gray-400 text-sm mt-0.5">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs mt-1">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FaTrophy className="text-yellow-400" aria-hidden="true" />
              Awards & Recognition
            </h3>
            <div className="space-y-4">
              {awards.map((award) => (
                <div
                  key={`${award.title}-${award.detail}`}
                  className="edu-card bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center">
                    <FaTrophy className="text-yellow-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold leading-snug">{award.title}</h4>
                    <p className="text-gray-400 text-sm mt-0.5">{award.detail}</p>
                    <p className="text-gray-500 text-xs mt-1">{award.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievements
