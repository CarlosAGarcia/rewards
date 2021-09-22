import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { defaultEdgeX, defaultEdgeY, defaultEdgeZ } from '../background/BasicScene'
import { useStore } from '../store'

export default function BasicObject(props) {
    const {
        hash,
        removeCoin,
        movement,
        width = 1, height = 1, depth = 1,
        x = 0, y = 0, z = 0, 
        rotationX = 0, rotationY = 0, rotationZ = 0,
        customGeometry, color, colorActive, customMaterial
    } = props

    // STATE VARS Set up state for the hovered and active state
    const [ hovered, setHover ] = useState(false)
    const [ active, setActive ] = useState(false)

    const TIME_ALIVE_IN_RENDERS = useStore(state => state.TIME_ALIVE_IN_RENDERS)
    const setTimeAliveInRenders = useStore(state => state.setTimeAliveInRenders)
    const transactionClicked = useStore(state => state.transactionClicked)
    const removeTransactionClicked = useStore(state => state.removeTransactionClicked)


    // object ref to use in useFrame
    const ref = useRef()
    useFrame(() => {

        ref.current.rotation.x = ref.current.rotation.y += 0.01
        if (movement) {
            const { x: objectX, y: objectY, z: objectZ } = ref?.current?.position

            const withinCameraBounds = (defaultEdgeX - objectX >= 0) && (defaultEdgeY - objectY >= 0) && (defaultEdgeZ - objectZ <= 0)
            if (withinCameraBounds) {
                const [ x, y, z ] = movement
                if (x) ref.current.position.x = ref.current.position.x += (x / TIME_ALIVE_IN_RENDERS)
                if (y) ref.current.position.y = ref.current.position.y += (y / TIME_ALIVE_IN_RENDERS)
                if (z) ref.current.position.z = ref.current.position.z += (z / TIME_ALIVE_IN_RENDERS)
            } else {
                if (hash) removeCoin(hash)
            }
        }
    })

    const onHover = (isHovering) => {
        const slowMovement = 10000
        const normalMovement = 1000

        if (isHovering && (TIME_ALIVE_IN_RENDERS < slowMovement) ) {
            setTimeAliveInRenders(slowMovement)
        } else if (!isHovering && (TIME_ALIVE_IN_RENDERS >= slowMovement)) {
            setTimeAliveInRenders(normalMovement)
        }

        setHover(isHovering)
    }

    const onClick = () => {
        if (hash) {
            active ? removeTransactionClicked(hash) : transactionClicked(hash)
            setActive(!active)
        }
    }

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => onClick() }
            onPointerOver={(e) => onHover(true)}
            onPointerOut={(e) => onHover(false)}
            position={[x, y, z]}
            rotation={[rotationX, rotationY, rotationZ]}
        >
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={hovered ? (colorActive || 'hotpink') : (color || 'orange')} />
        </mesh>
    )
}
