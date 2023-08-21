import React, { FC } from "react"
import { IButtonArrow } from "./interface"
import "./buttonArrow.scss"
import arrowSvg from "../../assets/img/arrow.svg"

export const ButtonArrow: FC<IButtonArrow> = ({
  width = "50px",
  height = "50px",
  direction = "right",
}) => {
  const styleObj = {
    width: width,
    height: height,
    transform: direction === "right" ? "rotate(180deg)" : "",
  }

  const arrowWidth = width === "50px" ? "6.25px" : "3.12px"
  const arrowHeight = height === "50px" ? "12.5px" : "6.25px"

  return (
    <button className="component-buttonArrow" style={styleObj}>
      <img src={arrowSvg} alt="Arrow" />
    </button>
  )
}
