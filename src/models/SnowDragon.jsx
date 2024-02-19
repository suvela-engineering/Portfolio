import { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { a } from "@react-spring/three";

import snowDragonScene from '../assets/3D/snowDragon.glb'

export default function SnowDragon({ currentStage, isAnimating, ...props }) {
    const snowDragonRef = useRef();
    const { nodes, materials, animations } = useGLTF(snowDragonScene);
    const { actions } = useAnimations(animations, snowDragonRef);

    useEffect(() => {
        if (isAnimating)
            actions["skill02"].play();
    }, [actions, isAnimating]);

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
        <a.group ref={snowDragonRef} {...props} dispose={null} >
            <group name="Sketchfab_Scene">
                <group
                    name="Sketchfab_model"
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.989}
                >
                    <group name="root">
                        <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                            <group
                                name="Sketchfab_model_0"
                                rotation={[-Math.PI / 2, 0, 0]}
                                scale={20.612}
                            >
                                <group
                                    name="zq127_binglong_modefbx_1"
                                    rotation={[Math.PI / 2, 0, 0]}
                                    scale={0.01}
                                >
                                    <group name="Object_2_2">
                                        <group name="RootNode_3">
                                            <group name="zq127_binglong_mode_4" scale={1.5}>
                                                <group name="Object_5_5">
                                                    <group name="GLTF_created_0">
                                                        <primitive
                                                            object={nodes.GLTF_created_0_rootJoint}
                                                        />
                                                        <skinnedMesh
                                                            name="Object_102"
                                                            geometry={nodes.Object_102.geometry}
                                                            material={materials.zq127_binglong_1}
                                                            skeleton={nodes.Object_102.skeleton}
                                                        />
                                                        <group name="Object_8_8_correction">
                                                            <group name="Object_8_8" />
                                                        </group>
                                                    </group>
                                                </group>
                                            </group>
                                        </group>
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </a.group>
    );
};
