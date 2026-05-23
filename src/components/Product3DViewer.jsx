import { Center, OrbitControls, useFBX, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Component, Suspense, useEffect, useRef, useState } from 'react'

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
    <group ref={ref} rotation={rotation}>
      <Center position={position}>
        <primitive object={object} scale={scale} />
      </Center>
    </group>
  )
}

function GltfModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url)
  const ref = useRef()

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35
  })

  return (
    <group ref={ref} rotation={rotation}>
      <Center position={position}>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  )
}

function UrlModel(props) {
  const extension = props.url.split('?')[0].split('.').pop()?.toLowerCase()

  if (extension === 'gltf' || extension === 'glb') {
    return <GltfModel {...props} />
  }

  return <FbxModel {...props} />
}

function LoadingModel() {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.025, 12, 64]} />
        <meshStandardMaterial color="#ff4b00" roughness={0.3} />
      </mesh>
    </group>
  )
}

async function checkModelUrl(url) {
  const response = await fetch(url)
  if (!response.ok) return false

  const extension = url.split('?')[0].split('.').pop()?.toLowerCase()
  if (extension !== 'gltf') return true

  const gltf = await response.json()
  const dependencies = [
    ...(gltf.buffers ?? []).map((buffer) => buffer.uri),
    ...(gltf.images ?? []).map((image) => image.uri),
  ].filter((uri) => uri && !uri.startsWith('data:') && !/^https?:\/\//i.test(uri))

  const baseUrl = new URL(url, window.location.origin)
  const checks = dependencies.map(async (dependency) => {
    const dependencyUrl = new URL(dependency, baseUrl)
    const dependencyResponse = await fetch(dependencyUrl)
    return dependencyResponse.ok
  })

  return (await Promise.all(checks)).every(Boolean)
}

function ModelContent({ modelType, modelUrl, modelScale, modelPosition, modelRotation }) {
  const [modelStatus, setModelStatus] = useState({ url: null, canLoad: false })

  useEffect(() => {
    let ignore = false

    if (!modelUrl) return undefined

    checkModelUrl(modelUrl)
      .then((isReady) => {
        if (!ignore) setModelStatus({ url: modelUrl, canLoad: isReady })
      })
      .catch(() => {
        if (!ignore) setModelStatus({ url: modelUrl, canLoad: false })
      })

    return () => {
      ignore = true
    }
  }, [modelUrl])

  const isCurrentModelChecked = modelStatus.url === modelUrl
  const canLoadModel = isCurrentModelChecked && modelStatus.canLoad

  if (!modelUrl) return <Model type={modelType} />
  if (!isCurrentModelChecked) return <LoadingModel />
  if (!canLoadModel) return <Model type={modelType} />

  return <UrlModel url={modelUrl} scale={modelScale} position={modelPosition} rotation={modelRotation} />
}

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false })
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback

    return this.props.children
  }
}

export default function Product3DViewer({ modelType, modelUrl, modelScale, modelPosition, modelRotation }) {
  return (
    <div className="h-[320px] overflow-hidden rounded-lg border border-white/10 bg-[#111313]">
      <Canvas camera={{ position: [0, 1.2, 4], fov: 42 }}>
        <ambientLight intensity={0.8} />
        <hemisphereLight args={['#ffffff', '#ff7a3d', 1.1]} />
        <directionalLight position={[3, 4, 3]} intensity={2.3} />
        <directionalLight position={[-3, 2, -2]} intensity={0.8} />
        <ModelErrorBoundary resetKey={modelUrl} fallback={<Model type={modelType} />}>
          <Suspense fallback={modelUrl ? <LoadingModel /> : <Model type={modelType} />}>
            <ModelContent
              modelType={modelType}
              modelUrl={modelUrl}
              modelScale={modelScale}
              modelPosition={modelPosition}
              modelRotation={modelRotation}
            />
          </Suspense>
        </ModelErrorBoundary>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
