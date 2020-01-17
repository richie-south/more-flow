import React, {useState, Fragment, useRef, useEffect} from 'react'
import uuidv4 from 'uuid/v4'
import { BlockList } from './components/block-list/block-list'
import { StandardBlockContainer } from './components/blocks/standard-block'
import styled from 'styled-components'

const BoardContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  background-color: #FBFBFB;
`

type Block = {
  type: string,
  data: Array<object>
  parrents: Array<string>
  children: Array<string>
  x: number
  y: number
  width: number
  height: number
}

type Blocks = {
  [key: string]: Block
}

const App: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null)
  const [blocks, setBlocks] = useState<Blocks>({
    '0.3.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0.3'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0.3': {
      type: 'standard-block',
      data: [],
      parrents: ['0.1'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },

    '0.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0.2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 290,
    },
    '0.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.1'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '0': {
      type: 'standard-block',
      data: [],
      parrents: ['2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },


    '1.2.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2.2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.2.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2.2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },

    '1.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.1'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '1': {
      type: 'standard-block',
      data: [],
      parrents: ['2'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '2': {
      type: 'standard-block',
      data: [],
      parrents: ['3'],
      children: ['1'],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },
    '3': {
      type: 'standard-block',
      data: [],
      parrents: [],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    },

 /*    '0.4': {
      type: 'standard-block',
      data: [],
      parrents: ['0.3'],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    }, */
    /* '4': {
      type: 'standard-block',
      data: [],
      parrents: [],
      children: [],
      x: 0,
      y: 0,
      height: 70,
      width: 150,
    }, */
  })


  const getLargestXPosition = (blocks: Array<[string, Block]>) => {
    return blocks.reduce((left, [_, block]) => {
      const rightEdge = block.x + block.width
      if (rightEdge > left) {
        return rightEdge
      }

      return left
    }, 0)
  }

  const getSmallestXPosition = (blocks: Array<[string, Block]>) => {
    return blocks.reduce((left, [_, block]) => {
      if (block.x < left) {
        return block.x
      }

      return left
    }, blocks[0][1].x)
  }

  const buildChild = (
    blocksArray: Array<[string, Block]>,
    parrentBlockKey: string,
    {
      x,
      y,
      width,
      height,
      yOffset = 150,
      xOffset = 30,
      largestX = 0,
      blockPath = []
    }: {
      x: number
      y: number
      width: number
      height: number
      yOffset?: number
      xOffset?: number
      largestX?: number
      blockPath?: Array<string>
    }
  ): Blocks => {
    const parrentBlock = {
      ...blocks[parrentBlockKey],
      x,
      y,
      width,
      height,
    }

    const children = blocksArray.filter(([_key, _block]) => {
      return _block.parrents.includes(parrentBlockKey)
    })

    /**
     * split children under parrent
     */
    if (children.length === 2) {
      console.log('multible children')
      const positionedChildren = children.reduce((_children, [childKey, child], index) => {
        console.log('childKey', childKey, index)
        if (index === 0) {
          return {
            ..._children,
            ...buildChild(
              blocksArray,
              childKey,
              {
                x: ((parrentBlock.x - parrentBlock.width / 2) - xOffset),
                y: parrentBlock.y + yOffset,
                height: child.height,
                width: child.width,
                largestX,
                blockPath: [...blockPath, childKey]
              }
            )
          }
        }

        const _childrenArray = Object.entries(_children)
        const largestXPosition = getLargestXPosition(_childrenArray)

        return {
          ..._children,
          ...buildChild(
            blocksArray,
            childKey,
            {
              x: largestXPosition + (xOffset * 2),
              y: parrentBlock.y + yOffset,
              height: child.height,
              width: child.width,
              largestX: largestXPosition,
              blockPath: [...blockPath, childKey]
            }
          )
        }
      }, {} as Blocks)

      return {
        ...positionedChildren,
        [parrentBlockKey]: parrentBlock
      }
    }

    /**
     * single child should be directly under
     */
    if (children.length === 1) {
      console.log('here', largestX)
      const [childKey, child] = children[0]
      const positionedChild = {
        ...child,
        x: parrentBlock.x,
        y: parrentBlock.y + yOffset
      }

      if (child.parrents.length > 0) {
        return {
          ...buildChild(
            blocksArray,
            childKey,
            {
              x: positionedChild.x,
              y: positionedChild.y,
              height: positionedChild.height,
              width: positionedChild.width,
              largestX,
              blockPath: [...blockPath, childKey]
            }
          ),
          [parrentBlockKey]: parrentBlock,
          [childKey]: positionedChild,

        }
      }

      return {
        [parrentBlockKey]: parrentBlock,
        [childKey]: positionedChild
      }
    }

    return {
      [parrentBlockKey]: parrentBlock
    }
  }

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    console.log(boardRef.current?.childNodes)
    const { height, width, x, y } = boardRef.current.getBoundingClientRect()

    console.log('height, width, x, y', height, width, x, y)

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
