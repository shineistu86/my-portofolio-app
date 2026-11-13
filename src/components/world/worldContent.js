import { portfolioData } from '../../data/portfolioData'

const { experience, projects, skills, certifications, awards, social, profile } = portfolioData

/**
 * Concise content shown in the in-world popup when entering a building.
 * Full sections stay on the main portfolio — the popup has a CTA for that.
 */
export const sectionContent = {
  home: {
    title: 'Welcome!',
    subtitle: `${profile.name} — ${profile.title}`,
    points: [
      profile.description,
      `📍 ${profile.location}`,
      '🚗 Walk around town, enter buildings, and press E (or tap the prompt) to peek inside each section.',
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
      `${portfolioData.education[0]?.program} · ${portfolioData.education[0]?.year}`,
      'Relevant coursework:',
      ...portfolioData.coursework.slice(0, 7).map((c) => `• ${c}`),
    ],
  },
  experience: {
    title: 'Experience',
    subtitle: 'Internships, teaching, projects & organizations',
    points: experience
      .slice(0, 6)
      .map((e) => `• ${e.title} — ${e.organization} (${e.period})`),
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
    subtitle: `${projects.length} projects — data, web & design`,
    points: projects
      .slice(0, 6)
      .map(
        (p) =>
          `• ${p.name}${p.featured ? ' ⭐' : ''} — ${p.technologies.slice(0, 3).join(', ')}`
      ),
  },
  achievements: {
    title: 'Certifications & Awards',
    subtitle: 'Milestones and recognitions',
    points: [
      ...certifications.map((c) => `🎓 ${c.name} — ${c.issuer} (${c.year})`),
      ...awards.map((a) => `🏆 ${a.title} — ${a.detail} (${a.year})`),
    ],
  },
  contact: {
    title: 'Contact',
    subtitle: 'Reach out for collaborations or opportunities',
    points: [`✉️ ${profile.email}`],
    links: [
      { label: 'GitHub', url: social.github },
      { label: 'LinkedIn', url: social.linkedin },
      { label: 'Instagram', url: social.instagram },
      { label: 'Email', url: social.email },
    ],
  },
}
