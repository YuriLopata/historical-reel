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

  const defineRotateAngle = (clickedPoint: IContentElement): number => {
    const currentIndex = contentElements.findIndex(
      (el: IContentElement) => el.id === clickedPoint.id
    )
    const difference = currentIndex - activeIndex

    if (difference === 1 || difference === -(pointCount - 1))
      return -angleIncrement
    if (difference === 2 || difference === -(pointCount - 2))
      return -angleIncrement * 2
    if (difference === 3 || difference === -(pointCount - 3))
      return -angleIncrement * 3
    if (difference === 4 || difference === -(pointCount - 4))
      return angleIncrement * 2
    if (difference === 5 || difference === -(pointCount - 5))
      return angleIncrement
    return 0
  }

  const handleClickPoint = (clickedPoint: IContentElement) => {
    setActivePoint(clickedPoint)
    setRotation(rotation + defineRotateAngle(clickedPoint))
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
      }}
    >
      <div className="wrapper">
        <Header title="Исторические даты" />

        <div className="years">
          <Year year={activePoint.yearStart} color="#7500f0" />
          <Year year={activePoint.yearEnd} color="#f900a5" />
        </div>

        <Reel
          timePeriodsCount={pointCount}
          diameter={530}
          handleChangePoint={handleClickPoint}
        />
        <div className="line line-hor"></div>
        <div className="line line-ver"></div>

        <Switch
          contentElements={contentElements}
        />

        <CardSlider />
      </div>
    </AppContext.Provider>
  )
}
