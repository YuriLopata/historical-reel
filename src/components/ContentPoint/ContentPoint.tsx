import React, { FC } from "react"
import { IContentPoint } from "./interface"
import { IContentElement } from "models"

export const ContentPoint: FC<IContentPoint> = ({
  contentElement,
  activeEl,
  index,
  onClickItem,
  angleIncrement,
  titleRef,
  pointWrapperRefs
}) => {
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
