import { Component, Suspense, useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import AvatarR6 from './AvatarR6'
import RobloxAvatar from './RobloxAvatar'
import { useKeyboard } from './usePlayerControls'
import { buildings, WORLD_SIZE, WORLD_MARGIN, PLAYER_RADIUS } from './worldConfig'
import { worldRuntime, worldAvatar } from './worldStore'
import { prefersReducedMotion } from './textures'

const WALK_SPEED = 11
const RUN_SPEED = 19
const GRAVITY = -60
const JUMP_VELOCITY = 21

// If the Roblox avatar render fails to load mid-session, fall back to blocky.
class AvatarBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function dampAngle(current, target, lambda, dt) {
  let diff = (target - current) % (Math.PI * 2)
  if (diff > Math.PI) diff -= Math.PI * 2
  if (diff < -Math.PI) diff += Math.PI * 2
  return current + diff * Math.min(1, lambda * dt)
}

function Player({ onProximity, onEnter }) {
  const group = useRef()
  const motion = useRef({ speed: 0, dirX: 0 })
  const keys = useKeyboard()
  const vel = useRef(new THREE.Vector3())
  const yaw = useRef(Math.PI)
  const lastNear = useRef(null)
  const jumpY = useRef(0)
  const jumpVel = useRef(0)
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const avatar = useMemo(() => worldAvatar.current, [])

  const tmp = useMemo(
    () => ({ input: new THREE.Vector3(), target: new THREE.Vector3(), camPos: new THREE.Vector3() }),
    []
  )

  // Enter building with E / Enter (ignored while a popup is open)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.code === 'KeyE' || e.code === 'Enter') && lastNear.current && !worldRuntime.paused) {
        onEnter?.(lastNear.current)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onEnter])

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    if (!group.current) return
    const pos = group.current.position

    // ----- input: keyboard + virtual joystick (frozen while a popup is open) -----
    const k = keys.current
    let ix = (k.right ? 1 : 0) - (k.left ? 1 : 0)
    let iz = (k.down ? 1 : 0) - (k.up ? 1 : 0)
    if (worldRuntime.paused) {
      ix = 0
      iz = 0
    }
    const jx = worldRuntime.joy.x
    const jy = worldRuntime.joy.y
    const joyMag = Math.hypot(jx, jy)
    if (!worldRuntime.paused && joyMag > 0.15) {
      ix = jx
      iz = -jy
    }

    tmp.input.set(ix, 0, iz)
    const moving = tmp.input.lengthSq() > 0.01
    if (moving) tmp.input.normalize()

    // ----- run (Shift, or joystick pushed fully) -----
    const running = moving && (k.run || joyMag > 0.85)
    const maxSpeed = running ? RUN_SPEED : WALK_SPEED

    // ----- velocity with accel/decel -----
    tmp.target.copy(tmp.input).multiplyScalar(maxSpeed)
    vel.current.lerp(tmp.target, Math.min(1, dt * (moving ? 9 : 13)))

    pos.x += vel.current.x * dt
    pos.z += vel.current.z * dt

    // ----- jump (Space, or the on-screen jump button) -----
    if (worldRuntime.jumpQueued) {
      worldRuntime.jumpQueued = false
      if (!worldRuntime.paused && jumpY.current <= 0.001) jumpVel.current = JUMP_VELOCITY
    }
    if (jumpY.current > 0 || jumpVel.current > 0) {
      jumpVel.current += GRAVITY * dt
      jumpY.current += jumpVel.current * dt
      if (jumpY.current <= 0) {
        jumpY.current = 0
        jumpVel.current = 0
      }
    }
    pos.y = jumpY.current

    // ----- world bounds -----
    const lim = WORLD_SIZE / 2 - WORLD_MARGIN
    pos.x = THREE.MathUtils.clamp(pos.x, -lim, lim)
    pos.z = THREE.MathUtils.clamp(pos.z, -lim, lim)

    // ----- collisions with buildings (circle vs AABB) -----
    for (const b of buildings) {
      const cx = THREE.MathUtils.clamp(pos.x, b.x - b.w / 2, b.x + b.w / 2)
      const cz = THREE.MathUtils.clamp(pos.z, b.z - b.d / 2, b.z + b.d / 2)
      let dx = pos.x - cx
      let dz = pos.z - cz
      const d2 = dx * dx + dz * dz
      if (d2 < PLAYER_RADIUS * PLAYER_RADIUS) {
        let d = Math.sqrt(d2)
        if (d < 0.0001) {
          dx = 1
          dz = 0
          d = 1
        }
        const push = PLAYER_RADIUS - Math.sqrt(d2) + 0.02
        pos.x += (dx / d) * push
        pos.z += (dz / d) * push
      }
    }

    // ----- facing & walk cycle speed -----
    const speed = vel.current.length()
    motion.current.speed = Math.min(1, speed / RUN_SPEED)
    motion.current.dirX = vel.current.x
    worldRuntime.speed = motion.current.speed

    if (speed > 0.6) {
      const targetYaw = Math.atan2(vel.current.x, vel.current.z)
      yaw.current = dampAngle(yaw.current, targetYaw, 12, dt)
      group.current.rotation.y = yaw.current
    }

    // ----- proximity to buildings -----
    let nearBuilding = null
    for (const b of buildings) {
      const reach = Math.max(b.w, b.d) / 2 + 5
      if (Math.hypot(pos.x - b.x, pos.z - b.z) < reach) {
        nearBuilding = b
        break
      }
    }
    if ((nearBuilding?.id ?? null) !== (lastNear.current?.id ?? null)) {
      lastNear.current = nearBuilding
      worldRuntime.nearId = nearBuilding?.id ?? null
      onProximity?.(nearBuilding)
    }

    // ----- follow camera -----
    const cam = state.camera
    tmp.camPos.set(pos.x, pos.y + 24, pos.z + 28)
    if (reduced) {
      cam.position.copy(tmp.camPos)
    } else {
      cam.position.lerp(tmp.camPos, Math.min(1, dt * 5))
    }
    cam.lookAt(pos.x, 3, pos.z)
  })

  return (
    <group ref={group} position={[0, 0, -14]}>
      {avatar.type === 'roblox' ? (
        <AvatarBoundary key={avatar.url} fallback={<AvatarR6 motion={motion} />}>
          <Suspense fallback={null}>
            <RobloxAvatar motion={motion} src={avatar.url} name={avatar.displayName} />
          </Suspense>
        </AvatarBoundary>
      ) : (
        <AvatarR6 motion={motion} />
      )}
      {/* Blob shadow (stays on the ground) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.09, 0]}>
        <circleGeometry args={[2, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

export default Player
