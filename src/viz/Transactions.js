import React from 'react'
import { useDispatch } from "react-redux";
import HeaderFullWidth from '../StyledComponents/banner/HeaderFullWidth'
import { useStore } from '../store'

export default function Transactions(props) {
    const dispatch = useDispatch() // legacy support
    const addTransaction = useStore(state => state.addTransaction)

    return (
        <div className='transactionsWrapper'>
            <HeaderFullWidth customClassname={'header'}>
                <div className='containerWrapper'>
                    <div className='container'>
                        {/* <div className='containerLeft containerInner'>
                            <div className='blockchainText blockchainTextRight'>
                                BLOCKCHAIN
                            </div>
                            <div className='blockChainType glow'>
                                <div className='value'>ETHEREUM</div>
                            </div>
                        </div> */}
                        <div className='containerMiddle'>
                            {/* <img className='svg' src={media} alt="Ethereum logo"/> */}
                            <button onClick={() => { addTransaction(testTx().body.fullTransaction);dispatch({ type: 'MINED_TRANSACTION', payload: testTx() }) }}>SEND TEST TRANSACTION</button>

                            </div>
                        {/* <div className='containerRight containerInner'>
                            <div className='blockChainType glow'>
                                <div className='value'>TRANSACTIONS</div>
                            </div>
                            
                            <div className='blockchainText blockchainTextLeft'>
                                EVENTS
                            </div>
                        </div> */}
                    </div>
                </div>
            </HeaderFullWidth>
        </div>
    )
}

const testTx = () => { 
    const hash = Math.random() * 2
    
    return {
    "body": {
        "network": 1,
        "webhookType": "MINED_TRANSACTION",
        "timestamp": 3,
        "fullTransaction": {
            "isTest": true,
            "hash": hash, //"0x5a4bf6970980a9381e6d6c78d96ab278035bbff58c383ffe96a0a2bbc7c02a4b",
            "blockHash": "0xaa20f7bde5be60603f11a45fc4923aab7552be775403fc00c2e6b805e6297dbe",
            "blockNumber": "0x989680",
            "from": "0x8a9d69aa686fa0f9bbdec21294f67d4d9cfb4a3e",
            "gas": "0x5208",
            "gasPrice": "0x165a0bc00",
            "input": "0x",
            "nonce": "0x2f",
            "r": "0x575d26288c1e3aa63e80eea927f54d5ad587ad795ad830149837258344a87d7c",
            "s": "0x25f5a3abf22f5b8ef6ed307a76e670f0c9fb4a71fab2621fce8b52da2ab8fe82",
            "to": "0xd69b8ff1888e78d9c337c2f2e6b3bf3e7357800e",
            "transactionIndex": "0x66",
            "v": "0x1c",
            "value": "0x1bc16d674ec80000" // parseInt(string, 16) * (1/(Math.pow(10, 18))) -> 2eth 
      }
    }
}}