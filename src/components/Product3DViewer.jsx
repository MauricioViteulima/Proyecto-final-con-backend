import { Center, Environment, OrbitControls, useFBX } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Model({ type }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.45
  })

  if (type === 'tomatodo' || type === 'botella') {
    return (
      <group ref={ref}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, type === 'botella' ? 0.42 : 0.55, 2.1, 48]} />
          <meshStandardMaterial color="#ff4b00" metalness={0.45} roughness={0.28} />
        </mesh>
        <mesh position={[0, 1.18, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.22, 48]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      </group>
    )
  }

  if (type === 'mochila') {
    return (
      <group ref={ref}>
        <mesh>
          <boxGeometry args={[1.45, 1.8, 0.55]} />
          <meshStandardMaterial color="#20242a" roughness={0.45} />
        </mesh>
        <mesh position={[0, -0.35, 0.31]}>
          <boxGeometry args={[1.1, 0.55, 0.12]} />
          <meshStandardMaterial color="#ff4b00" />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <torusGeometry args={[0.42, 0.04, 12, 40, Math.PI]} />
          <meshStandardMaterial color="#ff9b72" />
        </mesh>
      </group>
    )
  }

  if (type === 'parlante') {
    return (
      <group ref={ref}>
        <mesh>
          <boxGeometry args={[1.8, 1, 0.75]} />
          <meshStandardMaterial color="#171a1a" />
        </mesh>
        <mesh position={[-0.45, 0, 0.4]}>
          <cylinderGeometry args={[0.28, 0.28, 0.08, 48]} />
          <meshStandardMaterial color="#ff4b00" />
        </mesh>
        <mesh position={[0.45, 0, 0.4]}>
          <cylinderGeometry args={[0.28, 0.28, 0.08, 48]} />
          <meshStandardMaterial color="#ff4b00" />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1.5, 1, 1.1]} />
        <meshStandardMaterial color="#ff4b00" />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.62, 0.12, 1.2]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  )
}

function FbxModel({ url, scale = 0.02, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const object = useFBX(url)
  const ref = useRef()

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <Center>
        <primitive object={object} scale={scale} />
      </Center>
    </group>
  )
}

export default function Product3DViewer({ modelType, modelUrl, modelScale, modelPosition, modelRotation }) {
  return (
    <div className="h-[320px] overflow-hidden rounded-lg border border-white/10 bg-[#111313]">
      <Canvas camera={{ position: [0, 1.2, 4], fov: 42 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={2.3} />
        {modelUrl ? (
          <FbxModel url={modelUrl} scale={modelScale} position={modelPosition} rotation={modelRotation} />
        ) : (
          <Model type={modelType} />
        )}
        <Environment preset="city" />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
