import React, { useState } from 'react'
import styled from 'styled-components'
import { Block } from '../../lib/block-types'
import { DropCaptureBlock } from './drop-capture-block'
import databaseOrange from '../../assets/database-orange.svg'

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
  user-select: none;
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
  text-transform: capitalize;
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

const CaptureIndicatorContainer = styled.div`
  height: 24px;
  width: 24px;
  position: absolute;
  left: calc(50% - 12px);
  bottom: -12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  opacity:1;
  transition:all .3s cubic-bezier(.05,.03,.35,1);
  transform:scale(1);
`

const CaptureIndicatorOuterCircle = styled.div`
  height: 20px;
  width: 20px;
  background-color: #217CE8;
  border-radius: 50%;
  position: absolute;
  opacity: 0.5;
`

const CaptureIndicatorInnerCircle = styled.div`
  height: 12px;
  width: 12px;
  background-color: #217CE8;
  border-radius: 50%;
  position: absolute;
`

export const CaptureIndicator = () => {
  return (
    <CaptureIndicatorContainer>
      <CaptureIndicatorOuterCircle />
      <CaptureIndicatorInnerCircle />
    </CaptureIndicatorContainer>
  )
}

export type StandardBlockProps = {
  block: Block
  blockKey: string
  yOffset: number
  onAddNewBlock: (blockKey: string, newBlockType: string) => void
} & StandardBlockContainer

export const StandardBlock: React.FC<StandardBlockProps> = ({
  widthProp,
  heightProp,
  top,
  left,
  block,
  blockKey,
  children,
  onAddNewBlock,
  yOffset,
}) => {

  return (
    <DropCaptureBlock
      widthProp={widthProp}
      heightProp={heightProp}
      top={top}
      left={left}
      yOffset={yOffset}
      onDrop={(blockType) => onAddNewBlock(blockKey, blockType)}
    >
      {(canCapture: boolean) => (
        <StandardBlockContainer
          widthProp={widthProp}
          heightProp={heightProp}
          top={10}
          left={20}
        >
          <TitleContainer>
            <IconContainer>
              <img src={databaseOrange} alt={'eye blue'} />
            </IconContainer>
            <Title>
              {children}
            </Title>

          </TitleContainer>
          {canCapture && (
            <CaptureIndicator />
          )}
        </StandardBlockContainer>
      )}
    </DropCaptureBlock>
  )
}
