import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import HomeInfo from '../components/HomeInfo';
import PlaneOrange from '../models/Plane';
import Sky from '../models/Sky';

{/* <div className='absolute top-28 left-0 right-0 flex justify-center items-center'>
    Pop-up
</div> */}

const Home = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isClick, setIsClick] = useState(false);


    const adjustPlaneForScreenSize = () => {
        let screenScale;
        let screenPosition = [-3, 0, -200]; // viimenen -200
        let screenRotation = [0.6, -0.4, 0.1];

        // if (window.innerWidth < 768) 
        //     screenScale = [0.005, ½0.005, 0.005];

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
                className={`w-full h-screen bg-transparent' ${isAnimating ?
                    'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={0} />
                    <ambientLight intensity={0} />
                    <hemisphereLight skyColor="#87d3ff" groundColor="#000000"
                        intensity={0} />

                    {/* <pointLight />, used for light inside, this model is outside
                        <spotLight/>,   a bit lie point light but can used with angle */}

                    <Sky
                        position={[0, 0, 43]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <PlaneOrange
                        position={planeposition}
                        rotation={planeRotation}//[0.1, 4.7077, 0]}workBenchScale
                        scale={planeScale}
                        isAnimating={true}
                        isClick={isClick}
                        setIsClick={setIsClick}
                        setCurrentStage={setCurrentStage}
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