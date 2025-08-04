import React from 'react'
import { Text } from "@react-three/drei"
import Stone from '@/3d/models/Stone'
import type { PileProps } from '@/types/PropTypes/PileProps'
import { calculateStonePositions } from '@/utils/gameLogic'

const Pile = ({ stones, pileIndex, position, onStoneClick }: PileProps) => {
    const stoneCount = Math.max(0, stones || 0)
    const safePosition: [number, number, number] = position || [0, 0, 0]

    console.log('pile')

    if (stoneCount === 0) {
        return (
            <group>
                <Text
                    position={[safePosition[0], safePosition[1] + 1, safePosition[2]]}
                    fontSize={0.4}
                    color="#9ca3af"
                    anchorX="center"
                    anchorY="middle"
                >
                    {`Pile ${String.fromCharCode(65 + pileIndex)} (0)`}
                </Text>
            </group>
        )
    }

    const stonePositions = calculateStonePositions(stoneCount, safePosition)

    return (
        <group>
            {stonePositions.map((pos, index) => {

                return (
                    <Stone
                        position={pos}
                        onClick={() => { onStoneClick(pileIndex, index) }}
                    />
                )
            })}
            <Text
                position={[safePosition[0], safePosition[1] + 1.2, safePosition[2] - 1]}
                fontSize={0.5}
                color="#1f2937"
                anchorX="center"
                anchorY="middle"

            >
                {`Pile ${String.fromCharCode(65 + pileIndex)}`}
            </Text>
            <Text
                position={[safePosition[0], safePosition[1] + 0.7, safePosition[2] - 1]}
                fontSize={0.3}
                color="#6b7280"
                anchorX="center"
                anchorY="middle"
            >
                {`${stoneCount} stones`}
            </Text>

            <mesh position={[safePosition[0], safePosition[1] - 0.1, safePosition[2] + (stoneCount * 0.7) / 2]}>
                <boxGeometry args={[0.1, 0.05, stoneCount * 0.7]} />
                <meshStandardMaterial color="#d1d5db" transparent opacity={0.5} />
            </mesh>
        </group>
    )
}

export default Pile