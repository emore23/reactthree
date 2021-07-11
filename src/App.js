import './App.styles.scss';

import { useRef} from 'react'

import { Canvas, useFrame } from 'react-three-fiber'

import { softShadows, OrbitControls } from 'drei'

softShadows();

const SpinningMesh = ({ position, args, color}) => {

  const mesh = useRef(null);
  useFrame(() => (
    mesh.current.rotation.x = mesh.current.rotation.y += 0.008
  ));

    return(
        <mesh castShadow position={position} ref={mesh}>
          <boxBufferGeometry attach='geometry' args={args} />
          <meshStandardMaterial attach='material' color={color} />
        </mesh>
    )
}

function App() { 
  return(
    <>
      <Canvas shadowMap colorManagement camera={{ position: [-5, 2, 10], fov: 35}}>
        <ambientLight intensity={0.1} />
        <directionalLight 
          castShadow
          position={[0, 10, 0]} 
          intensity={0.3} 
          shadow-mapSize-width={1024}  
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, -0]} intensity={1.5} />

        <group>
          <mesh           
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            {/* <shadowMaterial attach='material' opacity={4} />  */}
            <meshStandardMaterial attach='material' color={"gray"} />
          </mesh>
        </group>

        <SpinningMesh position={[0, 1, 0]} args={[2, 3, 0.1]} color='lightblue' />
        <SpinningMesh position={[-2, 1, -5]} args={[2, 3, 0.1]} color='lightblue' />
        <SpinningMesh position={[5, 1, -2]} args={[2, 3, 0.1]} color='lightblue' />
        <OrbitControls></OrbitControls>
      </Canvas>
    </>
  )
}

export default App;
