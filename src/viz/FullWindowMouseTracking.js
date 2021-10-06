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
        const hashObjToRemove = hashesClicked.find(obj => !transactionsClicked.includes(obj.hash)) // finds hash in state that isnt in transactions clicked (remove this hash)
        if (hashObjToRemove) {
            const { hash } = hashObjToRemove
            newTxs = hashesClicked.filter(obj => obj.hash !== hash)
        } else {
            const hashToAdd = transactionsClicked.find(hash => hashesClicked.find(obj => obj.hash === hash) ? undefined : hash) // finds hash in transactions that isnt in state (add this hash)
            if (hashToAdd) newTxs = [ ...hashesClicked, { hash: hashToAdd, position }]
        }
        console.log(newTxs)
        setHashesClicked(newTxs)

    }, [ transactionsClicked ])

    // maybe save the component in state instead of just hashes as components persist and last component is removed and all others are updated in their data to match array sort
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
