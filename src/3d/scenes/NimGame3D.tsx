import React from 'react'
import { Canvas } from "@react-three/fiber"

import GameScence from '@/3d/models/GameScence'
const NimGame3D = () => {
    return (
        <div className='w-full h-screen '>
            <Canvas shadows camera={{ position: [0, 12, 8], fov: 60 }} className='w-full h-full'>
                <GameScence
                    piles={[3, 5, 7]}
                // selectedStones={selectedStones}
                // onStoneClick={handleStoneClick}
                // removingStones={removingStones}
                // gameState={gameState}
                // settings={settings}
                />
            </Canvas>
        </div>
    )
}

export default NimGame3D