// import { useDispatch } from "react-redux";
import React , { useState, useEffect } from 'react'
import { useStore } from '../store'

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
    // const dispatch = useDispatch()
    const addTransaction = useStore(state => state.addTransaction)
    const setWSConnection = useStore(state => state.setWSConnection)

    const [ websocket, setWebSocket ] = useState()

    // connects websocket
    
    useEffect(() => {
        const onConnect = (e) => {
            console.log('%c Connected', 'color: lightgreen;font-size:2rem;text-shadow: 3px 3px 0 #00ff')
            console.log('Connection data', { data: e?.data });
            setWSConnection(true)
            // dispatch({ type: 'AWS_CONNECTED' })
        }
        const onMsg = (e) => {
            const { data } = e
            console.log('e ->', data)

            const tx = formatTx(data) // to use in -> { value, hash, isTest }
            addTransaction(tx)
            // dispatch({ type: 'MINED_TRANSACTION', payload: e })
        }
        const onDisconnect = (e) => {
            console.log('%c WARNING: WEBSOCKET DISCONNECTED', 'color:#FF9C2A;font-size:2rem;text-shadow: 3px 3px 0 rgb(217,31,38)')
            console.log('Connection closed', { data: e?.data });
            setWSConnection(false)
            // dispatch({ type: 'AWS_DISCONNECTED' })
        }

        if (!websocket) {
            // dispatch({ type: 'AWS_LOADING' })
            setWebSocket(connectToAWSWebsocket({ onConnect, onMsg, onDisconnect }))
        }
        return () => {
            websocket?.close()
        }
    }, [ websocket ])

    return (
        <div>
            {props.children}
        </div>
    )
}

// change the hash 
const formatTx = (transaction) => {
    const tx = JSON.parse(transaction)
    if (tx?.hash === '0x5a4bf6970980a9381e6d6c78d96ab278035bbff58c383ffe96a0a2bbc7c02a4b') {
        tx.isTest = true
        tx.hash = `TEST_TRANSACTION - ${Math.random() * 2}`
    }
    return tx
}