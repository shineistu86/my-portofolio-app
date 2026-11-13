import * as THREE from 'three'

/** Procedural stud texture for the classic blocky baseplate feel. */
export function makeStudsTexture(repeat = 70) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Baseplate grey
  ctx.fillStyle = '#6d7b8f'
  ctx.fillRect(0, 0, size, size)

  // One stud per tile, centered
  const cx = size / 2
  const r = size * 0.28
  ctx.beginPath()
  ctx.arc(cx, cx, r, 0, Math.PI * 2)
  ctx.fillStyle = '#7d8b9f'
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = '#5d6b80'
  ctx.stroke()

  // Subtle top-left highlight
  ctx.beginPath()
  ctx.arc(cx - 2, cx - 2, r * 0.55, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeat, repeat)
  return texture
}

/** Classic smiley face drawn on yellow — front side of the avatar head. */
export function makeFaceTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f5cd30'
  ctx.fillRect(0, 0, size, size)

  // Eyes
  ctx.fillStyle = '#3c3c3c'
  ctx.beginPath()
  ctx.arc(size * 0.36, size * 0.4, 7, 0, Math.PI * 2)
  ctx.arc(size * 0.64, size * 0.4, 7, 0, Math.PI * 2)
  ctx.fill()

  // Smile
  ctx.strokeStyle = '#3c3c3c'
  ctx.lineWidth = 6
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(size * 0.5, size * 0.52, size * 0.18, Math.PI * 0.15, Math.PI * 0.85)
  ctx.stroke()

  return new THREE.CanvasTexture(canvas)
}

/** Rounded sign texture for building labels. */
export function makeLabelTexture(text, bg = '#1f2937', fg = '#ffffff', accent = '#38bdf8') {
  const w = 512
  const h = 128
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')

  const r = 26
  ctx.beginPath()
  ctx.moveTo(r, 8)
  ctx.lineTo(w - r, 8)
  ctx.quadraticCurveTo(w - 8, 8, w - 8, 8 + r)
  ctx.lineTo(w - 8, h - r)
  ctx.quadraticCurveTo(w - 8, h - 8, w - r, h - 8)
  ctx.lineTo(r, h - 8)
  ctx.quadraticCurveTo(8, h - 8, 8, h - r)
  ctx.lineTo(8, 8 + r)
  ctx.quadraticCurveTo(8, 8, r, 8)
  ctx.closePath()
  ctx.fillStyle = bg
  ctx.fill()
  ctx.lineWidth = 5
  ctx.strokeStyle = accent
  ctx.stroke()

  ctx.fillStyle = fg
  ctx.font = '700 54px Arial, Helvetica, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text.toUpperCase(), w / 2, h / 2 + 4)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
