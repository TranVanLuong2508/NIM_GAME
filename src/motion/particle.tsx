// import { motion } from "motion/react"

// const Particle = () => {
//     return (
//         <>
//             {[...Array(12)].map((_, i) => (
//                 <motion.div
//                     key={i}
//                     className="absolute w-1.5 h-1.5 bg-white/80 blur-none rounded-full  "
//                     initial={{
//                         x: Math.random() * window.innerWidth,
//                         y: Math.random() * window.innerHeight,
//                     }}
//                     animate={{
//                         y: [null, -300, null],
//                         opacity: [0, 0.6, 0],
//                     }}
//                     transition={{
//                         duration: Math.random() * 4 + 3,
//                         repeat: Number.POSITIVE_INFINITY,
//                         delay: Math.random() * 3,
//                     }}
//                 />
//             ))}
//         </>
//     )
// }

// export default Particle

import { motion } from "framer-motion"

const Particle = () => {
    return (
        <>
            {[...Array(12)].map((_, i) => {
                const offsetX = Math.random() * 50 // để lệch một chút khỏi góc trái
                const offsetY = Math.random() * 50 // để hạt không bắt đầu cùng vị trí

                return (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white/70 rounded-full"
                        initial={{ x: 0 + offsetX, y: 0 + offsetY, opacity: 0 }}
                        animate={{
                            x: window.innerWidth,
                            y: window.innerHeight,
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 3, // 3 - 6s
                            delay: Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                )
            })}
        </>
    )
}

export default Particle

