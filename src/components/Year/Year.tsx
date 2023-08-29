import React, { FC, useEffect, useRef } from "react"
import { IYear } from "./interface"
import "./year.scss"
import { gsap } from "gsap"

export const Year: FC<IYear> = ({ year, color = "#000" }) => {
  const yearRef = useRef<any>(null)

  useEffect(() => {
    const currentYear = parseInt(yearRef.current.innerText, 10);
    const newYear = parseInt(String(year), 10);
    const duration = 5
    const incrementDuration = 5 / (currentYear - newYear);

    gsap.fromTo(
      yearRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0 } // TODO/ рассчитать задержку после анимации вращения
    );

    // if (!isNaN(currentYear) && !isNaN(newYear) && currentYear !== newYear) {
    //   const timeline = gsap.timeline();

    //   // Counting animation
    //   for (let i = currentYear + 1; i <= newYear; i++) {
    //     timeline.to(yearRef.current, {
    //       duration: incrementDuration,
    //       // text: { value: String(i), format: Math.floor },
    //     });
    //   }
    // }
  }, [year]);

  return (
    <div ref={yearRef} className={`component-year`} style={{ color: color }}>
      {year}
    </div>
  )
}
