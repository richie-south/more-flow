import React from 'react'
import styled from 'styled-components'

const BlockListContainer = styled.div`

`

const BlockItemContainer = styled.div`
  height: 120px;
  width: 320px;
  cursor: pointer;

  padding-bottom: 12px;
  padding-top: 12px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  background-color: #FFF;

  :hover {
    box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.05);
  }
`

type BlockItemProps = {
  blockType: string
}

const BlockItem: React.FC<BlockItemProps> = ({ children, blockType }) => {

  return (
    <BlockItemContainer
      draggable
      onDragStart={(event) => {
        event.persist()
        event.dataTransfer.setData('block-type', blockType)
      }}
    >
      {children}
    </BlockItemContainer>
  )
}

export function BlockList () {

  return (
    <BlockListContainer>
      <BlockItem blockType='match-block'>
        match
      </BlockItem>

      <BlockItem blockType='standard-block'>
        standard
      </BlockItem>
    </BlockListContainer>
  )
}
