import React, { FC, useContext } from "react"
import { IHeader } from "./interface"
import "./header.scss"
import { AppContext } from "../../context/AppContext"

export const Header: FC<IHeader> = ({ title }) => {
  const {isMobile} = useContext(AppContext)

  return (
    <div className="component-header">
      {!isMobile && <div className="component-header__line"></div>}

      <h2>{title}</h2>
    </div>
  )
}
