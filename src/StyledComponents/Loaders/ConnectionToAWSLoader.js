import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import styled from "styled-components";

const ConnectionToAWSLoaderStyled = styled.div`
    .loaderContainer {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
    height: 4rem;
    top: 33%;
    left: 48%;
        * {
            font-family: 'Catamaran', sans-serif;
            font-size: 1.5rem;
        }
        .connecting {
            .innerText {
                color: yellow;
            }
        }
        .connected {
            color: green;
        }
    }
`

export default function ConnectionToAWSLoader() {
    const isAWSConnected = useSelector(state => state.isAWSConnected);
    const isAWSLoading = useSelector(state => state.isAWSLoading);
    const isAWSErr = useSelector(state => state.isAWSErr);

    const [ isAWSConnected_S, setIsAWSConnected_S ] = useState(isAWSConnected)
    const [ isAWSLoading_S, setIsAWSLoading_S ] = useState(isAWSLoading)
    const [ isAWSErr_S, setIsAWSErr_S ] = useState(isAWSErr)

    // sets to use always use props
    useEffect(() => {
        if (isAWSConnected_S !== isAWSConnected) setIsAWSConnected_S(isAWSConnected)
        if (isAWSLoading_S !== isAWSLoading) setIsAWSLoading_S(isAWSLoading)
        if (isAWSErr_S !== isAWSErr) setIsAWSErr_S(isAWSErr)
    }, [ isAWSConnected, isAWSLoading, isAWSErr, isAWSLoading_S, isAWSConnected_S, isAWSErr_S ])

    // useEffect(() => {

    //     if (isAWSConnected_S !== isAWSConnected){
            
    //     }

    // }, [ isAWSLoading_S, isAWSConnected_S, isAWSErr_S ])

    return (
        <ConnectionToAWSLoaderStyled>
            <div className='loaderContainer'>
                {isAWSLoading_S && <div className='connecting text'>
                    <span className='innerText first'>CONNECTING</span>
                    <span  className='innerText second'> .</span>
                    <span  className='innerText third'> .</span>
                    <span  className='innerText fourth'> .</span>
                </div>}
                {!isAWSLoading_S && isAWSConnected_S && <div className='connected text'>CONNECTED!</div>}            
            </div>
        </ConnectionToAWSLoaderStyled>
    )
}
