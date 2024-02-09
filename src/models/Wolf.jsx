import React, { forwardRef, useRef } from 'react';
import wolfScene from '../assets/3D/wolf.glb'
import { useGLTF } from '@react-three/drei';


// const Wolf = forwardRef(({ scale, position, rotation }, wolfRef) => {
  export default function Wolf({ scale, position, rotation, ref}) {

  const { scene, animations } = useGLTF(wolfScene);
  const wolfRef = useRef(ref);

  // console.log("props: " +scale +", " +position + ", " +rotation);
  console.log("wolfRef: " +JSON.stringify(wolfRef));;

  return (
    <mesh ref={wolfRef} scale={scale} position={position} rotation={rotation} >
      <primitive object={scene} />
    </mesh>
  );
}

// export default Wolf;


// import { useEffect, useRef } from 'react'
// import wolfScene from '../assets/3D/wolf.glb'
// import {  useAnimations, useGLTF } from '@react-three/drei'
// import { useFrame, useThree } from '@react-three/fiber';

// export default function Wolf({ wolfRef, ...props }) {
//   const ref = useRef();

//   // Load the 3D model and its animations
//   const { scene, animations } = useGLTF(wolfScene);
//   // Get animation actions associated with the plane
//   const { actions } = useAnimations(animations, ref);

//   // Use an effect to control the plane's animation based on 'isRotating'
//   // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  
//   console.log("props: " +JSON.stringify(props));
//   // console.log("scene: " +JSON.stringify(scene));
//   console.log("wolfRef: " +JSON.stringify(wolfRef));

//   return (
//     <mesh {...props} ref={ref}>
//       {/* use the primitive element when you want to directly embed a complex 3D
//       model or scene */}
//       <primitive object={scene} />
//     </mesh>
//   );
// }