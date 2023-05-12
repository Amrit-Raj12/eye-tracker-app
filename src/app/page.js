"use client"

import { useEffect, useRef, useState } from 'react'
import './page.scss'

import HasprCursor from 'haspr-cursor' // Import Wrapper
import 'haspr-cursor/dist/cursor.css' // Import Style sheet

export default function Home() {

  const [mousCoordinates, setMouseCoodinates] = useState({ x:0, y:0 })

  const eyeBrowLeft = useRef()
  const eyeBrowRight = useRef()

  const eyeLeft = useRef()
  const eyeRight = useRef()

  const calcAngle = (element) => {
    if(!element.current) return;

    let elX = element.current.offsetLeft + element.current.clientWidth /2;
    let elY = element.current.offsetTop + element.current.clientHeight /2;

    let rad = Math.atan2(mousCoordinates.x - elX, mousCoordinates.y -elY)
    let rot = rad * (180/Math.PI) * -1 + -18;

    return rot;
  }

  const handleMouseMove = (event) => {
    setMouseCoodinates({ x:event.clientX, y: event.clientY })

    eyeBrowLeft.current.style.transform = `translate(${event.clientY / 50}px)`
    eyeBrowRight.current.style.transform = `translate(${
      event.clientY / 50
    }px)`
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <HasprCursor>
    <main className='app'>
      <div className='eyebrow_container'>
        <div ref={eyeBrowLeft} className='eye_brow left'></div>
        <div ref={eyeBrowRight} className='eye_brow right'></div>
      </div>
      <div className='eye_container'>
        <div
          ref={eyeLeft}
          style={{
            transform: `rotate(${calcAngle(eyeLeft)}deg)`,
          }}
          className='eye'
        >
        </div>
        <div
          ref={eyeRight}
          style={{
            transform: `rotate(${calcAngle(eyeRight)}deg)`,
          }}
          className='eye'
        >
        </div>
      </div>
    </main>
    </HasprCursor>
  )
}
