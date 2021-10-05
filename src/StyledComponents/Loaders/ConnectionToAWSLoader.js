import React from 'react'
import { useStore } from '../../store'
import styled from "styled-components";

const ConnectionToAWSLoaderStyled = styled.div`
        position: absolute;
        padding: 0rem 3rem 2rem 0rem;
        bottom: 0;
        right: 0;
    .loaderContainer {
        display: flex;
        padding-bottom: .5rem;
        * {
            /* font-family: 'Catamaran', sans-serif; */
            font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
            font-size: 1rem;
        }
        .websocketStatusText {
            color: #6F4D87;
            text-shadow: 0px 0px 10px #6f4d87;
            margin-right: .5rem;
        }
        .text {
        }
        .connecting {
            display: flex;
            .innerText {
                color: yellow;
                color: #FFFB91;
                text-shadow: 0px 0px 30px #FFFB91;
            }
        }
        .connected {
            color: #6DFFB6;
            text-shadow: 0px 0px 30px #6dffb6;
        }
    }
    .authorText{
        font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
        color: #f9efff;
        display: flex;
        justify-content: flex-end;
    }
`

export default function ConnectionToAWSLoader() {
    const isWSConnected = useStore(state => state.isWSConnected);
    const isAWSLoading = useStore(state => state.isAWSLoading);
    const isAWSErr = useStore(state => state.isAWSErr);


    console.log('rendr', { isWSConnected, isAWSLoading, isAWSErr })
    return (    
        <ConnectionToAWSLoaderStyled>
            <div className='loaderContainer'>
                <div className='websocketStatusText'>WEBSOCKET STATUS: </div>
                {isAWSLoading && <div className='connecting text'>
                    <span className='innerText first'>CONNECTING</span>
                    <span  className='innerText second'> .</span>
                    <span  className='innerText third'> .</span>
                    <span  className='innerText fourth'> .</span>
                </div>}
                {!isAWSLoading && isWSConnected && <div className='connected text'>CONNECTED</div>}            
            </div>
            <div className='authorText'>
                BY CARLOS GARCIA
            </div>
        </ConnectionToAWSLoaderStyled>
    )
}
