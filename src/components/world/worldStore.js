// Tiny pub/sub store so any component (Navbar, Home, WorldLauncher)
// can open/close the blocky world without prop drilling.
const listeners = new Set()

export const worldStore = {
  open: false,
  setOpen(value) {
    const next = typeof value === 'boolean' ? value : !worldStore.open
    if (next === worldStore.open) return
    worldStore.open = next
    listeners.forEach((fn) => fn(next))
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}

// Runtime state shared between canvas systems (no React re-renders)
export const worldRuntime = {
  nearId: null,
  speed: 0,
  joy: { x: 0, y: 0 },
  jumpQueued: false,
  paused: false,
}

// Avatar chosen at the entry screen: { type: 'blocky' }
// or { type: 'roblox', url, displayName }
export const worldAvatar = {
  current: { type: 'blocky' },
  set(value) {
    worldAvatar.current = value
  },
}
