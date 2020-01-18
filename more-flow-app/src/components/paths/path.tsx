import React from 'react'

type Props = {
  d: string
}

export const Path: React.FC<Props>= ({ d }) => {
  return (
    <path
      d={d}
      stroke="#C5CCD0"
      strokeWidth="2px">
    </path>
  )
}

