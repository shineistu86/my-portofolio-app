import { useState, useEffect, useRef } from 'react'
import fotoSyam from '../assets/images/foto-syam.png'
import pythonIcon from '../assets/images/python-icon.png'
import reactIcon from '../assets/images/react-icon.png'
import htmlIcon from '../assets/images/html-icon.png'
import cssIcon from '../assets/images/css-icon.png'
import tailwindIcon from '../assets/images/tailwind-icon.png'
import excelIcon from '../assets/images/excel-icon.png'
import streamlitIcon from '../assets/images/streamlit-icon.png'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

// Draggable Icon Component with Reorder
function DraggableIcon({ icon, name, alt, index, onReorder, totalIcons }) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const iconRef = useRef(null)
  const containerRef = useRef(null)

  // Icon positions in percentage for responsive orbiting layout
  const iconPositions = [
    { left: '5%', top: '50%' },      // CSS - left middle
    { left: '15%', top: '80%' },     // Python - bottom left
    { left: '45%', top: '92%' },     // React - bottom center
    { left: '75%', top: '80%' },     // Tailwind - bottom right
    { left: '88%', top: '50%' },     // HTML - right middle
    { left: '75%', top: '8%' },      // Streamlit - top right
    { left: '15%', top: '8%' },      // Excel - top left
  ]

  const position = iconPositions[index]
  const targetX = parseFloat(position.left)
  const targetY = parseFloat(position.top)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragOffset(e.clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragOffset
    if (Math.abs(deltaX) > 50) {
      const direction = deltaX > 0 ? 1 : -1
      const newIndex = Math.max(0, Math.min(totalIcons - 1, index + direction))
      if (newIndex !== index) {
        onReorder(index, newIndex)
        setDragOffset(e.clientX)
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setDragOffset(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const deltaX = e.touches[0].clientX - dragOffset
    if (Math.abs(deltaX) > 50) {
      const direction = deltaX > 0 ? 1 : -1
      const newIndex = Math.max(0, Math.min(totalIcons - 1, index + direction))
      if (newIndex !== index) {
        onReorder(index, newIndex)
        setDragOffset(e.touches[0].clientX)
      }
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchEnd)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, dragOffset, index, totalIcons])

  return (
    <div
      ref={iconRef}
      className={`tech-icon absolute cursor-grab active:cursor-grabbing ${isDragging ? 'scale-125 z-50' : ''}`}
      style={{
        left: position.left,
        top: position.top,
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img src={icon} alt={alt} className="w-full h-full pointer-events-none" />
      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity bg-gray-900/80 px-2 py-1 rounded">
        {name}
      </span>
    </div>
  )
}

function Home() {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const fullText = 'Hisyam Eka Pramudita'
  const containerRef = useRef(null)

  // Icon order state - can be reordered by user
  const [iconOrder, setIconOrder] = useState([
    { icon: pythonIcon, name: 'Python' },
    { icon: reactIcon, name: 'React' },
    { icon: htmlIcon, name: 'HTML' },
    { icon: cssIcon, name: 'CSS' },
    { icon: tailwindIcon, name: 'Tailwind' },
    { icon: excelIcon, name: 'Excel' },
    { icon: streamlitIcon, name: 'Streamlit' },
  ])

  // Handle icon reorder
  const handleReorder = (fromIndex, toIndex) => {
    setIconOrder(prev => {
      const newOrder = [...prev]
      const [moved] = newOrder.splice(fromIndex, 1)
      newOrder.splice(toIndex, 0, moved)
      return newOrder
    })
  }

  useEffect(() => {
    // Initial 3 second delay before first typing
    const initialDelay = setTimeout(() => {
      handleType()
    }, 3000)

    return () => clearTimeout(initialDelay)
  }, [])

  useEffect(() => {
    if (displayText === '' && loopNum === 0) return

    const timeout = setTimeout(() => {
      handleType()
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting])

  const handleType = () => {
    const currentText = displayText
    const expectedText = isDeleting 
      ? fullText.substring(0, currentText.length - 1) 
      : fullText.substring(0, currentText.length + 1)

    setDisplayText(expectedText)

    if (!isDeleting && expectedText === fullText) {
      // Finished typing, wait 2 seconds then start deleting
      setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && expectedText === '') {
      // Finished deleting, start new loop
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
    }
  }

  return (
    <section id="home" className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Background Decorative Elements - Varied Positions */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Text & CTA */}
          <div className="text-left space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-yellow-400 text-3xl md:text-4xl lg:text-5xl font-medium">Hello,</p>
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white h-[80px] md:h-[100px] lg:h-[120px]">
                I Am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{displayText}</span>
                <span className="animate-pulse">|</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-green-400">
              Information Systems Student
            </h2>

            <div className="h-4"></div>

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Information Systems student with a strong interest in data analysis and data visualization.
              Experienced in data exploration, sentiment analysis, and creating visualizations using
              various data analysis tools.
            </p>

            <div className="h-4"></div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#profile"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-green-500/30"
              >
                Explore More
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-6">
              <a
                href="https://github.com/shineistu86"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full transition-all transform hover:scale-110"
              >
                <FaGithub size={24} className="text-white" />
              </a>
              <div
                className="flex items-center justify-center w-14 h-14 bg-gray-800 hover:bg-blue-600 rounded-full transition-all transform hover:scale-110 cursor-default"
              >
                <FaLinkedin size={24} className="text-white" />
              </div>
              <a
                href="https://www.instagram.com/isaac.tangiss/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-gray-800 hover:bg-pink-600 rounded-full transition-all transform hover:scale-110"
              >
                <FaInstagram size={24} className="text-white" />
              </a>
            </div>
          </div>

          {/* Right Side - Visual with Glossy Water Sphere & Draggable Icons */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div ref={containerRef} className="relative profile-container w-[350px] h-[450px] md:w-[400px] md:h-[500px] flex justify-center items-center">
              {/* Glossy Water Sphere Effect */}
              <div className="water-sphere absolute w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400 via-blue-600 to-purple-700 rounded-[45%_55%_50%_50%/50%_45%_55%_50%] blur-md z-10 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.5),_0_0_50px_rgba(59,130,246,0.6)] animate-liquid"></div>
              
              {/* Outer Glow Ring */}
              <div className="absolute w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[45%_55%_50%_50%/50%_45%_55%_50%] blur-xl opacity-50 animate-pulse z-0"></div>

              {/* Profile Image */}
              <div className="relative z-20 profile-img" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', transform: 'translateY(-65px)' }}>
                <img
                  src={fotoSyam}
                  alt="Hisyam Eka Pramudita"
                  className="w-72 md:w-80 lg:w-96 h-auto object-contain"
                />
              </div>

              {/* Draggable Tech Icons */}
              <div className="absolute inset-0 z-30">
                {iconOrder.map((item, index) => (
                  <DraggableIcon
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    alt={item.name}
                    index={index}
                    onReorder={handleReorder}
                    totalIcons={iconOrder.length}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CSS for Glossy Water Sphere and Draggable Icons */}
      <style>{`
        @keyframes liquid {
          0% { border-radius: 45% 55% 50% 50% / 50% 45% 55% 50%; }
          100% { border-radius: 55% 45% 55% 45% / 45% 55% 45% 55%; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        .animate-liquid {
          animation: liquid 8s infinite alternate;
        }

        .tech-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 12px;
          border-radius: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1), 0 0 20px rgba(59, 130, 246, 0.5);
          animation: bounce 2s ease-in-out infinite;
        }

        .tech-icon:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(59, 130, 246, 0.8);
        }

        @media (max-width: 768px) {
          .tech-icon {
            width: 45px;
            height: 45px;
          }
        }

        .tech-icon:nth-child(1) { animation-delay: 0s; }
        .tech-icon:nth-child(2) { animation-delay: 0.15s; }
        .tech-icon:nth-child(3) { animation-delay: 0.3s; }
        .tech-icon:nth-child(4) { animation-delay: 0.45s; }
        .tech-icon:nth-child(5) { animation-delay: 0.6s; }
        .tech-icon:nth-child(6) { animation-delay: 0.75s; }
        .tech-icon:nth-child(7) { animation-delay: 0.9s; }

        .tech-icon:hover {
          animation-play-state: paused;
        }

        .tech-icon img {
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
        }
      `}</style>
    </section>
  )
}

export default Home
