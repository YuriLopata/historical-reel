import { IContentElement } from "models"

export interface IReel {
    timePeriodsNum: number
    onClickItem: (item: IContentElement) => void
    activeEl: IContentElement
}