import React from 'react'
import {
  StandardBlockContainer,
  StandardBlockProps,
  TitleContainer,
  Title,
  IconContainer,
  TitleCenterContainer
} from './standard-block'
import eyeBlue from '../../assets/eye-blue.svg'

export const NewVisitorBlock: React.FC<StandardBlockProps> = ({
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
      <TitleCenterContainer>
        <IconContainer>
          <img src={eyeBlue} alt={'eye blue'} />
        </IconContainer>
        <Title>
          New visitor
        </Title>
      </TitleCenterContainer>
    </StandardBlockContainer>
  )
}
