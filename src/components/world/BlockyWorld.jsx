import { Canvas } from '@react-three/fiber'
import WorldMap from './WorldMap'
import Player from './Player'

function BlockyWorld({ onProximity, onEnter }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 26, 40], fov: 45 }} gl={{ antialias: true }}>
      <color attach="background" args={['#8fc7ee']} />
      <fog attach="fog" args={['#8fc7ee', 80, 200]} />
      <hemisphereLight args={['#ffffff', '#6b8ba4', 1.0]} />
      <directionalLight position={[40, 60, 30]} intensity={1.2} />
      <WorldMap />
      <Player onProximity={onProximity} onEnter={onEnter} />
    </Canvas>
  )
}

export default BlockyWorld
