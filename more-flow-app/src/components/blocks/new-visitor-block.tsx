import React, {useRef} from 'react'
import {
  StandardBlockContainer,
  StandardBlockProps,
  Title,
  IconContainer,
  TitleCenterContainer
} from './standard-block'
import eyeBlue from '../../assets/eye-blue.svg'

type NewVisitorBlockProps = {
  handleDrag: (key: string, x: number, y: number) => void
}

export const NewVisitorBlock: React.FC<StandardBlockProps & NewVisitorBlockProps & any> = ({
  widthProp,
  heightProp,
  top,
  left,
  block,
  blockKey,
  children,
  handleDrag
}) => {
  const lastPositions = useRef({
    x: 0,
    y: 0
  }).current

  return (
    <StandardBlockContainer
      widthProp={widthProp}
      heightProp={heightProp}
      top={top}
      left={left}
      draggable
      onDragCapture={(event) => {
        event.persist()
        const { clientX, clientY } = event

        if (clientX !== lastPositions.x || clientY !== lastPositions.y) {
          lastPositions.x = clientX
          lastPositions.y = clientY
          handleDrag(
            blockKey,
            clientX,
            clientY
          )
        }

      }}
      onDragEnd={(event) => {
        event.persist()
        const {clientX, clientY } = event
        handleDrag(
          blockKey,
          clientX,
          clientY
        )
      }}
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
