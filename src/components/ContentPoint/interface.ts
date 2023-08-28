import { IContentElement } from "models"

export interface IContentPoint {
  contentEl: IContentElement
  index: number
  onClickItem: (item: IContentElement) => void
  angle: number
  defaultAngle: number
}
