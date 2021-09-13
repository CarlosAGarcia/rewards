import React, { useState, useEffect } from 'react'
import CoinSymbol from '../canvasComponents/BasicObject'
import { useStore } from '../store'
import { isEmpty } from 'lodash'

// end location for txs
export const defaultEdgeX = 4
export const defaultEdgeY = 3.8
export const defaultEdgeZ = -4

// middle symbol
export const initialX = 0
export const initialY = 0
export const initialZ = 0

//spawn pt for transactions
export const spawnX = -5
export const spawnY = -4
export const spawnZ = 8

function BasicScene(props) {
    const transactions = useStore(state => state.transactions)
    const newTransaction = useStore(state => state.newTransaction)
    const removeTransactionByHash = useStore(state => state.removeTransactionByHash)

    // STATE VARS - TRANSACTIONS
    const [ transactionsState, setTransactionsState ] = useState(transactions)
    const [ newTransactionState, setNewTransaction ] = useState(newTransaction)

    // // on transaction
    useEffect(() => {
        // transactions have changed
        const isDifferentTransaction = !isEmpty(newTransaction) && JSON.stringify(newTransactionState) !== JSON.stringify(newTransaction)

        if (isDifferentTransaction) {
            setTransactionsState(transactions)
            setNewTransaction(newTransaction)
            addFloatingCoinDirectional({ objValues: newTransaction })
        }
    }, [ transactions, newTransaction, transactionsState, newTransactionState ])

    const addFloatingCoinDirectional = ({ objValues }) => {
        const { value, gas, gasPrice, hash, isTest } = objValues

        const value_decimal = parseInt(value, 16)
        const gas_decimal = parseInt(gas, 16)
        const gasPrice_decimal = parseInt(gasPrice, 16)
        const gasCost_Decimal = gas_decimal * gasPrice_decimal

        const valueInEth = (value_decimal + (gasCost_Decimal)) * (1/(Math.pow(10, 18))) // value in eth
        
        // Changes size of stuff
        const getTestMult = () => {
            let num = 1
            let r = Math.random()

            if (r <= .3) { // smaller than usual 30%
                num = Math.random()
            }  else if (r >= .6 && r < .9) { //  20%
                num = (Math.random() * 3 ) + 1
            } else if (r >= .9) {
                num = Math.random() * 10
            }

            return num + .1
        }
        const multiplier = isTest ? getTestMult() : valueInEth // simplest -> to be changed later (rn == 1)


        const defSizeOfOneUnit = .05

        const width = parseFloat((defSizeOfOneUnit * multiplier).toFixed(4))
        const height = parseFloat((defSizeOfOneUnit * multiplier).toFixed(4))
        const depth = parseFloat((defSizeOfOneUnit * multiplier).toFixed(4))


        // from 0-1, 1-3, 3-5, 10-20, 20-50, 50-100, 100-200, 200+
        const x = spawnX
        const y = spawnY
        const z = spawnZ

        const movePerRenderX = (defaultEdgeX - spawnX)
        const movePerRenderY = (defaultEdgeY - spawnY)
        const movePerRenderZ = (defaultEdgeZ - spawnZ)

        const Cs = { hash, movePerRenderX, movePerRenderY, movePerRenderZ, width, height, depth, x, y, z }


        setObjects([ ...Objects, Cs ])
    }

    // removes tx from both state machine + canvas
    const removeCoin = (hash) => {
        const newObjects = Objects.filter(o => o.hash !== hash)

        removeTransactionByHash(hash)
        setObjects(newObjects)
    }

    const [ Objects, setObjects ] = useState([])

    // mount unmount
    useEffect(() => {

        return () => {
        }
    }, [])

  return (<React.Fragment>
        <pointLight intensity={20} position={[ spawnX, spawnY, spawnZ ]}/>
        <ambientLight intensity={0.1} />
        <CoinSymbol
            width={.5} height={.5}  depth={.5}
            x={initialX} y={initialY} z={initialZ}
        />
        <CoinSymbol
            width={.5} height={.5}  depth={.5}
            x={spawnX} y={spawnY} z={spawnZ}
        />
        <CoinSymbol
            width={.25} height={.25}  depth={.25}
            x={4} y={4} z={4}
        />
        <CoinSymbol
            width={.5} height={.5}  depth={.5}
            x={defaultEdgeX} y={defaultEdgeY} z={defaultEdgeZ}
        />
        {Objects.map((obj, index) => {
            const { hash, movePerRenderX, movePerRenderY, movePerRenderZ, width, height, depth, x, y, z } = obj
            return <CoinSymbol
                key={`obj-${index}`}
                removeCoin={removeCoin}
                hash={hash}
                movement={[ movePerRenderX, movePerRenderY, movePerRenderZ ]}
                width={width} height={height} depth={depth}
                x={x} y={y} z={z}
            />
        })}
    </React.Fragment>
  )
}

export default BasicScene
