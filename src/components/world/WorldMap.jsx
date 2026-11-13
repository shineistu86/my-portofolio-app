import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { buildings, trees, WORLD_SIZE } from './worldConfig'
import { makeLabelTexture, makeStudsTexture } from './textures'
import { worldRuntime } from './worldStore'

function Building({ b }) {
  const bodyRef = useRef()

  const label = useMemo(
    () => makeLabelTexture(b.label, '#111827', '#ffffff', b.color),
    [b.label, b.color]
  )

  useFrame((_, dt) => {
    const mesh = bodyRef.current
    if (!mesh) return
    const target = worldRuntime.nearId === b.id ? 0.5 : 0
    mesh.material.emissiveIntensity = THREE.MathUtils.lerp(
      mesh.material.emissiveIntensity,
      target,
      Math.min(1, dt * 8)
    )
  })

  const darker = useMemo(() => new THREE.Color(b.color).multiplyScalar(0.55), [b.color])

  return (
    <group position={[b.x, 0, b.z]}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, b.h / 2, 0]} castShadow>
        <boxGeometry args={[b.w, b.h, b.d]} />
        <meshLambertMaterial color={b.color} emissive={b.color} emissiveIntensity={0} />
      </mesh>

      {/* Roof slab */}
      <mesh position={[0, b.h + 0.5, 0]}>
        <boxGeometry args={[b.w + 1.2, 1, b.d + 1.2]} />
        <meshLambertMaterial color={darker} />
      </mesh>

      {/* Door (front face) */}
      <mesh position={[0, 2, b.d / 2 + 0.15]}>
        <boxGeometry args={[3.4, 4, 0.3]} />
        <meshLambertMaterial color="#1f2937" />
      </mesh>

      {/* Windows */}
      <mesh position={[-b.w / 4, b.h * 0.62, b.d / 2 + 0.12]}>
        <boxGeometry args={[2.4, 2.4, 0.25]} />
        <meshLambertMaterial color="#dbeafe" emissive="#93c5fd" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[b.w / 4, b.h * 0.62, b.d / 2 + 0.12]}>
        <boxGeometry args={[2.4, 2.4, 0.25]} />
        <meshLambertMaterial color="#dbeafe" emissive="#93c5fd" emissiveIntensity={0.35} />
      </mesh>

      {/* Floating label */}
      <sprite position={[0, b.h + 4.5, 0]} scale={[10, 2.5, 1]}>
        <spriteMaterial map={label} />
      </sprite>
    </group>
  )
}

function Tree({ x, z }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[1.6, 4, 1.6]} />
        <meshLambertMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[0, 6.5, 0]}>
        <boxGeometry args={[5, 4, 5]} />
        <meshLambertMaterial color="#3f9e4f" />
      </mesh>
      <mesh position={[0, 9.5, 0]}>
        <boxGeometry args={[3, 2.4, 3]} />
        <meshLambertMaterial color="#4fb862" />
      </mesh>
    </group>
  )
}

function WorldMap() {
  const studs = useMemo(() => makeStudsTexture(WORLD_SIZE / 2), [])

  return (
    <group>
      {/* Baseplate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[WORLD_SIZE, WORLD_SIZE]} />
        <meshLambertMaterial map={studs} />
      </mesh>

      {/* Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <planeGeometry args={[7, WORLD_SIZE]} />
        <meshLambertMaterial color="#3f4756" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -12]}>
        <planeGeometry args={[WORLD_SIZE, 7]} />
        <meshLambertMaterial color="#3f4756" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 26]}>
        <planeGeometry args={[WORLD_SIZE, 7]} />
        <meshLambertMaterial color="#3f4756" />
      </mesh>

      {/* Border walls */}
      <mesh position={[0, 1, -WORLD_SIZE / 2]}>
        <boxGeometry args={[WORLD_SIZE, 2, 1]} />
        <meshLambertMaterial color="#5d6b80" />
      </mesh>
      <mesh position={[0, 1, WORLD_SIZE / 2]}>
        <boxGeometry args={[WORLD_SIZE, 2, 1]} />
        <meshLambertMaterial color="#5d6b80" />
      </mesh>
      <mesh position={[-WORLD_SIZE / 2, 1, 0]}>
        <boxGeometry args={[1, 2, WORLD_SIZE]} />
        <meshLambertMaterial color="#5d6b80" />
      </mesh>
      <mesh position={[WORLD_SIZE / 2, 1, 0]}>
        <boxGeometry args={[1, 2, WORLD_SIZE]} />
        <meshLambertMaterial color="#5d6b80" />
      </mesh>

      {/* Buildings & trees */}
      {buildings.map((b) => (
        <Building key={b.id} b={b} />
      ))}
      {trees.map((t) => (
        <Tree key={`${t.x}-${t.z}`} x={t.x} z={t.z} />
      ))}
    </group>
  )
}

export default WorldMap
