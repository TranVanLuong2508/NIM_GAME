interface LevelStruture {
    title: string
    numberStone: number
}

export const Level: Record<"easy" | "normal" | "hard" | "expert", LevelStruture> = {
    easy: {
        title: "Dễ",
        numberStone: 3
    },
    normal: {
        title: "Trung bình",
        numberStone: 4
    },
    hard: {
        title: "Khó",
        numberStone: 5
    },
    expert: {
        title: "Chuyên gia",
        numberStone: 7
    },
}

export default { Level }