import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';

export default function ForestGroup (isRotating, setIsRotating, setCurrentStage, ...props ) {
    console.log(THREE);
    const loader = new THREE.GLTFLoader();
    
    let forestMesh, wolfMesh;
    
    loader.load('../assets/3D/forest_camping.glb', (gltf) => {
      forestMesh = gltf.scene.children[0]; // Assuming Forest is the first child
    });

    loader.load('../assets/3D/wolf.glb', (gltf) => {
        wolfMesh = gltf.scene.children[0]; // Assuming animal is the first child
    });

    // Add the animal to the island as a child (or to a parent group)
    if (forestMesh) {
        forestMesh.add(wolfMesh);
        // Or: islandMesh.parent.add(animalMesh); // If using a parent group
    }

    const forestRef = useRef();
  
    const {gl, viewport} = useThree();
    // const { nodes, materials,  } = useGLTF(ForestScene);
    // const { actions } = useAnimations(animations, group);
  
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

    return (
        <mesh {...props} ref={forestRef}>
        {/* use the primitive element when you want to directly embed a complex 3D
        model or scene */}
        <primitive object={forestMesh} />
      </mesh>
    )
}