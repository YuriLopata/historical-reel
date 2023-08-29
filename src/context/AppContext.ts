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
}

export const AppContext = createContext<IAppContext>({
    activePoint: contentElements[0],
    rotation: 0,
    angleIncrement: 0,
    activeIndex: 0,
    handleShiftPoint: () => {},
    handleClickPoint: () => {}
})