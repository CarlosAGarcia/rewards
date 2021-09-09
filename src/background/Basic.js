import React , { useState, useEffect } from 'react'
import * as THREE from 'three'
import Transactions from '../viz/Transactions'
import ConnectionToAWSLoader from '../StyledComponents/Loaders/ConnectionToAWSLoader' 
// Contains code for backdrop

export const CAM_POS_X = 4;
export const CAM_POS_Y = 3;
export const CAM_POS_Z = 4;

export default function Basic(props) {
    // 3 JS key variables
    const [ scene, setScene ] = useState(new THREE.Scene())
    const [ camera, setCamera ] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))
    const [ renderer, setRenderer ] = useState(new THREE.WebGLRenderer())
    const [ imgLoader, setImgLoader ] = useState(new THREE.ImageBitmapLoader())
    const [ geometry, setGeometry ] = useState(new THREE.BoxGeometry( 1, 1, 1 ))


// scroll + rotate along Y axis (look around horizontally to be implemented)
    const createCenterSymbol = () => {
        // POSITION FOR LOGO IF THERE IS ONE - DEFAULT IS OURS?
        const boxgeometry = new THREE.BoxGeometry( .5, .5, .5 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        const cube = new THREE.Mesh( boxgeometry, material );

        cube.position.set(4, 2.5, 2)
        cube.lookAt(CAM_POS_X, CAM_POS_Y, CAM_POS_Z) // looks at camera position
        scene.add( cube );

        return cube
    }
    const [ centerSymbol, setCenterSymbol ] = useState(createCenterSymbol()) // to access properties of center symbol

    const createOriginLight = () => {
        const boxgeometrySmol = new THREE.BoxGeometry( .2, .2, .2 );
        const materialBaka = new THREE.MeshBasicMaterial({ color: 0xbaca });
        const cubeSmol = new THREE.Mesh( boxgeometrySmol, materialBaka );
        cubeSmol.position.set(0,0,0)
        cubeSmol.lookAt(4, 2.5, 2) // looks at camera position

        scene.add( cubeSmol );

        return cubeSmol
    }
    const [ originLight, setOriginLight ] = useState(createOriginLight()) // to access properties of center symbol


    // init scene/camera/renderer
    const init = () => {
        // makes sure vars are set
        if (!scene) setScene(new THREE.Scene()) 
        if (!camera) setCamera(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)) 
        if (!renderer) setRenderer(new THREE.WebGLRenderer()) 
        if (!imgLoader) setImgLoader(new THREE.ImageBitmapLoader()) 
        if (!geometry) setGeometry(new THREE.BoxGeometry( 1, 1, 1 ))
  
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );
        const helper = new THREE.CameraHelper( camera );
        scene.add( helper );

        // init camera pos to move up/right of 0,0,0 origin @ rate of various units away
        // (4, 3, 4)
        camera.position.x = CAM_POS_X;
        camera.position.y = 4 //CAM_POS_Y;
        camera.position.z = 6//CAM_POS_Z;

        // sets camera to rotate down on x axis (look down slightly)
        camera.rotation.x = -.4;
        camera.rotation.y = 0;
        camera.rotation.z = 0;

        // let ambient = new THREE.AmbientLight(0xffff, 1);
        // scene.add(ambient);

        renderer.setSize(window.innerWidth,window.innerHeight);
        scene.fog = new THREE.FogExp2('#0a0101', 0.001);
        renderer.setClearColor(scene.fog.color);
        document.body.appendChild(renderer.domElement);



        // const light = new THREE.PointLight( 0xe444, 100, 100, 1 );
        // light.position.set( 0,0,0 );

        // scene.add( light );
        // const sphereSize = 2;
        // const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
        // scene.add( pointLightHelper );



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
