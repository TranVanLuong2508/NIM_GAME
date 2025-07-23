import type { GameSettings } from "@/types/PVESettingInterface"

interface PVESettingProps {
    isOpen: boolean
    onClose: () => void
    onStartGame: (settings: GameSettings) => void
}

export type { PVESettingProps }