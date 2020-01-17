import React from 'react'
import styled from 'styled-components'

type Props = {
  widthProp: number
  heightProp: number
  top: number
  left: number
  children: any
}

export const StandardBlockContainer = styled.div<Props>`
  width: ${(props) => props.widthProp}px;
  height: ${(props) => props.heightProp}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: absolute;
`

export function StandardBlock ({
  width,
  height,
  top,
  left,
  children,
}: {
  width: number
  height: number
  top: number
  left: number
  children: any
}) {

  return (
    <div
    >
      Block :D
    </div>
  )
}
