import React, { FC, useContext, useRef } from "react"
import { IContentPoint } from "./interface"
import { IContentElement } from "models"
import "./contentPoint.scss"
import { FullReelContext } from "../../context/FullReelContext"
import { Title } from "../Title/Title"

export const ContentPoint: FC<IContentPoint> = ({
  contentEl,
  index,
  angle,
  defaultAngle,
}) => {
  const pointRef = useRef<HTMLButtonElement | null>(null)

  const {
    animDuration,
    activePoint,
    handleClickPoint,
    defineReelRotate,
    definePointRotate,
    reelDiameter,
    pointDiameter,
  } = useContext(FullReelContext)

  const getActiveClassname = (el: IContentElement): string => {
    if (el.id === activePoint.id) return "component-point-wrapper--active"
    return ""
  }

  return (
    <button
      key={contentEl.id}
      ref={pointRef}
      onClick={() => handleClickPoint(contentEl)}
      className={`component-point-wrapper ${getActiveClassname(contentEl)}`}
      tabIndex={getActiveClassname(contentEl) !== "" ? -1 : 0}
      style={{
        transform: `rotate(${angle + defaultAngle}deg)`,
        transformOrigin: `${-(reelDiameter / 2 - pointDiameter / 2)}px 27.5px`,
        transition: `transform ${animDuration}s ease`,
      }}
    >
      <div
        className="component-point"
        style={{
          transform: `rotate(${definePointRotate()}deg)`,
        }}
      >
        <p
          className="component-point__number"
          style={{
            transform: `rotate(${defineReelRotate(contentEl)}deg)`,
            transition: `all ${animDuration}s ease`,
          }}
        >
          {index + 1}
        </p>

        {contentEl.id === activePoint.id && (
          <Title title={activePoint.title} />
        )}
      </div>
    </button>
  )
}
