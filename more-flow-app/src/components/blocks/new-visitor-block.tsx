import React, {useRef} from 'react'
import {
  StandardBlockContainer,
  StandardBlockProps,
  Title,
  IconContainer,
  TitleCenterContainer,
  CaptureIndicator
} from './standard-block'
import eyeBlue from '../../assets/eye-blue.svg'
import { DropCaptureBlock } from './drop-capture-block'

type NewVisitorBlockProps = {
  handleDrag: (key: string, x: number, y: number) => void
}

export const NewVisitorBlock: React.FC<StandardBlockProps & NewVisitorBlockProps> = ({
  widthProp,
  heightProp,
  top,
  left,
  block,
  blockKey,
  children,
  handleDrag,
  onAddNewBlock,
  yOffset
}) => {
  const lastPositions = useRef({
    x: 0,
    y: 0
  }).current

  return (
    <DropCaptureBlock
      widthProp={widthProp}
      heightProp={heightProp}
      top={top}
      left={left}
      yOffset={yOffset}
      onDrop={(blockType, position) => onAddNewBlock(blockKey, blockType, position)}
    >
      {(canCaptureTop: boolean, canCaptureBottom: boolean) => (
        <StandardBlockContainer
          widthProp={widthProp}
          heightProp={heightProp}
          top={10}
          left={20}
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
          {(canCaptureTop || canCaptureBottom) && (
            <CaptureIndicator isTop={canCaptureTop} />
          )}
        </StandardBlockContainer>
      )}
    </DropCaptureBlock>
  )
}
