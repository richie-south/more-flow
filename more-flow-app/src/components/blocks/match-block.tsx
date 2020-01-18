import React from 'react'
import {
  StandardBlockContainer,
  StandardBlockProps,
  TitleContainer,
  Title,
  IconContainer
} from './standard-block'
import actionBlue from '../../assets/action-blue.svg'

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
    </StandardBlockContainer>
  )
}
