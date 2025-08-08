import { DEFAULT_PILES, getOptimalMove, isGameOver } from "@/lib/nimGameLogic";
import { saveGame } from "@/lib/storage";
import type { GameMode } from "@/types/commonType";
import type { GameState } from "@/types/gameState";
import type { Move } from "@/types/move";
import type { SavedGame } from "@/types/savedGame";
import type { GameSettings, StoneSelection } from "@/types/settings";
import { useCallback, useEffect, useState } from "react";

export const useNimGame = (mode: GameMode, settings: GameSettings) => {
    // Ensure we have valid initial piles
    // dùng để lấy các đống đá ban đầu, nếu không có thì dùng mặc định 
    const getInitialPiles = () => {
        if (mode === "PVE") {
            return settings?.pve?.customPiles && Array.isArray(settings.pve.customPiles)
                ? [...settings.pve.customPiles]
                : [...DEFAULT_PILES]
        } else {
            return settings?.pvp?.customPiles && Array.isArray(settings.pvp.customPiles)
                ? [...settings.pvp.customPiles]
                : [...DEFAULT_PILES]
        }
    }

    const [gameState, setGameState] = useState<GameState>({
        id: crypto.randomUUID(),
        mode,
        piles: getInitialPiles(),
        currentPlayer:
            mode === "PVE" && settings?.pve?.playerGoesFirst ? "player1" : mode === "PVE" ? "computer" : "player1",
        gameStatus: "playing",
        isAnimating: false,
        moveHistory: [],
        createdAt: new Date(),
        lastModified: new Date(),
    })

    const [selectedStones, setSelectedStones] = useState<StoneSelection>({})
    const [removingStones, setRemovingStones] = useState<StoneSelection>({})

    const executeMove = useCallback(
        async (pileIndex: number, amount: number, player: GameState["currentPlayer"]) => {
            setGameState((prev) => ({ ...prev, isAnimating: true }))

            // Đánh dấu stones sẽ bị xóa (từ bên phải)
            const stonesToRemove = Array.from({ length: amount }, (_, i) => gameState.piles[pileIndex] - 1 - i)
            setRemovingStones({ [pileIndex]: stonesToRemove })

            await new Promise((resolve) => setTimeout(resolve, 1200))

            const move: Move = {
                player,
                pileIndex,
                amount,
                timestamp: new Date(),
            }

            //cập nhật lại số đá của các pile và lịch sử 
            setGameState((prev) => ({
                ...prev,
                piles: prev.piles.map((pile, index) => (index === pileIndex ? pile - amount : pile)),
                moveHistory: [...prev.moveHistory, move],
                isAnimating: false,
                lastModified: new Date(),
            }))

            setRemovingStones({})
            setSelectedStones({})
        },
        [gameState.piles],
    )

    const handleStoneClick = useCallback(
        (pileIndex: number, stoneNumber: number) => {
            if (gameState.isAnimating || gameState.gameStatus !== "playing") return
            if (gameState.mode === "PVE" && gameState.currentPlayer === "computer") return // can't click on computer turn 

            // stoneNumber là số lượng stones sẽ lấy (từ 1 đến số stones trong pile)
            const amount = Math.min(stoneNumber, gameState.piles[pileIndex])

            executeMove(pileIndex, amount, gameState.currentPlayer).then(() => {
                if (gameState.mode === "PVE") {
                    setGameState((prev) => ({ ...prev, currentPlayer: "computer" }))
                } else {
                    setGameState((prev) => ({
                        ...prev,
                        currentPlayer: prev.currentPlayer === "player1" ? "player2" : "player1",
                    }))
                }
            })
        },
        [gameState.isAnimating, gameState.gameStatus, gameState.mode, gameState.currentPlayer, executeMove],
    )

    const makeComputerMove = useCallback(async () => {
        const move = getOptimalMove(gameState.piles, settings.pve.difficulty)
        await executeMove(move.pileIndex, move.amount, "computer")
        setGameState((prev) => ({ ...prev, currentPlayer: "player1" }))
    }, [gameState.piles, settings.pve.difficulty, executeMove])

    const saveCurrentGame = useCallback(() => {
        const savedGame: SavedGame = {
            gameState,
            settings,
            selectedStones,
        }
        saveGame(savedGame)
    }, [gameState, settings, selectedStones])

    const loadGame = useCallback((savedGame: SavedGame) => {
        setGameState(savedGame.gameState)
        setSelectedStones(savedGame.selectedStones)
        setRemovingStones({})
    }, [])

    const resetGame = useCallback(() => {
        setGameState({
            id: crypto.randomUUID(),
            mode,
            piles: getInitialPiles(),
            currentPlayer:
                mode === "PVE" && settings.pve.playerGoesFirst ? "player1" : mode === "PVE" ? "computer" : "player1",
            gameStatus: "playing",
            isAnimating: false,
            moveHistory: [],
            createdAt: new Date(),
            lastModified: new Date(),
        })
        setSelectedStones({})
        setRemovingStones({})
    }, [mode, settings])

    // Check game end
    useEffect(() => {
        if (isGameOver(gameState.piles) && gameState.gameStatus === "playing") {
            setGameState((prev) => ({
                ...prev,
                gameStatus: prev.currentPlayer === "player1" ? "lost" : "won",
            }))
        }
    }, [gameState.piles, gameState.currentPlayer, gameState.gameStatus])

    // Computer move
    useEffect(() => {
        if (
            gameState.mode === "PVE" &&
            gameState.currentPlayer === "computer" &&
            gameState.gameStatus === "playing" &&
            !gameState.isAnimating
        ) {
            const timer = setTimeout(makeComputerMove, 1500)
            return () => clearTimeout(timer)
        }
    }, [gameState.mode, gameState.currentPlayer, gameState.gameStatus, gameState.isAnimating, makeComputerMove])

    return {
        gameState,
        selectedStones,
        removingStones,
        handleStoneClick,
        saveCurrentGame,
        loadGame,
        resetGame,
    }
}