import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { FaTimes, FaGamepad, FaArrowUp, FaArrowRight, FaSpinner, FaCube } from 'react-icons/fa'
import { worldStore, worldRuntime, worldAvatar } from './worldStore'
import { sectionContent } from './worldContent'
import Joystick from '../Joystick'

const BlockyWorld = lazy(() => import('./BlockyWorld'))

const DEFAULT_COLORS = { head: '#f5cd30', torso: '#0d69ac', arms: '#f5cd30', legs: '#4b974b' }

/**
 * Reads the avatar render (proxied same-origin, so the canvas stays clean)
 * and averages opaque pixels per body region to recolor the 3D rig.
 * Returns null if anything fails; callers fall back to default colors.
 */
function sampleAvatarColors(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      try {
        const S = 96
        const canvas = document.createElement('canvas')
        canvas.width = S
        canvas.height = S
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0, S, S)
        const px = ctx.getImageData(0, 0, S, S).data
        const avg = (rects) => {
          let r = 0
          let g = 0
          let b = 0
          let n = 0
          for (const [x0, x1, y0, y1] of rects) {
            for (let y = Math.floor(y0 * S); y < Math.ceil(y1 * S); y++) {
              for (let x = Math.floor(x0 * S); x < Math.ceil(x1 * S); x++) {
                const i = (y * S + x) * 4
                if (px[i + 3] > 128) {
                  r += px[i]
                  g += px[i + 1]
                  b += px[i + 2]
                  n++
                }
              }
            }
          }
          if (!n) return null
          const hex = (v) => Math.round(v / n).toString(16).padStart(2, '0')
          return `#${hex(r)}${hex(g)}${hex(b)}`
        }
        const arms =
          avg([
            [0.08, 0.34, 0.38, 0.62],
            [0.66, 0.92, 0.38, 0.62],
          ]) ?? DEFAULT_COLORS.arms
        resolve({
          head: avg([[0.35, 0.65, 0.04, 0.24]]) ?? DEFAULT_COLORS.head,
          torso: avg([[0.38, 0.62, 0.38, 0.62]]) ?? DEFAULT_COLORS.torso,
          arms,
          legs: avg([[0.34, 0.66, 0.7, 0.97]]) ?? DEFAULT_COLORS.legs,
        })
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = url
  })
}

/** Entry screen: play with your Roblox avatar or as the classic blocky guest. */
function EntryDialog({ onPlay }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const playBlocky = () => {
    worldAvatar.set({ type: 'blocky' })
    onPlay()
  }

  const submit = async (e) => {
    e.preventDefault()
    const name = username.trim()
    if (!/^[A-Za-z0-9_]{3,20}$/.test(name)) {
      setError('Roblox usernames are 3 to 20 characters: letters, numbers, underscore.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/roblox-avatar?username=${encodeURIComponent(name)}`)
      if (!res.ok) throw new Error(res.status === 404 ? 'not_found' : 'fetch_failed')
      const data = await res.json()
      const colors = await sampleAvatarColors(data.avatarUrl)
      worldAvatar.set({
        type: 'roblox',
        displayName: data.displayName,
        colors: colors ?? {},
      })
      onPlay()
    } catch (err) {
      setLoading(false)
      setError(
        err.message === 'not_found'
          ? `Roblox user "${name}" was not found. Check the spelling or play as Blocky.`
          : 'Could not reach the avatar API. Try again or play as Blocky.'
      )
    }
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-[#0b0f19] via-[#101a2e] to-[#0b0f19] p-4">
      <div
        className="w-full max-w-md bg-gray-900/95 border border-gray-700 rounded-2xl p-6 sm:p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Choose your character"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0">
            <FaGamepad className="text-white" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-bold text-white text-lg leading-tight">Enter HEP&apos;S PORTO</h2>
            <p className="text-gray-400 text-sm">Pick your character</p>
          </div>
        </div>

        <p className="text-gray-300 text-sm mt-4 mb-5">
          Every building in this blocky town is a section of the portfolio. Type your Roblox
          username and you will walk around as a 3D character wearing your avatar&apos;s colors, or
          continue as the classic blocky guest.
        </p>

        <form onSubmit={submit} className="mb-4">
          <label
            htmlFor="roblox-username"
            className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5"
          >
            Roblox username
          </label>
          <div className="flex gap-2">
            <input
              id="roblox-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. builderman"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              maxLength={20}
              enterKeyHint="go"
              disabled={loading}
              className="flex-1 min-w-0 bg-gray-800 border border-gray-600 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-gray-900 font-bold px-4 py-2.5 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" aria-hidden="true" />
                  <span className="hidden sm:inline">Loading</span>
                </>
              ) : (
                'Play'
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </form>

        <div className="flex items-center gap-3 text-gray-600 text-xs uppercase tracking-widest my-4">
          <span className="h-px flex-1 bg-gray-700" />
          or
          <span className="h-px flex-1 bg-gray-700" />
        </div>

        <button
          onClick={playBlocky}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold px-4 py-3 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400 disabled:opacity-60"
        >
          <FaCube aria-hidden="true" />
          Play as Blocky (guest)
        </button>

        <p className="text-gray-500 text-xs mt-4 text-center">
          Character colors are read from your public Roblox avatar render.
        </p>
      </div>
    </div>
  )
}

function WorldLauncher() {
  const [isOpen, setIsOpen] = useState(worldStore.open)
  const [entered, setEntered] = useState(false)
  const [near, setNear] = useState(null)
  const [popup, setPopup] = useState(null)
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0)
  )

  useEffect(
    () =>
      worldStore.subscribe((next) => {
        setIsOpen(next)
        if (!next) {
          worldRuntime.nearId = null
          worldRuntime.speed = 0
          worldRuntime.paused = false
          setNear(null)
          setPopup(null)
          setEntered(false)
        }
      }),
    []
  )

  useEffect(() => {
    if (!isOpen) return
    // If the world was opened while an input was focused (e.g. contact form),
    // release focus so WASD/E typing doesn't leak into the form.
    document.activeElement?.blur?.()
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (popup) setPopup(null)
      else worldStore.setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, popup])

  // Freeze player input while a building popup is open
  useEffect(() => {
    worldRuntime.paused = Boolean(popup)
  }, [popup])

  const enterWorld = useCallback(() => {
    document.activeElement?.blur?.()
    setEntered(true)
  }, [])

  // Entering a building shows an in-world popup (the world keeps running behind)
  const enterBuilding = useCallback((building) => {
    setPopup(building)
  }, [])

  const openFullSection = useCallback((target) => {
    setPopup(null)
    worldRuntime.paused = false
    worldStore.setOpen(false)
    // Let the overlay close & body scroll unlock before smooth scrolling
    window.setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }, [])

  const jump = useCallback((e) => {
    e.preventDefault()
    worldRuntime.jumpQueued = true
  }, [])

  if (!isOpen) return null

  const content = popup ? sectionContent[popup.id] : null

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0b0f19] overscroll-none touch-manipulation"
      role="dialog"
      aria-modal="true"
      aria-label="Explore the HEP'S PORTO map"
      onContextMenu={(e) => e.preventDefault()}
    >
      {!entered && <EntryDialog onPlay={enterWorld} />}

      {entered && (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 animate-pulse"
                aria-hidden="true"
              ></div>
              <p className="text-gray-300 font-medium">Loading HEP&apos;S PORTO world</p>
            </div>
          }
        >
          <BlockyWorld onProximity={setNear} onEnter={enterBuilding} />
        </Suspense>
      )}

      {/* Touch joystick zone first, so every control below it stays tappable */}
      {entered && isTouch && <Joystick />}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2.5 bg-gray-900/85 backdrop-blur px-4 py-2.5 rounded-xl border border-gray-700 shadow-lg">
          <FaGamepad className="text-cyan-400" aria-hidden="true" />
          <span className="font-bold text-white tracking-wide">HEP&apos;S PORTO</span>
          <span className="text-gray-400 text-sm hidden sm:inline">· Blocky World</span>
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
      {entered && !isTouch && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/85 backdrop-blur px-5 py-2.5 rounded-full border border-gray-700 text-gray-300 text-sm pointer-events-none">
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">W A S D</kbd> walk
          <span className="mx-2 text-gray-600">·</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">Shift</kbd> run
          <span className="mx-2 text-gray-600">·</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">Space</kbd> jump
          <span className="mx-2 text-gray-600">·</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">E</kbd> enter building
          <span className="mx-2 text-gray-600">·</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-white">ESC</kbd> close
        </div>
      )}

      {/* Enter building prompt */}
      {entered && near && !popup && (
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 animate-bounce z-10">
          {isTouch ? (
            <button
              onClick={() => enterBuilding(near)}
              className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold shadow-lg shadow-cyan-500/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200"
            >
              Enter {near.label}
            </button>
          ) : (
            <div className="px-6 py-3 rounded-full bg-gray-900/90 backdrop-blur border border-cyan-500/60 text-white font-medium shadow-lg pointer-events-none">
              Press <kbd className="px-1.5 py-0.5 mx-1 bg-cyan-500 text-gray-900 rounded text-sm font-bold">E</kbd> to enter {near.label}
            </div>
          )}
        </div>
      )}

      {/* Mobile jump button */}
      {entered && isTouch && (
        <button
          onPointerDown={jump}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="Jump"
          className="absolute bottom-10 right-6 w-20 h-20 rounded-full bg-cyan-500/90 hover:bg-cyan-400 active:scale-95 text-gray-900 shadow-lg shadow-cyan-500/40 border-4 border-white/30 flex flex-col items-center justify-center gap-0.5 touch-none select-none transition-transform"
        >
          <FaArrowUp aria-hidden="true" />
          <span className="text-[10px] tracking-widest uppercase font-bold">Jump</span>
        </button>
      )}

      {/* Section popup, stays inside the world */}
      {entered && popup && content && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setPopup(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[82%] overflow-y-auto overscroll-contain bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${popup.label} section`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-700 px-6 py-4 flex items-start justify-between gap-4">
              <div>
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-gray-900 text-xs font-bold uppercase tracking-wide mb-1.5"
                  style={{ backgroundColor: popup.color }}
                >
                  {popup.label}
                </span>
                <h3 className="text-white font-bold text-xl leading-tight">{content.title}</h3>
                {content.subtitle && (
                  <p className="text-gray-400 text-sm mt-0.5">{content.subtitle}</p>
                )}
              </div>
              <button
                onClick={() => setPopup(null)}
                aria-label="Close popup and keep exploring"
                className="shrink-0 w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <div className="px-6 py-4">
              <ul className="space-y-2.5">
                {content.points.map((p, i) => (
                  <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-2.5">
                    <span
                      className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: popup.color }}
                      aria-hidden="true"
                    ></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {content.links && content.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {content.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-sm font-medium transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <button
                  onClick={() => setPopup(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400"
                >
                  Keep exploring
                </button>
                <button
                  onClick={() => openFullSection(popup.target)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200"
                >
                  Open full section
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorldLauncher
