import type { StoneProps } from '@/types/PropTypes/StoneProps'
import React, { useRef, useState } from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import StoneColor from '@/constants/StoneColor'

const Stone = ({ position, onClick, isSelected, isRemoving, isClickable = true }: StoneProps) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const [isHover, setIsHover] = useState(false)

    const handlePointerOver = () => {
        if (isClickable) {
            setIsHover(true)
        }
    }

    const handlePointerGoOut = () => {
        setIsHover(false)
    }
    useFrame((state) => {
        if (meshRef.current) {
            if (isRemoving) {
                meshRef.current.position.y += 0.15
                meshRef.current.rotation.x += 0.1
                meshRef.current.rotation.z += 0.05
                meshRef.current.scale.setScalar(Math.max(0, meshRef.current.scale.x - 0.03))
            } else if (isHover && isClickable) {
                meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.1 + 0.3
                meshRef.current.scale.setScalar(1.3)
                // Thêm hiệu ứng xoay nhẹ khi hover
                meshRef.current.rotation.y = state.clock.elapsedTime * 2
            } else if (isSelected) {
                meshRef.current.position.y = position[1] + 0.4
                meshRef.current.scale.setScalar(1.2)
            } else {
                meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.1)
                meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1))
                meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1)
            }
        }
    })

    console.log('check render')
    return (
        <mesh
            ref={meshRef}
            position={position}
            castShadow
            receiveShadow
            onPointerOver={() => handlePointerOver()}
            onPointerOut={() => handlePointerGoOut()}
            onClick={() => isClickable ? onClick : undefined}
        >
            <dodecahedronGeometry args={[0.25]} />
            <meshStandardMaterial
                color={
                    isRemoving ? StoneColor.remove
                        : isSelected ? StoneColor.select
                            : isHover && isClickable ? StoneColor.hover
                                : isClickable ? StoneColor.click : StoneColor.noneClick
                }
                roughness={0.2}
                metalness={0.8}
                emissive={isRemoving ? "#dc2626" : isSelected ? "#f59e0b" : isHover && isClickable ? "#3b82f6" : "#000000"}
                emissiveIntensity={isRemoving ? 0.4 : isSelected ? 0.3 : isHover && isClickable ? 0.3 : 0}
            />
        </mesh>
    )
}

export default Stone