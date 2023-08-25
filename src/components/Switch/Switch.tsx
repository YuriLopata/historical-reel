import React, { FC, useRef } from "react"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { ISwitch } from "./interface"
import "./switch.scss"
import { IContentElement } from "models"

export const Switch: FC<ISwitch> = ({
  contentElements,
  activeEl,
  setActiveEl,
}) => {
  const activeIndex = contentElements.findIndex(
    (el: IContentElement) => el.id === activeEl.id
  )

  const handleMoveEl = (direction: "next" | "prev"): void => {
    if (direction === "prev") {
      if (activeIndex === 0) {
        setActiveEl(contentElements[contentElements.length - 1])
        return
      }

      setActiveEl(contentElements[activeIndex - 1])
    }

    if (direction === "next") {
      if (activeIndex + 1 === contentElements.length) {
        setActiveEl(contentElements[0])
        return
      }

      setActiveEl(contentElements[activeIndex + 1])
    }
  }

  return (
    <div className="component-switch">
      <div className="component-switch__series-segment">
        {`0${activeIndex + 1}/0${contentElements.length}`}
      </div>

      <div className="component-switch__buttons">
        <ButtonArrow
          onClick={() => handleMoveEl("prev")}
          width="50px"
          height="50px"
          direction="left"
          bgColor="#f4f3f9"
        />

        <ButtonArrow
          onClick={() => handleMoveEl("next")}
          width="50px"
          height="50px"
          bgColor="#f4f3f9"
        />
      </div>
    </div>
  )
}
