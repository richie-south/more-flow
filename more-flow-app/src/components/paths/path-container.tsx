import React from 'react'
import styled from 'styled-components'

type SvgProps = {
  left: number
  top: number
  rectWidth: number
  active: boolean
}

const Svg = styled.svg<SvgProps>`
  position: absolute;
  ${(props) => props.active ? `
    z-index: ${1};
  ` : ``}
  width: ${(props) => props.rectWidth}px;
  left: 0px;
  top: ${(props) => props.top}px;
`

type PathContainerProps = {
  x: number
  y: number
  id: string
  active: boolean
  rect: {
    height: number
    width: number
  }
}

export const PathContainer: React.FC<PathContainerProps> = ({ active, rect, id, x, y, children }) => {
  return (
    <Svg
      left={x}
      active={active}
      top={y}
      id={id}
      rectWidth={rect.width}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </Svg>
  )
}

