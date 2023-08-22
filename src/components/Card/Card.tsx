import React, { FC } from "react"
import { ICard } from "./interface"
import "./card.scss"

export const Card: FC<ICard> = ({ title, desc }) => {
  return (
    <div className="component-card">
      <h4>{title}</h4>

      <p>
        {desc}
      </p>
    </div>
  )
}
