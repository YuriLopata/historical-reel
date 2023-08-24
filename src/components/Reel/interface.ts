import { IContentElement } from "models"

export interface IReel {
    timePeriodsCount: number
    onClickItem: (item: IContentElement) => void
    activeEl: IContentElement
}