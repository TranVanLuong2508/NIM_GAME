import React from 'react'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// @ts-expect-error: OrbitControls does not have TypeScript definitions in this import

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const GameRoomPVE = () => {
    const mountRef = useRef<HTMLDivElement | null>(null)
    const clock = new THREE.Clock()


    useEffect(() => {
        // Kích thước canvas
        const element = mountRef.current
        if (!element) return // tránh lỗi null
        const width = element.clientWidth
        const height = element.clientHeight

        // Scene, Camera, Renderer
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 3000)
        camera.position.set(0, 0, 200)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        element.appendChild(renderer.domElement)


        // Controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.rotateSpeed = 0.5
        controls.zoomSpeed = 1.2

        // Ánh sáng
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(10, 10, 10)
        scene.add(directionalLight)

        // Tạo bầu trời sao với nhiều màu
        const starCount = 20000
        const starGeometry = new THREE.BufferGeometry()
        const starPositions = new Float32Array(starCount * 3)
        const starColors = new Float32Array(starCount * 3)

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3
            starPositions[i3 + 0] = (Math.random() - 0.5) * 4000
            starPositions[i3 + 1] = (Math.random() - 0.5) * 4000
            starPositions[i3 + 2] = (Math.random() - 0.5) * 4000

            // Gán màu ngẫu nhiên (R, G, B từ 0–1)
            starColors[i3 + 0] = Math.random()
            starColors[i3 + 1] = Math.random()
            starColors[i3 + 2] = Math.random()
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

        const starMaterial = new THREE.PointsMaterial({
            size: 0.7,
            vertexColors: true, // Cho phép mỗi điểm có màu riêng
        })

        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        // Vòng lặp animate
        const animate = () => {
            // requestAnimationFrame(animate)
            // controls.update()
            // renderer.render(scene, camera)
            requestAnimationFrame(animate)

            const elapsed = clock.getElapsedTime()

            // Hiệu ứng lấp lánh: thay đổi kích thước điểm theo thời gian
            const baseSize = 0.7
            const twinkleSpeed = 4 // tần suất dao động
            const twinkleAmount = 0.8 // biên độ dao động

            starMaterial.size = baseSize + Math.sin(elapsed * twinkleSpeed) * twinkleAmount

            controls.update()
            renderer.render(scene, camera)
        }
        animate()

        // Cleanup
        return () => {
            element.removeChild(renderer.domElement)
            renderer.dispose()
        }
    }, [])
    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: 0,
            }}
        />
    )
}

export default GameRoomPVE