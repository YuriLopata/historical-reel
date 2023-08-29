import React, { FC, useContext, useEffect, useRef } from "react"
import { IContentPoint } from "./interface"
import { IContentElement } from "models"
import { gsap } from "gsap"
import "./contentPoint.scss"
import { AppContext } from "../../context/AppContext"

export const ContentPoint: FC<IContentPoint> = ({
  contentEl,
  index,
  angle,
  defaultAngle,
}) => {
  const pointRef = useRef<HTMLButtonElement | null>(null)
  const titleRef = useRef<HTMLParagraphElement | null>(null)

  const { angleIncrement, activePoint, handleClickPoint, defineRotateAngle } =
    useContext(AppContext)

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
      onClick={() => handleClickPoint(contentEl)}
      className={`component-point-wrapper ${getActiveClassname(contentEl)}`}
      tabIndex={getActiveClassname(contentEl) !== "" ? -1 : 0}
      style={{
        transform: `rotate(${angle + defaultAngle}deg)`,
      }}
    >
      <div
        className="component-point"
        style={{
          transform: `rotate(${angleIncrement}deg)`,
        }}
      >
        <p
          className="component-point__number"
          style={{ transform: `rotate(${defineRotateAngle(contentEl)}deg)` }}
        >
          {index + 1}
        </p>

        {contentEl.id === activePoint.id && (
          <p ref={titleRef} className="component-point__title">
            {activePoint.title}
          </p>
        )}
      </div>
    </button>
  )
}
