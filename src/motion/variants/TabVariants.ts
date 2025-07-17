import type { Variants } from "framer-motion";
const tabVariants: Variants = {
    inactive: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "rgba(255, 255, 255, 0.6)",
    },
    active: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        color: "rgba(255, 255, 255, 0.9)",
    },
}

export default tabVariants