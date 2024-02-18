import { Html } from "@react-three/drei";

const Loader = () => {
    return (
        <Html>
            <div className='absolute top-35 left-0 right-0 z-1 flex justify-center items-center'>
                <div className='w-20 h-20 border-2 border-opacity-20 border-blue-500
             border-t-blue-500 rounded-full animate-spin'>
                </div>
            </div>
        </Html>
    )
}

export default Loader