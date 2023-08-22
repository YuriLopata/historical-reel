import { ButtonArrow } from "../ButtonArrow/ButtonArrow"
import React, { FC } from "react"
import "./switch.scss"

export const Switch: FC = () => {
  return (
    <div className="component-switch">
      <div className="component-switch__series-segment">06/06</div>

      <div className="component-switch__buttons">
        <ButtonArrow
          onClick={() => {
            console.log("button clicked")
          }}
          width="50px"
          height="50px"
          direction="left"
          bgColor="#f4f3f9"
        />
        
        <ButtonArrow
          onClick={() => {
            console.log("button clicked")
          }}
          width="50px"
          height="50px"
          bgColor="#f4f3f9"
        />
      </div>
    </div>
  )
}
