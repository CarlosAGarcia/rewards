import { useDispatch } from "react-redux";
import React , { useState, useEffect } from 'react'

const awsWebsocketUrl = "wss://sgza54zq2j.execute-api.us-east-2.amazonaws.com/production"

const connectToAWSWebsocket = ({ onConnect, onMsg, onDisconnect }) => {
    console.log('Trying to connect to ws at: ', awsWebsocketUrl)
    const websocket = new WebSocket(awsWebsocketUrl)

    // Connection opened
    websocket.addEventListener('open', function (event) {
        if (onConnect) onConnect(event)
    });

    // Listen for messages
    websocket.addEventListener('close', function (event) {
        if (onDisconnect) onDisconnect(event)
    });

    // Listen for messages
    websocket.addEventListener('message', function (event) {
        console.log('Message from server ', { data: event.data });
        if (onMsg) onMsg(event)
    });

    return websocket
}

export default function WebSocketProvider(props) {
    const dispatch = useDispatch()
    const [ websocket, setWebSocket ] = useState()

    // connects websocket
    // useEffect(() => {
    //     const onConnect = (e) => {
    //         console.log('%c Connected', 'color: lightgreen;font-size:2rem;text-shadow: 3px 3px 0 #00ff')
    //         console.log('Connection data', { data: e?.data });
    //     }
    //     const onMsg = (e) => {
    //         console.log('e ->', e)
    //         dispatch({ type: 'MINED_TRANSACTION', payload: e })
    //     }
    //     const onDisconnect = (e) => {
    //         console.log('%c WARNING: WEBSOCKET DISCONNECTED', 'color:#FF9C2A;font-size:2rem;text-shadow: 3px 3px 0 rgb(217,31,38)')
    //         console.log('Connection closed', { data: e?.data });
    //     }

    //     if (!websocket) setWebSocket(connectToAWSWebsocket({ onConnect, onMsg, onDisconnect }))
    //     return () => {
    //         websocket?.close()
    //     }
    // }, [ websocket, dispatch ])

    return (
        <div>
            {props.children}
        </div>
    )
}