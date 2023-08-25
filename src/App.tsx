import { IContentElement } from "models"
import React, { FC, useState } from "react"
import { contentElements } from "./assets/db"
import { CardSlider } from "./components/CardSlider/CardSlider"
import { Header } from "./components/Header/Header"
import { Reel } from "./components/Reel/Reel"
import { Switch } from "./components/Switch/Switch"
import { Year } from "./components/Year/Year"
import "./index.scss"

export const App: FC = () => {
  const [activeEl, setActiveEl] = useState<IContentElement>(contentElements[0])

  return (
    <div className="wrapper">
      <Header title="Исторические даты" />

      <div className="years">
        <Year year={activeEl.yearStart} color="#7500f0" />
        <Year year={activeEl.yearEnd} color="#f900a5" />
      </div>

      <Reel
        timePeriodsCount={contentElements.length}
        diameter={530}
        activeEl={activeEl}
        setActiveEl={setActiveEl}
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
  )
}
