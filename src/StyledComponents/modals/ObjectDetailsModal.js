import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useStore } from '../../store'
import CustomPortal from '../../utilComponents/CustomPortal.js'

// const ObjectDetailsModalStyled = styled.div`
//     position: absolute;
//     top: ${ props => props.position.y };
//     left: ${ props => props.position.x };
//     background-color: white;
//     z-index: 99;
// `
const ObjectDetailsModalStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    /* width: 20%;
    height: 15%; */
    overflow: scroll;
    opacity: .8;
    .ModalContainer {
        font-family: 'Catamaran', sans-serif;
        width: 21rem;
        height: 17rem;
        .headerContainer {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
        .contentContainer {
            padding-top: 2rem;
            .detailKeyContainer {
                display: flex;
                padding: .5rem;
                border-top: 1px solid #cccc;
                .keyText {
                    margin-right: .5rem;
                }
            }
        }
    }
`
export default function ObjectDetailsModal(props) {
    const { hash, position } = props

    // local state
    const [ details, setDetails ] = useState({})

    // Global state
    const transactions = useStore(state => state.transactions)
    const removeTransactionClicked = useStore(state => state.removeTransactionClicked)


    // mount/unmount of mousePos tracking
    useEffect(() => {
        const transaction = transactions.find(tx => tx.hash === hash )
        setDetails(transaction)
    }, [])

    const generateLink = (key) => {
        const keyUpper = key.toUpperCase()
        const val = details[key]

        const canBeLinks = [ 'HASH', 'BLOCKHASH', 'BLOCKNUMBER', 'FROM', 'TO' ]

        const isValue = keyUpper === 'VALUE'
        const valueInEth = isValue ? parseInt(val, 16) * (1/(Math.pow(10, 18))) : null

        const url = canBeLinks.includes(keyUpper) ? `https://etherscan.io/search?f=0&q=${val}` : undefined
        const text = isValue ? `${val} (approx. ${valueInEth}) ETH` : `${val}`

        return <a target="_blank" rel="noreferrer" href={url} >
            {text}
        </a>
    }

    return (
        <CustomPortal id={'App'} className='customPortalContainer'>
            <ObjectDetailsModalStyled position={position}>
                <div className='ModalContainer'>
                    <div className='headerContainer'>
                        <div className='hashText'>{hash}</div>
                        <div className='closeBtn' onClick={() => removeTransactionClicked(hash)}>CLOSE</div>
                    </div>
                    <div className='contentContainer'>
                        {
                            Object.keys(details).map((key, i) => {
                                return <div key={`detail-${i}`} className='detailKeyContainer'>
                                    <div className='keyText'>{`${key.toUpperCase()}: `}</div>
                                    <div className='keyDetailsContainer' >
                                        { generateLink(key) }
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div> 
            </ObjectDetailsModalStyled>
        </CustomPortal>
    )
}
