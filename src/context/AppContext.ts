import React, { createContext } from "react";
import { IContentElement } from "../models"
import { contentElements } from "../assets/db"

export interface IAppContext {
    activePoint: IContentElement
    rotation: number
    angleIncrement: number
    activeIndex: number
    handleShiftPoint: (direction: "next" | "prev") => void
    handleClickPoint: (clickedPoint: IContentElement) => void
    defineReelRotate: (clickedPoint: IContentElement) => number
    definePointRotate: () => number
}

export const AppContext = createContext<IAppContext>({
    activePoint: contentElements[0],
    rotation: 0,
    angleIncrement: 0,
    activeIndex: 0,
    handleShiftPoint: () => {},
    handleClickPoint: () => {},
    defineReelRotate: () => 0,
    definePointRotate: () => 0
})