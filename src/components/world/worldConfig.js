// Map layout: each building is a portfolio section.
// Coordinates are in world units; the baseplate is WORLD_SIZE x WORLD_SIZE.
export const WORLD_SIZE = 130
export const WORLD_MARGIN = 4
export const PLAYER_RADIUS = 1.8

export const buildings = [
  {
    id: 'home',
    label: 'Home',
    target: '#home',
    x: 0,
    z: -34,
    w: 18,
    d: 12,
    h: 10,
    color: '#38bdf8',
  },
  {
    id: 'education',
    label: 'Education',
    target: '#education',
    x: -38,
    z: -10,
    w: 14,
    d: 12,
    h: 8,
    color: '#a78bfa',
  },
  {
    id: 'experience',
    label: 'Experience',
    target: '#experience',
    x: -38,
    z: 22,
    w: 16,
    d: 12,
    h: 12,
    color: '#60a5fa',
  },
  {
    id: 'skills',
    label: 'Skills',
    target: '#skills',
    x: 0,
    z: 30,
    w: 14,
    d: 12,
    h: 9,
    color: '#4ade80',
  },
  {
    id: 'projects',
    label: 'Projects',
    target: '#projects',
    x: 38,
    z: 18,
    w: 20,
    d: 14,
    h: 12,
    color: '#fb7185',
  },
  {
    id: 'achievements',
    label: 'Awards',
    target: '#achievements',
    x: 38,
    z: -16,
    w: 14,
    d: 12,
    h: 8,
    color: '#facc15',
  },
  {
    id: 'contact',
    label: 'Contact',
    target: '#contact',
    x: 0,
    z: 2,
    w: 12,
    d: 12,
    h: 7,
    color: '#f472b6',
  },
]

// Decorative blocky trees around town: hand-placed landmarks + scattered fill
function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Deterministic RNG so the town layout looks identical on every visit.
const rand = mulberry32(20261113)

const ROAD_HALF = 3.5
const ROAD_ZS = [-12, 26]

function clearOfLayout(x, z, pad) {
  if (Math.abs(x) < ROAD_HALF + pad) return false
  for (const rz of ROAD_ZS) {
    if (Math.abs(z - rz) < ROAD_HALF + pad) return false
  }
  for (const b of buildings) {
    if (Math.abs(x - b.x) < b.w / 2 + pad && Math.abs(z - b.z) < b.d / 2 + pad) {
      return false
    }
  }
  return true
}

function scatter(count, pad, minDist) {
  const placed = []
  const lim = WORLD_SIZE / 2 - WORLD_MARGIN - 1
  let guard = 0
  while (placed.length < count && guard < count * 50) {
    guard += 1
    const x = (rand() * 2 - 1) * lim
    const z = (rand() * 2 - 1) * lim
    if (!clearOfLayout(x, z, pad)) continue
    if (placed.some((p) => Math.hypot(p.x - x, p.z - z) < minDist)) continue
    placed.push({ x, z })
  }
  return placed
}

export const trees = [
  { x: -18, z: -22 },
  { x: 20, z: -24 },
  { x: -22, z: 12 },
  { x: 22, z: 8 },
  { x: -50, z: 40 },
  { x: 50, z: 38 },
  { x: -50, z: -38 },
  { x: 50, z: -40 },
  ...scatter(14, 3, 6).map((p) => ({ ...p, s: 0.75 + rand() * 0.55 })),
]

const FLOWER_COLORS = ['#f472b6', '#facc15', '#fb7185', '#e0f2fe', '#c084fc']

export const flowers = scatter(46, 1.2, 2.5).map((p) => ({
  ...p,
  color: FLOWER_COLORS[Math.floor(rand() * FLOWER_COLORS.length)],
}))

export const bushes = scatter(26, 2, 5).map((p) => ({ ...p, s: 0.8 + rand() * 0.8 }))

// Blocky clouds drifting overhead (wrapped around in WorldMap)
export const clouds = Array.from({ length: 10 }, () => ({
  x: (rand() * 2 - 1) * (WORLD_SIZE / 2 + 10),
  y: 34 + rand() * 20,
  z: (rand() * 2 - 1) * (WORLD_SIZE / 2),
  speed: 0.8 + rand() * 1.4,
  scale: 0.8 + rand(),
}))
