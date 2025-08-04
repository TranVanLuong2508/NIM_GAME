import type { Move } from "@/types/move";
import type { Difficulty } from "@/types/commonType";

export const DEFAULT_PILES = [3, 5, 7, 4]

export const calculateNimSum = (piles: number[]): number => {
    return piles.reduce((sum, pile) => sum ^ pile, 0)
}

export const getOptimalMove = (piles: number[], difficulty: Difficulty = "hard"): Move => {
    const nimSum = calculateNimSum(piles)

    // Easy: 70% random moves
    if (difficulty === "easy" && Math.random() < 0.7) {
        return getRandomMove(piles)
    }

    // Medium: 40% random moves
    if (difficulty === "medium" && Math.random() < 0.4) {
        return getRandomMove(piles)
    }

    // Optimal strategy
    if (nimSum === 0) {
        return getRandomMove(piles)
    }

    for (let i = 0; i < piles.length; i++) {
        const targetSize = piles[i] ^ nimSum
        if (targetSize < piles[i]) {
            return {
                player: "computer",
                pileIndex: i,
                amount: piles[i] - targetSize,
                timestamp: new Date(),
            }
        }
    }

    return getRandomMove(piles)
}

const getRandomMove = (piles: number[]): Move => {
    const availablePiles = piles.map((pile, index) => ({ pile, index })).filter(({ pile }) => pile > 0)

    if (availablePiles.length === 0) {
        return {
            player: "computer",
            pileIndex: 0,
            amount: 0,
            timestamp: new Date(),
        }
    }

    const randomPile = availablePiles[Math.floor(Math.random() * availablePiles.length)]
    const amount = Math.floor(Math.random() * randomPile.pile) + 1

    return {
        player: "computer",
        pileIndex: randomPile.index,
        amount,
        timestamp: new Date(),
    }
}

export const isGameOver = (piles: number[]): boolean => {
    return piles.every((pile) => pile === 0)
}

export const calculateStonePositions = (
    stoneCount: number,
    basePosition: [number, number, number] = [0, 0, 0],
): [number, number, number][] => {
    // Validate inputs
    if (!basePosition || basePosition.length !== 3) {
        basePosition = [0, 0, 0]
    }

    if (stoneCount <= 0) {
        return []
    }

    const positions: [number, number, number][] = []
    const stoneSpacing = 0.7 // Khoảng cách giữa các đá

    // Sắp xếp stones theo hàng dọc (theo trục Z)
    for (let i = 0; i < stoneCount; i++) {
        const x = basePosition[0]
        const y = basePosition[1] + 0.3 // Đặt đá trên mặt đất
        const z = basePosition[2] + i * stoneSpacing // Xếp theo chiều dài (trục Z)

        positions.push([x, y, z])
    }

    return positions
}

