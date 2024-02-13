import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import PlaneOrange from '../models/Plane';
import Sky from '../models/Sky';
import SmallDragon from '../models/SmallDragon';
import SnowDragon from '../models/SnowDragon';

const Home = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isClick, setIsClick] = useState(false);

    let minWidth = 640;

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
        <section className='w-full h-screen relative'>

            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent' ${isAnimating ?
                    'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
                onPointerDown={(e) => e.target.requestPointerLock()}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={1} />
                    <ambientLight intensity={1} />
                    <hemisphereLight skyColor="#87d3ff" groundColor="#000000"
                        intensity={0} />

                    {/* <pointLight />, used for light inside, this model is outside
                        <spotLight/>,   a bit lie point light but can used with angle */}

                    <Sky
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
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
                        setCurrentStage={setCurrentStage}
                        currentStage={currentStage}
                        nextPagePath="/About"
                    />
                    <SnowDragon
                        position={snowDragonPosition}
                        rotation={snowDragonRotation}
                        scale={snowDragonScale}
                        isAnimating={true}
                        setIsAnimating={setIsAnimating}
                        setCurrentStage={setCurrentStage}
                        currentStage={currentStage}
                        nextPagePath="/Contact"
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home