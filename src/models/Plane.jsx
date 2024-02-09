import { useRef , useEffect} from 'react'

import PlaneScene from '../assets/3D/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';

export default function PlaneOrange({ isRotating, ...props }) {
  const ref = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(PlaneScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);

  // Use an effect to control the plane's animation based on 'isRotating'
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  
  console.log("props: " + props);
  
  useEffect(() => {
    if (isRotating) {
      actions["Scene"].play();
    } else {
      actions["Scene"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      {/* use the primitive element when you want to directly embed a complex 3D
      model or scene */}
      <primitive object={scene} />
    </mesh>
  );
}