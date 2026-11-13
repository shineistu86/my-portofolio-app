import { useEffect, useRef } from 'react'
import { worldRuntime } from './world/worldStore'

/**
 * Virtual joystick for touch devices — wraps nipplejs,
 * loaded dynamically so desktop users never download it.
 */
function Joystick() {
  const zoneRef = useRef(null)

  useEffect(() => {
    let joystick = null
    let destroyed = false

    import('nipplejs').then(({ default: nipplejs }) => {
      if (destroyed || !zoneRef.current) return
      joystick = nipplejs.create({
        zone: zoneRef.current,
        mode: 'static',
        position: { left: '50%', top: '50%' },
        color: 'rgba(255, 255, 255, 0.85)',
        size: 110,
      })
      joystick.on('move', (_, data) => {
        worldRuntime.joy.x = data.vector.x
        // nipplejs y axis points down — invert so up = forward
        worldRuntime.joy.y = -data.vector.y
      })
      joystick.on('end', () => {
        worldRuntime.joy.x = 0
        worldRuntime.joy.y = 0
      })
    })

    return () => {
      destroyed = true
      worldRuntime.joy.x = 0
      worldRuntime.joy.y = 0
      if (joystick) joystick.destroy()
    }
  }, [])

  return (
    <div
      ref={zoneRef}
      className="absolute bottom-6 left-6 w-36 h-36 touch-none"
      aria-hidden="true"
    />
  )
}

export default Joystick
