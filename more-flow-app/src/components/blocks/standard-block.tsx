import React, { useState } from 'react'
import styled from 'styled-components'
import { Block } from '../../lib/block-types'

type StandardBlockContainer = {
  widthProp: number
  heightProp: number
  top: number
  left: number
  children: any
}

export const StandardBlockContainer = styled.div<StandardBlockContainer>`
  padding-bottom: 12px;
  padding-top: 12px;
  box-sizing: border-box;
  width: ${(props) => props.widthProp}px;
  height: ${(props) => props.heightProp}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  /* border: 1px solid black; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  background-color: white;
  position: absolute;
  border-radius: 5px;
  background-color: #FFF;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
`

export const TitleContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #E9E9EF;
  display: flex;
  height: 50px;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #253134;
  vertical-align: middle;
  margin-left: 8px;
  font-size: 16px;
`

export const TitleCenterContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  height: 100%;
  justify-content: center;
`

export const Content = styled.div`
  padding-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
`

export const Text = styled.div`
  font-size: 14px;
  color: #808292;
`

export type StandardBlockProps = {
  block: Block
  blockKey: string
} & StandardBlockContainer

export const StandardBlock: React.FC<StandardBlockProps> = ({
  widthProp,
  heightProp,
  top,
  left,
  block,
  blockKey,
  children,
}) => {

  return (
    <StandardBlockContainer
      widthProp={widthProp}
      heightProp={heightProp}
      top={top}
      left={left}
    >
      <TitleContainer>
        <IconContainer>

        </IconContainer>
        <Title>
          {children}
        </Title>

      </TitleContainer>
    </StandardBlockContainer>
  )
}
