import React, { FC } from "react"
import { ICard } from "./interface"
import "./card.scss"

export const Card: FC<ICard> = ({ year, desc }) => {
  return (
    <div className="component-card">
      <h4>{year}</h4>

      <p>
        {desc}
      </p>
    </div>
  )
}
