import React from 'react'
import {
  StandardBlockContainer,
  StandardBlockProps,
  TitleContainer,
  Title,
  IconContainer,
  Content,
  Text,
  CaptureIndicator
} from './standard-block'
import actionBlue from '../../assets/action-blue.svg'
import styled from 'styled-components'
import { DropCaptureBlock } from './drop-capture-block'

const MatchPath = styled.span`
  padding-left: 4px;
  padding-right: 4px;
  font-weight: 600;
  color: black;
`

export const MatchBlock: React.FC<StandardBlockProps> = ({
  widthProp,
  heightProp,
  top,
  left,
  block,
  blockKey,
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
              <img src={actionBlue} alt={'eye blue'} />
            </IconContainer>
            <Title>
              Matches
            </Title>
          </TitleContainer>
          <Content>
            <Text>
              When
              <MatchPath>
                {block.typeMeta.match}
              </MatchPath>
              matches
            </Text>
          </Content>
          {canCapture && (
            <CaptureIndicator />
          )}
        </StandardBlockContainer>
      )}

    </DropCaptureBlock>
  )
}
