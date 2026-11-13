import { useEffect, useRef } from 'react'

const KEY_MAP = {
  KeyW: 'up',
  ArrowUp: 'up',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
}

/**
 * Tracks WASD / arrow key state into a ref (no re-renders per frame).
 */
export function useKeyboard() {
  const keys = useRef({ up: false, down: false, left: false, right: false })

  useEffect(() => {
    const onDown = (e) => {
      const k = KEY_MAP[e.code]
      if (k) {
        e.preventDefault()
        keys.current[k] = true
      }
    }
    const onUp = (e) => {
      const k = KEY_MAP[e.code]
      if (k) {
        e.preventDefault()
        keys.current[k] = false
      }
    }
    const onBlur = () => {
      keys.current.up = false
      keys.current.down = false
      keys.current.left = false
      keys.current.right = false
    }

    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return keys
}
