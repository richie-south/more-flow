import React, {useState, Fragment, useRef, useEffect} from 'react'
import uuidv4 from 'uuid/v4'
import { BlockList } from './components/block-list/block-list'
import { StandardBlockContainer, StandardBlock } from './components/blocks/standard-block'
import styled, { createGlobalStyle } from 'styled-components'
import { Blocks, Block } from './lib/block-types'
import { buildBlock, buildBlocks } from './lib/build-block'
import { EndArrow } from './components/paths/end-arrow'
import { PathContainer } from './components/paths/path-container'
import { Path } from './components/paths/path'
import { buildLines, Line } from './lib/build-lines'
import image from './assets/tile.png'
import { NewVisitorBlock } from './components/blocks/new-visitor-block'
import { MatchBlock } from './components/blocks/match-block'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    background-image: url(${image});
    background-repeat: repeat;
    background-size: 30px 30px;
  }
`

type BoardContainerProps = {
  rectWidth: number
}

const BoardContainer = styled.div<BoardContainerProps>`
  position: absolute;
  width: 100%;
  /* width: ${(props) => props.rectWidth}px; */
  height: 100%;
  margin: 0px;
  padding: 0px;
  /* overflow: hidden; */

`

const Container = styled.div`
  background-color: #FBFBFB;
  background-image: url(${image});
  background-repeat: repeat;
  background-size: 30px 30px;
`

const App: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<{ height: number, width: number}>({
    height: 0,
    width: 0
  })
  const [lines, setLines] = useState<Array<Line>>([])
  const [blocks, setBlocks] = useState<Blocks>({

    '0': {
      type: 'new-visitor-block',
      typeMeta: {},
      data: {},
      parrents: [],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '2': {
      type: 'match-block',
      typeMeta: {},
      data: {},
      parrents: ['0'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '3': {
      type: 'match-block',
      typeMeta: {},
      data: {},
      parrents: ['0'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '4': {
      type: 'standard-block',
      typeMeta: {},
      data: {},
      parrents: ['3'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '5': {
      type: 'standard-block',
      typeMeta: {},
      data: {},
      parrents: ['3'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },

    '6': {
      type: 'match-block',
      typeMeta: {},
      data: {},
      parrents: ['0'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },


    /* '0.3.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.3'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '0.3.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0.3'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '0.3': {
      type: 'standard-block',
      data: [],
      parrents: ['0.1'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },

    '0.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.2'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '0.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0.2'],
      x: 0,
      y: 0,
      height: 120,
      width: 290,
    },
    '0.2': {
      type: 'standard-block',
      data: [],
      parrents: ['0.1'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '0.1': {
      type: 'standard-block',
      data: [],
      parrents: ['0'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '0': {
      type: 'standard-block',
      data: [],
      parrents: ['2.1'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },

    '1.2.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2.2'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '1.2.3': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '1.2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '1.2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1.2'],
      x: 0,
      y: 0,
      height: 120,
      width: 250,
    },

    '1.2': {
      type: 'standard-block',
      data: [],
      parrents: ['1.1'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '1.1': {
      type: 'standard-block',
      data: [],
      parrents: ['1'],
      x: 0,
      y: 0,
      height: 120,
      width: 250,
    },
    '1': {
      type: 'standard-block',
      data: [],
      parrents: [],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },

    '2.2': {
      type: 'standard-block',
      data: [],
      parrents: ['2'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '2.1': {
      type: 'standard-block',
      data: [],
      parrents: ['2'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '2': {
      type: 'standard-block',
      data: [],
      parrents: ['3'],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    },
    '3': {
      type: 'standard-block',
      data: [],
      parrents: [],
      x: 0,
      y: 0,
      height: 120,
      width: 320,
    }, */
  })

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    const { height, width } = boardRef.current.getBoundingClientRect()

    console.time('s')
    const _blocks = buildBlocks(
      blocks,
      height,
      width,
    )
    console.timeEnd('s')

    console.time('lines')
    const _lines = buildLines(
      _blocks,
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
  },[boardRef.current])

  const blocksArray = Object.entries(blocks)

  return (
    <Fragment>
      <GlobalStyle />
      <BoardContainer
        ref={boardRef}
        id={'board'}
        rectWidth={rect.width}
      >
        {lines.map((line) => {
          return (
            <PathContainer
              rect={rect}
              key={line.id}
              id={line.id}
              x={line.x}
              y={line.y}
            >
              <Path d={line.linePosition} />
              <EndArrow d={line.arrowPosition} />
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
