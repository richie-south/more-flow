import React, { useState, useRef } from 'react'
import styled from 'styled-components'

const Transparent = styled.div<{
  widthProp: number
  heightProp: number
  top: number
  left: number
}>`
  position: absolute;
  width: ${(props) => props.widthProp + 40}px;
  height: ${(props) => props.heightProp}px;
  top: ${(props) => props.top - 10}px;
  left: ${(props) => props.left - 20}px;
  z-index: 4;
`

type DropCaptureBlockProps = {
  widthProp: number
  heightProp: number
  top: number
  left: number
  onDrop: (blockType: string, position: 'top' | 'bottom') => void
  yOffset: number
}

export const DropCaptureBlock: React.FC<DropCaptureBlockProps> = ({
  widthProp,
  heightProp,
  top,
  left,
  children,
  onDrop,
  yOffset
}) => {
  const [canCaptureTop, setCanCaptureTop] = useState(false)
  const [canCaptureBottom, setCanCaptureBottom] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  let count = useRef<number>(0).current

  return (
    <Transparent
      widthProp={widthProp}
      heightProp={heightProp + yOffset - 30}
      top={top}
      left={left}
      ref={containerRef}

      onDragEnter={(event) => {
        event.preventDefault()
        count += 1
      }}

      onDragOver={(event) => {
        event.preventDefault()
        event.persist()

        // top half of block
        if (event.clientY < top + ((heightProp / 2) - 40) && !canCaptureTop) {
          setCanCaptureBottom(false)
          setCanCaptureTop(true)
        }

        // bottom half of block
        if (event.clientY > top + ((heightProp / 2) - 40) && !canCaptureBottom) {
          setCanCaptureTop(false)
          setCanCaptureBottom(true)
        }
      }}

      onDrop={(event) => {
        const blockType = event.dataTransfer.getData("block-type")

        count = -1
        setCanCaptureTop(false)
        setCanCaptureBottom(false)
        const position = canCaptureTop ? 'top' : 'bottom'

        if (!blockType) {
          return
        }
        onDrop(blockType, position)
      }}

      onDragLeave={(e) => {
        e.persist()
        count -= 1
        if (count < 0) {
          setCanCaptureTop(false)
          setCanCaptureBottom(false)
        }
      }}
    >
      {(children as any)(canCaptureTop, canCaptureBottom)}
    </Transparent>
  )
}
