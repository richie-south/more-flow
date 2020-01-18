import React from 'react'

type Props = {
  d: string
}

export const EndArrow: React.FC<Props> = ({ d }) => {
  return (
    <path
      d={d}
      fill="#C5CCD0">
    </path>
  )
}
