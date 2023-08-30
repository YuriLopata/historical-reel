import { IContentElement } from "models"
import React, { FC, useEffect, useState } from "react"
import { contentElements } from "./assets/db"
import { CardSlider } from "./components/CardSlider/CardSlider"
import { Header } from "./components/Header/Header"
import { Reel } from "./components/Reel/Reel"
import { Switch } from "./components/Switch/Switch"
import { Year } from "./components/Year/Year"
import "./index.scss"
import { AppContext } from "./context/AppContext"

export const App: FC = () => {
  const [rotation, setRotation] = useState<number>(0)
  const [activePoint, setActivePoint] = useState<IContentElement>(
    contentElements[0]
  )
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isLandscape, setIsLandscape] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  let reelDiameter = 530 // px
  let pointDiameter = 56 // px
  let reelTopIndent = 480 // px от центра круга
  const pointCount = contentElements.length
  const angleIncrement: number = 360 / pointCount // град. между точками
  const animDuration: number = 1 // секунд

  let slideGap = 80 // px

  const activeIndex = contentElements.findIndex(
    (el: IContentElement) => el.id === activePoint.id
  )

  if (window.innerWidth < 1121) {
    // desktop width
    reelDiameter = 436
    reelTopIndent = 400
    slideGap = 40
  }

  if (window.innerWidth < 993) {
    // tablet width
    reelDiameter = 362
    reelTopIndent = 358
    slideGap = 25
  }

  if (window.innerWidth < 576) {
    // mobile width
    reelTopIndent = 330
  }

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsTablet(window.innerWidth < 1121)
      setIsLandscape(window.innerWidth < 993)
      setIsMobile(window.innerWidth < 576)
    }
    window.addEventListener("resize", checkScreenWidth)
    checkScreenWidth()
    return () => {
      window.removeEventListener("resize", checkScreenWidth)
    }
  }, [])

  const definePointRotate = (): number => {
    if (pointCount === 5 || pointCount === 4) return angleIncrement / 2
    if (pointCount === 3) return angleIncrement / 4
    if (pointCount === 2) return angleIncrement / 3
    return angleIncrement
  }

  const defineReelRotate = (clickedPoint: IContentElement): number => {
    const currentIndex = contentElements.findIndex(
      (el: IContentElement) => el.id === clickedPoint.id
    )
    const diff = currentIndex - activeIndex

    if (pointCount == 6) {
      if (diff === 1 || diff === -(pointCount - 1)) return -angleIncrement
      if (diff === 2 || diff === -(pointCount - 2)) return -angleIncrement * 2
      if (diff === 3 || diff === -(pointCount - 3)) return angleIncrement * 3
      if (diff === 4 || diff === -(pointCount - 4)) return angleIncrement * 2
      if (diff === 5 || diff === -(pointCount - (pointCount - 1)))
        return angleIncrement
    }

    if (pointCount == 5) {
      if (diff === 1 || diff === -(pointCount - 1)) return -angleIncrement
      if (diff === 2 || diff === -(pointCount - 2)) return -angleIncrement * 2
      if (diff === 3 || diff === -(pointCount - 3)) return angleIncrement * 2
      if (diff === 4 || diff === -(pointCount - (pointCount - 1)))
        return angleIncrement
    }

    if (pointCount == 4) {
      if (diff === 1 || diff === -(pointCount - 1)) return -angleIncrement
      if (diff === 2 || diff === -(pointCount - 2)) return -angleIncrement * 2
      if (diff === 3 || diff === -(pointCount - (pointCount - 1)))
        return angleIncrement
    }

    if (pointCount == 3) {
      if (diff === 1 || diff === -(pointCount - 1)) return -angleIncrement
      if (diff === 2 || diff === -(pointCount - (pointCount - 1)))
        return angleIncrement
    }

    if (pointCount == 2) {
      if (diff === 1 || diff === -(pointCount - (pointCount - 1)))
        return -angleIncrement
    }

    return 0
  }

  const handleClickPoint = (clickedPoint: IContentElement): void => {
    setActivePoint(clickedPoint)
    setRotation(rotation + defineReelRotate(clickedPoint))
  }

  const handleClickSwitch = (direction: "next" | "prev"): void => {
    if (direction === "prev") {
      setRotation(rotation + angleIncrement)
      if (activeIndex === 0) {
        setActivePoint(contentElements[contentElements.length - 1])
        return
      }

      setActivePoint(contentElements[activeIndex - 1])
    }

    if (direction === "next") {
      setRotation(rotation - angleIncrement)
      if (activeIndex + 1 === contentElements.length) {
        setActivePoint(contentElements[0])
        return
      }

      setActivePoint(contentElements[activeIndex + 1])
    }
  }

  return (
    <AppContext.Provider
      value={{
        activePoint,
        activeIndex,
        pointCount,
        rotation,
        angleIncrement,
        handleClickSwitch,
        handleClickPoint,
        defineReelRotate,
        definePointRotate,
        animDuration,
        reelDiameter,
        pointDiameter,
        reelTopIndent,
        isMobile,
        slideGap,
      }}
    >
      <div className="wrapper">
        <Header title="Исторические даты" />

        <div className="years">
          <Year year={activePoint.yearStart} color="#5D5FEF" />
          <Year year={activePoint.yearEnd} color="#EF5DA8" />
        </div>

        {!isMobile && (
          <>
            <Reel timePeriodsCount={pointCount} diameter={reelDiameter} />

            <div
              className="line line-hor"
              style={{ top: `${reelTopIndent}px` }}
            ></div>
            <div className="line line-ver"></div>

            <Switch elCount={pointCount} />
            
            <CardSlider />
          </>
        )}

        {isMobile && (
          <>
            <CardSlider />
            <Switch elCount={pointCount} />
          </>
        )}
      </div>
    </AppContext.Provider>
  )
}
