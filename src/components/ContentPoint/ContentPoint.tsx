import React, { FC, useEffect, useRef } from "react"
import { IContentPoint } from "./interface"
import { IContentElement } from "models"
import { gsap } from "gsap"
import "./contentPoint.scss"

export const ContentPoint: FC<IContentPoint> = ({
  contentEl,
  activeEl,
  index,
  onClickItem,
  layout
}) => {
  const pointRef = useRef<HTMLButtonElement | null>(null)
  const titleRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (titleRef.current) {
      const titleAnimation = gsap.to(titleRef.current, {
        duration: 1,
        opacity: 1,
      })
      titleAnimation.delay(0) // TODO/ рассчитать задержку после анимации вращения
      titleAnimation.play()
    }
  }, [activeEl])

  const getActiveClassname = (el: IContentElement): string => {
    if (el.id === activeEl.id) return "component-contentPoint-wrapper--active"
    return ""
  }

  return (
    <button
      key={contentEl.id}
      ref={pointRef}
      onClick={() => onClickItem(contentEl)}
      className={`component-contentPoint-wrapper ${getActiveClassname(
        contentEl
      )}`}
      style={layout}
    >
      <div
        className="component-contentPoint"
      >
        <p className="component-contentPoint__number">{index + 1}</p>

        {contentEl.id === activeEl.id && (
          <p ref={titleRef} className="component-contentPoint__title">
            {activeEl.title}
          </p>
        )}
      </div>
    </button>
  )
}
