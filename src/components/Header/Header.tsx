import React, { FC } from "react"
import { IHeader } from "./interface"
import "./header.scss"

export const Header: FC<IHeader> = ({ title }) => {
  return (
    <div className="component-header">
      <div className="component-header__line"></div>

      <h2>{title}</h2>
    </div>
  )
}
