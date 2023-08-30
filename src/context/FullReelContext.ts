import { MutableRefObject, createContext, useRef } from "react"
import { contentElements } from "../assets/db"
import { IContentElement } from "../models"

export interface IFullReelContext {
  activePoint: IContentElement
  activeIndex: number
  pointCount: number
  rotation: number
  angleIncrement: number
  handleClickSwitch: (direction: "next" | "prev") => void
  handleClickPoint: (clickedPoint: IContentElement) => void
  defineReelRotate: (clickedPoint: IContentElement) => number
  definePointRotate: (pointCount: number) => number
  animDuration: number
  reelDiameter: number
  pointDiameter: number
  reelTopIndent: number
  isMobile: boolean
  slideGap: number
  initialRender: MutableRefObject<boolean>
}

export const FullReelContext = createContext<IFullReelContext>({
  activePoint: contentElements[0],
  activeIndex: 0,
  pointCount: 0,
  rotation: 0,
  angleIncrement: 0,
  handleClickSwitch: () => {},
  handleClickPoint: () => {},
  defineReelRotate: () => 0,
  definePointRotate: () => 0,
  animDuration: 0,
  reelDiameter: 0,
  pointDiameter: 0,
  reelTopIndent: 0,
  isMobile: false,
  slideGap: 0,
  initialRender: useRef<boolean>(false),
})
