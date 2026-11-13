import { portfolioData } from '../data/portfolioData'

function Education() {
  const { education, coursework } = portfolioData

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
          Education
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Academic background and relevant coursework.
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-lg space-y-6">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="edu-card bg-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-sm rounded-full font-medium mb-4">
                  {edu.year}
                </span>
                <h3 className="text-xl font-bold text-pink-400 mb-2">
                  {edu.program}
                </h3>
                <p className="text-white font-medium mb-2">{edu.institution}</p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Studying Information Systems with a strong interest in Data
                  Analytics and Business Intelligence — building foundations
                  across technology, business processes, and data.
                </p>

                {/* Relevant coursework chips */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((course) => (
                      <span
                        key={course}
                        className="bg-gray-800/80 text-gray-300 text-xs px-2.5 py-1 rounded-md border border-gray-600/40"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
