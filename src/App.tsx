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
  const [activeEl, setActiveEl] = useState<IContentElement>(contentElements[0])
  const [rotation, setRotation] = useState<number>(0)
  const timePeriodCount=  contentElements.length

  const {angleIncrement} = useContext(AppContext)

  const handleClickContentEl = (contentEl: IContentElement) => {
    setActiveEl(contentEl)
    setRotation(rotation + angleIncrement)
  }

  return (
    <AppContext.Provider value={{activeEl, rotation, angleIncrement}}>
      <div className="wrapper">
        <Header title="Исторические даты" />
  
        <div className="years">
          <Year year={activeEl.yearStart} color="#7500f0" />
          <Year year={activeEl.yearEnd} color="#f900a5" />
        </div>
  
        <Reel
          timePeriodsCount={timePeriodCount}
          diameter={530}
          handleClickContentEl={handleClickContentEl}
        />
        <div className="line line-hor"></div>
        <div className="line line-ver"></div>
  
        <Switch
          contentElements={contentElements}
          activeEl={activeEl}
          setActiveEl={setActiveEl}
        />
  
        <CardSlider activeEl={activeEl} />
      </div>
    </AppContext.Provider>
  )
}
