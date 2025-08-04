// Chứa PVESettings, PVPSettings, GameSettings.
import type { Difficulty } from "@/types/commonType"
export interface PVESettings {
    difficulty: Difficulty
    playerGoesFirst: boolean
    customPiles?: number[]
}

export interface PVPSettings {
    player1Name: string
    player2Name: string
    customPiles?: number[]
}


export interface GameSettings {
    pve: PVESettings,
    pvp: PVPSettings,
    theme: "light" | "dark"
    soundEnabled: boolean
}

export interface StoneSelection {
    [pileIndex: number]: number[]
}