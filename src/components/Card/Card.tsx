import React, { FC, useContext, useEffect, useRef } from "react"
import { ICard } from "./interface"
import "./card.scss"
import { FullReelContext } from "../../context/FullReelContext"
import { gsap } from "gsap"

export const Card: FC<ICard> = ({ title, desc }) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const initialRender = useRef<boolean>(true)
  const { activePoint, animDuration } =
    useContext(FullReelContext)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    if (cardRef.current) {
      gsap.killTweensOf(cardRef.current)
      gsap.fromTo(
        cardRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: animDuration }
      )
    }
  }, [activePoint, animDuration])

  return (
    <div ref={cardRef} className="component-card">
      <h4>{title}</h4>

      <p>
        {desc}
      </p>
    </div>
  )
}
