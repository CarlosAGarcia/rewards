import React , { useState, useEffect } from 'react'
import * as THREE from 'three'
import img from './images/goldtexture.jpg'
import { getTXs } from '../actions/actions'


export default function Basic(props) {
    // 3 JS key variables
    const [ scene, setScene ] = useState(new THREE.Scene())
    const [ camera, setCamera ] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))
    const [ renderer, setRenderer ] = useState(new THREE.WebGLRenderer())
    const [ imgLoader, setImgLoader ] = useState(new THREE.ImageBitmapLoader())
    const [ geometry, setGeometry ] = useState(new THREE.BoxGeometry( 1, 1, 1 ))



    const [ objects, setObjects ] = useState([])

    // init scene/camera/renderer
    const init = () => {
        // makes sure vars are set
        if (!scene) setScene(new THREE.Scene()) 
        if (!camera) setCamera(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)) 
        if (!renderer) setRenderer(new THREE.WebGLRenderer()) 
        if (!imgLoader) setImgLoader(new THREE.ImageBitmapLoader()) 
        if (!geometry) setGeometry(new THREE.BoxGeometry( 1, 1, 1 )) 

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


        console.log('init', { scene, camera })
        // adds object
        addObject()
        getTXs()
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

        console.log('mount bg')

        window.addEventListener('resize', handleResize, false)
        init()

        return () => {
            window.removeEventListener('resize', handleResize, false)
            console.log('unmount bg')
        }
    }, [])


    const addObject = () => {
        // adds image from source file
        console.log('w', img)

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        new THREE.ImageLoader().load(img, function ( image ) {
            // texture
            const texture = new THREE.CanvasTexture( image );
            const material = new THREE.MeshBasicMaterial( { color: 0xff8888, map: texture } );

            // object + texture
            const cube = new THREE.Mesh( geometry, material );
            cube.position.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
            cube.rotation.set( Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI );

            // adding created object to state arr
            setObjects(prevObjects => [ ...prevObjects, cube ])
            } );

        console.log('ob2', objects)
    }

    return (
        <div>
            
        </div>
    )
}
