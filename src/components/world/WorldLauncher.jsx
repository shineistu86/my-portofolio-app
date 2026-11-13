import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { FaTimes, FaGamepad } from 'react-icons/fa'
import { worldStore, worldRuntime } from './worldStore'
import Joystick from '../Joystick'

const BlockyWorld = lazy(() => import('./BlockyWorld'))

function WorldLauncher() {
  const [isOpen, setIsOpen] = useState(worldStore.open)
  const [near, setNear] = useState(null)
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )

  useEffect(
    () =>
      worldStore.subscribe((next) => {
        setIsOpen(next)
        if (!next) {
          worldRuntime.nearId = null
          worldRuntime.speed = 0
          setNear(null)
        }
      }),
    []
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') worldStore.setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  const enterBuilding = useCallback((target) => {
    worldStore.setOpen(false)
    // Let the overlay close & body scroll unlock before smooth scrolling
    window.setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }, [])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0b0f19]"
      role="dialog"
      aria-modal="true"
      aria-label="Explore the HEP'S PORTO map"
    >
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse" aria-hidden="true"></div>
            <p className="text-gray-300 font-medium">Loading HEP&apos;S PORTO world…</p>
          </div>
        }
      >
        <BlockyWorld onProximity={setNear} onEnter={enterBuilding} />
      </Suspense>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2.5 bg-gray-900/85 backdrop-blur px-4 py-2.5 rounded-xl border border-gray-700 shadow-lg">
          <FaGamepad className="text-cyan-400" aria-hidden="true" />
          <span className="font-bold text-white tracking-wide">HEP&apos;S PORTO</span>
          <span className="text-gray-400 text-sm hidden sm:inline">— Blocky World</span>
        </div>
        <button
          onClick={() => worldStore.setOpen(false)}
          aria-label="Close map and return to portfolio"
          className="pointer-events-auto flex items-center gap-2 bg-gray-900/85 backdrop-blur hover:bg-red-600 text-white px-4 py-2.5 rounded-xl border border-gray-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
        >
          <FaTimes aria-hidden="true" />
          <span className="hidden sm:inline text-sm font-medium">Exit</span>
        </button>
      </div>

      {/* Desktop controls hint */}
      {!isTouch && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/85 backdrop-blur px-5 py-2.5 rounded-full border border-gray-700 text-gray-300 text-sm pointer-events-none">
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">W A S D</kbd> / arrows to walk
          <span className="mx-2 text-gray-600">•</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">E</kbd> enter building
          <span className="mx-2 text-gray-600">•</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">ESC</kbd> close
        </div>
      )}

      {/* Enter building prompt */}
      {near && (
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
          {isTouch ? (
            <button
              onClick={() => enterBuilding(near.target)}
              className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold shadow-lg shadow-cyan-500/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200"
            >
              Enter — {near.label}
            </button>
          ) : (
            <div className="px-6 py-3 rounded-full bg-gray-900/90 backdrop-blur border border-cyan-500/60 text-white font-medium shadow-lg pointer-events-none">
              Press <kbd className="px-1.5 py-0.5 mx-1 bg-cyan-500 text-gray-900 rounded text-sm font-bold">E</kbd> to enter — {near.label}
            </div>
          )}
        </div>
      )}

      {/* Virtual joystick (touch devices only) */}
      {isTouch && <Joystick />}
    </div>
  )
}

export default WorldLauncher
