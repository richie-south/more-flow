import React, {useState, Fragment, useRef, useEffect} from 'react'
import { StandardBlock } from './components/blocks/standard-block'
import styled, { createGlobalStyle } from 'styled-components'
import { Blocks } from './lib/block-types'
import { buildBlocks } from './lib/build-block'
import { EndArrow } from './components/paths/end-arrow'
import { PathContainer } from './components/paths/path-container'
import { Path } from './components/paths/path'
import { buildLines, Line } from './lib/build-lines'
import image from './assets/tile.png'
import { NewVisitorBlock } from './components/blocks/new-visitor-block'
import { MatchBlock } from './components/blocks/match-block'
import { debounce } from 'lodash'
import { startBlocks } from './start-blocks'
import { BlockList } from './components/block-list/block-list'
import uuidv4 from 'uuid/v4'
import {availableBlocks} from './available-blocks'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    background-image: url(${image});
    background-repeat: repeat;
    background-size: 30px 30px;
  }

  .active-path-to {
    stroke-dasharray: 50;
    animation: dashTo 5s linear infinite;
  }

  .active-path-from {
    stroke-dasharray: 50;
    animation: dashFrom 5s linear infinite;
  }

  @keyframes dashTo {
    to {
      stroke-dashoffset: 1000;
    }
  }

  @keyframes dashFrom {
    from {
      stroke-dashoffset: 1000;
    }
  }
`

type BoardContainerProps = {
  rectWidth: number
}

const BoardContainer = styled.div<BoardContainerProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
`

const App: React.FC = () => {
  const xOffset = 30
  const yOffset = 80
  const boardRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<{ height: number, width: number}>({
    height: 0,
    width: 0
  })

  const [lines, setLines] = useState<Array<Line>>([])
  const [blocks, setBlocks] = useState<Blocks>(startBlocks)
  const [blockPaths, setBlockPaths] = useState<Array<string>>([
    'new-visitor',
    'support-match',
    '5',
    '6',
    '7',
    '9'
  ])


  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    const { height, width } = boardRef.current.getBoundingClientRect()

    // first render positions
    const startBlockX = width / 2
    const startBlockY = height / 6

    const _blocks = buildBlocks(
      blocks,
      startBlockX,
      startBlockY,
      xOffset,
      yOffset,
    )
    console.timeEnd('blocks')

    console.time('lines')
    const _lines = buildLines(
      _blocks,
      xOffset,
      yOffset,
    )
    console.timeEnd('lines')

    setLines(_lines)
    setBlocks(_blocks)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    const width = boardRef.current.scrollWidth
    const height = boardRef.current.scrollHeight
    setRect({
      height,
      width
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardRef.current])

  const handleDrag = useRef<any>(debounce((blockKey: string, x: number, y: number) => {
    console.time('buildBlocks')
    const _blocks = buildBlocks(
      blocks,
      x,
      y,
    )
    console.timeEnd('buildBlocks')
    console.time('buildLines')
    const _lines = buildLines(
      _blocks,
    )
    console.timeEnd('buildLines')

    setLines(_lines)
    setBlocks(_blocks)
  }, 0)).current


  const addBlockAbove = (blockKey: string, blockType: string, startBlockX: number, startBlockY: number) => {
    const block = blocks[blockKey]
    const newBlockKey = uuidv4()
    const newBlock = {
      ...availableBlocks[blockType],
      typeMeta: {
        match: '/'
      },
      data: {},
      parrents: block.parrents,
      x: 0,
      y: 0,
    }

    // if multible parrents?
    block.parrents = [newBlockKey]

    const _newBlocks = {
      ...blocks,
      [blockKey]: block,
      [newBlockKey]: newBlock
    }

    const _blocks = buildBlocks(
      _newBlocks,
      startBlockX,
      startBlockY,
      xOffset,
      yOffset
    )

    const _lines = buildLines(
      _blocks,
      xOffset,
      yOffset
    )

    setLines(_lines)
    setBlocks(_blocks)
  }

  const addBlockBelow = (blockKey: string, blockType: string, startBlockX: number, startBlockY: number) => {
    const _blocks = buildBlocks(
      {
        ...blocks,
        [uuidv4()]: {
          ...availableBlocks[blockType],
          typeMeta: {
            match: '/'
          },
          data: {},
          parrents: [blockKey],
          x: 0,
          y: 0,
        }
      },
      startBlockX,
      startBlockY,
      xOffset,
      yOffset
    )

    const _lines = buildLines(
      _blocks,
      xOffset,
      yOffset
    )

    setLines(_lines)
    setBlocks(_blocks)
  }

  const handleCreateAndAddNewBlock = (blockKey: string, blockType: string, position: 'top' | 'bottom') => {
    if (!boardRef.current) {
      return
    }

    const { height, width } = boardRef.current.getBoundingClientRect()
    const startBlockX = width / 2
    const startBlockY = height / 6

    if (position === 'top') {
      addBlockAbove(blockKey, blockType, startBlockX, startBlockY)
    } else {
      addBlockBelow(blockKey, blockType, startBlockX, startBlockY)
    }

  }

  const blocksArray = Object.entries(blocks)
  return (
    <Fragment>
      <GlobalStyle />
        <BlockList />
        <BoardContainer
          ref={boardRef}
          id={'board'}
          rectWidth={rect.width}
        >

          {lines.map((line) => {
            const active = blockPaths.includes(line.id)
            return (
              <PathContainer
                rect={rect}
                key={line.id}
                id={line.id}
                x={line.x}
                y={line.y}
                active={active}
              >
                <Path
                  active={active}
                  direction={line.direction}
                  d={line.linePosition} />
                <EndArrow
                  active={active}
                  d={line.arrowPosition} />
              </PathContainer>
            )
          })}
          {blocksArray.map(([key, block]) => {
            if (block.type === 'new-visitor-block') {
              return (
                <NewVisitorBlock
                  key={key}
                  widthProp={block.width}
                  heightProp={block.height}
                  top={block.y}
                  left={block.x}
                  blockKey={key}
                  block={block}
                  handleDrag={handleDrag}
                  onAddNewBlock={handleCreateAndAddNewBlock}
                  yOffset={yOffset}
                >
                </NewVisitorBlock>
              )
            }
            if (block.type === 'match-block') {
              return (
                <MatchBlock
                  key={key}
                  widthProp={block.width}
                  heightProp={block.height}
                  top={block.y}
                  left={block.x}
                  blockKey={key}
                  block={block}
                  onAddNewBlock={handleCreateAndAddNewBlock}
                  yOffset={yOffset}
                >
                </MatchBlock>
              )
            }

            return (
              <StandardBlock
                key={key}
                widthProp={block.width}
                heightProp={block.height}
                top={block.y}
                left={block.x}
                blockKey={key}
                block={block}
                onAddNewBlock={handleCreateAndAddNewBlock}
                yOffset={yOffset}
              >
                {key}
              </StandardBlock>
            )
          })}
        </BoardContainer>
    </Fragment>
  )
}

export default App
