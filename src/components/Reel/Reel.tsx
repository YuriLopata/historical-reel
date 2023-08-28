import React, { FC, useEffect, useRef, useState } from "react"
import { contentElements } from "../../assets/db"
import { IReel } from "./interface"
import "./reel.scss"
import { IContentElement } from "models"
import { ContentPoint } from "../ContentPoint/ContentPoint"
import { gsap } from "gsap"

export const Reel: FC<IReel> = ({
  timePeriodsCount,
  diameter,
  activeEl,
  setActiveEl,
  rotateReel,
}) => {
  const [rotation, setRotation] = useState<number>(0)
  const reelRef = useRef<HTMLDivElement | null>(null)
  const angleIncrement: number = 360 / timePeriodsCount

  const defineDefaultAngle = (): number => {
    if (timePeriodsCount === 5) return -36
    if (timePeriodsCount === 4) return -45
    if (timePeriodsCount === 3) return -30
    return -60
  }
  const defaultAngle = defineDefaultAngle() // градусов против часовой стрелки

  const handleClickContentEl = (contentEl: IContentElement) => {
    setActiveEl(contentEl)
    setRotation(rotation + angleIncrement)
  }

  return (
    <div
      className="component-reel"
      ref={reelRef}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: `calc(50% - ${diameter}px / 2)`,
        top: `calc(480px - ${diameter}px / 2)`,
      }}
    >
      <div className="component-reel__reel">
        {contentElements.map((item: IContentElement, index) => {

          return (
            <ContentPoint
              key={item.id}
              contentEl={item}
              activeEl={activeEl}
              index={index}
              onClickItem={handleClickContentEl}
              angleIncrement={angleIncrement}
              angle={index * angleIncrement + rotation}
              rotation={rotation}
            />
          )
        })}
      </div>
    </div>
  )
}
