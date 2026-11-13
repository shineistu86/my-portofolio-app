import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

const filterCategories = [
  { label: 'ALL', value: 'all' },
  { label: 'DATA', value: 'data' },
  { label: 'WEB APP', value: 'web' },
  { label: 'DESIGN', value: 'design' },
]

const categoryLabels = {
  data: 'Data Analysis',
  web: 'Web Application',
  design: 'UI/UX Design',
}

// Auto-map every image in assets/images — adding a new file needs zero code changes
const projectImages = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/images/*', { eager: true, as: 'url' })).map(
    ([path, url]) => [path.split('/').pop(), url]
  )
)

function ProjectThumb({ project }) {
  const src = project.image ? projectImages[project.image] : null

  if (!src) {
    // Gradient placeholder for projects whose screenshot is not available yet
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-600/30 via-purple-600/25 to-cyan-500/20"
        role="img"
        aria-label={`${project.name} preview (screenshot coming soon)`}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-300/80" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.25 2.25 0 015.25 5.25h1.5a1.5 1.5 0 001.6-1.117l.541-1.624A.75.75 0 0110.1 2.25h3.8a.75.75 0 01.709.509l.54 1.624a1.5 1.5 0 001.6 1.117h1.5a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-13.5A2.25 2.25 0 013 16.5v-9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        </svg>
        <span className="text-xs text-blue-200/70 tracking-wide uppercase">Screenshot coming soon</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${project.name} preview`}
      loading="lazy"
      width={640}
      height={360}
      className="w-full h-full object-cover"
    />
  )
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const { projects } = portfolioData

  const filteredProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)

  const isGithubLink = (link) => /github\.com/.test(link)

  return (
    <section id="projects" className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements - Varied Positions */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Portfolio Projects
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Data analysis, machine learning, and web projects I have worked on —
          from geospatial clustering to interactive dashboards.
        </p>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" role="group" aria-label="Filter projects by category">
          {filterCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              aria-pressed={activeFilter === category.value}
              className={`px-6 py-2 rounded-full font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 ${
                activeFilter === category.value
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.name}
              className={`project-card edu-card bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-1 relative ${
                project.featured ? 'border border-cyan-500/40' : ''
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-cyan-500/90 text-gray-900 text-xs font-bold rounded-full tracking-wide">
                  FEATURED
                </span>
              )}

              {/* Top Section - Info */}
              <div className="p-6 border-b border-gray-700 min-h-[140px]">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium whitespace-nowrap">
                    {categoryLabels[project.category] || 'Project'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Bottom Section - Image + Details */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-4 mb-4">
                  {/* Project Preview Image */}
                  <div className="flex-1">
                    <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden border border-gray-700 group-hover:border-red-500/50 transition-colors relative">
                      <ProjectThumb project={project} />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="w-40 flex-shrink-0 space-y-2 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Date</p>
                      <p className="text-white font-medium">{project.year || '2024'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Client</p>
                      <p className="text-white font-medium">
                        {project.type === 'Team'
                          ? 'Team Project'
                          : project.type === 'Internship'
                            ? 'Internship Deliverable'
                            : 'Personal Project'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">Tech</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-300"
                  >
                    {isGithubLink(project.link) ? (
                      <>
                        <FaGithub size={14} aria-hidden="true" /> View Repository
                      </>
                    ) : (
                      <>
                        Read more <FaExternalLinkAlt size={14} aria-hidden="true" />
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
