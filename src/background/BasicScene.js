import React, { useState, useEffect } from 'react'
import CoinSymbol from '../canvasComponents/BasicObject'
import { useStore } from '../store'

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

    // STATE VARS - TRANSACTIONS
    const [ transactionsState, setTransactionsState ] = useState(transactions)
    const [ newTransactionState, setNewTransaction ] = useState(newTransaction)

    // // on transaction
    useEffect(() => {
        console.log('transactions updated?', transactions)
        // transactions have changed
        if (newTransaction && JSON.stringify(newTransactionState) !== JSON.stringify(newTransaction)) {
            setTransactionsState(transactions)
            setNewTransaction(newTransaction)
            addFloatingCoinDirectional({ objValues: newTransaction })
        }
    }, [ transactions, newTransaction, transactionsState, newTransactionState ])

    const addFloatingCoinDirectional = ({ objValues }) => {
        const { value, gas, gasPrice } = objValues

        const value_decimal = parseInt(value, 16)
        const gas_decimal = parseInt(gas, 16)
        const gasPrice_decimal = parseInt(gasPrice, 16)
        const gasCost_Decimal = gas_decimal * gasPrice_decimal

        const valueInEth = (value_decimal + (gasCost_Decimal)) * (1/(Math.pow(10, 18))) // value in eth
        
        const multiplier = valueInEth // simplest -> to be changed later (rn == 1)

        const defSizeOfOneUnit = .05

        const width = defSizeOfOneUnit * multiplier
        const height = defSizeOfOneUnit * multiplier
        const depth = defSizeOfOneUnit * multiplier


        // from 0-1, 1-3, 3-5, 10-20, 20-50, 50-100, 100-200, 200+
        const x = spawnX
        const y = spawnY
        const z = spawnZ
        const Cs = <CoinSymbol
                movement={[0.1,0,0]}
                width={width} height={height} depth={depth}
                x={x} y={y} z={z}
            />
        console.log('ADDING TO NEW ->', { Objects, Cs })
        setObjects([ ...Objects, Cs ])
        // createSymbol({ width, height, depth, x, y, z, color: '#afac' })
    }

    // Deals with all objects in scene
    const setInitialObjects = [<CoinSymbol
                width={.5} height={.5}  depth={.5}
                x={defaultEdgeX} y={defaultEdgeY} z={defaultEdgeZ}
            />,
            <CoinSymbol
                width={.5} height={.5}  depth={.5}
                x={initialX} y={initialY} z={initialZ}
            />,
            <CoinSymbol
                width={.5} height={.5}  depth={.5}
                x={spawnX} y={spawnY} z={spawnZ}
            />,
            <CoinSymbol
                width={.25} height={.25}  depth={.25}
                x={4} y={4} z={4}
            />]


    const [ Objects, setObjects ] = useState(setInitialObjects)

    // mount unmount
    useEffect(() => {

        return () => {
        }
    }, [])

    console.log('Objects', Objects)
  return (<React.Fragment>
        <pointLight intensity={20} position={[ spawnX, spawnY, spawnZ ]}/>
        <ambientLight intensity={0.1} />
        {/* <spotLight position={[ 2, 2, 0 ]} angle={0.5} penumbra={2} /> */}
        {Objects.map(o => o )}
    </React.Fragment>
  )
}


// const mapStateToProps = (state) => {
//     console.log(state)
//     return {
//         transactions: state.transactions,
//         newTransaction: state.newTransaction
//     }
// }

// const mapDispatchToProps = {
    
// }

export default BasicScene //connect(mapStateToProps, mapDispatchToProps)(BasicScene)
