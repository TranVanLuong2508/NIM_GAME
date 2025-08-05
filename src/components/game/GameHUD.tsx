import type { GameState } from "@/types/gameState"
import type { GameSettings } from "@/types/settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GameMenuDropDown from "@/components/game/GameMenuDropDown"
import { Badge } from "@/components/ui/badge"


interface GameHUDProps {
    gameState: GameState
    settings: GameSettings
    onSaveGame: () => void
    onResetGame: () => void
    onExitGame: () => void
    onExportGame: () => void
}

const GameHud = ({ gameState, onSaveGame, onExportGame, onResetGame, onExitGame }: GameHUDProps) => {

    const totalStones = gameState.piles.reduce((sum, pile) => sum + pile, 0) //tổng số lương đá trong tất cả các pile
    {/* Top Right - Pile Status and Menu */ }



    return (
        <>
            {/* Top Right - Pile Status and Menu */}
            <div className="absolute top-4 right-4 space-y-4">
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Pile Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {gameState.piles.map((count, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                                <span>Pile {String.fromCharCode(65 + index)}:</span>
                                <Badge variant="outline">{count}</Badge>
                            </div>
                        ))}
                        <div className="pt-2 border-t">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span>Total:</span>
                                <Badge>{totalStones}</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Game Menu Dropdown */}
                <div className="flex justify-end">
                    <GameMenuDropDown
                        onSaveGame={onSaveGame}
                        onExportGame={onExportGame}
                        onResetGame={onResetGame}
                        onExitGame={onExitGame}
                    />
                </div>
            </div>

            {/* Game Status Overlay - Center */}
            {gameState.gameStatus !== "playing" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
                        <CardContent className="p-6 text-center">
                            <div
                                className={`text-2xl font-bold mb-2 ${gameState.gameStatus === "won" ? "text-green-600" : "text-red-600"}`}
                            >
                                {gameState.gameStatus === "won"
                                    ? "🎉 You Won!"
                                    : gameState.gameStatus === "lost"
                                        ? "😔 You Lost!"
                                        : "Game Over"}
                            </div>
                            <p className="text-gray-600">
                                {gameState.gameStatus === "won" ? "Congratulations! You played well!" : "Better luck next time!"}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Computer Thinking Indicator */}
            {gameState.currentPlayer === "computer" && gameState.gameStatus === "playing" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Card className="bg-white/95 backdrop-blur-sm border-gray-200">
                        <CardContent className="p-4 flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                            <span className="text-gray-700 font-medium">Computer is thinking...</span>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Bottom - Move History */}
            {gameState.moveHistory.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4">
                    <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Recent Moves</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-32 overflow-y-auto">
                            <div className="space-y-1">
                                {gameState.moveHistory.slice(-5).map((move, index) => (
                                    <div key={index} className="text-xs flex justify-between items-center">
                                        <span>
                                            {move.player === "computer"
                                                ? "Computer"
                                                : move.player === "player1"
                                                    ? gameState.mode === "PVE"
                                                        ? "You"
                                                        : "Player 1"
                                                    : "Player 2"}{" "}
                                            took {move.amount} from Pile {String.fromCharCode(65 + move.pileIndex)}
                                        </span>
                                        <span className="text-gray-500">{new Date(move.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}

export default GameHud