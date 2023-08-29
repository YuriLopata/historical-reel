import React, { FC, useContext, useRef } from "react"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { ISwitch } from "./interface"
import "./switch.scss"
import { AppContext } from "../../context/AppContext"

export const Switch: FC<ISwitch> = ({ elCount }) => {
  const { activeIndex, handleClickSwitch } = useContext(AppContext)

  return (
    <div className="component-switch">
      <div className="component-switch__series-segment">
        {`0${activeIndex + 1}/0${elCount}`}
      </div>

      <div className="component-switch__buttons">
        <ButtonArrow
          onClick={() => handleClickSwitch("prev")}
          diameter={50}
          direction="left"
          bgColor="#f4f3f9"
          canDisable
        />

        <ButtonArrow
          onClick={() => handleClickSwitch("next")}
          diameter={50}
          bgColor="#f4f3f9"
          canDisable
        />
      </div>
    </div>
  )
}
