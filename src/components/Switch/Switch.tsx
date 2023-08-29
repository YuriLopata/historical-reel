import React, { FC, useContext, useRef } from "react"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { ISwitch } from "./interface"
import "./switch.scss"
import { AppContext } from "../../context/AppContext"

export const Switch: FC<ISwitch> = ({
  contentElements,
}) => {

  const {activeIndex, handleShiftPoint} = useContext(AppContext)

  return (
    <div className="component-switch">
      <div className="component-switch__series-segment">
        {`0${activeIndex + 1}/0${contentElements.length}`}
      </div>

      <div className="component-switch__buttons">
        <ButtonArrow
          onClick={() => handleShiftPoint("prev")}
          diameter={50}
          direction="left"
          bgColor="#f4f3f9"
        />

        <ButtonArrow
          onClick={() => handleShiftPoint("next")}
          diameter={50}
          bgColor="#f4f3f9"
        />
      </div>
    </div>
  )
}
