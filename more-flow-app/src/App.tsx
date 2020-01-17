import React, {useState, Fragment, useRef, useEffect} from 'react'
import uuidv4 from 'uuid/v4'
import { BlockList } from './components/block-list/block-list'
import { StandardBlockContainer } from './components/blocks/standard-block'
import styled from 'styled-components'
import { Blocks, Block } from './lib/block-types'
import { buildChild } from './lib/build-child'

const BoardContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  background-color: #FBFBFB;
`

const App: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null)
  const [blocks, setBlocks] = useState<Blocks>({

    'root': {
      type: 'standard-block',
      data: [],
      parrents: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '2': {
      type: 'standard-block',
      data: [],
      parrents: ['root'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '3': {
      type: 'standard-block',
      data: [],
      parrents: ['root'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '4': {
      type: 'standard-block',
      data: [],
      parrents: ['root'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },

    /* '0.3.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.3'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0.3.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0.3'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0.3': {
      type: 'standard-block',
      data: [],
      parrents: ['0.1'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },

    '0.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.2'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0.2'],
      x: 0,
      y: 0,
      height: 70,
      width: 290,
    },
    '0.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.1'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0': {
      type: 'standard-block',
      data: [],
      parrents: ['2'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },

    '1.2.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2.2'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.2.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2.2'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },

    '1.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.1'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1': {
      type: 'standard-block',
      data: [],
      parrents: ['2'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '2': {
      type: 'standard-block',
      data: [],
      parrents: ['3'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '3': {
      type: 'standard-block',
      data: [],
      parrents: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    }, */
  })

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    /* console.log(boardRef.current?.childNodes) */
    const { height, width, x, y } = boardRef.current.getBoundingClientRect()

    /* console.log('height, width, x, y', height, width, x, y) */

    const blocksArray = Object.entries(blocks)
    const startBlocks = blocksArray.filter(
      ([_, block]) => block.parrents.length === 0)

    const _blocks = startBlocks.reduce((_blocks, [startBlockKey, startBlock], index) => {
      const startBlockX = width / 5
      const startBlockY = height / 6

      const _startBlock = {
        ...startBlock,
        x: startBlockX,
        y: startBlockY
      } as Block

      return {
        ..._blocks,
        [startBlockKey]: _startBlock,
        ...buildChild(
          blocks,
          blocksArray,
          startBlockKey,
          {
            x: startBlockX,
            y: startBlockY,
            height: startBlock.height,
            width: startBlock.width,
          }
        )
      }

    }, {})

    setBlocks(_blocks)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blocksArray = Object.entries(blocks)
  console.log('blocksArray', blocksArray)
  return (
    <Fragment>
      <BoardContainer ref={boardRef} className='board'>
        {blocksArray.map(([key, block]) => {
          return (
            <StandardBlockContainer
              key={key}
              data-id={key}
              widthProp={block.width}
              heightProp={block.height}
              top={block.y}
              left={block.x}
            >
              key: {key}
            </StandardBlockContainer>
          )
        })}
      </BoardContainer>
    </Fragment>
  )
}

export default App
