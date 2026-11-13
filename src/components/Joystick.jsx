import { useEffect, useRef } from 'react'
import { worldRuntime } from './world/worldStore'

/**
 * Virtual joystick for touch devices — wraps nipplejs,
 * loaded dynamically so desktop users never download it.
 * Dynamic mode: the joystick spawns wherever the left half of
 * the screen is touched ("full" joystick, not a fixed pad).
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
        mode: 'dynamic',
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
      className="absolute bottom-0 left-0 w-1/2 h-3/5 touch-none"
      aria-hidden="true"
    />
  )
}

export default Joystick
