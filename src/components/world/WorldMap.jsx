import { useLayoutEffect, useMemo, useRef } from 'react'
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

// All trees, bushes and flowers share one InstancedMesh (one draw call),
// which keeps mobile GPUs happy. Each instance is a unit box scaled per part.
function Decorations() {
  const ref = useRef()
  const tmp = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      q: new THREE.Quaternion(),
      p: new THREE.Vector3(),
      s: new THREE.Vector3(),
      c: new THREE.Color(),
    }),
    []
  )

  const instances = useMemo(() => {
    const list = []
    const push = (x, y, z, sx, sy, sz, color) => list.push({ x, y, z, sx, sy, sz, color })
    for (const t of trees) {
      const s = t.s ?? 1
      push(t.x, 2 * s, t.z, 1.6 * s, 4 * s, 1.6 * s, '#8b5a2b')
      push(t.x, 6.5 * s, t.z, 5 * s, 4 * s, 5 * s, '#3f9e4f')
      push(t.x, 9.5 * s, t.z, 3 * s, 2.4 * s, 3 * s, '#4fb862')
    }
    for (const b of bushes) {
      const s = b.s ?? 1
      push(b.x, 0.64 * s, b.z, 2 * s, 1.28 * s, 2 * s, '#3c8f3c')
      push(b.x + 0.7 * s, 1.04 * s, b.z + 0.4 * s, 1.1 * s, 0.8 * s, 1.1 * s, '#4aa54a')
    }
    for (const f of flowers) {
      push(f.x, 0.5, f.z, 0.24, 1, 0.24, '#3e8f34')
      push(f.x, 1.15, f.z, 0.7, 0.5, 0.7, f.color)
    }
    return list
  }, [])

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    instances.forEach((it, i) => {
      tmp.p.set(it.x, it.y, it.z)
      tmp.s.set(it.sx, it.sy, it.sz)
      tmp.m.compose(tmp.p, tmp.q, tmp.s)
      mesh.setMatrixAt(i, tmp.m)
      mesh.setColorAt(i, tmp.c.set(it.color))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [instances, tmp])

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, instances.length]}
      frustumCulled={false}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial />
    </instancedMesh>
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
      <Decorations />

      {/* Drifting blocky clouds */}
      <Clouds />
    </group>
  )
}

export default WorldMap
