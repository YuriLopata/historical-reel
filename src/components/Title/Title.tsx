import { gsap } from "gsap"
import React, { FC, useContext, useEffect, useRef } from "react"
import { FullReelContext } from "../../context/FullReelContext"
import { ITitle } from "./interface"
import "./title.scss"

export const Title: FC<ITitle> = ({ title }) => {
  const titleRef = useRef<HTMLParagraphElement | null>(null)
  const { activePoint, animDuration, initialRender } = useContext(FullReelContext)

  useEffect(() => {
    if (initialRender.current) {
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1 })
      }

      initialRender.current = false

      return
    }

    if (titleRef.current) {
      gsap.killTweensOf(titleRef.current)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: animDuration }
      )
    }
  }, [activePoint, animDuration])

  return (
    <p ref={titleRef} className="component-title">
      {title}
    </p>
  )
}
