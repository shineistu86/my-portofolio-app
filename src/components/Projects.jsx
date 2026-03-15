import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'
import heatingOil from '../assets/images/heating-oil.png'
import osamunime from '../assets/images/osamunime.png'
import notionNote from '../assets/images/notion-note.png'
import overviewDana from '../assets/images/overview-dana.png'
import darigarut from '../assets/images/darigarut.png'
import dpr from '../assets/images/dpr.png'

const filterCategories = ['ALL', 'WEB APP', 'DATA', 'DESIGN']

const projectImages = {
  'heating-oil.png': heatingOil,
  'osamunime.png': osamunime,
  'notion-note.png': notionNote,
  'overview-dana.png': overviewDana,
  'darigarut.png': darigarut,
  'dpr.png': dpr,
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const { projects } = portfolioData

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(project => {
        if (activeFilter === 'WEB APP') return project.technologies.some(t => t.includes('Laravel') || t.includes('React') || t.includes('Tailwind'))
        if (activeFilter === 'DATA') return project.technologies.some(t => t.includes('Python') || t.includes('pandas') || t.includes('RapidMiner'))
        if (activeFilter === 'DESIGN') return project.technologies.some(t => t.includes('Figma'))
        return true
      })

  const getProjectType = (project) => {
    if (project.technologies.some(t => t.includes('Figma'))) {
      return 'Design'
    }
    if (project.technologies.some(t => t.includes('Machine Learning') || t.includes('RapidMiner'))) {
      return 'Data Science'
    }
    if (project.technologies.some(t => t.includes('Python') || t.includes('pandas'))) {
      return 'Data Analysis'
    }
    return 'Web Application'
  }

  const getProjectDetails = (project) => {
    return {
      date: project.year || '2024',
      client: project.type === 'Team' ? 'Team Project' : 'Personal Project',
      tech: project.technologies.slice(0, 2),
      type: getProjectType(project),
    }
  }

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
          Explore my latest work including web applications, data analysis projects, and more.
        </p>

        {/* Add CSS for sweep animation */}
        <style>{`
          .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(6, 182, 212, 0.1),
              transparent
            );
            transition: 0.5s;
            pointer-events: none;
          }
          .project-card:hover::before {
            left: 100%;
          }
        `}</style>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === category
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const details = getProjectDetails(project)
            return (
              <div
                key={index}
                className="project-card edu-card bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-1 relative"
              >
                {/* Top Section - Info (Fixed Height) */}
                <div className="p-6 border-b border-gray-700 min-h-[140px]">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium whitespace-nowrap">
                      {details.type}
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
                        <img
                          src={projectImages[project.image] || heatingOil}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="w-40 flex-shrink-0 space-y-2 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Date</p>
                        <p className="text-white font-medium">{details.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Client</p>
                        <p className="text-white font-medium">{details.client}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Tech</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {details.tech.slice(0, 1).map((tech) => (
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
                      className="w-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Read more
                      <FaExternalLinkAlt size={14} />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
