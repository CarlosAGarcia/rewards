import React from 'react'
import styled from "styled-components";

const HeaderFullWidthStyled = styled.div`
    width: 100%;
    display: flex;
    height: ${props => props.customHeight || '7rem'};
    background-color: ${props => props.backgroundColor || 'grey'};
    padding: 2rem;
    .top, .bot, .left, .right {
        position: absolute;
    }
    .top {
        top: 0;
    }
    .left {
        left: 0;
    }
    .right {
        right: 0;
    }
    .bot {
        bottom: 0;
    }
    .containerWrapper {
        height: 100%;
        display: flex;
        align-items: center;
        .container {
            display: flex;
            align-items: center;
            .blockchainText {
                margin-right: 1rem;
            }
            .blockchainText, .blockChainType {
                font-size: 2.5rem;
                font-family: 'Catamaran', sans-serif;
                color: #e6f3fe;
                .type {
                    font-size: .5rem;
                }
                .value {
                    line-height: 2.5rem;
                }
            }

            .blockChainType {
                background-color: #000;
                padding: .5rem 2rem;
                border-radius: 7px;
                box-shadow:
                    inset 0 0 50px #fff,
                    inset 20px 0 80px #f0f,
                    inset -20px 0 80px #0ff,
                    inset 20px 0 300px #f0f,
                    inset -20px 0 300px #0ff,
                    0 0 50px #fff,
                    -10px 0 80px #f0f,
                    10px 0 80px #0ff;
            }
        }
    }

`

export default function HeaderFullWidth(props) {
    const { backgroundColor, customHeight, customClassname } = props

    return (
        <HeaderFullWidthStyled backgroundColor={backgroundColor} customHeight={customHeight} className={`headerFullWidth ${customClassname}`}>
            {/* <div className='topBorderContainer'> */}
                {/* <div className='top left'>
.
                </div>
                <div className='top right'>
.
                </div>
            </div> */}
            {props.children}
            {/* <div className='botBorderContainer'>
                <div className='bot left'>
.
                </div>
                <div className='bot right'>
                    .
                </div>
            </div> */}
        </HeaderFullWidthStyled>
    )
}
