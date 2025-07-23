import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import { ArrowLeft, Settings, ScrollText } from "lucide-react"

import type { PVESettingProps } from '@/types/PropTypes/PVESettingProps'
import type { GameSettings } from '@/types/PVESettingInterface'
import modalVariants from '@/motion/variants/ModalVariants'
import tabVariants from '@/motion/variants/TabVariants'
import GameRule from '@/constants/GameRuleContent'


const PVPGameSetting = ({ isOpen, onClose, onStartGame }: PVESettingProps) => {

    const [settings, setSettings] = useState<GameSettings>({
        difficulty: "easy",
        playerFirst: true,
        customPiles: "3,5,7,4"
    })

    const [activeTab, seActiveTab] = useState<string>("customize")

    const coloseModal = (): void => {
        seActiveTab('customize')
        onClose()
    }

    const handleStartGame = (): void => {
        onStartGame(settings)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='fixed inset-0 bg-black/60 backdrop-blur-sm 
                    items-center justify-center flex p-4 z-50 '
                >
                    <motion.div
                        className='modal-content w-full max-w-md bg-white/10 
                                   backdrop-blur-xl border  border-white/20 rounded-2xl shadow-2xl overflow-hidden'
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="modal-header flex items-center justify-between p-6 border-b border-white/10">
                            <div className='flex  items-center space-x-3'>
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    className='text-white/70 hover:text-white hover:bg-white/10 p-2'
                                    onClick={() => { coloseModal() }}
                                >
                                    <ArrowLeft
                                        className='w-5 h-5 cursor-pointer'
                                    />
                                </Button>
                                <h2 className='text-xl font-semibold text-white'>Cài đặt chế độ chơi với người</h2>
                            </div>
                        </div>
                        <div className="tabs-container flex p-2 bg-white/5">
                            <motion.button
                                variants={tabVariants}
                                animate={activeTab === "customize" ? "active" : "inactive"}
                                className='flex-1 justify-center flex items-center space-x-2 py-3 rounded-lg transition-all duration-200 cursor-pointer'
                                onClick={() => seActiveTab("customize")}
                            >
                                <Settings
                                    className='w-4 h-4'
                                />
                                <span className='text-sm font-medium '>Tùy chỉnh trò chơi</span>
                            </motion.button>
                            <motion.button
                                variants={tabVariants}
                                onClick={() => seActiveTab("rule")}
                                animate={activeTab === "rule" ? "active" : "inactive"}
                                className='flex-1 flex justify-center items-center space-x-2 py-3 rounded-lg transition-all duration-200 cursor-pointer'
                            >
                                <ScrollText className='w-4 h-4' />
                                <span className='text-sm font-medium '>Luật chơi</span>
                            </motion.button>
                        </div>
                        <div className="content p-6 space-y-6 min-h-[340px]">
                            <AnimatePresence mode='wait'>
                                {activeTab === "customize" &&
                                    (
                                        <motion.div
                                            className='space-y-6'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="difficulty space-y-3">
                                                <Label className='text-white/80 text-sm font-medium'>Độ khó</Label>
                                                <Select>
                                                    <SelectTrigger
                                                        className='bg-white/10 border-white/20 text-white hover:bg-white/15 focus:ring-purple-400/50 cursor-pointer w-[130px]'
                                                    >
                                                        <SelectValue placeholder="Chọn độ khó" />
                                                    </SelectTrigger>
                                                    <SelectContent
                                                        className='bg-black/20 backdrop-blur-xl border-white/20 w-[36px]'
                                                    >
                                                        <SelectGroup>
                                                            <SelectItem value="easy" className='text-white hover:bg-white/10 cursor-pointer'>Dễ</SelectItem>
                                                            <SelectItem value="medium" className='text-white hover:bg-white/10 cursor-pointer'>Trung bình</SelectItem>
                                                            <SelectItem value="hard" className='text-white hover:bg-white/10 cursor-pointer'>Khó</SelectItem>
                                                            <SelectItem value="expert" className='text-white hover:bg-white/10 cursor-pointer'>Chuyên gia</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="first-player-toggle flex items-center justify-between">
                                                <Label className='text-white/80 text-sm font-medium'>Người chơi đi trước</Label>
                                                <Switch
                                                    className='data-[state=checked]:bg-purple-500 cursor-pointer'
                                                ></Switch>
                                            </div>
                                            <div className="custom-piles-container space-y-3">
                                                <Label className="text-white/80 text-sm font-medium">Tùy chỉnh số lượng đá mỗi đống</Label>
                                                <Input
                                                    className='bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-purple-400/50 focus:border-purple-400/50'
                                                    placeholder='3,5,7,4'
                                                />

                                                <p className='text-xs text-white/50'>Nhập kích thước các đống cách nhau bằng dấu phẩy từ 1-6. Mặc định là 3,5,7,4</p>
                                            </div>
                                        </motion.div>
                                    )}

                                {activeTab === "rule" && (
                                    <motion.div
                                        className=''
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="">
                                            <h3 className="text-white text-lg font-semibold text-center mb-1">Luật chơi NIM</h3>
                                            <div className="back-blur bg-white/15 rounded-xl p-2">
                                                <ul className="text-white/70 text-sm space-y-2 text-left max-w-md mx-auto list-decimal list-inside">
                                                    {GameRule.playSteps.map((step) => {
                                                        return (
                                                            <li dangerouslySetInnerHTML={{ __html: step }}></li>
                                                        )
                                                    })}
                                                </ul>
                                                <p className="text-white/50 text-xs mt-4" dangerouslySetInnerHTML={{ __html: GameRule.note }}>
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                        <div className="footer flex space-x-3 p-6 border-t border-white/10">
                            <Button className='flex-1 text-white/70 hover:text-white hover:bg-white/10 border border-white/20 cursor-pointer'
                                onClick={() => { coloseModal() }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => { handleStartGame() }}
                                className='flex-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80
                                 hover:from-purple-400/80 hover:to-pink-400/80
                                 text-white border-0 shadow-lg hover:shadow-purple-500/25 cursor-pointer'
                            >
                                Start Game
                            </Button>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-60" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PVPGameSetting