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

// Decorative blocky trees around town
export const trees = [
  { x: -18, z: -22 },
  { x: 20, z: -24 },
  { x: -22, z: 12 },
  { x: 22, z: 8 },
  { x: -50, z: 40 },
  { x: 50, z: 38 },
  { x: -50, z: -38 },
  { x: 50, z: -40 },
]
