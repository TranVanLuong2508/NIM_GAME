import React from 'react'
import { Text } from "@react-three/drei"
import Stone from '@/3d/models/Stone'
import type { PileProps } from '@/types/PropTypes/PileProps'
import { calculateStonePositions } from '@/utils/gameLogic'

const Pile = ({ stones, pileIndex, position, selectedStones, onStoneClick, removingStones }: PileProps) => {
    const safeStones = Math.max(0, stones || 0)
    const safePosition: [number, number, number] = position || [0, 0, 0]
    const safeSelectedStones = selectedStones || []
    const safeRemovingStones = removingStones || []

    if (safeStones === 0) {
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

    const stonePositions = calculateStonePositions(safeStones, safePosition)
    return (
        <group>
            {stonePositions.map((pos, index) => {
                const stoneNumber = safeStones - index
                const isClickable = true
                return (
                    <Stone
                        position={pos}
                        onClick={() => onStoneClick(pileIndex, stoneNumber)} // Số lượng stones sẽ lấy
                        isSelected={safeSelectedStones.includes(index)}
                        isRemoving={safeRemovingStones.includes(index)}
                        isClickable={isClickable}
                    />
                )
            })}
            <Text
                position={[safePosition[0], safePosition[1] + 1.2, safePosition[2] - 1]}
                fontSize={0.5}
                color="#1f2937"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Bold.ttf"
            >
                {`Pile ${String.fromCharCode(65 + pileIndex)}`}
            </Text>
            <Text
                position={[safePosition[0], safePosition[1] + 0.7, safePosition[2] - 1]}
                fontSize={0.3}
                color="#6b7280"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Regular.ttf"
            >
                {`${safeStones} stones`}
            </Text>

            <mesh position={[safePosition[0], safePosition[1] - 0.1, safePosition[2] + (safeStones * 0.7) / 2]}>
                <boxGeometry args={[0.1, 0.05, safeStones * 0.7]} />
                <meshStandardMaterial color="#d1d5db" transparent opacity={0.5} />
            </mesh>
        </group>
    )
}

export default Pile