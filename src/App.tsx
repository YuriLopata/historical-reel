import React, { FC } from "react"
import { contentElements } from "./assets/db"
import "./index.scss"
import { FullReel } from "./components/FullReel/FullReel"

export const App: FC = () => {
  return (
    <FullReel
      items={contentElements}
      reelDiameter={530}
      pointDiameter={56}
      reelTopIndent={480}
    />
  )
}
