import React, { createContext } from "react";
import { IContentElement } from "../models"
import { contentElements } from "../assets/db"

export interface IAppContext {
    activeEl: IContentElement
    rotation: number
    angleIncrement: number
}

export const AppContext = createContext<IAppContext>({
    activeEl: contentElements[0],
    rotation: 0,
    angleIncrement: 360 / contentElements.length
})