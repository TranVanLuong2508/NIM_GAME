"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Download, Upload, Trash2, Play, FolderOpen } from "lucide-react"
import modalVariants from "@/motion/variants/ModalVariants"
import "@/App.css"
import type { SavedGame } from "@/types/savedGame"
import { loadSavedGames, deleteSavedGame, exportGameToFile, importGameFromFile } from "@/lib/storage"

interface SavedGamesProps {
    isOpen: boolean
    onClose: () => void
    onLoadGame: (savedGame: SavedGame) => void
}

export default function SavedGames2({ isOpen, onClose, onLoadGame }: SavedGamesProps) {
    const [savedGames, setSavedGames] = useState<SavedGame[]>([])

    useEffect(() => {
        setSavedGames(loadSavedGames())
    }, [])

    const handleDeleteGame = (gameId: string) => {
        deleteSavedGame(gameId)
        setSavedGames(loadSavedGames())
    }

    const handleImportGame = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const savedGame = await importGameFromFile(file)
            onLoadGame(savedGame)
        } catch (error) {
            console.log('check save game', error)
            alert("Failed to import game file")
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClose}
                                    className="text-white/70 hover:text-white hover:bg-white/10 p-2 cursor-pointer"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                                <h2 className="text-xl font-semibold text-white">Game đã lưu</h2>
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImportGame}
                                    className="hidden"
                                    id="import-file"
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => document.getElementById("import-file")?.click()}
                                    className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Tải lên
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-none">
                            {savedGames.length > 0 ? (
                                savedGames.map((savedGame) => (
                                    <motion.div
                                        key={savedGame.gameState.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200"
                                    >
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    className={`${savedGame.gameState.mode === "PVE"
                                                        ? "bg-blue-500/20 text-blue-300 border-blue-400/30"
                                                        : "bg-purple-500/20 text-purple-300 border-purple-400/30"
                                                        }`}
                                                >
                                                    {savedGame.gameState.mode}
                                                </Badge>
                                                <Badge
                                                    className={`${savedGame.gameState.gameStatus === "playing"
                                                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                                                        : savedGame.gameState.gameStatus === "won"
                                                            ? "bg-green-500/20 text-green-300 border-green-400/30"
                                                            : "bg-red-500/20 text-red-300 border-red-400/30"
                                                        }`}
                                                >
                                                    {savedGame.gameState.gameStatus}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-white/70">
                                                Piles: {savedGame.gameState.piles.join(", ")} | Moves: {savedGame.gameState.moveHistory.length}
                                            </p>
                                            <p className="text-xs text-white/50">
                                                Last played: {new Date(savedGame.gameState.lastModified).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onLoadGame(savedGame)}
                                                // className="text-white hover:text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-400/30 hover:border-blue-400/50 shadow-lg hover:shadow-xl transition-all duration-200 px-3"
                                                className="text-white bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:brightness-110
                                                            border-0 shadow-lg hover:shadow-xl cursor-pointer transition duration-300 hover:text-white
                                                       "
                                            >
                                                <Play className="w-4 h-4" />
                                                Chơi tiếp
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => exportGameToFile(savedGame)}
                                                className="text-white/70 hover:text-white hover:bg-white/10"
                                            >
                                                <Download className="w-5 h-5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteGame(savedGame.gameState.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-white/10"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FolderOpen className="w-8 h-8 text-white/60" />
                                    </div>
                                    <p className="text-white/60">No saved games found</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end p-6 border-t border-white/10">
                            <Button
                                variant="ghost"
                                onClick={onClose}
                                className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                            >
                                Đóng
                            </Button>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-60" />

                        {/* Floating particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white/20 rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        opacity: [0, 0.6, 0],
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: Math.random() * 3 + 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: Math.random() * 2,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}