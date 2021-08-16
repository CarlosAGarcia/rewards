import React , { useState, useEffect } from 'react'
import * as THREE from 'three'

const MAX_TIME_BETWEEN_OBJS = 4 // in seconds

export default function Basic(props) {
    const [ scene, setScene ] = useState(new THREE.Scene())
    const [ camera, setCamera ] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))
    const [ renderer, setRenderer ] = useState(new THREE.WebGLRenderer())

    const [ objects, setObjects ] = useState([])

    // init scene/camera/renderer
    const init = () => {
        if (!scene) setScene(new THREE.Scene()) 
        if (!camera) setCamera(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)) 
        if (!renderer) setRenderer(new THREE.WebGLRenderer()) 

        // init camera pos
        camera.position.z = 1;
        camera.rotation.x = 1.16;
        camera.rotation.y = -0.12;
        camera.rotation.z = 0.27;

        let ambient = new THREE.AmbientLight(0x555555);
        scene.add(ambient);

        renderer.setSize(window.innerWidth,window.innerHeight);
        scene.fog = new THREE.FogExp2('#0a0101', 0.001);
        renderer.setClearColor(scene.fog.color);
        document.body.appendChild(renderer.domElement);

        render();

        console.log('init', { scene, camera })
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

        console.log('mount bg')

        window.addEventListener('resize', handleResize, false)
        init()

        return () => {
            window.removeEventListener('resize', handleResize, false)
            console.log('unmount bg')
        }
    }, [])

    // objects
    useEffect(() => {
        // objects.forEach(obj => {
            
        // });


        setObjects(props.objects)
    }, [props.objects])

    return (
        <div>
            
        </div>
    )
}
