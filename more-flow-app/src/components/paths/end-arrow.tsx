import React from 'react'

type Props = {
  d: string
  active: boolean
}

export const EndArrow: React.FC<Props> = ({ active, d }) => {
  return (
    <path
      d={d}
      fill={active ? 'red' : "#C5CCD0"}>
    </path>
  )
}
