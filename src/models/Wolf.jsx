import React from 'react'

import wolfScene from '../assets/3D/wolf.glb'
import { useGLTF } from '@react-three/drei'

const Wolf = () => {
  const {scene, animations} = useGLTF(wolfScene)

  return (
    <mesh position={[0,-2,0.0]} scale={[0.005,0.005,0.005]}>
      <primitive object={scene}></primitive>
    </mesh>
  )
}

export default Wolf