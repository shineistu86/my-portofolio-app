import pythonIcon from '../assets/images/python-icon.png'
import pandasIcon from '../assets/images/pandas-icon.png'
import htmlIcon from '../assets/images/html-icon.png'
import cssIcon from '../assets/images/css-icon.png'
import mysqlIcon from '../assets/images/mysql-icon.png'
import rapidIcon from '../assets/images/rapid-icon.png'
import powerbiIcon from '../assets/images/powerbi-icon.png'
import lookerIcon from '../assets/images/looker-icon.png'
import excelIcon from '../assets/images/excel-icon.png'
import figmaIcon from '../assets/images/figma-icon.png'
import canvaIcon from '../assets/images/canva-icon.png'
import reactIcon from '../assets/images/react-icon.png'

function Skills() {
  const techStack = [
    { name: 'Python', icon: pythonIcon },
    { name: 'Pandas', icon: pandasIcon },
    { name: 'React', icon: reactIcon },
    { name: 'HTML', icon: htmlIcon },
    { name: 'CSS', icon: cssIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'Rapid\nMiner', icon: rapidIcon },
    { name: 'Power BI', icon: powerbiIcon },
    { name: 'Looker\nStudio', icon: lookerIcon },
    { name: 'Excel', icon: excelIcon },
    { name: 'Figma', icon: figmaIcon },
    { name: 'Canva', icon: canvaIcon },
  ]

  // Triple duplicate for smooth infinite scroll
  const triplicatedTechStack = [...techStack, ...techStack, ...techStack]

  return (
    <section id="skills" className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements - Varied Positions */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Skills</h2>
        <p className="text-gray-400 text-center mb-12">Technologies & Tools I Work With</p>

        {/* Top Carousel - Left to Right */}
        <div className="carousel reverse mb-8">
          <div className="track">
            {triplicatedTechStack.map((tech, index) => (
              <div key={`top-${index}`} className="tech">
                <img src={tech.icon} alt={tech.name} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Carousel - Right to Left */}
        <div className="carousel">
          <div className="track">
            {triplicatedTechStack.map((tech, index) => (
              <div key={`bottom-${index}`} className="tech">
                <img src={tech.icon} alt={tech.name} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
