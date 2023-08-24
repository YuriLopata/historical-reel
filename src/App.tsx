import React, { FC, useState } from "react"
import { contentElements } from "./assets/db"
import { Header } from "./components/Header/Header"
import { Reel } from "./components/Reel/Reel"
import { CardSlider } from "./components/CardSlider/CardSlider"
import { Switch } from "./components/Switch/Switch"
import { Year } from "./components/Year/Year"
import "./index.scss"
import { IContentElement } from "models"

export const App: FC = () => {
  const [activeEl, setActiveEl] = useState<IContentElement>(contentElements[0])

  const handleClickContentEl = (contentEl: IContentElement) => {
    setActiveEl(contentEl)
  }

  return (
    <div className="wrapper">
      <Header title="Исторические даты" />

      <div className="years">
        <Year year={activeEl.yearStart} color="#7500f0" />
        <Year year={activeEl.yearEnd} color="#f900a5" />
      </div>

      <Reel
        timePeriodsCount={contentElements.length}
        onClickItem={handleClickContentEl}
        activeEl={activeEl}
      />

      <Switch
        contentElements={contentElements}
        activeEl={activeEl}
        setActiveEl={setActiveEl}
      />

      {/* {activeEl.cards.length > 3 ? (
        <CardSlider activeEl={activeEl} />
      ) : (
        <Cards activeEl={activeEl} />
      )} */}

      <CardSlider activeEl={activeEl} />

      <div className="line line-hor"></div>
      <div className="line line-ver"></div>
    </div>
  )
}
