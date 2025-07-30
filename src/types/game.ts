// Chứa GameMode, GameStatus, Player, GameState, SavedGame.
import type { GameMode, Player } from "@/types/commonType"
import type { Move } from "@/types/move"


export interface GameState {
    id: string
    mode: GameMode
    piles: number[]
    currentPlayer: Player
    gameStatus: GameState
    isAnimating: boolean
    moveHistory: Move[]
    createdAt: Date
    lastModified: Date
}