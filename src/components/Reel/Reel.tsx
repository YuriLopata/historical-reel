import { gsap } from "gsap"
import React, { FC, useEffect, useRef } from "react"
import { contentElements } from "../../assets/db"
import { IReel } from "./interface"
import "./reel.scss"
import { IContentElement } from "models"
import { ContentPoint } from "../ContentPoint/ContentPoint"

export const Reel: FC<IReel> = ({
  timePeriodsCount,
  diameter,
  activeEl,
  setActiveEl,
}) => {
  const reelRef = useRef<HTMLDivElement | null>(null)
  const pointWrapperRefs = useRef<(HTMLButtonElement | null)[]>([])
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
      const radius = diameter / 2

      pointWrapperRefs.current.map((pointWrapper, index) => {
        if (pointWrapper) {
          const adjustedAngle =
            ((index * angleIncrement + defaultAngle) * Math.PI) / 180 // расчет угла между точками
          const x = radius * Math.cos(adjustedAngle)
          const y = radius * Math.sin(adjustedAngle)

          gsap.set(pointWrapper, { x, y })
        }
      })
    }
  }, [])

  const handleClickContentEl = (contentEl: IContentElement) => {
    setActiveEl(contentEl)
    // rotatePoints(pointWrapperRefs, 650, angleIncrement)
  }

  // function moveAlongArc(target: any, radius: any, duration: any) {
  //   const centerX = window.innerWidth / 2; // X-координата центра дуги
  //   const centerY = window.innerHeight / 2; // Y-координата центра дуги
  //   const startAngle = 90; // Начальный угол (90 градусов соответствует верхней точке)
  //   const endAngle = 0; // Конечный угол (0 градусов соответствует правой точке)

  //   gsap.to(target, {
  //     motionPath: {
  //       path: { // Описываем дугу как кривую Безье с контрольными точками
  //         curviness: 1.25,
  //         autoRotate: true,
  //         type: "thru",
  //         values: [
  //           { x: centerX + radius, y: centerY }, // Начальная точка
  //           { x: centerX, y: centerY - radius * 0.866 }, // Контрольная точка 1
  //           { x: centerX - radius, y: centerY }, // Конечная точка (контрольная точка 2)
  //         ],
  //       },
  //       alignOrigin: [0.5, 0.5], // Выравнивание центра объекта
  //       type: "thru",
  //     },
  //     duration: duration,
  //   });
  // }

  // const rotatePoints = (elementRefs: any, radius: number, angle: number) => {
  //   const element = elementRef.current;

  //   if (element) {
  //     const arcPath = `M0,0 A${radius},${radius} 0 0,0 ${-radius},${0}`;
  //     const animationDuration = 2; // seconds

  //     gsap.to(element, {
  //       motionPath: {
  //         path: arcPath,
  //         align: arcPath,
  //         alignOrigin: [0.5, 0.5],
  //       },
  //       duration: animationDuration,
  //       ease: 'power1.out',
  //     });
  //   }
  // }

  return (
    <div
      className="component-reel"
      ref={reelRef}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: `calc(50% - ${diameter}px / 2)`,
        top: `calc(480px - ${diameter}px / 2)`
      }}
    >
      <div className="component-reel__reel"></div>

      {contentElements.map((item: IContentElement, index) => (
        <ContentPoint
          key={item.id}
          contentElement={item}
          activeEl={activeEl}
          index={index}
          onClickItem={handleClickContentEl}
          angleIncrement={angleIncrement}
          pointWrapperRefs={pointWrapperRefs}
        />
      ))}
    </div>
  )
}
