import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import PlaneOrange from '../models/Plane';

{/* <div className='absolute top-28 left-0 right-0 flex justify-center items-center'>
    Pop-up
</div> */}

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    const adjustPlaneForScreenSize = () => {
        let screenScale; 
        let screenPosition = [-3, 0, -42];
        let screenRotation = [1, -0.4, 0.1];

        // if (window.innerWidth < 768) 
        //     screenScale = [0.005, 0.005, 0.005];

        // else 
            screenScale = [1, 1, 1];

        return [screenScale, screenPosition, screenRotation];
    }

    const [planeScale, planeposition, planeRotation] = adjustPlaneForScreenSize();

    return (
        <section className='w-full h-screen relative'>

            <div className='absolute top-88 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent' ${isRotating ?
                    'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[12, 10, 20]} intensity={5} />
                    <ambientLight intensity={50} />
                    <hemisphereLight skyColor="lightblue" groundColor="lightgreen" intensity={6} />

                    {/* <pointLight />, used for light inside, this model is outside
                        <spotLight/>,   a bit lie point light but can used with angle */}

                    {/* <Sky isRotating={isRotating}/> */}
                    <PlaneOrange
                        position={planeposition}
                        rotation={planeRotation}//[0.1, 4.7077, 0]}workBenchScale
                        scale={planeScale}
                        isRotating={isRotating}
        // setIsRotating={setIsRotating}
                        // setCurrentStage={setCurrentStage}
                    />
                    {/* <Forest
                        position={forestPosition}
                        rotation={[0.1, 4.7077, 0]}
                        scale={forestScale}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <FoxSimple
                        scale={foxSimpleScale}
                        position={foxSimplePosition}
                        rotation={[0, 80, 0]}
                        isRotating={isRotating}
                    />
                    <Wolf
                        scale={wolfScale}
                        position={wolfPosition}
                        // position={[forestRef.current.position.x + 0, forestRef.current.position.y + 3, forestRef.current.position.z + 0]}
                        rotation={[0, 80, 0]} */}
{/* 
                        // wolfRef={wolfRef} // Forward the ref
                    /> */} 
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home