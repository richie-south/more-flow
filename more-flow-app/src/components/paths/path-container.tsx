import React from 'react'
import styled from 'styled-components'

type SvgProps = {
  left: number
  top: number
}
//${(props) => props.left}
const Svg = styled.svg<SvgProps>`
  position: absolute;
  width: 100%;
  left: 0px;
  top: ${(props) => props.top}px;
`

type PathContainerProps = {
  x: number
  y: number
  id: string
}

export const PathContainer: React.FC<PathContainerProps> = ({ id, x, y, children }) => {
  return (
    <Svg
      left={x}
      top={y}
      id={id}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </Svg>
  )
}

