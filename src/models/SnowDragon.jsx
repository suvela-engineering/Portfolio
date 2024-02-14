import { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

import snowDragonScene from '../assets/3D/snowDragon.glb'

export default function SnowDragon({  currentStage, setCurrentStage, isAnimating, ...props }) {
    const snowDragonRef = useRef();
    const { scene, animations } = useGLTF(snowDragonScene);
    const { actions } = useAnimations(animations, snowDragonRef);

    useEffect(() => {
        if (currentStage === 10) {
            actions["skill01"].play();

            // Calculate animation duration (assuming you know it)
            const animationDuration = 2100; // Replace with actual duration

            setTimeout(() => {
                // Stop animation after its duration
                actions["skill01"].stop();
                setCurrentStage(null);
            }, animationDuration);
        }
        else {
            actions["skill02"].play();
        }
    }, [actions, currentStage, setCurrentStage, currentStage]);

    useFrame(({ clock, camera }) => {
        // Update the Y position simulate the flight moving in a sing wave, yep!
        snowDragonRef.current.position.y = Math.sin(clock.elapsedTime) * 8 + 5;

        if (snowDragonRef.current.position.x >= camera.position.x + 200) {
            // Change direction around axis -> move forward 
            snowDragonRef.current.rotation.y = 0;
        }
        // Check if the dragon went to a certain endpoint relative to the camera
        else if (snowDragonRef.current.position.x < camera.position.x - 400) {
            // Change direction around axis -> backward, 180 degrees
            snowDragonRef.current.rotation.y = Math.PI;
        }

        // Basend on the dragons direction, Update the x and z positions 
        if (snowDragonRef.current.rotation.y === 0) {
            // Move forward
            snowDragonRef.current.position.x -= 2.5;
            snowDragonRef.current.position.z += 2.5;
        }
        else {
            // Move backward
            snowDragonRef.current.position.x += 2.5;
            snowDragonRef.current.position.z -= 2.5;
        }
    })

    return (
        <mesh {...props} ref={snowDragonRef}>
            <primitive object={scene} />
        </mesh>
    )
};
