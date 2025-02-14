import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useCamera } from '@react-three/drei';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import PlaneOrange from '../models/Plane';
import Sky from '../models/Sky';
import SmallDragon from '../models/SmallDragon';
import SnowDragon from '../models/SnowDragon';

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isClick, setIsClick] = useState(false);

    const minWidth = 640;

    const adjustPlaneForScreenSize = () => {
        let screenScale = [2, 2, 2];
        let screenPosition = [100, -100, -200]; // viimenen -200
        let screenRotation = [0, -1.5, 0];

        if (window.innerWidth < minWidth) {
            screenScale = [1, 1, 1];
            screenPosition = [0, -100, -200];
        }

        return [screenScale, screenPosition, screenRotation];
    }

    const adjustSmallDragonForScreenSize = () => {
        let screenScale = [2, 2, 2];;
        let screenPosition = [-50, 50, -200]; // Remember to change X position (first to SmallDragon -> Change direction around axis -> move forward        )
        let screenRotation = [3.3, 13.1, 2.8];

        if (window.innerWidth < minWidth) {
            screenScale = [0.5, 0.5, 0.5];;
            screenPosition = [100, -100, -200];
        }

        return [screenScale, screenPosition, screenRotation];
    }

    const adjustSnowDragonForScreenSize = () => {
        let screenScale = [150, 150, 150];;
        let screenPosition = [200, -100, -550]; // Remember to change X position (first to SnowDragon -> Change direction around axis -> move forward        )
        let screenRotation = [6.6, 1.8, 7];

        if (window.innerWidth < minWidth)
            screenScale = [75, 75, 75];

        return [screenScale, screenPosition, screenRotation];
    }

    const [planeScale, planePosition, planeRotation] = adjustPlaneForScreenSize();
    const [smallDragonScale, smallDragonPosition, smallDragonRotation] = adjustSmallDragonForScreenSize();
    const [snowDragonScale, snowDragonPosition, snowDragonRotation] = adjustSnowDragonForScreenSize();

    return (
        <section className="w-full h-screen relative">
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent`}
                camera={{ near: 0.1, far: 1000 }}
                style={{ overflow: 'auto' }}
            >
                <OrbitControls /> {/* This fixes the sticky touch move on mobile */}
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={1} />
                    <ambientLight intensity={1} />
                    <hemisphereLight skyColor="#87d3ff" groundColor="#000000" intensity={0} />

                    {/* <pointLight />, used for light inside, this model is outside
                        <spotLight/>,   a bit lie point light but can used with angle */}

                    <Sky
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                    />
                    <PlaneOrange
                        position={planePosition}
                        rotation={planeRotation}
                        scale={planeScale}
                        isAnimating={true}
                        isClick={isClick}
                        setIsClick={setIsClick}
                        setCurrentStage={setCurrentStage}
                    />
                    <SmallDragon
                        position={smallDragonPosition}
                        rotation={smallDragonRotation}
                        scale={smallDragonScale}
                        isAnimating={true}
                    />
                    <SnowDragon
                        position={snowDragonPosition}
                        rotation={snowDragonRotation}
                        scale={snowDragonScale}
                        isAnimating={true}
                        setCurrentStage={setCurrentStage}
                        currentStage={currentStage}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home