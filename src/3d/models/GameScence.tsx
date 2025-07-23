import React from 'react'
import { OrbitControls, Sky, Environment } from "@react-three/drei"

const GameScence = () => {

    return (
        <>
            <Sky sunPosition={[100, 20, 100]} />
            <Environment preset='dawn' />
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
            />
            <mesh rotation={[- Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[15, 20]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.8} />
            </mesh >

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={10}
                maxDistance={30}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    )
}

export default GameScence