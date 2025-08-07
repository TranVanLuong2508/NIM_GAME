import type { GameMode } from "@/types/commonType"

interface PVESettingProps {
    isOpen: boolean
    onClose: () => void
    onStartGame: () => void
    mode: GameMode
}

export type { PVESettingProps }