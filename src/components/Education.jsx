import { portfolioData } from '../data/portfolioData'

function Education() {
  const { education, experience } = portfolioData

  const educationHistory = [
    {
      institution: 'Institut Teknologi Garut',
      degree: 'Bachelor in Information Systems',
      period: '2023 – Sekarang',
      grade: 'Current Student',
      description: 'Studying Information Systems with focus on data analysis and data visualization.',
    },
  ]

  return (
    <section id="education" className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements - Varied Positions */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          My Education
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          My academic background and qualifications
        </p>

        <div className="space-y-8">
          {/* Education Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Education</h3>
            <div className="flex justify-center">
              <div className="w-full max-w-lg space-y-6">
                {educationHistory.map((edu, index) => (
                  <div
                    key={index}
                    className="edu-card bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-sm rounded-full font-medium mb-4">
                      {edu.period}
                    </span>
                    <h4 className="text-xl font-bold text-pink-400 mb-2">
                      {edu.degree}
                    </h4>
                    <p className="text-white font-medium mb-2">{edu.institution}</p>
                    <p className="text-gray-400 text-sm mb-3">{edu.grade}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Experience</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="edu-card bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-sm rounded-full font-medium mb-4">
                    {exp.period}
                  </span>
                  <h4 className="text-xl font-bold text-pink-400 mb-2">
                    {exp.title}
                  </h4>
                  <p className="text-white font-medium mb-1">{exp.position}</p>
                  <p className="text-gray-400 text-sm mb-3">{exp.organization}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
