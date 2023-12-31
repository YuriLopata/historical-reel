import React, { FC, useContext } from "react"
import { FullReelContext } from "../../context/FullReelContext"
import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import { ISwitch } from "./interface"
import "./switch.scss"

export const Switch: FC<ISwitch> = ({ elCount }) => {
  const { activeIndex, handleClickSwitch, isMobile } =
    useContext(FullReelContext)

  return (
    <div className="component-switch">
      <div className="component-switch__series-segment">
        {`0${activeIndex + 1}/0${elCount}`}
      </div>

      <div className="component-switch__buttons">
        <ButtonArrow
          onClick={() => handleClickSwitch("prev")}
          diameter={isMobile ? 25 : 50}
          arrowWidth={isMobile ? 5 : 10}
          arrowHeight={isMobile ? 10 : 14}
          direction="left"
          bgColor="#f4f3f9"
          canDisable
          canDisappear={false}
        />

        <ButtonArrow
          onClick={() => handleClickSwitch("next")}
          diameter={isMobile ? 25 : 50}
          arrowWidth={isMobile ? 5 : 10}
          arrowHeight={isMobile ? 10 : 14}
          bgColor="#f4f3f9"
          canDisable
          canDisappear={false}
        />
      </div>
    </div>
  )
}
