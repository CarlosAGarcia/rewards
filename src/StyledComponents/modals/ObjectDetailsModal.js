import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useStore } from '../../store'
import CustomPortal from '../../utilComponents/CustomPortal.js'
import Draggable from 'react-draggable';


const ObjectDetailsModalStyled = styled.div`
    position: absolute;
    top: 10px; //${props => props.position ? props.position.y : 0};
    left: 10px; //${props => props.position ? props.position.x : 0};
    background-color: rgb(191 241 251);
    overflow: scroll;
    opacity: .8;
    border-radius: 20px;
    padding: 1rem 2rem;

    animation: glowPink 8s ease-in infinite;
    &:before {
        backdrop-filter: blur(10px) saturate(100%) contrast(45%) brightness(130%);
    }
    .ModalContainer {
        font-family: 'Catamaran', sans-serif;
        width: 21rem;
        height: 17rem;
        color: #000066;
        .headerContainer {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .hashText {
                font-size: 2rem;
            }
            .closeBtn {
                border: none;
                background: transparent;
            }
            .closeBtn, .hashText {
                display: flex;
                align-items: center;                
            }
        }
        .contentContainer {
            padding-top: 2rem;
            .detailKeyContainer {
                display: flex;
                padding: .5rem;
                border-top: 1px solid #cccc;
                font-size: 1.5rem;
                .keyText {
                    margin-right: .5rem;
                }
            }
        }
    }
    @-webkit-keyframes glowPink {
        from {
            box-shadow: rgb(191 241 251) 0px 4px 15px 3px, rgb(191 241 251) 0px 0px 18px 1px inset;
        }
        50% {
            box-shadow: rgb(191 241 251) 0px 4px 15px 7px, rgb(191 241 251) 0px 0px 18px 0px inset;                   
        } to {
            box-shadow: rgb(191 241 251) 0px 4px 15px 3px, rgb(191 241 251) 0px 0px 18px 1px inset;
        }
    }
    @keyframes glowPink {
        from {
            box-shadow: rgb(191 241 251) 0px 4px 15px 3px, rgb(191 241 251) 0px 0px 18px 1px inset;
        } 
        50% {
            box-shadow: rgb(191 241 251) 0px 4px 15px 7px, rgb(191 241 251) 0px 0px 18px 0px inset;                  
        } to {
            box-shadow: rgb(191 241 251) 0px 4px 15px 3px, rgb(191 241 251) 0px 0px 18px 1px inset;
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
        const textFormatted = text.length > 14 ? `${text.substring(0, 15)}...` : text
        return <a target="_blank" rel="noreferrer" href={url} >
            {textFormatted}
        </a>
    }
    console.log({ position })
    return (
        <CustomPortal id={'App'} className='customPortalContainer'>
            <Draggable>
                <ObjectDetailsModalStyled position={position}>
                    <div className='ModalContainer'>
                        <div className='headerContainer'>
                            <div className='hashText'>TRANSACTION</div>
                            <button className='closeBtn' type='button' onClick={() => removeTransactionClicked(hash)}>CLOSE</button>
                        </div>
                        <div className='contentContainer'>
                            { details &&
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
            </Draggable>
        </CustomPortal>
    )
}
