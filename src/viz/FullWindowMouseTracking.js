import React, { useState, useEffect } from 'react'
import styled from "styled-components";

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
    const [ position, setPosition ] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const setMousePos = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setMousePos);

        return () => {
            window.removeEventListener("mousemove", setMousePos);
        }
    }, [])

    return (
        <FullWidthMouseTracking>
            
        </FullWidthMouseTracking>
    )
}
