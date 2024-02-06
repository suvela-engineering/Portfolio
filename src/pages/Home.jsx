import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Forest from '../models/Forest'
import Sky from '../models/Sky';
import Wolf from '../models/Wolf';
import Fox from '../models/Fox';
import Fox_Simple from '../models/Fox_Simple';

{/* <div className='absolute top-28 left-0 right-0 flex justify-center items-center'>
    Pop-up
</div> */}

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    const adjustForestForScreenSize = () => {
        let screenScale = [200,200,200];
        let screenPosition = [0.,-10, -43];

        if (window.innerWidth < 768) 
            screenScale = [50.50,50];

        return [screenScale, screenPosition];
    }

    const adjustFoxSimpleForScreenSize = () => {
        let screenScale, screenPosition;

        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [2, -3, -1];
        }

        else {
            screenScale = [5, 5, 5];
            screenPosition = [1, 1, 11];
        }

        // position={[2,-3,-1]} scale={[1,1,1]}

        return [screenScale, screenPosition];
    }

    const [forestScale, forestPosition] = adjustForestForScreenSize();
    const [foxSimpleScale, foxSimplePosition] = adjustFoxSimpleForScreenSize();

    return (
        <section className='w-full h-screen relative'>
{/* 
            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div> */}

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


                    <Fox/>
                    <Wolf />
                    <Sky />
                    <Forest
                        position={forestPosition}
                        rotation={[0.1, 4.7077, 0]}
                        scale={forestScale}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Fox_Simple
                        isRotating={isRotating}
                        foxSimpleScale={foxSimpleScale}
                        foxSimplePosition={foxSimplePosition}
                        rotation={[0,-90,0]}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home