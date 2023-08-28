import { gsap } from "gsap"
import React, { FC, useEffect, useRef } from "react"
import { contentElements } from "../../assets/db"
import { IReel } from "./interface"
import "./reel.scss"
import { IContentElement } from "models"
import { ContentPoint } from "../ContentPoint/ContentPoint"

export const Reel: FC<IReel> = ({
  timePeriodsCount,
  diameter,
  activeEl,
  setActiveEl,
}) => {
  const reelRef = useRef<HTMLDivElement | null>(null)
  const pointWrapperRefs = useRef<(HTMLButtonElement | null)[]>([])
  const angleIncrement: number = 360 / timePeriodsCount

  const defineDefaultAngle = (): number => {
    if (timePeriodsCount === 5) return -36
    if (timePeriodsCount === 4) return -45
    if (timePeriodsCount === 3) return -30
    return -60
  }
  const defaultAngle = defineDefaultAngle() // градусов против часовой стрелки

  useEffect(() => {
    const reel = reelRef.current

    if (reel) {
      const radius = diameter / 2

      pointWrapperRefs.current.map((pointWrapper, index) => {
        if (pointWrapper) {
          const adjustedAngle =
            ((index * angleIncrement + defaultAngle) * Math.PI) / 180 // расчет угла между точками
          const x = radius * Math.cos(adjustedAngle)
          const y = radius * Math.sin(adjustedAngle)

          gsap.set(pointWrapper, { x, y })
        }
      })
    }
  }, [])

  const handleClickContentEl = (contentEl: IContentElement) => {
    setActiveEl(contentEl)
  }

  return (
    <div
      className="component-reel"
      ref={reelRef}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: `calc(50% - ${diameter}px / 2)`,
        top: `calc(480px - ${diameter}px / 2)`
      }}
    >
      <div className="component-reel__reel"></div>

      {contentElements.map((item: IContentElement, index) => (
        <ContentPoint
          key={item.id}
          contentEl={item}
          activeEl={activeEl}
          index={index}
          onClickItem={handleClickContentEl}
          angleIncrement={angleIncrement}
          pointWrapperRefs={pointWrapperRefs}
        />
      ))}
    </div>
  )
}
