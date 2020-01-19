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
  onDrop: (blockType: string) => void
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
  const [canCapture, setCanCapture] = useState(false)
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
        setCanCapture(true)
      }}

      onDragOver={(event) => {
        event.preventDefault()
      }}

      onDrop={(event) => {
        const blockType = event.dataTransfer.getData("block-type")
        count = -1
        setCanCapture(false)
        onDrop(blockType)
      }}

      onDragLeave={(e) => {
        e.persist()
        count -= 1
        if (count < 0) {
          setCanCapture(false)
        }
      }}
    >
      {(children as any)(canCapture)}
    </Transparent>
  )
}
