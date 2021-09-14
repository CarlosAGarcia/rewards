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
        if (JSON.stringify(hashesClicked) !== JSON.stringify(transactionsClicked)) setHashesClicked(transactionsClicked)
    }, [ transactionsClicked, hashesClicked ])



    return (
        <FullWidthMouseTracking>
            {
                hashesClicked.map((hash, index) => {
                    return <ObjectDetailsModal key={`modal-${index}`} hash={hash} position={position} />
                })
            }
        </FullWidthMouseTracking>
    )
}
