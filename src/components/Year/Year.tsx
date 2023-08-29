import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { IYear } from "./interface"
import "./year.scss"
import { gsap } from "gsap"
import { AppContext } from "../../context/AppContext"

export const Year: FC<IYear> = ({ year, color = "#000" }) => {
  const [currentYear, setCurrentYear] = useState<number>(year)
  const yearRef = useRef<any>(null)
  const { animDuration } = useContext(AppContext)

  useEffect(() => {
    gsap.to(yearRef.current, {
      innerText: year,
      duration: animDuration,
      snap: "innerText",
    })
  }, [year])

  return (
    <div ref={yearRef} className={`component-year`} style={{ color: color }}>
      {currentYear}
    </div>
  )
}
