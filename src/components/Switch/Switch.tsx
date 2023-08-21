import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import React, { FC } from "react"
import "./switch.scss"

export const Switch: FC = () => {
  return (
    <div className="component-switch">
      <div className="component-switch__series-segment">06/06</div>
      
      <div className="component-switch__buttons">
        <ButtonArrow direction="left"/>
        <ButtonArrow />
      </div>
    </div>
  )
}
