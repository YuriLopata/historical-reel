import React, { FC, useContext } from "react"
import "./buttonArrow.scss"
import { IButtonArrow } from "./interface"
import { AppContext } from "../../context/AppContext"

export const ButtonArrow: FC<IButtonArrow> = ({
  onClick = () => {},
  diameter = 40,
  arrowWidth = 10,
  arrowHeight = 14,
  direction = "right",
  canDisable = false,
  bgColor = "#fff",
  arrowColor = "#000",
}) => {
  const { activeIndex, pointCount } = useContext(AppContext)

  const isFirst = activeIndex === 0
  const isLast = activeIndex === pointCount - 1

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
      disabled={
        (canDisable && isFirst && direction === "left") ||
        (isLast && direction !== "left")
      }
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
          stroke={arrowColor}
          strokeWidth="2"
        />
      </svg>
    </button>
  )
}
