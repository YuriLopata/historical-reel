import React, { FC } from "react"
import { contentElements } from "./assets/db"
import { FullReel } from "./components/FullReel/FullReel"
import "./index.scss"

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
