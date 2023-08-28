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
  const timePeriodCount = contentElements.length
  const angleIncrement = 360 / timePeriodCount

  const activeIndex = contentElements.findIndex(
    (el: IContentElement) => el.id === activePoint.id
  )

  // const nextPoint = () => {
  //   setActivePoint(contentElements[activeIndex + 1])
  // }

  const handleChangePoint = (contentEl: IContentElement) => {
    setActivePoint(contentEl)
    setRotation(rotation + angleIncrement)
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
          timePeriodsCount={timePeriodCount}
          diameter={530}
          handleChangePoint={handleChangePoint}
        />
        <div className="line line-hor"></div>
        <div className="line line-ver"></div>

        <Switch
          contentElements={contentElements}
          // activePoint={activePoint}
          // setActivePoint={setActivePoint}
        />

        <CardSlider />
      </div>
    </AppContext.Provider>
  )
}
