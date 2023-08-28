import { Child } from "../Child/Child"
import React, { useEffect, useRef, useState } from "react"
import "./parent.css"
import { gsap } from "gsap"

export const Parent = () => {
  const numChildren = 6
  const angleStep = 360 / numChildren

  const [rotation, setRotation] = useState(0)

  const children = Array.from({ length: numChildren }, (_, index) => (
    <Child key={index} angle={index * angleStep + rotation} />
  ))

  const handleChildClick = () => {
    setRotation(rotation + angleStep)
  }

  return (
    <div className="parent">
      {children.map((child, index) => (
        <div key={index} className="child-container" onClick={handleChildClick}>
          {child}
        </div>
      ))}
    </div>
  )
}
