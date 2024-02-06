import React from 'react'

import FoxSimpleScene from '../assets/3D/fox_simple.glb';
import { useGLTF } from '@react-three/drei';

const Fox_Simple = ({isRotating, ...props}) => {
  const {scene, animations} = useGLTF(FoxSimpleScene);

  return (
    <mesh  {...props}>
        <primitive object={scene}></primitive>
    </mesh>
  )
}

export default Fox_Simple