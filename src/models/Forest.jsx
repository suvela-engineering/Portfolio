/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: SimpleMan2101 (https://sketchfab.com/SimpleMan2101)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/forest-camping-75f6849e2fee43a6b070632e7dade3fb
Title: Forest camping
*/

import { useRef , useEffect, useState, Suspense} from "react";
import { useGLTF } from "@react-three/drei"; //useAnimations
import { useThree, useFrame } from "@react-three/fiber";
import {a} from '@react-spring/three';

import ForestScene from '../assets/3D/forest_camping.glba';
import Wolf from "./Wolf";

const Forest = ({ position, rotation, scale, isRotating, setIsRotating, setCurrentStage }) => {
  const forestRef = useRef();

  const {gl, viewport} = useThree();
  const { scene, animations,  } = useGLTF(ForestScene);

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
      forestRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      if (!isRotating) setIsRotating(true);
      forestRef.current.rotation.y += 0.01 * Math.PI;
    }
    else if (e.key === 'ArrowRight') {
      if (!isRotating) setIsRotating(true);
      forestRef.current.rotation.y -= 0.01 * Math.PI;
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight')
      setIsRotating(false);
  }

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      forestRef.current.rotation.y += rotationSpeed.current;
    }
    else {
      const rotation = forestRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);


      // Apply offsets to wolf
      wolfRef.current.position.x = forestRef.current.position.x + wolfPositionOffset.x;
      wolfRef.current.position.y = forestRef.current.position.y + wolfPositionOffset.y;
      wolfRef.current.position.z = forestRef.current.position.z + wolfPositionOffset.z;

      wolfRef.current.rotation.x = forestRef.current.rotation.x + wolfRotationOffset.x;
      wolfRef.current.rotation.y = forestRef.current.rotation.y + wolfRotationOffset.y;
      wolfRef.current.rotation.z = forestRef.current.rotation.z + wolfRotationOffset.z;

      // Set the current stage based on the forest orientation
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
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);

  
    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
    
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);

  // const Wolf = ({ scale, position, rotation, ref }) => {
  //   // Use the received props instead of hardcoded values
  //   return (
  //     <mesh scale={scale} position={position} rotation={rotation} ref={ref}>
  //       <primitive object={scene} />
  //     </mesh>
  //   );  
  // };

    // Compute Wolf position and rotation based on Forest properties
  const wolfPosition = [position.x + 1, position.y + 3, position.z];
  const wolfRotation = [rotation.x, rotation.y + Math.PI, rotation.z];


  return (
    <mesh ref={forestRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Forest;