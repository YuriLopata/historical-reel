import React, { FC, useContext } from "react"
import { FullReelContext } from "../../context/FullReelContext"
import "./header.scss"
import { IHeader } from "./interface"

export const Header: FC<IHeader> = ({ title }) => {
  const { isMobile } = useContext(FullReelContext)

  return (
    <div className="component-header">
      {!isMobile && <div className="component-header__line"></div>}

      <h2>{title}</h2>
    </div>
  )
}
