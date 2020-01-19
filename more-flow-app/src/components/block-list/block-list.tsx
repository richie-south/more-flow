import React from 'react'
import styled from 'styled-components'
import { Text} from '../blocks/standard-block'
import actionGreyIcon from '../../assets/action-grey.svg'
import eyeGreyIcon from '../../assets/eye-grey.svg'
import databaseGreyIcon from '../../assets/database-grey.svg'

const BlockListContainer = styled.div`
  width: 300px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #E8E8EF;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

const BlockItemContainer = styled.div`
  margin-top: 6px;
  height: 80px;
  width: 270px;
  cursor: pointer;
  border: 1px solid #E9E9EF;
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

const TitleContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  /* padding-top: 16px; */
  padding-left: 20px;
  padding-right: 20px;
`

const Title = styled.p`
  margin: 0px!important;
  padding: 0px!important;
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  color: #393C44;
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: #F1F4FC;
  border-radius: 5px;
  text-align: center;
  white-space: nowrap;
`

type BlockItemProps = {
  blockType: string
}

const BlockItem: React.FC<BlockItemProps> = ({ children, blockType }) => {

  const getBlockIcon = (blockType: string) => {
    switch (blockType) {
      case 'match-block':
        return actionGreyIcon
      case 'standard-block':
        return databaseGreyIcon
      case 'new-visitor-block':
        return eyeGreyIcon
      default:
        break;
    }
  }


  return (
    <BlockItemContainer
      draggable
      onDragStart={(event) => {
        event.persist()
        event.dataTransfer.setData('block-type', blockType)
      }}
    >
      <TitleContainer>
        <IconContainer>
          <img src={getBlockIcon(blockType)} alt='block' />
        </IconContainer>
        <Content>
          <Title>
            {children}
          </Title>
          <Text>
            Triggers when someone goes to
          </Text>
        </Content>
      </TitleContainer>
    </BlockItemContainer>
  )
}

export function BlockList () {

  return (
    <BlockListContainer>
      <h2>Blocks</h2>
      <BlockItem blockType='match-block'>
        Match
      </BlockItem>

      <BlockItem blockType='standard-block'>
        Standard
      </BlockItem>
    </BlockListContainer>
  )
}
