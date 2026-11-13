import { portfolioData } from '../data/portfolioData'
import { FaBriefcase, FaGraduationCap, FaUsers, FaChalkboardTeacher } from 'react-icons/fa'

const typeConfig = {
  Internship: { icon: FaBriefcase, classes: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  Teaching: { icon: FaChalkboardTeacher, classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  'Academic Project': { icon: FaGraduationCap, classes: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  Organization: { icon: FaUsers, classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
}

function Experience() {
  const { experience } = portfolioData

  return (
    <section id="experience" className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Experience
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Internships, teaching, projects, and organizational roles I have taken on.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-gray-700 to-transparent md:-translate-x-1/2" aria-hidden="true"></div>

          <div className="space-y-10">
            {experience.map((exp) => {
              const TypeIcon = (typeConfig[exp.type] || {}).icon || FaBriefcase
              const typeClasses = (typeConfig[exp.type] || {}).classes || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
              return (
                <article key={`${exp.organization}-${exp.title}`} className="relative md:grid md:grid-cols-2 md:gap-10">
                  {/* Timeline node */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 border-4 border-gray-900 shadow-[0_0_12px_rgba(59,130,246,0.8)]" aria-hidden="true"></div>

                  <div className={`ml-12 md:ml-0 ${exp.type === 'Internship' || exp.type === 'Organization' ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}>
                    <div className="edu-card bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium border ${typeClasses}`}>
                          <TypeIcon size={11} />
                          {exp.type}
                        </span>
                        <span className="text-gray-500 text-xs">{exp.period}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug">{exp.title}</h3>
                      <p className="text-blue-400 font-medium text-sm mt-0.5">{exp.position}</p>
                      <p className="text-gray-400 text-sm mb-3">{exp.organization}</p>

                      <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>

                      {exp.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="bg-gray-700/70 text-gray-300 text-xs px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
