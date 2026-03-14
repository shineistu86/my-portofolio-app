import { useEffect } from 'react'

function AuroraBg() {
  useEffect(() => {
    const auroras = document.querySelectorAll('.aurora')

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5

      auroras.forEach((a, i) => {
        const speed = (i + 1) * 40
        a.style.transform = `translate(${x * speed}px, ${y * speed}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="aurora-bg">
      <div className="aurora aurora1"></div>
      <div className="aurora aurora2"></div>
      <div className="aurora aurora3"></div>
    </div>
  )
}

export default AuroraBg
