import React, { FC } from 'react'
import { IYear } from './interface'
import "./year.scss"

export const Year: FC<IYear> = ({ number, color = '#000' }) => {
  const styleObj = {
      color: color
  }
  
  return (
    <div className={`component-year`} style={styleObj}>{number}</div>
  )
}
