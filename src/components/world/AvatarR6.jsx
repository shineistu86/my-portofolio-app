import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { makeFaceTexture, makeLabelTexture, prefersReducedMotion } from './textures'

const DEFAULT_COLORS = { head: '#f5cd30', torso: '#0d69ac', arms: '#f5cd30', legs: '#4b974b' }

/**
 * Procedural blocky avatar (classic 6-part rig proportions):
 * head + torso + 2 arms + 2 legs, built from box primitives only.
 * `colors` recolors the rig (sampled from a Roblox avatar render),
 * `name` adds a floating name tag. `motion` is a shared ref: { speed }.
 */
function AvatarR6({ motion, name, colors = {} }) {
  const rootRef = useRef()
  const leftArm = useRef()
  const rightArm = useRef()
  const leftLeg = useRef()
  const rightLeg = useRef()

  const headColor = colors.head ?? DEFAULT_COLORS.head
  const torsoColor = colors.torso ?? DEFAULT_COLORS.torso
  const armsColor = colors.arms ?? DEFAULT_COLORS.arms
  const legsColor = colors.legs ?? DEFAULT_COLORS.legs

  const face = useMemo(() => makeFaceTexture(), [])
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const nameTag = useMemo(
    () => (name ? makeLabelTexture(name, '#111827', '#ffffff', '#38bdf8') : null),
    [name]
  )

  const headMaterials = useMemo(() => {
    const plain = new THREE.MeshLambertMaterial({ color: headColor })
    const front = new THREE.MeshLambertMaterial({ map: face })
    // material order: +x, -x, +y, -y, +z (front), -z
    return [plain, plain, plain, plain, front, plain]
  }, [face, headColor])

  useFrame((state) => {
    const speed = motion.current?.speed ?? 0
    const t = state.clock.elapsedTime
    const amp = reduced ? speed * 0.15 : speed * 0.85
    // Legs & arms swing faster while running
    const swing = Math.sin(t * (8 + 7 * speed)) * amp

    if (leftArm.current) leftArm.current.rotation.x = swing
    if (rightArm.current) rightArm.current.rotation.x = -swing
    if (leftLeg.current) leftLeg.current.rotation.x = -swing
    if (rightLeg.current) rightLeg.current.rotation.x = swing

    if (rootRef.current && !reduced) {
      rootRef.current.position.y = Math.abs(Math.sin(t * (8 + 7 * speed))) * 0.22 * speed
    }
  })

  return (
    <group ref={rootRef}>
      {/* Torso */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[2, 2, 1]} />
        <meshLambertMaterial color={torsoColor} />
      </mesh>

      {/* Head with smiley face on the front */}
      <mesh position={[0, 4.75, 0]} material={headMaterials}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
      </mesh>

      {/* Arms, pivot at the shoulder */}
      <group ref={leftArm} position={[-1.5, 3.95, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={armsColor} />
        </mesh>
      </group>
      <group ref={rightArm} position={[1.5, 3.95, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={armsColor} />
        </mesh>
      </group>

      {/* Legs, pivot at the hip */}
      <group ref={leftLeg} position={[-0.5, 2, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={legsColor} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.5, 2, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={legsColor} />
        </mesh>
      </group>

      {/* Floating name tag (always faces the camera) */}
      {nameTag && (
        <sprite position={[0, 6.9, 0]} scale={[9, 2.25, 1]}>
          <spriteMaterial map={nameTag} />
        </sprite>
      )}
    </group>
  )
}

export default AvatarR6
