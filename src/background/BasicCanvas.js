import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import BasicScene from '../background/BasicScene'
import * as THREE from 'three'
import { TrackballControls } from '@react-three/drei'

export const CAM_POS_X = 4;
export const CAM_POS_Y = 4;
export const CAM_POS_Z = 4;

// Provider must be passed in again so canvas has access to redux. Context lost within canvas
export default function BasicCanvas() {
    const [ camera, setCamera ] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))

    const init = () => {
        if (!camera) setCamera(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))
        
        camera.position.x = CAM_POS_X ;
        camera.position.y = CAM_POS_Y;
        camera.position.z = CAM_POS_Z;
    }

    // mount unmount
    useEffect(() => {
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        }

        init()
        window.addEventListener('resize', handleResize, false)
        return () => {
            window.removeEventListener('resize', handleResize, false)     
        }
    }, [])

    return (
        <Canvas
            camera={camera}
        >
            <color attach="background" args={"#100815"} />
            <TrackballControls camera={camera} x />
            <axesHelper size={100}/>
            <BasicScene />
        </Canvas>
    )
}
