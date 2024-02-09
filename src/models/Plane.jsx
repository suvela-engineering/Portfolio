import { useRef, useEffect } from 'react'

import PlaneScene from '../assets/3D/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export default function PlaneOrange({ setCurrentStage,setIsClick,isClick,isAnimating , ...props }) {
    const planeRef = useRef();
    // Load the 3D model and its animations
    const { scene, animations } = useGLTF(PlaneScene);
    // Get animation actions associated with the plane
    const { actions } = useAnimations(animations, planeRef);

    // Use an effect to control the plane's animation based on 'isRotating'
    // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.

    console.log("setCurrentStage: " +setCurrentStage);
    // console.log("setIsRotating: " +setIsRotating);
    console.log("isAnimating: " +isAnimating);
    console.log("...props: " +JSON.stringify(props));


    const {gl, viewport} = useThree();  
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;
  
    const handlePointerDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsClick(true);
  
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX;
    }
  
    const handlePointerUp = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsClick(false);
    }
  
    const handlePointerMove = (e) => {
      e.stopPropagation();
      e.preventDefault();
  
      if (isClick) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  
        const delta = (clientX - lastX.current) / viewport.width;
        planeRef.current.rotation.y += delta * 0.01 * Math.PI;
        lastX.current = clientX;
      }
    }
  
    // const handleKeyDown = (e) => {
    //   if (e.key === 'ArrowLeft') {
    //     if (!isRotating) setIsRotating(true);
    //     planeRef.current.rotation.y += 0.01 * Math.PI;
    //   }
    //   else if (e.key === 'ArrowRight') {
    //     if (!isRotating) setIsRotating(true);
    //     planeRef.current.rotation.y -= 0.01 * Math.PI;
    //   }
    // }
  
    // const handleKeyUp = (e) => {
    //   if (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
    //     setIsRotating(false);
    // }
  
    useFrame(() => {
      if (!isAnimating) {
        rotationSpeed.current *= dampingFactor;
  
        if (Math.abs(rotationSpeed.current) < 0.001) {
          rotationSpeed.current = 0;
        }
  
        planeRef.current.rotation.y += rotationSpeed.current;
      }
      else {
        const rotation = planeRef.current.rotation.y;
  
        const normalizedRotation =
          ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  
        // Set the current stage based on the plane orientation
        switch (true) {
          // case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          case normalizedRotation >= 5 && normalizedRotation <= 5.5:
            setCurrentStage(1);
            break;
          // case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          //   setCurrentStage(3);
          //   break;
          // case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          //   setCurrentStage(2);
          //   break;
          // case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          //   setCurrentStage(1);
          //   break;
          default:
            setCurrentStage(null);
        }
      }
    });
  
    useEffect(() => {
      const canvas = gl.domElement;
  
      // Add event listeners to the appropriate target
      canvas.addEventListener("pointerdown", handlePointerDown);
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerup", handlePointerUp);
    
      // Cleanup function to remove event listeners when the component unmounts
      return () => {
        canvas.removeEventListener("pointerdown", handlePointerDown);
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerup", handlePointerUp);
     
      };
    }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);  

    useEffect(() => {
        if (isAnimating) {
            actions["Scene"].play();
        } else {
            actions["Scene"].stop();
        }
    }, [actions, isAnimating]);

    return (
        <mesh {...props} ref={planeRef}>
            {/* use the primitive element when you want to directly embed a complex 3D
      model or scene */}
            <primitive object={scene} />
        </mesh>
    );
}