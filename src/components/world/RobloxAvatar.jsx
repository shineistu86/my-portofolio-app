import { useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { makeLabelTexture, prefersReducedMotion } from './textures'

/**
 * Billboard avatar using the player's real Roblox avatar render
 * (fetched through /api/roblox-avatar). Always faces the camera,
 * flips horizontally when walking left, wiggles while moving.
 * A floating name tag shows the Roblox display name.
 * `motion` is a shared ref: { speed, dirX }.
 */
function RobloxAvatar({ motion, src, name }) {
  const group = useRef()
  const texture = useLoader(THREE.TextureLoader, src)
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const facing = useRef(1)
  const nameTag = useMemo(
    () => (name ? makeLabelTexture(name, '#111827', '#ffffff', '#38bdf8') : null),
    [name]
  )

  useFrame((state) => {
    if (!group.current) return
    const speed = motion.current?.speed ?? 0
    const dirX = motion.current?.dirX ?? 0
    const t = state.clock.elapsedTime

    // Face the direction of travel (camera looks down -Z, so left = flip)
    if (dirX < -0.6) facing.current = -1
    else if (dirX > 0.6) facing.current = 1
    group.current.scale.x = facing.current

    if (!reduced) {
      group.current.rotation.z = Math.sin(t * 10) * 0.05 * speed
      group.current.position.y = Math.abs(Math.sin(t * 10)) * 0.18 * speed
    }
  })

  return (
    <group>
      <group ref={group}>
        <mesh position={[0, 3.5, 0]}>
          <planeGeometry args={[6.4, 7]} />
          <meshBasicMaterial map={texture} alphaTest={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {nameTag && (
        <sprite position={[0, 7.8, 0]} scale={[9, 2.25, 1]}>
          <spriteMaterial map={nameTag} />
        </sprite>
      )}
    </group>
  )
}

export default RobloxAvatar
