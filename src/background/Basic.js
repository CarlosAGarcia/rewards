import React , { useState, useEffect } from 'react'
import * as THREE from 'three'
import Transactions from '../viz/Transactions'
import ConnectionToAWSLoader from '../StyledComponents/Loaders/ConnectionToAWSLoader' 
import { TrackballControls } from './TrackballControls';
// import { isEmpty } from 'lodash'

// Contains code for backdrop
export const CAM_POS_X = 4;
export const CAM_POS_Y = 3;
export const CAM_POS_Z = 4;

// 7, 4.5, 3.5
export const defaultEdgeX = 7
export const defaultEdgeY = 4.5
export const defaultEdgeZ = 3.5

export const initialX = 0
export const initialY = 0
export const initialZ = 0

export default function Basic(props) {

    let raycaster
// ******************** START OF STATE VARS ********************

    // 3 JS key variables
    const [ scene, setScene ] = useState(new THREE.Scene())
    const [ camera, setCamera ] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000))
    const [ renderer, setRenderer ] = useState(new THREE.WebGLRenderer())
    const [ controls, setControls ] = useState()
    const [ pointer, setPointer ] = useState(new THREE.Vector2())
    // const [ intersectedItem, setIntersectedItem ] = useState()




    // const [ raycaster, setRaycaster ] = useState(new THREE.Raycaster())
 
    // const [ coinUuids, setCoinUuids ] = useState([])

    const createSymbol = ({ width, height, depth, x, y, z, customGeometry, color, customMaterial }) => {
        const boxgeometry = new THREE.BoxGeometry( width, height, depth );
        const material = new THREE.MeshBasicMaterial({ color });
        const cube = new THREE.Mesh( boxgeometry, material );
        cube.position.set(x,y,z)
        cube.name = 'SYMBOL'

        const edgeX = defaultEdgeX + (Math.random() <= .5 ? -1 : 1) * (Math.random() * 1.5)
        const edgeY = defaultEdgeY + (Math.random() <= .5 ? -1 : 1) * (Math.random() * 1)
        const edgeZ = defaultEdgeZ + (Math.random() <= .5 ? -1 : 1) * (Math.random() * .5)

        cube.end = { x: edgeX, y: edgeY, z: edgeZ }


        scene.add( cube );

        return cube
    }

    // scroll + rotate along Y axis (look around horizontally to be implemented)
    // const createCenterSymbol = () => {
    //     // POSITION FOR LOGO IF THERE IS ONE - DEFAULT IS OURS?
    //     const boxgeometry = new THREE.BoxGeometry( .5, .5, .5 );
    //     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //     const cube = new THREE.Mesh( boxgeometry, material );

    //     cube.position.set(4, 3, 2)
    //     cube.position.set(7, 4.5, 3.5)
    //     cube.name = 'CENTRE_SYMBOL'

    //     cube.lookAt(CAM_POS_X, CAM_POS_Y, CAM_POS_Z) // looks at camera position
    //     scene.add( cube );

    //     return cube
    // }
    const [ centerSymbol, setCenterSymbol ] = useState() // to access properties of center symbol

    // const createOriginLight = () => {
    //     const boxgeometrySmol = new THREE.BoxGeometry( .2, .2, .2 );
    //     const materialBaka = new THREE.MeshBasicMaterial({ color: 0xbaca });
    //     const cubeSmol = new THREE.Mesh( boxgeometrySmol, materialBaka );
    //     cubeSmol.position.set(0,0,0)
    //     cubeSmol.lookAt(4, 2.5, 2) // looks at camera position
    //     cubeSmol.name = 'CUBE_SMOL'

    //     scene.add( cubeSmol );

    //     return cubeSmol
    // }
    const [ originLight, setOriginLight ] = useState() // to access properties of center symbol

    // const createAxisHelper = () => {
    //     const axesHelper = new THREE.AxesHelper( 5 );
    //     axesHelper.name = 'AXIS_HELPR'

    //     scene.add( axesHelper );
    // }
    const [ axisHelper, setAxisHelper] = useState() // to access properties of center symbol

    // const createCamHelper = () => {
    //     const helper = new THREE.CameraHelper( camera );
    //     helper.name = 'CAM_HELPER'

    //     scene.add( helper );
    // }
    // const [ camHelper, setCamHelper] = useState() // to access properties of center symbol
// ******************** END OF STATE VARS ********************


    // init scene/camera/renderer
    const init = () => {
        // makes sure vars are set
        if (!scene) setScene(new THREE.Scene()) 
        if (!camera) setCamera(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)) 
        if (!renderer) setRenderer(new THREE.WebGLRenderer())
        if (!centerSymbol) {
            // POSITION FOR LOGO IF THERE IS ONE - DEFAULT IS OURS?
            const boxgeometry = new THREE.BoxGeometry( .5, .5, .5 );
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh( boxgeometry, material );

            cube.position.set(4, 3, 2)
            // cube.position.set(7, 4.5, 3.5)
            cube.name = 'CENTRE_SYMBOL'

            cube.lookAt(CAM_POS_X, CAM_POS_Y, CAM_POS_Z) // looks at camera position
            scene.add( cube );
        }        
        if (!originLight) {
            const boxgeometrySmol = new THREE.BoxGeometry( .2, .2, .2 );
            const materialBaka = new THREE.MeshBasicMaterial({ color: 0xbaca });
            const cubeSmol = new THREE.Mesh( boxgeometrySmol, materialBaka );
            cubeSmol.position.set(0,0,0)
            cubeSmol.lookAt(4, 2.5, 2) // looks at camera position
            cubeSmol.name = 'CUBE_SMOL'
    
            scene.add( cubeSmol );
        }
        if (!axisHelper) {
            const axesHelper = new THREE.AxesHelper( 5 );
            axesHelper.name = 'AXIS_HELPR'
    
            scene.add( axesHelper );
        }        
        // if (!camHelper) {
        //     const helper = new THREE.CameraHelper( camera );
        //     helper.name = 'CAM_HELPER'
    
        //     scene.add( helper );
        // }
        raycaster = new THREE.Raycaster();
        // init camera pos to move up/right of 0,0,0 origin @ rate of various units away
        // (4, 3, 4)
        camera.position.x = CAM_POS_X;
        camera.position.y = 4 //CAM_POS_Y;
        camera.position.z = 6//CAM_POS_Z;

        // sets camera to rotate down on x axis (look down slightly)
        camera.rotation.x = -.4;
        camera.rotation.y = 0;
        camera.rotation.z = 0;

        renderer.setSize(window.innerWidth,window.innerHeight);
        scene.fog = new THREE.FogExp2('#0a0101', 0.001);
        renderer.setClearColor(scene.fog.color);
        // document.body.appendChild(renderer.domElement);

        render();
    }

    function onPointerMove( event ) {
        let newPointer = pointer
        newPointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        newPointer.y = ( event.clientY / window.innerHeight ) * 2 + 1;

        setPointer(newPointer)
    }
    // main canvas render fn
    const render = () => {
        console.log('RENDER FN --->>>', { pointer, camera, chil: scene.children })

        raycaster.setFromCamera(pointer, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        console.log('intersects',{ intersects })
        if (intersects.length > 0) {
            console.log('111')
        //   cube.material.color.set(0xff0000);
        } else {
            console.log('222')

        }



        renderer.render(scene, camera);
        requestAnimationFrame(render);

        if (scene) {
            // console.log('RENDER', { scene, chil: scene.children })

            // if (raycaster) {
//                 console.log({ pX:pointer.x, PY:pointer.y, camera })
//                 raycaster.setFromCamera( pointer, camera );
// const symbols = scene.children.filter(item => item.name === 'SYMBOL')
//                 const intersects = raycaster.intersectObjects( symbols );   
//                 console.log('intersects', { intersects, symbols })
                
            // }


            // movement 
            scene?.children.map(child => {
                if (child?.name === 'SYMBOL') {
                    moveItem(child)
                }
            })
        }
    }

    const moveItem = (item) => {
        const { position: { x, y, z } } = item
        
        console.log('moveItem', { item })

        const withinCameraBounds = x <= defaultEdgeX && y <= defaultEdgeY && z <= defaultEdgeZ
        // console.log('withinCameraBounds', withinCameraBounds)
        if (withinCameraBounds) {

            const amountToAddX = getAmountToAddPerRender({ edge: item?.end?.x || defaultEdgeX, initial: initialX, curr: x })  // edge of camera / time in renders to get there (HIGHER NUM @ BOT = SLOWER)
            const amountToAdY = getAmountToAddPerRender({ edge: item?.end?.y || defaultEdgeY, initial: initialY, curr: y })  // (defaultEdgeY / 1000) - initialY // edge of camera / time in renders to get there 
            const amountToAdZ = getAmountToAddPerRender({ edge: item?.end?.z || defaultEdgeZ, initial: initialZ, curr: z }) // (defaultEdgeZ / 1000) - initialZ // edge of camera / time in renders to get there
           
            // (defaultEdgeZ / 1000) - initialZ
            item.translateX(amountToAddX)
            item.translateY(amountToAdY)
            item.translateZ(amountToAdZ)
        } else {
            console.log('DELETNG ITEM')
            item.removeFromParent()
            console.log('removed')
        }
    }

    // TODO: change velocity so that 
    // only change the x/y versions. Leave z alone. sin modifier calc + instances of return
    const getAmountToAddPerRender = ({ edge, initial, curr }) => {
        const negative = Math.random() <= .5 ? -1 : 1
        const amountOfChange = Math.random()

        const modifier = Math.random() * ((edge) / 600) 

        const progress = curr / edge // this is the X
        let amountToAddThisRender = ((edge) / 1000) + modifier

        console.log({ edge, curr, amountToAddThisRender, progress: `${progress * 100}%` }) // 0 - .99

        return amountToAddThisRender
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
        document.addEventListener( 'mousemove', onPointerMove );
        init()
        return () => {
            window.removeEventListener('resize', handleResize, false)
            document.removeEventListener( 'mousemove', onPointerMove );
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

    // Should be called after user clicks on start controls
    const onClickControls = () => {
        const controls = new TrackballControls( camera, renderer.domElement )

        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        // setControlsActive(true)
        setControls(controls)
    }

    // TODO: fix the formatting once you get actual payload
    const addTransaction = (event) => {
        console.log('addTransaction', event)
        const { key, transactions, newTransaction } = event

        if (newTransaction?.body?.fullTransaction) {
            addFloatingCoinDirectional({ objValues: newTransaction?.body?.fullTransaction })
        }
    }

    // todo: later find out how tom best display 0 eth transactions - activity on blockchain for 40$ or so
    const addFloatingCoinDirectional = ({ objValues }) => {
        const { value, gas, gasPrice } = objValues

        const value_decimal = parseInt(value, 16)
        const gas_decimal = parseInt(gas, 16)
        const gasPrice_decimal = parseInt(gasPrice, 16)
        const gasCost_Decimal = gas_decimal * gasPrice_decimal

        const valueInEth = (value_decimal + (gasCost_Decimal)) * (1/(Math.pow(10, 18))) // value in eth
        
        const multiplier = valueInEth // simplest -> to be changed later

        const defSizeOfOneUnit = .05

        const width = defSizeOfOneUnit * multiplier
        const height = defSizeOfOneUnit * multiplier
        const depth = defSizeOfOneUnit * multiplier


        // from 0-1, 1-3, 3-5, 10-20, 20-50, 50-100, 100-200, 200+
        const x = initialX
        const y = initialY
        const z = initialZ
        createSymbol({ width, height, depth, x, y, z, color: '#afac' })

        // setCoinUuids([ ...coinUuids, newObj?.uuid ])
    }

    return (
        <div>
            <Transactions onEvent={onEvent}/>
            <ConnectionToAWSLoader />
        </div>
    )
}
