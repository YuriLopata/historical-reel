import { gsap } from "gsap"
import React, { FC, useEffect, useRef } from "react"
import { contentElements } from "../../assets/db"
import { IReel } from "./interface"
import "./reel.scss"
import { IContentElement } from "models"

export const Reel: FC<IReel> = ({
  timePeriodsCount,
  onClickItem,
  activeEl,
}) => {
  const reelRef = useRef<HTMLDivElement | null>(null)
  const dotWrapperRefs = useRef<Array<HTMLButtonElement | null>>([])
  const angleIncrement: number = 360 / timePeriodsCount

  const defineDefaultAngle = (): number => {
    if (timePeriodsCount === 5) return -36
    if (timePeriodsCount === 4) return -45
    if (timePeriodsCount === 3) return -30
    return -60
  }
  const defaultAngle = defineDefaultAngle() // градусов против часовой стрелки

  useEffect(() => {
    const reel = reelRef.current

    if (reel) {
      const centerX = reel && reel.offsetWidth / 2
      const centerY = reel && reel.offsetHeight / 2
      const radius = reel && reel.offsetWidth / 2

      dotWrapperRefs.current.map(
        (dotWrapper: HTMLButtonElement | null, index) => {
          if (dotWrapper) {
            const adjustedAngle =
              ((index * angleIncrement + defaultAngle) * Math.PI) / 180 // расчет угла между точками
            const x = centerX + radius * Math.cos(adjustedAngle)
            const y = centerY + radius * Math.sin(adjustedAngle)

            gsap.set(dotWrapper, { x, y })
          }
        }
      )
    }
  }, [])

  const getActiveClassname = (el: IContentElement): string => {
    if (el.id === activeEl.id) return "component-reel__dot-wrapper--active"
    return ""
  }

  return (
    <div className="component-reel" ref={reelRef}>
      <div className="component-reel__reel"></div>

      {contentElements.map((item: IContentElement, index) => (
        <button
          key={item.id}
          ref={(el: HTMLButtonElement) => (dotWrapperRefs.current[index] = el)}
          onClick={() => onClickItem(item)}
          className={`component-reel__dot-wrapper ${getActiveClassname(item)}`}
          style={{ transform: `rotate(${angleIncrement * index}deg)` }}
        >
          <div
            className="component-reel__dot"
            style={{ transform: `rotate(-${angleIncrement * index}deg)` }}
          >
            <p className="component-reel__number">{index + 1}</p>

            {item.id === activeEl.id && <p className="component-reel__title">{activeEl.title}</p>}
          </div>
        </button>
      ))}
    </div>
  )
}
