import { portfolioData } from '../../data/portfolioData'

const { experience, projects, skills, certifications, awards, social, profile } = portfolioData

/**
 * Short content shown in the popup when entering a building.
 * Full sections live on the main page; the popup links out to them.
 */
export const sectionContent = {
  home: {
    title: 'Welcome!',
    subtitle: `${profile.name}, ${profile.title}`,
    points: [
      profile.description,
      `Based in ${profile.location}`,
      'Walk into any building and press E (or tap Enter) to peek at that section.',
    ],
    links: [
      { label: 'GitHub', url: social.github },
      { label: 'LinkedIn', url: social.linkedin },
    ],
  },
  education: {
    title: 'Education',
    subtitle: portfolioData.education[0]?.institution,
    points: [
      `${portfolioData.education[0]?.program} (${portfolioData.education[0]?.year})`,
      'Relevant coursework:',
      ...portfolioData.coursework.slice(0, 7),
    ],
  },
  experience: {
    title: 'Experience',
    subtitle: 'Internships, teaching, projects and organizations',
    points: experience
      .slice(0, 6)
      .map((e) => `${e.title}, ${e.organization} (${e.period})`),
  },
  skills: {
    title: 'Skills',
    subtitle: 'Technologies & tools I work with',
    points: [
      `Programming: ${skills.programming.map((s) => s.name).join(', ')}`,
      `Data: ${skills.dataScience.map((s) => s.name).join(', ')}`,
      `BI & Visualization: ${skills.tools.map((s) => s.name).join(', ')}`,
      `Design: ${skills.design.map((s) => s.name).join(', ')}`,
    ],
  },
  projects: {
    title: 'Projects',
    subtitle: `${projects.length} projects: data, web and design`,
    points: projects
      .slice(0, 6)
      .map((p) => {
        const tech = p.technologies.slice(0, 3).join(', ')
        return `${p.name}${p.featured ? ' (featured)' : ''}: ${tech}`
      }),
  },
  achievements: {
    title: 'Certifications & Awards',
    subtitle: 'Milestones and recognitions',
    points: [
      ...certifications.map((c) => `Certification: ${c.name}, ${c.issuer} (${c.year})`),
      ...awards.map((a) => `Award: ${a.title}, ${a.detail} (${a.year})`),
    ],
  },
  contact: {
    title: 'Contact',
    subtitle: 'Reach out for collaborations or opportunities',
    points: [`Email: ${profile.email}`],
    links: [
      { label: 'GitHub', url: social.github },
      { label: 'LinkedIn', url: social.linkedin },
      { label: 'Instagram', url: social.instagram },
      { label: 'Email', url: social.email },
    ],
  },
}
