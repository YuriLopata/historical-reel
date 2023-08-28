import { IContentElement } from "models"

export interface IContentPoint {
  contentEl: IContentElement
  activeEl: IContentElement
  index: number
  onClickItem: (item: IContentElement) => void
  angleIncrement: number
  angle: number
  defaultAngle: number
  rotation: number
}
