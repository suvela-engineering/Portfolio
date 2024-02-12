import { useRef , useEffect, useState, Suspense} from "react";
import { useGLTF } from "@react-three/drei"; //useAnimations
import { useThree, useFrame } from "@react-three/fiber";

import SkyScene from '../assets/3D/sky.glb';

const Sky = ({  isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const skyRef = useRef();

  const {gl, viewport} = useThree();
  const { scene, animations,  } = useGLTF(SkyScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = (clientX - lastX.current) / viewport.width;
      skyRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
    }
  }

  // const handleKeyDown = (e) => {
  //   if (e.key === 'ArrowLeft') {
  //     if (!isRotating) setIsRotating(true);
  //     skyRef.current.rotation.y += 0.01 * Math.PI;
  //   }
  //   else if (e.key === 'ArrowRight') {
  //     if (!isRotating) setIsRotating(true);
  //     skyRef.current.rotation.y -= 0.01 * Math.PI;
  //   }
  // }

  // const handleKeyUp = (e) => {
  //   if (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
  //     setIsRotating(false);
  // }

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      skyRef.current.rotation.y += rotationSpeed.current;
    }
    else {
      const rotation = skyRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the sky's orientation
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
    // document.addEventListener("keyup", handleKeyUp);
    // document.addEventListener("keydown", handleKeyDown);

  
    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      // document.removeEventListener("keyup", handleKeyUp);
      // document.removeEventListener("keydown", handleKeyDown);
    
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);

  return (
    <mesh ref={skyRef} {...props}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Sky;