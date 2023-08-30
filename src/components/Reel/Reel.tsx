import { IContentElement } from "models"
import React, { FC, useContext, useRef } from "react"
import { contentElements } from "../../assets/db"
import { FullReelContext } from "../../context/FullReelContext"
import { ContentPoint } from "../ContentPoint/ContentPoint"
import { IReel } from "./interface"
import "./reel.scss"

export const Reel: FC<IReel> = ({ timePeriodsCount, diameter }) => {
  const reelRef = useRef<HTMLDivElement | null>(null)

  const { rotation, angleIncrement, reelTopIndent } =
    useContext(FullReelContext)

  const defineDefaultAngle = (number: number): number => {
    if (number === 5) return -36
    if (number === 4) return -45
    if (number === 3) return -30
    return -60
  }
  const defaultAngle: number = defineDefaultAngle(timePeriodsCount) // градусов против часовой стрелки

  return (
    <div
      className="component-reel"
      ref={reelRef}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: `calc(50% - ${diameter}px / 2)`,
        top: `calc(${reelTopIndent}px - ${diameter}px / 2)`,
      }}
    >
      <div className="component-reel__reel">
        {contentElements.map((item: IContentElement, index) => {
          return (
            <ContentPoint
              key={item.id}
              contentEl={item}
              index={index}
              angle={index * angleIncrement + rotation}
              defaultAngle={defaultAngle}
            />
          )
        })}
      </div>
    </div>
  )
}
