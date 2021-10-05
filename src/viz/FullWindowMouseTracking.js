import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useStore } from '../store'
import ObjectDetailsModal from '../StyledComponents/modals/ObjectDetailsModal'

const FullWidthMouseTracking = styled.div`
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
`

export default function FullWindowMouseTracking() {
    // local state
    const [ hashesClicked, setHashesClicked ] = useState([])

    const [ position, setPosition ] = useState({ x: 0, y: 0 });

    // global state
    const transactionsClicked = useStore(state => state.transactionsClicked)
    // const lastTxClicked  = useStore(state => state.lastTxClicked)

    // mount/unmount of mousePos tracking
    useEffect(() => {
        const setMousePos = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", setMousePos);

        return () => {
            window.removeEventListener("mousemove", setMousePos);
        }
    }, [])

    // on updates of transaction clicked + transactions
    useEffect(() => {
        let newTxs = hashesClicked
        const hashToRemove = hashesClicked.find(obj => transactionsClicked.includes(obj.hash) ? undefined : obj.hash ) // finds hash in state that isnt in transactions clicked (remove this hash)
        if (hashToRemove) {
            newTxs = hashesClicked.filter(obj => obj.hash !== hashToRemove)
        } else {
            const hashToAdd = transactionsClicked.find(hash => hashesClicked.find(obj => obj.hash === hash) ? undefined : hash) // finds hash in transactions that isnt in state (add this hash)
            if (hashToAdd) newTxs = [ ...hashesClicked, { hash: hashToAdd, position }]
        }


        // const addTx = transactionsClicked.includes(lastTxClicked) // if it's present. Then we add it to our state
        // if (addTx) {
        //     const isAlrInState = hashesClicked.find(obj => obj.hash === lastTxClicked)
        //     if (!isAlrInState) newTxs = [ ...hashesClicked, { hash: lastTxClicked, position }]
        // } else {
        //     newTxs = hashesClicked.filter(obj => obj.hash !== lastTxClicked)
        // }

        setHashesClicked(newTxs)

    }, [ transactionsClicked ])

    return (
        <FullWidthMouseTracking>
            {
                hashesClicked.map((obj, index) => {
                    return <ObjectDetailsModal key={`modal-${index}`} hash={obj.hash} position={obj.position} />
                })
            }
        </FullWidthMouseTracking>
    )
}
