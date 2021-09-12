import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function BasicObject(props) {
    const { movement, width = 1, height = 1, depth = 1, x = 0, y = 0, z = 0, rotationX = 0, rotationY = 0, rotationZ = 0, customGeometry, color, colorActive, customMaterial } = props

    // STATE VARS Set up state for the hovered and active state
    const [ hovered, setHover ] = useState(false)
    const [ active, setActive ] = useState(false)

    // object ref to use in useFrame
    const ref = useRef()
    useFrame(() => {
        ref.current.rotation.x = ref.current.rotation.y += 0.01
        if (movement) {
            const [ x, y, z ] = movement
            if (x) ref.current.position.x = ref.current.position.x += x
            if (y) ref.current.position.y = ref.current.position.y += y
            if (z) ref.current.position.z = ref.current.position.z += z
        }
    })

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}
            position={[x, y, z]}
            rotation={[rotationX, rotationY, rotationZ]}
        >
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={hovered ? (colorActive || 'hotpink') : (color || 'orange')} />
        </mesh>
    )
}
