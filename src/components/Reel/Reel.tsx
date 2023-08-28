import React, { FC, useContext, useRef } from "react"
import { contentElements } from "../../assets/db"
import { IReel } from "./interface"
import "./reel.scss"
import { IContentElement } from "models"
import { ContentPoint } from "../ContentPoint/ContentPoint"
import { AppContext } from "../../context/AppContext"

export const Reel: FC<IReel> = ({
  timePeriodsCount,
  diameter,
  handleChangePoint
}) => {
  const reelRef = useRef<HTMLDivElement | null>(null)

  const {activePoint, rotation, angleIncrement} = useContext(AppContext)

  const defineDefaultAngle = (): number => {
    if (timePeriodsCount === 5) return -36
    if (timePeriodsCount === 4) return -45
    if (timePeriodsCount === 3) return -30
    return -60
  }
  const defaultAngle = defineDefaultAngle() // градусов против часовой стрелки

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
              index={index}
              onClickItem={handleChangePoint}
              angle={index * angleIncrement + rotation}
              defaultAngle={defaultAngle}
            />
          )
        })}
      </div>
    </div>
  )
}
