import { IContentElement } from "models"
import { LegacyRef, MutableRefObject } from "react"

export interface IContentPoint {
    contentElement: IContentElement
    activeEl: IContentElement
    index: number
    onClickItem: (item: IContentElement) => void
    angleIncrement: number
    pointWrapperRefs: MutableRefObject<(HTMLButtonElement | null)[]>
}