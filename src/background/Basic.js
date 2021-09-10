import React , { useState, useEffect } from 'react'
import * as THREE from 'three'
import Transactions from '../viz/Transactions'
import ConnectionToAWSLoader from '../StyledComponents/Loaders/ConnectionToAWSLoader' 
import { TrackballControls } from './TrackballControls';
// Contains code for backdrop

export const CAM_POS_X = 4;
export const CAM_POS_Y = 3;
export const CAM_POS_Z = 4;

export default function Basic(props) {
    // 3 JS key variables
    const [ scene, setScene ] = useState(new THREE.Scene())
    const [ camera, setCamera ] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))
    const [ renderer, setRenderer ] = useState(new THREE.WebGLRenderer())
    const [ controls, setControls ] = useState()

    // const [ imgLoader, setImgLoader ] = useState(new THREE.ImageBitmapLoader())
    // const [ geometry, setGeometry ] = useState(new THREE.BoxGeometry( 1, 1, 1 ))

    const createSymbol = ({ width, height, depth, x, y, z, customGeometry, colour, customMaterial }) => {
        const boxgeometry = new THREE.BoxGeometry( width, height, depth );
        const material = new THREE.MeshBasicMaterial({ colour });
        const cube = new THREE.Mesh( boxgeometry, material );
        cube.position.set(x,y,z)

        scene.add( cube );

        return cube
    }

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
        if (!controls) setControls(new TrackballControls( camera, renderer.domElement ))

        // if (!imgLoader) setImgLoader(new THREE.ImageBitmapLoader())
  
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

        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

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

    // TODO: fix the formatting once you get actual payload
    const addTransaction = (event) => {
        console.log('addTransaction', event)
        const { key, transactions, newTransaction } = event

        if (newTransaction?.body?.fullTransaction) {
            const { value, } = newTransaction?.body?.fullTransaction

            addFloatingCoinDirectional({ objValues: newTransaction?.body?.fullTransaction, })
        }
        console.log({ key, transactions, newTransaction })
    }
    const addFloatingCoinDirectional = ({ objValues }) => {

    }

    return (
        <div>
            <Transactions onEvent={onEvent}/>
            <ConnectionToAWSLoader />
        </div>
    )
}
