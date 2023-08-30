import { IContentElement } from "models"
import React, { FC, useEffect, useRef, useState } from "react"
import { CardSlider } from "../../components/CardSlider/CardSlider"
import { Header } from "../../components/Header/Header"
import { Reel } from "../../components/Reel/Reel"
import { Switch } from "../../components/Switch/Switch"
import { Year } from "../../components/Year/Year"
import { FullReelContext } from "../../context/FullReelContext"
import "./fullReel.scss"
import "./media.scss"
import { IFullReel } from "./interface"

export const FullReel: FC<IFullReel> = ({
  items,
  reelDiameter,
  pointDiameter,
  reelTopIndent,
}) => {
  const [rotation, setRotation] = useState<number>(0)
  const [activePoint, setActivePoint] = useState<IContentElement>(items[0])
  const [isTablet, setIsTablet] = useState<boolean>(false)
  const [isLandscape, setIsLandscape] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const initialRender = useRef<boolean>(true)

  const pointCount: number = items.length
  const angleIncrement: number = 360 / pointCount // град. между точками
  const animDuration: number = 1 // секунд

  let slideGap: number = 80 // px

  const activeIndex: number = items.findIndex(
    (el: IContentElement) => el.id === activePoint.id
  )

  // desktop width
  if (window.innerWidth < 1121) {
    reelDiameter = 436
    reelTopIndent = 400
    slideGap = 40
  }

  // tablet width
  if (window.innerWidth < 993) {
    reelDiameter = 362
    reelTopIndent = 358
    slideGap = 25
  }

  // mobile width
  if (window.innerWidth < 576) {
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

  const definePointRotate = (pointCount: number): number => {
    if (pointCount === 5 || pointCount === 4) return angleIncrement / 2
    if (pointCount === 3) return angleIncrement / 4
    if (pointCount === 2) return angleIncrement / 3
    return angleIncrement
  }

  const defineReelRotate = (clickedPoint: IContentElement): number => {
    const currentIndex = items.findIndex(
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
        setActivePoint(items[items.length - 1])
        return
      }

      setActivePoint(items[activeIndex - 1])
    }

    if (direction === "next") {
      setRotation(rotation - angleIncrement)
      if (activeIndex + 1 === items.length) {
        setActivePoint(items[0])
        return
      }

      setActivePoint(items[activeIndex + 1])
    }
  }

  return (
    <FullReelContext.Provider
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
        initialRender,
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
          </>
        )}
      </div>
    </FullReelContext.Provider>
  )
}
