import { useRef, useEffect } from 'react'
import PlaneScene from '../assets/3D/plane.glb';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { a } from "@react-spring/three";

export default function PlaneOrange({ setCurrentStage, setIsClick, isClick, isAnimating, ...props }) {
    const planeRef = useRef();
    // Load the 3D model and its animations
    const { nodes, materials, animations } = useGLTF(PlaneScene);
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
            planeRef.current.rotation.y += delta * 0.02 * Math.PI;
            lastX.current = clientX;
        }
    }

    const handlePointerUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsClick();
    }

    useFrame(() => {
        const rotation = planeRef.current.rotation.y;

        const normalizedRotation =
            ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);


        // Set the current stage based on the plane orientation
        switch (true) {
            case normalizedRotation > 4 && normalizedRotation <= 5.5:
                setCurrentStage(1);
                break;
            // Left the case 3 for Projects, delete if not needed
            // case normalizedRotation >= 3.25 && normalizedRotation < 4:
            // setCurrentStage(3); 
            // break;
            case normalizedRotation >= 2 && normalizedRotation <= 3.5:
                setCurrentStage(2);
                break;
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

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerup", handlePointerUp);
        };
    }, [gl, handlePointerDown, handlePointerMove, handlePointerUp]);

    useEffect(() => {
        if (isAnimating)
            actions["Scene"].play();
    }, [actions, isAnimating]);

    return (
        <a.group ref={planeRef} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group
                        name="e7a99e753bdb49aab33eae164057a44bfbx"
                        rotation={[Math.PI / 2, 0, 0]}
                        scale={0.01}
                    >
                        <group name="Object_2">
                            <group name="RootNode">
                                <group
                                    name="Empty027"
                                    position={[99.156, 29.226, -3.008]}
                                    scale={4122.788}
                                >
                                    <group
                                        name="Empty028"
                                        position={[0.007, 0.007, -0.007]}
                                        rotation={[-0.003, 0, 0]}
                                        scale={0.889}
                                    >
                                        <group
                                            name="Circle020"
                                            position={[0.074, 0.065, 0.008]}
                                            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Circle020_M_Plane_0"
                                                geometry={nodes.Circle020_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Circle020_M_Outline_0"
                                                geometry={nodes.Circle020_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Circle019"
                                            position={[0.074, 0.065, 0.008]}
                                            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Circle019_M_Plane_0"
                                                geometry={nodes.Circle019_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Circle019_M_Outline_0"
                                                geometry={nodes.Circle019_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Circle018"
                                            position={[0.074, 0.071, 0.008]}
                                            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Circle018_M_Plane_0"
                                                geometry={nodes.Circle018_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Circle018_M_Outline_0"
                                                geometry={nodes.Circle018_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="cube006"
                                            position={[0.024, 0.355, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="cube006_M_Plane_0"
                                                geometry={nodes.cube006_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="cube006_M_Outline_0"
                                                geometry={nodes.cube006_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="cube005"
                                            position={[0.024, 0.355, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="cube005_M_Plane_0"
                                                geometry={nodes.cube005_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="cube005_M_Outline_0"
                                                geometry={nodes.cube005_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="cube004"
                                            position={[-0.331, 0.173, 0.099]}
                                            rotation={[-1.668, -0.046, 0.025]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="cube004_M_Plane_0"
                                                geometry={nodes.cube004_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="cube004_M_Outline_0"
                                                geometry={nodes.cube004_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube184"
                                            position={[-0.2, 0.101, 0.13]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube184_M_Plane_0"
                                                geometry={nodes.Cube184_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube184_M_Outline_0"
                                                geometry={nodes.Cube184_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube183"
                                            position={[-0.3, 0.141, 0.008]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube183_M_Plane_0"
                                                geometry={nodes.Cube183_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube183_M_Outline_0"
                                                geometry={nodes.Cube183_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube182"
                                            position={[-0.288, 0.148, 0.155]}
                                            rotation={[0.886, -0.844, -0.244]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube182_M_Plane_0"
                                                geometry={nodes.Cube182_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube182_M_Outline_0"
                                                geometry={nodes.Cube182_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube181"
                                            position={[0.007, 0.355, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube181_M_Plane_0"
                                                geometry={nodes.Cube181_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube181_M_Outline_0"
                                                geometry={nodes.Cube181_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube180"
                                            position={[0.059, 0.38, 0.62]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube180_M_Plane_0"
                                                geometry={nodes.Cube180_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube180_M_Outline_0"
                                                geometry={nodes.Cube180_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube179"
                                            position={[0.178, 0.383, 0.508]}
                                            rotation={[-Math.PI / 2, -0.262, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube179_M_Plane_0"
                                                geometry={nodes.Cube179_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube179_M_Outline_0"
                                                geometry={nodes.Cube179_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube178"
                                            position={[0.024, 0.355, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube178_M_Plane_0"
                                                geometry={nodes.Cube178_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube178_M_Outline_0"
                                                geometry={nodes.Cube178_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube177"
                                            position={[0.024, 0.017, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube177_M_Plane_0"
                                                geometry={nodes.Cube177_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube177_M_Outline_0"
                                                geometry={nodes.Cube177_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube176"
                                            position={[0.789, 0.229, 0.011]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube176_M_Plane_0"
                                                geometry={nodes.Cube176_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube176_M_Outline_0"
                                                geometry={nodes.Cube176_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube175"
                                            position={[0.757, 0.198, 0.142]}
                                            rotation={[-Math.PI / 2, -0.262, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube175_M_Plane_0"
                                                geometry={nodes.Cube175_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube175_M_Outline_0"
                                                geometry={nodes.Cube175_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube174"
                                            position={[-0.288, 0.148, 0.155]}
                                            rotation={[0.886, -0.844, -0.244]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube174_M_Plane_0"
                                                geometry={nodes.Cube174_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube174_M_Outline_0"
                                                geometry={nodes.Cube174_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube173"
                                            position={[0.843, 0.224, 0.011]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube173_M_Plane_0"
                                                geometry={nodes.Cube173_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube173_M_Outline_0"
                                                geometry={nodes.Cube173_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube172"
                                            position={[0.843, 0.224, 0.011]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube172_M_Plane_0"
                                                geometry={nodes.Cube172_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube172_M_Outline_0"
                                                geometry={nodes.Cube172_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube171"
                                            position={[0.023, 0.2, 0.009]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube171_M_Plane_0"
                                                geometry={nodes.Cube171_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube171_M_Outline_0"
                                                geometry={nodes.Cube171_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube170"
                                            position={[0.716, 0.19, -0.209]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube170_M_Plane_0"
                                                geometry={nodes.Cube170_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube170_M_Outline_0"
                                                geometry={nodes.Cube170_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube169"
                                            position={[0.738, 0.178, 0.224]}
                                            rotation={[-Math.PI / 2, 0, -0.161]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube169_M_Plane_0"
                                                geometry={nodes.Cube169_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube169_M_Outline_0"
                                                geometry={nodes.Cube169_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube168"
                                            position={[0.731, 0.254, 0.028]}
                                            rotation={[-1.566, -0.185, 0.007]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube168_M_Plane_0"
                                                geometry={nodes.Cube168_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube168_M_Outline_0"
                                                geometry={nodes.Cube168_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube167"
                                            position={[0.725, 0.218, 0.03]}
                                            rotation={[-1.525, 0.295, -0.048]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube167_M_Plane_0"
                                                geometry={nodes.Cube167_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube167_M_Outline_0"
                                                geometry={nodes.Cube167_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube166"
                                            position={[0.781, 0.189, -0.064]}
                                            rotation={[-1.668, 0.409, 0.347]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube166_M_Plane_0"
                                                geometry={nodes.Cube166_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube166_M_Outline_0"
                                                geometry={nodes.Cube166_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube165"
                                            position={[0.006, 0.022, -0.293]}
                                            rotation={[-1.415, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube165_M_Plane_0"
                                                geometry={nodes.Cube165_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube165_M_Outline_0"
                                                geometry={nodes.Cube165_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube164"
                                            position={[-0.077, 0.369, -0.092]}
                                            rotation={[-1.475, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube164_M_Plane_0"
                                                geometry={nodes.Cube164_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube164_M_Outline_0"
                                                geometry={nodes.Cube164_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube163"
                                            position={[0.738, 0.187, -0.23]}
                                            rotation={[-1.501, 0.233, 0.059]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube163_M_Plane_0"
                                                geometry={nodes.Cube163_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube163_M_Outline_0"
                                                geometry={nodes.Cube163_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube162"
                                            position={[-0.311, 0.127, 0.17]}
                                            rotation={[0.886, -0.844, -0.244]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube162_M_Plane_0"
                                                geometry={nodes.Cube162_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube162_M_Outline_0"
                                                geometry={nodes.Cube162_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube161"
                                            position={[0.059, 0.385, -0.582]}
                                            rotation={[-Math.PI / 2, 0, -2.883]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube161_M_Plane_0"
                                                geometry={nodes.Cube161_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube161_M_Outline_0"
                                                geometry={nodes.Cube161_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube160"
                                            position={[0.007, 0.044, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube160_M_Plane_0"
                                                geometry={nodes.Cube160_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube160_M_Outline_0"
                                                geometry={nodes.Cube160_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube159"
                                            position={[0.727, 0.232, -0.003]}
                                            rotation={[-1.525, 0.295, -0.048]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube159_M_Plane_0"
                                                geometry={nodes.Cube159_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube159_M_Outline_0"
                                                geometry={nodes.Cube159_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube158"
                                            position={[0.763, 0.178, 0.07]}
                                            rotation={[-Math.PI / 2, 0, -0.161]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube158_M_Plane_0"
                                                geometry={nodes.Cube158_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube158_M_Outline_0"
                                                geometry={nodes.Cube158_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube157"
                                            position={[0.745, 0.174, -0.176]}
                                            rotation={[-Math.PI / 2, 0, 0.258]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube157_M_Plane_0"
                                                geometry={nodes.Cube157_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube157_M_Outline_0"
                                                geometry={nodes.Cube157_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cube155"
                                            position={[0.178, 0.383, -0.508]}
                                            rotation={[-Math.PI / 2, 0.262, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cube155_M_Plane_0"
                                                geometry={nodes.Cube155_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cube155_M_Outline_0"
                                                geometry={nodes.Cube155_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder331"
                                            position={[-0.063, 0.012, 0.364]}
                                            rotation={[-1.416, -0.121, 0.114]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder331_M_Plane_0"
                                                geometry={nodes.Cylinder331_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder331_M_Outline_0"
                                                geometry={nodes.Cylinder331_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder330"
                                            position={[-0.143, -0.213, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder330_M_Plane_0"
                                                geometry={nodes.Cylinder330_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder330_M_Outline_0"
                                                geometry={nodes.Cylinder330_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder329"
                                            position={[-0.143, -0.211, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder329_M_Plane_0"
                                                geometry={nodes.Cylinder329_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder329_M_Outline_0"
                                                geometry={nodes.Cylinder329_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder328"
                                            position={[-0.143, -0.211, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder328_M_Plane_0"
                                                geometry={nodes.Cylinder328_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder328_M_Outline_0"
                                                geometry={nodes.Cylinder328_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder327"
                                            position={[-0.143, -0.211, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder327_M_Plane_0"
                                                geometry={nodes.Cylinder327_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder327_M_Outline_0"
                                                geometry={nodes.Cylinder327_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder326"
                                            position={[-0.34, 0.135, 0.008]}
                                            rotation={[0, 0, 0.08]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder326_M_Plane_0"
                                                geometry={nodes.Cylinder326_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder326_M_Outline_0"
                                                geometry={nodes.Cylinder326_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder325"
                                            position={[-0.58, 0.213, 0.101]}
                                            rotation={[-2.964, 1.405, 1.777]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder325_M_Plane_0"
                                                geometry={nodes.Cylinder325_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder325_M_Outline_0"
                                                geometry={nodes.Cylinder325_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder324"
                                            position={[0.168, 0.392, 0.594]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder324_M_Plane_0"
                                                geometry={nodes.Cylinder324_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder324_M_Outline_0"
                                                geometry={nodes.Cylinder324_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder323"
                                            position={[0.102, 0.325, 0.386]}
                                            rotation={[2.93, 1.019, 1.757]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder323_M_Plane_0"
                                                geometry={nodes.Cylinder323_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder323_M_Outline_0"
                                                geometry={nodes.Cylinder323_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder322"
                                            position={[0.154, 0.121, -0.002]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder322_M_Plane_0"
                                                geometry={nodes.Cylinder322_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder322_M_Outline_0"
                                                geometry={nodes.Cylinder322_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder320"
                                            position={[0.151, 0.123, 0]}
                                            rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder320_M_Plane_0"
                                                geometry={nodes.Cylinder320_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder320_M_Outline_0"
                                                geometry={nodes.Cylinder320_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder319"
                                            position={[0.022, 0.249, 0.01]}
                                            rotation={[-1.597, -0.136, 0.003]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder319_M_Plane_0"
                                                geometry={nodes.Cylinder319_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder319_M_Outline_0"
                                                geometry={nodes.Cylinder319_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder318"
                                            position={[0.701, 0.031, 0.035]}
                                            rotation={[-Math.PI / 2, 0.131, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder318_M_Plane_0"
                                                geometry={nodes.Cylinder318_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder318_M_Outline_0"
                                                geometry={nodes.Cylinder318_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder317"
                                            position={[0.745, 0.371, 0.004]}
                                            rotation={[-1.71, 0.134, 0.019]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder317_M_Plane_0"
                                                geometry={nodes.Cylinder317_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder317_M_Outline_0"
                                                geometry={nodes.Cylinder317_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder316"
                                            position={[0.746, 0.397, -0.001]}
                                            rotation={[-3.089, 1.079, 3.095]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder316_M_Plane_0"
                                                geometry={nodes.Cylinder316_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder316_M_Outline_0"
                                                geometry={nodes.Cylinder316_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder315"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[0, 0.535, -0.176]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder315_M_Plane_0"
                                                geometry={nodes.Cylinder315_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder315_M_Outline_0"
                                                geometry={nodes.Cylinder315_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder314"
                                            position={[0.304, 0.064, -0.271]}
                                            rotation={[-Math.PI / 2, 0, 0.118]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder314_M_Plane_0"
                                                geometry={nodes.Cylinder314_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder314_M_Outline_0"
                                                geometry={nodes.Cylinder314_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder313"
                                            position={[0.453, 0.106, -0.173]}
                                            rotation={[-1.753, -0.259, -0.542]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder313_M_Plane_0"
                                                geometry={nodes.Cylinder313_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder313_M_Outline_0"
                                                geometry={nodes.Cylinder313_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder312"
                                            position={[0.142, 0.023, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder312_M_Plane_0"
                                                geometry={nodes.Cylinder312_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder312_M_Outline_0"
                                                geometry={nodes.Cylinder312_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder311"
                                            position={[-0.124, 0.428, -0.058]}
                                            rotation={[-1.499, 0.227, -0.013]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder311_M_Plane_0"
                                                geometry={nodes.Cylinder311_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder311_M_Outline_0"
                                                geometry={nodes.Cylinder311_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder310"
                                            position={[0.184, 0.376, 0.416]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder310_M_Plane_0"
                                                geometry={nodes.Cylinder310_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder310_M_Outline_0"
                                                geometry={nodes.Cylinder310_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder309"
                                            position={[0.168, 0.392, -0.594]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder309_M_Plane_0"
                                                geometry={nodes.Cylinder309_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder309_M_Outline_0"
                                                geometry={nodes.Cylinder309_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder308"
                                            position={[0.184, 0.376, -0.416]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder308_M_Plane_0"
                                                geometry={nodes.Cylinder308_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder308_M_Outline_0"
                                                geometry={nodes.Cylinder308_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder307"
                                            position={[0.184, 0.376, -0.416]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder307_M_Plane_0"
                                                geometry={nodes.Cylinder307_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder307_M_Outline_0"
                                                geometry={nodes.Cylinder307_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder306"
                                            position={[0.739, 0.198, 0.223]}
                                            rotation={[-1.487, -0.003, -0.108]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder306_M_Plane_0"
                                                geometry={nodes.Cylinder306_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder306_M_Outline_0"
                                                geometry={nodes.Cylinder306_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder305"
                                            position={[0.739, 0.198, 0.223]}
                                            rotation={[-1.487, -0.003, -0.108]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder305_M_Plane_0"
                                                geometry={nodes.Cylinder305_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder305_M_Outline_0"
                                                geometry={nodes.Cylinder305_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder304"
                                            position={[0.74, 0.198, -0.216]}
                                            rotation={[-1.487, -0.003, 0.278]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder304_M_Plane_0"
                                                geometry={nodes.Cylinder304_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder304_M_Outline_0"
                                                geometry={nodes.Cylinder304_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder303"
                                            position={[0.112, 0.387, -0.005]}
                                            rotation={[-0.212, 1.019, 1.757]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder303_M_Plane_0"
                                                geometry={nodes.Cylinder303_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder303_M_Outline_0"
                                                geometry={nodes.Cylinder303_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder302"
                                            position={[0.142, 0.023, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder302_M_Plane_0"
                                                geometry={nodes.Cylinder302_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder302_M_Outline_0"
                                                geometry={nodes.Cylinder302_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder301"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[0, 0.535, -0.176]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder301_M_Plane_0"
                                                geometry={nodes.Cylinder301_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder301_M_Outline_0"
                                                geometry={nodes.Cylinder301_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder300"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[0, 0.535, -0.176]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder300_M_Plane_0"
                                                geometry={nodes.Cylinder300_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder300_M_Outline_0"
                                                geometry={nodes.Cylinder300_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder299"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[0, 0.535, -0.176]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder299_M_Plane_0"
                                                geometry={nodes.Cylinder299_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder299_M_Outline_0"
                                                geometry={nodes.Cylinder299_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder298"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[-0.2, -0.569, -0.272]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder298_M_Plane_0"
                                                geometry={nodes.Cylinder298_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder298_M_Outline_0"
                                                geometry={nodes.Cylinder298_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder297"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[-0.2, -0.569, -0.272]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder297_M_Plane_0"
                                                geometry={nodes.Cylinder297_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder297_M_Outline_0"
                                                geometry={nodes.Cylinder297_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder296"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[-0.2, -0.569, -0.272]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder296_M_Plane_0"
                                                geometry={nodes.Cylinder296_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder296_M_Outline_0"
                                                geometry={nodes.Cylinder296_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder295"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[-0.2, -0.569, -0.272]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder295_M_Plane_0"
                                                geometry={nodes.Cylinder295_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder295_M_Outline_0"
                                                geometry={nodes.Cylinder295_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder294"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[0, 0.535, -0.176]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder294_M_Plane_0"
                                                geometry={nodes.Cylinder294_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder294_M_Outline_0"
                                                geometry={nodes.Cylinder294_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder293"
                                            position={[0.709, 0.198, 0.017]}
                                            rotation={[-0.2, -0.569, -0.272]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder293_M_Plane_0"
                                                geometry={nodes.Cylinder293_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder293_M_Outline_0"
                                                geometry={nodes.Cylinder293_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder292"
                                            position={[0.699, 0.022, 0.012]}
                                            rotation={[-0.001, 0.224, -1.681]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder292_M_Plane_0"
                                                geometry={nodes.Cylinder292_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder292_M_Outline_0"
                                                geometry={nodes.Cylinder292_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder291"
                                            position={[0.746, 0.397, -0.001]}
                                            rotation={[-0.028, 1.068, 0.046]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder291_M_Plane_0"
                                                geometry={nodes.Cylinder291_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder291_M_Outline_0"
                                                geometry={nodes.Cylinder291_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder290"
                                            position={[0.702, 0.164, 0.021]}
                                            rotation={[0.005, 0.511, 0.216]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder290_M_Plane_0"
                                                geometry={nodes.Cylinder290_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder290_M_Outline_0"
                                                geometry={nodes.Cylinder290_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder289"
                                            position={[0.702, 0.164, 0.021]}
                                            rotation={[0.005, 0.511, 0.216]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder289_M_Plane_0"
                                                geometry={nodes.Cylinder289_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder289_M_Outline_0"
                                                geometry={nodes.Cylinder289_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder288"
                                            position={[0.702, 0.164, 0.021]}
                                            rotation={[0.005, 0.511, 0.216]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder288_M_Plane_0"
                                                geometry={nodes.Cylinder288_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder288_M_Outline_0"
                                                geometry={nodes.Cylinder288_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder287"
                                            position={[1.104, 0.082, -0.089]}
                                            rotation={[0, 0.535, -0.176]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder287_M_Plane_0"
                                                geometry={nodes.Cylinder287_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder287_M_Outline_0"
                                                geometry={nodes.Cylinder287_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder286"
                                            position={[0.38, 0.294, 0.256]}
                                            rotation={[0.113, 0.461, 1.422]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder286_M_Plane_0"
                                                geometry={nodes.Cylinder286_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder286_M_Outline_0"
                                                geometry={nodes.Cylinder286_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder285"
                                            position={[0.345, 0.058, -0.251]}
                                            rotation={[-2.055, -0.496, -0.858]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder285_M_Plane_0"
                                                geometry={nodes.Cylinder285_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder285_M_Outline_0"
                                                geometry={nodes.Cylinder285_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder284"
                                            position={[0.181, 0.028, -0.31]}
                                            rotation={[-1.719, -0.151, -0.387]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder284_M_Plane_0"
                                                geometry={nodes.Cylinder284_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder284_M_Outline_0"
                                                geometry={nodes.Cylinder284_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder283"
                                            position={[0.725, 0.172, -0.005]}
                                            rotation={[-0.242, -0.557, 0.097]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder283_M_Plane_0"
                                                geometry={nodes.Cylinder283_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder283_M_Outline_0"
                                                geometry={nodes.Cylinder283_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder282"
                                            position={[0.976, 0.048, 0.173]}
                                            rotation={[-0.2, -0.569, -0.272]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder282_M_Plane_0"
                                                geometry={nodes.Cylinder282_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder282_M_Outline_0"
                                                geometry={nodes.Cylinder282_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder281"
                                            position={[0.751, 0.151, 0.008]}
                                            rotation={[0, 0.535, -0.176]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder281_M_Plane_0"
                                                geometry={nodes.Cylinder281_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder281_M_Outline_0"
                                                geometry={nodes.Cylinder281_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder280"
                                            position={[0.371, 0.273, 0.25]}
                                            rotation={[0.812, -0.579, 2.112]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder280_M_Plane_0"
                                                geometry={nodes.Cylinder280_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder280_M_Outline_0"
                                                geometry={nodes.Cylinder280_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder279"
                                            position={[0.346, 0.069, 0.239]}
                                            rotation={[-0.642, -0.383, 0.986]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder279_M_Plane_0"
                                                geometry={nodes.Cylinder279_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder279_M_Outline_0"
                                                geometry={nodes.Cylinder279_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder278"
                                            position={[0.609, 0.104, -0.107]}
                                            rotation={[-0.2, -0.569, -0.272]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder278_M_Plane_0"
                                                geometry={nodes.Cylinder278_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder278_M_Outline_0"
                                                geometry={nodes.Cylinder278_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder277"
                                            position={[0.03, 0.187, -0.054]}
                                            rotation={[0.938, -0.844, 1.475]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder277_M_Plane_0"
                                                geometry={nodes.Cylinder277_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder277_M_Outline_0"
                                                geometry={nodes.Cylinder277_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder276"
                                            position={[0.722, 0.193, 0.006]}
                                            rotation={[-3.034, -0.649, 1.705]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder276_M_Plane_0"
                                                geometry={nodes.Cylinder276_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder276_M_Outline_0"
                                                geometry={nodes.Cylinder276_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder275"
                                            position={[0.154, 0.121, -0.002]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.028}
                                        >
                                            <mesh
                                                name="Cylinder275_M_Plane_0"
                                                geometry={nodes.Cylinder275_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder275_M_Outline_0"
                                                geometry={nodes.Cylinder275_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder274"
                                            position={[0.154, 0.121, -0.002]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder274_M_Plane_0"
                                                geometry={nodes.Cylinder274_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder274_M_Outline_0"
                                                geometry={nodes.Cylinder274_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder273"
                                            position={[0.154, 0.121, -0.002]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.028}
                                        >
                                            <mesh
                                                name="Cylinder273_M_Plane_0"
                                                geometry={nodes.Cylinder273_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder273_M_Outline_0"
                                                geometry={nodes.Cylinder273_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder272"
                                            position={[0.154, 0.121, -0.002]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Cylinder272_M_Plane_0"
                                                geometry={nodes.Cylinder272_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder272_M_Outline_0"
                                                geometry={nodes.Cylinder272_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Cylinder271"
                                            position={[0.154, 0.121, -0.002]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.028}
                                        >
                                            <mesh
                                                name="Cylinder271_M_Plane_0"
                                                geometry={nodes.Cylinder271_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Cylinder271_M_Outline_0"
                                                geometry={nodes.Cylinder271_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Empty029"
                                            position={[0.21, 0.132, 0]}
                                            rotation={[-1.354, 0, 0]}
                                            scale={0.027}
                                        >
                                            <group
                                                name="Cylinder321"
                                                position={[0.19, 0, 0]}
                                                rotation={[0, Math.PI / 2, 0]}
                                            >
                                                <mesh
                                                    name="Cylinder321_M_Plane_0"
                                                    geometry={nodes.Cylinder321_M_Plane_0.geometry}
                                                    material={materials.M_Plane}
                                                />
                                                <mesh
                                                    name="Cylinder321_M_Outline_0"
                                                    geometry={nodes.Cylinder321_M_Outline_0.geometry}
                                                    material={materials.M_Outline}
                                                />
                                            </group>
                                            <group name="Plane083" rotation={[0.36, 0, 0]}>
                                                <mesh
                                                    name="Plane083_M_Plane_0"
                                                    geometry={nodes.Plane083_M_Plane_0.geometry}
                                                    material={materials.M_Plane}
                                                />
                                                <mesh
                                                    name="Plane083_M_Outline_0"
                                                    geometry={nodes.Plane083_M_Outline_0.geometry}
                                                    material={materials.M_Outline}
                                                />
                                            </group>
                                            <group
                                                name="Plane072"
                                                position={[-0.101, 0, 0]}
                                                rotation={[-2.008, -1.571, 0]}
                                                scale={-12.405}
                                            >
                                                <mesh
                                                    name="Plane072_M_Plane_HasOpacity_0"
                                                    geometry={
                                                        nodes.Plane072_M_Plane_HasOpacity_0.geometry
                                                    }
                                                    material={materials.M_Plane_HasOpacity}
                                                />
                                            </group>
                                        </group>
                                        <group
                                            name="Plane084"
                                            position={[-0.259, 0.129, 0.124]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane084_M_Plane_0"
                                                geometry={nodes.Plane084_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Plane084_M_Outline_0"
                                                geometry={nodes.Plane084_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Plane082"
                                            position={[0.503, 0.392, 0.616]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane082_M_Plane_HasOpacity_0"
                                                geometry={nodes.Plane082_M_Plane_HasOpacity_0.geometry}
                                                material={materials.M_Plane_HasOpacity}
                                            />
                                        </group>
                                        <group
                                            name="Plane081"
                                            position={[0.768, 0.407, -0.003]}
                                            rotation={[-0.167, -0.221, -0.126]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane081_M_Plane_HasOpacity_0"
                                                geometry={nodes.Plane081_M_Plane_HasOpacity_0.geometry}
                                                material={materials.M_Plane_HasOpacity}
                                            />
                                        </group>
                                        <group
                                            name="Plane080"
                                            position={[-0.053, 0.052, 0.121]}
                                            rotation={[-1.406, 0.174, -0.069]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane080_M_Plane_0"
                                                geometry={nodes.Plane080_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Plane080_M_Outline_0"
                                                geometry={nodes.Plane080_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Plane079"
                                            position={[-0.003, 0, -0.096]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane079_M_Plane_0"
                                                geometry={nodes.Plane079_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Plane079_M_Outline_0"
                                                geometry={nodes.Plane079_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Plane078"
                                            position={[-0.151, 0.214, -0.063]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane078_M_Plane_0"
                                                geometry={nodes.Plane078_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Plane078_M_Outline_0"
                                                geometry={nodes.Plane078_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Plane077"
                                            position={[-0.047, 0.408, -0.164]}
                                            rotation={[-1.475, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane077_M_Plane_0"
                                                geometry={nodes.Plane077_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Plane077_M_Outline_0"
                                                geometry={nodes.Plane077_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Plane076"
                                            position={[-0.047, 0.394, -0.023]}
                                            rotation={[-1.634, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane076_M_Plane_0"
                                                geometry={nodes.Plane076_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Plane076_M_Outline_0"
                                                geometry={nodes.Plane076_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Plane075"
                                            position={[0.035, 0.387, -0.113]}
                                            rotation={[-1.475, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane075_M_Plane_0"
                                                geometry={nodes.Plane075_M_Plane_0.geometry}
                                                material={materials.M_Plane}
                                            />
                                            <mesh
                                                name="Plane075_M_Outline_0"
                                                geometry={nodes.Plane075_M_Outline_0.geometry}
                                                material={materials.M_Outline}
                                            />
                                        </group>
                                        <group
                                            name="Plane074"
                                            position={[0.547, 0.341, -0.608]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane074_M_Plane_HasOpacity_0"
                                                geometry={nodes.Plane074_M_Plane_HasOpacity_0.geometry}
                                                material={materials.M_Plane_HasOpacity}
                                            />
                                        </group>
                                        <group
                                            name="Plane073"
                                            position={[0.879, 0.344, 0.009]}
                                            rotation={[-1.57, -0.017, 0.003]}
                                            scale={0.027}
                                        >
                                            <mesh
                                                name="Plane073_M_Plane_HasOpacity_0"
                                                geometry={nodes.Plane073_M_Plane_HasOpacity_0.geometry}
                                                material={materials.M_Plane_HasOpacity}
                                            />
                                        </group>
                                    </group>
                                </group>
                                <group
                                    name="Empty026"
                                    position={[133813.125, 0, 0]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                    scale={100}
                                >
                                    <group
                                        name="Plane069"
                                        position={[102.91, -1.394, 0.495]}
                                        scale={[102.593, 1, 1]}
                                    >
                                        <mesh
                                            name="Plane069_M_Plane_HasOpacity_0"
                                            geometry={nodes.Plane069_M_Plane_HasOpacity_0.geometry}
                                            material={materials.M_Plane_HasOpacity}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </a.group>
        // <mesh {...props} ref={planeRef}>
        //   {/* use the primitive element when you want to directly embed a complex 3D
        //   model or scene */}
        //   <primitive object={scene} />
        // </mesh> 
    );
}