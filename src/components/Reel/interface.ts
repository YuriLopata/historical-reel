import { IContentElement } from "models"

export interface IReel {
    timePeriodsCount: number
    diameter: number
    activeEl: IContentElement
    angleIncrement: number
    rotation: number
    handleClickContentEl: any
}