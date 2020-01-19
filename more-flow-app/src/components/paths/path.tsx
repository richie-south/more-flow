import React from 'react'
import styled from 'styled-components'

type Props = {
  d: string
  active: boolean
  direction: string
}

export const Path: React.FC<Props>= ({ direction, active, d }) => {
  const getClassName = () => {
    switch (direction) {
      case 'down':
      case 'left':
        return 'active-path-from'
      case 'right':
        return 'active-path-to'
      default:
        return ''
    }
  }

  return (
    <path
      d={d}
      className={active ? getClassName() : ''}
      stroke={active ? 'red' : "#C5CCD0"}
      strokeWidth="2px">
    </path>
  )
}

