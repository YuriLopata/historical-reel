import { ICard, IContentElement } from "models"

export interface IContentPoint {
    contentElement: IContentElement
    activeEl: IContentElement
    index: number
    onClickItem: any
    angleIncrement: any
    titleRef: any
    pointWrapperRefs: any
}