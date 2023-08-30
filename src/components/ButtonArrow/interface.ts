export interface IButtonArrow {
  onClick: () => void
  diameter?: number
  arrowWidth?: number
  arrowHeight?: number
  bgColor?: string
  canDisable?: boolean
  arrowColor?: string
  direction?: "right" | "left"
  canDisappear: boolean
}
