import React, { FC } from "react"
import "./buttonArrow.scss"
import { IButtonArrow } from "./interface"

export const ButtonArrow: FC<IButtonArrow> = ({
  onClick = () => {},
  diameter = 40,
  isDisabled,
  arrowWidth = 10,
  arrowHeight = 14,
  direction = "right",
  bgColor = "#fff",
  pathColor = "#000",
}) => {
  const styleObj = {
    width: diameter,
    height: diameter,
    backgroundColor: bgColor,
  }

  const dirClassName =
    direction === "left"
      ? "component-buttonArrow--left"
      : "component-buttonArrow--right"

  return (
    <button
      className={`component-buttonArrow ${dirClassName}`}
      onClick={onClick}
      style={styleObj}
      disabled={isDisabled}
    >
      <svg
        width={arrowWidth}
        height={arrowHeight}
        viewBox={`0 0 10 14`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
          stroke={pathColor}
          strokeWidth="2"
        />
      </svg>
    </button>
  )
}
