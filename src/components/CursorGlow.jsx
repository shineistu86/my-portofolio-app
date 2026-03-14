import { useEffect } from 'react'

function CursorGlow() {
  useEffect(() => {
    const glow = document.querySelector('.cursor-glow')

    let mouseX = 0
    let mouseY = 0
    let posX = 0
    let posY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      document.body.style.setProperty('--x', e.clientX + 'px')
      document.body.style.setProperty('--y', e.clientY + 'px')
    }

    const animate = () => {
      posX += (mouseX - posX) * 0.1
      posY += (mouseY - posY) * 0.1

      if (glow) {
        glow.style.left = posX + 'px'
        glow.style.top = posY + 'px'
      }

      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <div className="cursor-glow"></div>
}

export default CursorGlow
