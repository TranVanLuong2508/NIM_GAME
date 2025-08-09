import type { Difficulty } from "@/types/commonType"
interface LevelStruture {
    title: string
    numPile: number,
    maxStones: number
    value: Difficulty
}

export const Level: Record<"easy" | "medium" | "hard", LevelStruture> = {
    easy: {
        title: "Dễ",
        numPile: 3,
        maxStones: 5,
        value: "easy"
    },
    medium: {
        title: "Trung bình",
        numPile: 6,
        maxStones: 7,
        value: "medium"
    },
    hard: {
        title: "Khó",
        numPile: 9,
        maxStones: 9,
        value: "hard"
    },

}

export default Level 