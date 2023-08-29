import React, { FC, useContext, useEffect, useRef } from "react"
import { IYear } from "./interface"
import "./year.scss"
import { gsap } from "gsap"
import { AppContext } from "../../context/AppContext"

export const Year: FC<IYear> = ({ year, color = "#000" }) => {
  const yearRef = useRef<any>(null)

  const { animDuration } = useContext(AppContext)

  useEffect(() => {
    const currentYear = parseInt(yearRef.current.innerText, 10)
    const newYear = parseInt(String(year), 10)
    const incrementDuration = animDuration / (currentYear - newYear)

    gsap.fromTo(
      yearRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0 } // TODO/ рассчитать задержку после анимации вращения
    )
  }, [year])

  return (
    <div ref={yearRef} className={`component-year`} style={{ color: color }}>
      {year}
    </div>
  )
}
