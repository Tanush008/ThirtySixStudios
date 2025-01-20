import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap';
import webImages from './WebImages';
import { useGSAP } from '@gsap/react';
import data from './data';
export const Canvas = ({ details }) => {
    // const [canvas, setCanvas] = useState(null);
    const canvasRef = useRef(null);
    const { startIndex, numImages, zIndex, top, left, size, duration } = details
    const [index, setIndex] = useState({ value: startIndex });
    useGSAP(() => {
        gsap.to(index, {
            value: startIndex + numImages - 1,
            duration: duration,
            repeat: -1,
            ease: "linear",
            // ease: "power1.inOut",
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) })
            }
        })
        gsap.from(canvasRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        })
    })
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const scale = window.devicePixelRatio;
        const img = new Image();
        img.src = webImages[index.value];
        img.onload = () => {
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + 'px';
            canvas.style.height = canvas.offsetHeight + 'px';
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);

        }
    }, [index])
    return (
        <>
            <canvas ref={canvasRef}
                data-scroll
                data-scroll-speed={Math.random().toFixed(2)}
                style={{
                    width: `${size * 1.5}px`,
                    height: `${size * 1.5}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                    zIndex: `${zIndex}`
                }}
                className='absolute'
                id='canvas'></canvas>
        </>
    )
}
