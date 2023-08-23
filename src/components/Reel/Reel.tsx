import { gsap } from "gsap"
import React, { FC, useEffect, useRef } from "react"
import { items } from "../../assets/db"
import { IReel } from "./interface"
import "./reel.scss"

export const Reel: FC<IReel> = ({ timePeriodsNum }) => {
  const reelRef = useRef<HTMLDivElement | null>(null)
  const dotWrapperRefs = useRef<Array<HTMLButtonElement | null>>([])
  const angleIncrement: number = 360 / timePeriodsNum
  const defaultRotate = -60 // 60 градусов против часовой стрелки

  useEffect(() => {
    const reel: any = reelRef.current
    const centerX = reel.offsetWidth / 2
    const centerY = reel.offsetHeight / 2
    const radius = reel.offsetWidth / 2

    dotWrapperRefs.current.map((dotWrapper, index) => {
      if (dotWrapper) {
        const adjustedAngle =
          ((index * angleIncrement + defaultRotate) * Math.PI) / 180 // расчет угла между точками
        const x = centerX + radius * Math.cos(adjustedAngle)
        const y = centerY + radius * Math.sin(adjustedAngle)

        gsap.set(dotWrapper, { x, y })
      }
    })
  }, [])

  return (
    <div className="component-reel" ref={reelRef}>
      <div className="component-reel__reel"></div>

      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(el) => (dotWrapperRefs.current[index] = el)}
          className="component-reel__dot-wrapper"
          style={{ transform: `rotate(${angleIncrement * index}deg)` }}
        >
          <div
            className="component-reel__dot"
            style={{ transform: `rotate(-${angleIncrement * index}deg)` }}
          >
            <p>{index + 1}</p>
          </div>
        </button>
      ))}

      {/* <p className="component-reel__title">История</p> */}
    </div>
  )
}
