import { useEffect, useRef } from 'react'
import smallDragonScene from '../assets/3D/smallDragon.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function SmallDragon({ isAnimating, ...props }) {
    const smallDragonRef = useRef();
    const { scene, animations } = useGLTF(smallDragonScene);
    const { actions } = useAnimations(animations, smallDragonRef);

    useEffect(() => {
        if (isAnimating)
            actions["Fly 2"].play();
    }, [actions, isAnimating]);

    useFrame(({ clock, camera }) => {
        // Update the Y position simulate the flight moving in a sing wave, yep!
        smallDragonRef.current.position.y = Math.sin(clock.elapsedTime) * 5 + 2;

        if (smallDragonRef.current.position.x <= camera.position.x - 50) {
            // Change direction around axis -> move forward 
            smallDragonRef.current.rotation.y = 0;
        }
        // Check if the dragon went to a certain endpoint relative to the camera
        else if (smallDragonRef.current.position.x >= camera.position.x + 50) {
            // Change direction around axis -> backward, 180 degrees
            smallDragonRef.current.rotation.y = Math.PI;
        }

        // Basend on the dragons direction, Update the x and z positions 
        if (smallDragonRef.current.rotation.y === 0) {
            // Move forward
            smallDragonRef.current.position.x += 0.3;
            smallDragonRef.current.position.z -= 0.3;
        }
        else {
            // Move backward
            smallDragonRef.current.position.x -= 0.3;
            smallDragonRef.current.position.z += 0.3;
        }
    })


    return (
        <mesh {...props} ref={smallDragonRef}>
            <primitive object={scene} />
        </mesh>
    )
};
