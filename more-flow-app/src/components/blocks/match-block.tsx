import React from 'react'
import {
  StandardBlockContainer,
  StandardBlockProps,
  TitleContainer,
  Title,
  IconContainer,
  Content,
  Text
} from './standard-block'
import actionBlue from '../../assets/action-blue.svg'
import styled from 'styled-components'

const MatchPath = styled.span`
  padding-left: 8px;
  padding-right: 8px;
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
    </StandardBlockContainer>
  )
}
