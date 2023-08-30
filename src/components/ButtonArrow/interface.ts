export interface IButtonArrow {
  onClick: any
  diameter?: number
  arrowWidth?: number
  arrowHeight?: number
  bgColor?: string
  canDisable?: boolean
  arrowColor?: string
  direction?: "right" | "left"
  canDisappear: boolean
}
