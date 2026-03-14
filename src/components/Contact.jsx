import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

function Contact() {
  const { social, profile } = portfolioData

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: social.github, color: 'hover:text-white' },
    { name: 'LinkedIn', icon: FaLinkedin, url: social.linkedin, color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: FaInstagram, url: social.instagram, color: 'hover:text-pink-500' },
    { name: 'Email', icon: FaEnvelope, url: social.email, color: 'hover:text-yellow-400' },
  ]

  return (
    <section id="contact" className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements - Varied Positions */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>

        <div className="text-center mb-8">
          <p className="text-gray-400 mb-2">Feel free to reach out for collaborations or opportunities!</p>
          <p className="text-gray-300 font-semibold">{profile.email}</p>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 ${link.color} transition-colors`}
            >
              <link.icon size={32} />
            </a>
          ))}
        </div>

        <form
          action="https://formsubmit.co/syamjoj@gmail.com"
          method="POST"
          className="max-w-lg mx-auto bg-gray-700/30 backdrop-blur-sm p-6 rounded-xl border border-gray-600/30"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Message from Portfolio!" />
          <input type="hidden" name="_template" value="table" />
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 border border-gray-500/30"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 bg-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 border border-gray-500/30"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
              className="w-full px-4 py-3 bg-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 resize-none border border-gray-500/30"
            ></textarea>
            <button
              type="submit"
              className="submit-btn w-full relative py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-cyan-500 text-cyan-500 bg-transparent hover:bg-cyan-500 hover:text-white overflow-hidden"
            >
              <span className="btn-text">Send Message</span>
              <i className="check-icon absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">✓</i>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
