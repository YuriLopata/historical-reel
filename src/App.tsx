import React, { FC } from "react"
import "./index.scss"
import { Header } from "./components/Header/Header"
import { Reel } from "./components/Reel/Reel"
import { Year } from "./components/Year/Year"
import { Switch } from "./components/Switch/Switch"
import { Card } from "./components/Card/Card"
import { ButtonArrow } from "./components/ButtonArrow/ButtonArrow"

export const App: FC = () => {
  return (
    <div className="wrapper">
      <Header title="Исторические даты" />

      <div className="years">
        <Year number={2015} color="#7500f0" />
        <Year number={2022} color="#f900a5" />
      </div>

      <Switch />

      <div className="slider">
        <Card
          year={2015}
          desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
        />
        <Card
          year={2015}
          desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
        />
        <Card
          year={2015}
          desc="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
        />
        <ButtonArrow />
      </div>

      <Reel />

      <div className="line line-hor"></div>
      <div className="line line-ver"></div>
    </div>
  )
}
