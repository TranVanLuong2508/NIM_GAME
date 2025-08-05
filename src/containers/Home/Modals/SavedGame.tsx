"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FolderOpen, Trash2, Share } from "lucide-react" // Added Share icon
import modalVariants from "@/motion/variants/ModalVariants"
import "@/App.css"

interface SavedGamesProps {
    isOpen: boolean
    onClose: () => void
    onLoadGame: (savedGame: string) => void
    onDeleteGame: (gameId: string) => void
    onExportGame: (gameId: string) => void // Added onExportGame prop
}

interface SavedGame {
    id: string
    name: string
    date: string
    description: string,
}

export default function SavedGames({ isOpen, onClose, onLoadGame, onDeleteGame, onExportGame }: SavedGamesProps) {
    // Placeholder data for saved games
    const [savedGames, setSavedGames] = useState<SavedGame[]>([
        { id: "game-1", name: "Game #1", date: "2025-07-17 10:30 AM", description: "Chơi với máy - Khó" },
        { id: "game-2", name: "2025-07-16 08:00 PM", date: "2025-07-16 08:00 PM", description: "Chơi với người - Lượt 2" },
        { id: "game-3", name: "Game #3", date: "2025-07-15 02:15 PM", description: "Chơi với máy - Dễ" },
        { id: "game-4", name: "Game #3", date: "2025-07-15 02:15 PM", description: "Chơi với máy - Dễ" },
        { id: "game-5", name: "Game #3", date: "2025-07-15 02:15 PM", description: "Chơi với máy - Dễ" },
    ])

    const handleDelete = (id: string) => {
        setSavedGames(savedGames.filter((game) => game.id !== id))
        onDeleteGame(id)
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
                        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
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
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-none">
                            {savedGames.length > 0 ? (
                                savedGames.map((game) => (
                                    <motion.div
                                        key={game.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <h3 className="text-lg font-medium text-white">{game.name}</h3>
                                            <p className="text-sm text-white/70">{game.date}</p>
                                            <p className="text-xs text-white/50">{game.description}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onLoadGame(game.id)}
                                                className="text-white/70 hover:text-white hover:bg-white/10"
                                            >
                                                <FolderOpen className="w-5 h-5" />
                                                <span className="sr-only">Load Game</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onExportGame(game.id)} // Added Export button
                                                className="text-white/70 hover:text-white hover:bg-white/10"
                                            >
                                                <Share className="w-5 h-5" />
                                                <span className="sr-only">Export Game</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(game.id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-white/10"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                                <span className="sr-only">Delete Game</span>
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FolderOpen className="w-8 h-8 text-white/60" />
                                    </div>
                                    <p className="text-white/60">Chưa có game nào được lưu.</p>
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
                        {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 opacity-60" /> */}
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
