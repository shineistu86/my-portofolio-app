import { portfolioData } from '../data/portfolioData'

function Experience() {
  const { experience } = portfolioData

  return (
    <section id="experience" className="py-20 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400">{exp.organization}</h3>
              <p className="text-gray-300 font-medium mt-1">{exp.position} - {exp.title}</p>
              <p className="text-gray-400 mt-2">{exp.description}</p>
              <p className="text-gray-500 mt-3 text-sm">{exp.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
