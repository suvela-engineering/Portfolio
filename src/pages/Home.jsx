import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Forest from '../models/Forest'
import Sky from '../models/Sky';
import Fox from '../models/Fox';
import FoxSimple from '../models/FoxSimple';
import HomeInfo from '../components/HomeInfo';
import Wolf from '../models/Wolf';
import ForestGroup from '../models/ForestGroup';

{/* <div className='absolute top-28 left-0 right-0 flex justify-center items-center'>
    Pop-up
</div> */}

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    const adjustForestForScreenSize = () => {
        let screenScale = [275,275,275];
        //test
        // let screenScale = [2,2,2];

        let screenPosition = [0,-10, -43];

        if (window.innerWidth < 768) 
            screenScale = [75,75,75];

        return [screenScale, screenPosition];
    }

    const adjustFoxSimpleForScreenSize = () => {
        let screenScale; 
        let screenPosition = [0, -10, -11];

        if (window.innerWidth < 768) 
            screenScale = [1.5, 1.5, 1.5];

        else 
            screenScale = [4, 4, 4];

        return [screenScale, screenPosition];
    }

    const adjustWolfForScreenSize = () => {
        let screenScale; 
        let screenPosition = [20, -10, -43];

        if (window.innerWidth < 768) 
            screenScale = [0.005, 0.005, 0.005];

        else 
            screenScale = [5, 5, 5];

        return [screenScale, screenPosition];
    }

    const [forestScale, forestPosition] = adjustForestForScreenSize();
    const [foxSimpleScale, foxSimplePosition] = adjustFoxSimpleForScreenSize();
    const [wolfScale, wolfPosition] = adjustWolfForScreenSize();


    return (
        <section className='w-full h-screen relative'>

            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>

            <Canvas
                className={`w-full h-screen bg-transparent' ${isRotating ? 
                'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[5,1,1]} intensity={5} />
                    <ambientLight intensity={3}/>             
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
                    
                    {/* <pointLight />, used for light inside, this model is outside
                        <spotLight/>,   a bit lie point light but can used with angle */}

                    <Sky isRotating={isRotating}/>
                    <Forest
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
                        rotation={[0, 80, 0]}

                        // wolfRef={wolfRef} // Forward the ref
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home