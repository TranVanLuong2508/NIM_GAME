interface LevelStruture {
    title: string
    numberStone: number
    value: string
}

export const Level: Record<"easy" | "medium" | "hard", LevelStruture> = {
    easy: {
        title: "Dễ",
        numberStone: 3,
        value: "easy"
    },
    medium: {
        title: "Trung bình",
        numberStone: 3,
        value: "medium"
    },
    hard: {
        title: "Khó",
        numberStone: 3,
        value: "hard"
    },

}

export default Level 