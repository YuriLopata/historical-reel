import React, { FC, useEffect, useRef } from "react"
import { IContentPoint } from "./interface"
import { IContentElement } from "models"
import { gsap } from "gsap"

export const ContentPoint: FC<IContentPoint> = ({
  contentElement,
  activeEl,
  index,
  onClickItem,
  angleIncrement,
  pointWrapperRefs,
}) => {
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
    if (el.id === activeEl.id) return "component-reel__point-wrapper--active"
    return ""
  }

  return (
    <button
      key={contentElement.id}
      ref={(el: HTMLButtonElement) => (pointWrapperRefs.current[index] = el)}
      onClick={() => onClickItem(contentElement)}
      className={`component-reel__point-wrapper ${getActiveClassname(
        contentElement
      )}`}
      style={{ transform: `rotate(${angleIncrement * index}deg)` }}
    >
      <div
        className="component-reel__point"
        style={{ transform: `rotate(-${angleIncrement * index}deg)` }}
      >
        <p className="component-reel__number">{index + 1}</p>

        {contentElement.id === activeEl.id && (
          <p ref={titleRef} className="component-reel__title">
            {activeEl.title}
          </p>
        )}
      </div>
    </button>
  )
}
