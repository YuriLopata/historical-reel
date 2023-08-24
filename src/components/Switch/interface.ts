import { IContentElement } from "models"
import { Dispatch, SetStateAction } from "react"

export interface ISwitch {
  contentElements: IContentElement[]
  activeEl: IContentElement
  setActiveEl: Dispatch<SetStateAction<IContentElement>>
}
