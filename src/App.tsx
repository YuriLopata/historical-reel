import React, { FC } from "react"
import { items } from "./assets/db"
import { Header } from "./components/Header/Header"
import { Reel } from "./components/Reel/Reel"
import { Slider } from "./components/Slider/Slider"
import { Switch } from "./components/Switch/Switch"
import { Year } from "./components/Year/Year"
import "./index.scss"

export const App: FC = () => {
  return (
    <div className="wrapper">
      <Header title="Исторические даты" />

      <div className="years">
        <Year number={2015} color="#7500f0" />
        <Year number={2022} color="#f900a5" />
      </div>

      <Reel timePeriodsNum={items.length} />

      <Switch />

      <Slider />

      <div className="line line-hor"></div>
      <div className="line line-ver"></div>
    </div>
  )
}
