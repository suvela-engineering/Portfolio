import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Forest from '../models/Forest'
import Sky from '../models/Sky';

{/* <div className='absolute top-28 left-0 right-0 flex justify-center items-center'>
    Pop-up
</div> */}

const Home = () => {
    const adjustForestForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0.,-10, -43];
        let rotation = [0,0,0];

        if (window.innerWidth < 768) 
            screenScale = [50.50,50];

        else 
            screenScale = [175,175,175];
        
        return [screenScale,screenPosition, rotation];
    }

    const [forestScale, forestPosition, forestRotation] = adjustForestForScreenSize();


    return (
        <section className='w-full h-screen relative'>
            <Canvas
                className='w-full h-screen bg-transparent'
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[5,1,1]} intensity={5} />
                    <ambientLight intensity={3}/>             
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
                    
                    {/* <pointLight />, used for light inside, this model is outside
                        <spotLight/>,   a bit lie point light but can used with angle */}

                    <Sky />
                    <Forest 
                        position={forestPosition}
                        scale   ={forestScale}
                        rotation={forestRotation}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home