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
  const isMounted = useRef<boolean>(false)

  const {
    animDuration,
    activePoint,
    handleClickPoint,
    defineReelRotate,
    definePointRotate,
    reelDiameter,
    pointDiameter,
  } = useContext(AppContext)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1 })
      }

      return
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: animDuration }
      )
    }
  }, [activePoint, animDuration, isMounted, titleRef])

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
            transition: `transform ${animDuration}s ease`,
          }}
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
