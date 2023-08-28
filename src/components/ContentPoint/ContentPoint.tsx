import React, { FC, useContext, useEffect, useRef } from "react"
import { IContentPoint } from "./interface"
import { IContentElement } from "models"
import { gsap } from "gsap"
import "./contentPoint.scss"
import { AppContext } from "../../context/AppContext"

export const ContentPoint: FC<IContentPoint> = ({
  contentEl,
  index,
  onClickItem,
  angle,
  defaultAngle,
}) => {
  const pointRef = useRef<HTMLButtonElement | null>(null)
  const titleRef = useRef<HTMLParagraphElement | null>(null)

  const { angleIncrement, rotation, activePoint } = useContext(AppContext)

  useEffect(() => {
    if (titleRef.current) {
      const titleAnimation = gsap.to(titleRef.current, {
        duration: 2,
        opacity: 1,
      })
      titleAnimation.delay(0) // TODO/ рассчитать задержку после анимации вращения
      titleAnimation.play()
    }
  }, [activePoint])

  const getActiveClassname = (el: IContentElement): string => {
    if (el.id === activePoint.id) return "component-point-wrapper--active"
    return ""
  }

  return (
    <button
      key={contentEl.id}
      ref={pointRef}
      onClick={() => onClickItem(contentEl)}
      className={`component-point-wrapper ${getActiveClassname(contentEl)}`}
      style={{
        transform: `rotate(${angle + defaultAngle}deg)`,
      }}
    >
      <div
        className="component-point"
        style={{
          transform: `rotate(${
            /*360 - rotation * (index + 1) + */ angleIncrement
          }deg)`,
        }} // TODO/рассчитать формулу поворота эл-та
      >
        <p className="component-point__number">{index + 1}</p>

        {contentEl.id === activePoint.id && (
          <p ref={titleRef} className="component-point__title">
            {activePoint.title}
          </p>
        )}
      </div>
    </button>
  )
}
