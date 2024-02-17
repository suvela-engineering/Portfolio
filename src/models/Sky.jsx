import { useRef, useEffect, useState, Suspense } from "react";
import { useGLTF } from "@react-three/drei"; //useAnimations
import { useThree, useFrame } from "@react-three/fiber";
import { a } from "@react-spring/three";

import SkyScene from '../assets/3D/sky.glb';

const Sky = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const skyRef = useRef();

  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(SkyScene);
  const lastX = useRef(0);

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

  // useEffect(() => {
  //   const canvas = gl.domElement;

  //   // Add event listeners to the appropriate target
  //   canvas.addEventListener("pointerdown", handlePointerDown);
  //   canvas.addEventListener("pointermove", handlePointerMove);
  //   canvas.addEventListener("pointerup", handlePointerUp);

  //   // Cleanup function to remove event listeners when the component unmounts
  //   return () => {
  //     canvas.removeEventListener("pointerdown", handlePointerDown);
  //     canvas.removeEventListener("pointermove", handlePointerMove);
  //     canvas.removeEventListener("pointerup", handlePointerUp);

  //   };
  // }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);

  return (
    <a.group ref={skyRef} {...props} dispose={null} scale={0.01}>
      <mesh
        geometry={nodes.Sphere__0.geometry}
        material={materials["Scene_-_Root"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={50000}
      />
    </a.group>
  );
}

export default Sky;