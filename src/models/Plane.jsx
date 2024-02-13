import { useRef, useEffect, useMemo } from 'react'
import PlaneScene from '../assets/3D/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export default function PlaneOrange({ setCurrentStage, setIsClick, isClick, isAnimating, ...props }) {
  const planeRef = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(PlaneScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, planeRef);

  const speed = 2; // Adjust this value to control movement speed

  // for rotation
  const { gl, viewport } = useThree();
  const lastX = useRef(0);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsClick(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
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

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsClick(false);
  }


  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      planeRef.current.position.z -= speed;
    }
    else if (e.key === 'ArrowDown') {
      planeRef.current.position.z += speed;
    }
    if (e.key === 'ArrowLeft') {
      planeRef.current.rotation.x -= speed; // Move left in the x-axis
    }
    else if (e.key === 'ArrowRight') {
      planeRef.current.rotation.x += speed; // Move right in the x-axis
    }
  }


  useFrame(() => {
    const rotation = planeRef.current.rotation.y;

    const normalizedRotation =
      ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);


    // Set the current stage based on the plane orientation
    switch (true) {
      // case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
      // case normalizedRotation > 4.75 && normalizedRotation <= 5.5:
      case normalizedRotation > 4 && normalizedRotation <= 5.5:
        setCurrentStage(1);
        break;
      // Left the case 3 for Projects, delete if not needed
      // case normalizedRotation >= 3.25 && normalizedRotation < 4:
      // setCurrentStage(3); 
      // break;
      // case normalizedRotation >= 1.25 && normalizedRotation <= 2.0:
      case normalizedRotation >= 2 && normalizedRotation <= 3.5:
        setCurrentStage(2);
        break;
      // case normalizedRotation >= 0 && normalizedRotation < 0.75:
      case normalizedRotation >= 0 && normalizedRotation < 1.5:
        setCurrentStage(4);
        break;
      default:
        setCurrentStage(null);
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;

    // Add event listeners to the appropriate target
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("keydown", handleKeyDown);


    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("keydown", handleKeyDown)
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp, handleKeyDown]);

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