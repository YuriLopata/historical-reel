import React, { createContext } from "react";
import { IContentElement } from "../models"
import { contentElements } from "../assets/db"

export interface IAppContext {
    activePoint: IContentElement
    activeIndex: number
    pointCount: number
    rotation: number
    angleIncrement: number
    handleClickSwitch: (direction: "next" | "prev") => void
    handleClickPoint: (clickedPoint: IContentElement) => void
    defineReelRotate: (clickedPoint: IContentElement) => number
    definePointRotate: () => number
    animDuration: number
    reelDiameter: number
    pointDiameter: number
    reelTopIndent: number
    isMobile: boolean
    slideGap: number
    initialRender: any
}

export const AppContext = createContext<IAppContext>({
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
    initialRender: false
})