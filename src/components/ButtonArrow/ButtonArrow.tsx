import { gsap } from "gsap"
import React, { FC, useContext, useEffect, useRef } from "react"
import { FullReelContext } from "../../context/FullReelContext"
import "./buttonArrow.scss"
import { IButtonArrow } from "./interface"

export const ButtonArrow: FC<IButtonArrow> = ({
  onClick = () => {},
  diameter = 40,
  arrowWidth = 10,
  arrowHeight = 14,
  direction = "right",
  canDisable = false,
  bgColor = "#fff",
  arrowColor = "#000",
  canDisappear = true,
}) => {
  const initialRender = useRef<boolean>(true)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const { activeIndex, pointCount, animDuration, activePoint } =
    useContext(FullReelContext)

  const isFirst: boolean = activeIndex === 0
  const isLast: boolean = activeIndex === pointCount - 1

  const dirClassName: string =
    direction === "left"
      ? "component-buttonArrow--left"
      : "component-buttonArrow--right"

  useEffect(() => {
    if (!canDisappear) return

    if (initialRender.current) {
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 1 })
      }

      initialRender.current = false

      return
    }

    if (buttonRef.current) {
      gsap.killTweensOf(buttonRef.current)
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: animDuration }
      )
    }
  }, [activePoint, animDuration])

  return (
    <button
      ref={buttonRef}
      className={`component-buttonArrow ${dirClassName}`}
      onClick={onClick}
      style={{
        width: diameter,
        height: diameter,
        backgroundColor: bgColor,
      }}
      disabled={
        canDisable &&
        ((isFirst && direction === "left") || (isLast && direction !== "left"))
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
