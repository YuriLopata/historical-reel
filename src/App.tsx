import { IContentElement } from "models"
import React, { FC, useContext, useState } from "react"
import { contentElements } from "./assets/db"
import { CardSlider } from "./components/CardSlider/CardSlider"
import { Header } from "./components/Header/Header"
import { Reel } from "./components/Reel/Reel"
import { Switch } from "./components/Switch/Switch"
import { Year } from "./components/Year/Year"
import "./index.scss"
import { AppContext } from "./context/AppContext"

export const App: FC = () => {
  const [activePoint, setActivePoint] = useState<IContentElement>(
    contentElements[0]
  )
  const [rotation, setRotation] = useState<number>(0)
  const pointCount = contentElements.length
  const angleIncrement = 360 / pointCount

  const activeIndex = contentElements.findIndex(
    (el: IContentElement) => el.id === activePoint.id
  )

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

  const handleShiftPoint = (direction: "next" | "prev"): void => {
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
        rotation,
        angleIncrement,
        handleShiftPoint,
        handleClickPoint,
        defineReelRotate,
        definePointRotate,
      }}
    >
      <div className="wrapper">
        <Header title="Исторические даты" />

        <div className="years">
          <Year year={activePoint.yearStart} color="#7500f0" />
          <Year year={activePoint.yearEnd} color="#f900a5" />
        </div>

        <Reel timePeriodsCount={pointCount} diameter={530} />
        <div className="line line-hor"></div>
        <div className="line line-ver"></div>

        <Switch contentElements={contentElements} />

        <CardSlider />
      </div>
    </AppContext.Provider>
  )
}
