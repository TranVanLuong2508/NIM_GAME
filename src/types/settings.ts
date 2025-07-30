// Chứa PVESettings, PVPSettings, GameSettings.
import type { Difficulty } from "@/types/commonType"
export interface PVESettings {
    difficulty: Difficulty
    playerGoesFirst: boolean
    customPiles?: number[]
}

export interface GameSettings {
    pve: PVESettings
    theme: "light" | "dark"
    soundEnabled: boolean
}

export interface StoneSelection {
    [pileIndex: number]: number[]
}