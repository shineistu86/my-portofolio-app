import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { makeFaceTexture, prefersReducedMotion } from './textures'

const YELLOW = '#f5cd30'
const BLUE = '#0d69ac'
const GREEN = '#4b974b'

/**
 * Procedural blocky avatar (classic 6-part rig proportions):
 * head + torso + 2 arms + 2 legs, built from box primitives only.
 * `motion` is a shared ref: { speed: 0..1 } driving the walk cycle.
 */
function AvatarR6({ motion }) {
  const rootRef = useRef()
  const leftArm = useRef()
  const rightArm = useRef()
  const leftLeg = useRef()
  const rightLeg = useRef()

  const face = useMemo(() => makeFaceTexture(), [])
  const reduced = useMemo(() => prefersReducedMotion(), [])

  const headMaterials = useMemo(() => {
    const plain = new THREE.MeshLambertMaterial({ color: YELLOW })
    const front = new THREE.MeshLambertMaterial({ map: face })
    // material order: +x, -x, +y, -y, +z (front), -z
    return [plain, plain, plain, plain, front, plain]
  }, [face])

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
        <meshLambertMaterial color={BLUE} />
      </mesh>

      {/* Head with smiley face on the front */}
      <mesh position={[0, 4.75, 0]} material={headMaterials}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
      </mesh>

      {/* Arms â€” pivot at the shoulder */}
      <group ref={leftArm} position={[-1.5, 3.95, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={YELLOW} />
        </mesh>
      </group>
      <group ref={rightArm} position={[1.5, 3.95, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={YELLOW} />
        </mesh>
      </group>

      {/* Legs â€” pivot at the hip */}
      <group ref={leftLeg} position={[-0.5, 2, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={GREEN} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.5, 2, 0]}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={GREEN} />
        </mesh>
      </group>
    </group>
  )
}

export default AvatarR6
