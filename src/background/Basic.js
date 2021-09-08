import React , { useState, useEffect } from 'react'
import * as THREE from 'three'
import Transactions from '../viz/Transactions'
import ConnectionToAWSLoader from '../StyledComponents/Loaders/ConnectionToAWSLoader' 
// Contains code for backdrop
export default function Basic(props) {
    // 3 JS key variables
    const [ scene, setScene ] = useState(new THREE.Scene())
    const [ camera, setCamera ] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))
    const [ renderer, setRenderer ] = useState(new THREE.WebGLRenderer())
    const [ imgLoader, setImgLoader ] = useState(new THREE.ImageBitmapLoader())
    const [ geometry, setGeometry ] = useState(new THREE.BoxGeometry( 1, 1, 1 ))
// #6f4775
    // init scene/camera/renderer
    const init = () => {
        // makes sure vars are set
        if (!scene) setScene(new THREE.Scene()) 
        if (!camera) setCamera(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)) 
        if (!renderer) setRenderer(new THREE.WebGLRenderer()) 
        if (!imgLoader) setImgLoader(new THREE.ImageBitmapLoader()) 
        if (!geometry) setGeometry(new THREE.BoxGeometry( 1, 1, 1 )) 

        // init camera pos
        camera.position.z = 0;
        camera.rotation.x = 1.16;
        camera.rotation.y = -0.12;
        camera.rotation.z = 0.27;

        let ambient = new THREE.AmbientLight(0x555555);
        scene.add(ambient);

        renderer.setSize(window.innerWidth,window.innerHeight);
        scene.fog = new THREE.FogExp2('#0a0101', 0.001);
        renderer.setClearColor(scene.fog.color);
        document.body.appendChild(renderer.domElement);

        console.log('init', { scene, camera })
        render();
    }

    const render = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    // mount/unmount
    useEffect(() => {
        // event handler for resizing camera as per window
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize, false)
        init()
        return () => {
            window.removeEventListener('resize', handleResize, false)
            console.log('unmount bg')
        }
    }, [])

    // Every time an event happens
    const onEvent = (event) => {
        const { key } = event

        switch (key) {
            case 'TRANSACTION':
                addTransaction(event)
                break;
            default:
                break;
        }
    }

    const addTransaction = (event) => {
        console.log('addTransaction', event)
    }

    return (
        <div>
            <Transactions onEvent={onEvent}/>
            <ConnectionToAWSLoader />
        </div>
    )
}
