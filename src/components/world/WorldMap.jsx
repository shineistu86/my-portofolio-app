import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { buildings, trees, flowers, bushes, clouds, WORLD_SIZE } from './worldConfig'
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

function Tree({ x, z, s = 1 }) {
  return (
    <group position={[x, 0, z]} scale={s}>
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

function Flower({ x, z, color }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.24, 1, 0.24]} />
        <meshLambertMaterial color="#3e8f34" />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[0.7, 0.5, 0.7]} />
        <meshLambertMaterial color={color} />
      </mesh>
    </group>
  )
}

function Bush({ x, z, s = 1 }) {
  return (
    <group position={[x, 0, z]} scale={[s, s * 0.8, s]}>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2, 1.6, 2]} />
        <meshLambertMaterial color="#3c8f3c" />
      </mesh>
      <mesh position={[0.7, 1.3, 0.4]}>
        <boxGeometry args={[1.1, 1, 1.1]} />
        <meshLambertMaterial color="#4aa54a" />
      </mesh>
    </group>
  )
}

function Clouds() {
  const ref = useRef()
  const wrap = WORLD_SIZE / 2 + 24

  useFrame((_, dt) => {
    if (!ref.current) return
    for (const c of ref.current.children) {
      c.position.x += c.userData.speed * dt
      if (c.position.x > wrap) c.position.x = -wrap
    }
  })

  return (
    <group ref={ref}>
      {clouds.map((c, i) => (
        <group key={i} position={[c.x, c.y, c.z]} userData={{ speed: c.speed }}>
          <mesh>
            <boxGeometry args={[8 * c.scale, 2.4 * c.scale, 4 * c.scale]} />
            <meshLambertMaterial color="#ffffff" />
          </mesh>
          <mesh position={[2.6 * c.scale, 1.6 * c.scale, 0]}>
            <boxGeometry args={[4 * c.scale, 2 * c.scale, 3 * c.scale]} />
            <meshLambertMaterial color="#f3f7fb" />
          </mesh>
        </group>
      ))}
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

      {/* Border hedge walls */}
      <mesh position={[0, 1, -WORLD_SIZE / 2]}>
        <boxGeometry args={[WORLD_SIZE, 2, 1]} />
        <meshLambertMaterial color="#3f7a33" />
      </mesh>
      <mesh position={[0, 1, WORLD_SIZE / 2]}>
        <boxGeometry args={[WORLD_SIZE, 2, 1]} />
        <meshLambertMaterial color="#3f7a33" />
      </mesh>
      <mesh position={[-WORLD_SIZE / 2, 1, 0]}>
        <boxGeometry args={[1, 2, WORLD_SIZE]} />
        <meshLambertMaterial color="#3f7a33" />
      </mesh>
      <mesh position={[WORLD_SIZE / 2, 1, 0]}>
        <boxGeometry args={[1, 2, WORLD_SIZE]} />
        <meshLambertMaterial color="#3f7a33" />
      </mesh>

      {/* Buildings & decorations */}
      {buildings.map((b) => (
        <Building key={b.id} b={b} />
      ))}
      {trees.map((t) => (
        <Tree key={`${t.x}-${t.z}`} x={t.x} z={t.z} s={t.s} />
      ))}
      {bushes.map((b) => (
        <Bush key={`${b.x}-${b.z}`} x={b.x} z={b.z} s={b.s} />
      ))}
      {flowers.map((f) => (
        <Flower key={`${f.x}-${f.z}`} x={f.x} z={f.z} color={f.color} />
      ))}

      {/* Drifting blocky clouds */}
      <Clouds />
    </group>
  )
}

export default WorldMap
