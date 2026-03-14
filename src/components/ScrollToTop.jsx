import { useEffect, useState } from 'react'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Circle progress config
  const radius = 24
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const bodyHeight = document.body.scrollHeight - document.body.clientHeight
      const scrollPos = window.scrollY
      const percentage = bodyHeight > 0 ? (scrollPos / bodyHeight) * 100 : 0
      setScrollProgress(Math.min(percentage, 100))

      // Toggle button visibility
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <a
      href="#"
      onClick={scrollToTop}
      className={`scroll-to-top fixed right-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 visible bottom-16' : 'opacity-0 invisible bottom-12'
      }`}
    >
      {/* Button Container */}
      <div className="relative w-14 h-14 group">
        {/* SVG Circular Progress */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Track Circle (background) */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="rgba(17, 24, 39, 0.9)"
            stroke="rgba(55, 65, 81, 0.8)"
            strokeWidth="4"
          />
          {/* Progress Circle (cyan toska) */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="transparent"
            stroke="#06b6d4"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (scrollProgress / 100) * circumference}
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Arrow Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-cyan-500/30 blur-md" />
        </div>
      </div>

      {/* Tooltip Text */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm text-gray-300 text-sm rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-700 shadow-xl">
        Go Back Top
      </span>
    </a>
  )
}

export default ScrollToTop
