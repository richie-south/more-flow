import { Blocks, Block } from "./block-types"
import { getLargestXPosition, getSmallestXPosition, getCenterBlocksPosition } from "./get-positions"

function buildFirstChildOfMany (
  blocks: Blocks,
  blocksArray: Array<[string, Block]>,
  children: Array<[string, Block]>,
  childKey: string,
  {
    parrentBlockX,
    parrentBlockY,
    parrentBlockWidth,
    childHeight,
    childWidth,
    yOffset = 150,
    xOffset = 30,
    largestX = 0,
    blockPath = []
  }: {
    parrentBlockX: number
    parrentBlockY: number
    parrentBlockWidth: number
    childHeight: number
    childWidth: number
    yOffset: number
    xOffset: number
    largestX: number
    blockPath: Array<string>
  }
) {
  const xPosition = getCenterBlocksPosition(
    children,
    xOffset,
    parrentBlockX,
    parrentBlockWidth
  )
  return buildBlock(
    blocks,
    blocksArray,
    childKey,
    {
      x: xPosition,
      y: parrentBlockY + yOffset,
      height: childHeight,
      width: childWidth,
      yOffset,
      xOffset,
      largestX,
      blockPath: [...blockPath, childKey]
    }
  )
}

type BuildChildMeta = {
  x: number
  y: number
  width: number
  height: number
  yOffset?: number
  xOffset?: number
  largestX?: number
  blockPath?: Array<string>
}

export function buildBlock (
    blocks: Blocks,
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
    }: BuildChildMeta
): Blocks {
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
  const positionedChildren = children.reduce((_children, [childKey, child], index) => {
    if (index === 0) {
      const firstChildTree = buildFirstChildOfMany(
        blocks,
        blocksArray,
        children,
        childKey,
        {
          parrentBlockX: parrentBlock.x,
          parrentBlockY: parrentBlock.y,
          parrentBlockWidth: parrentBlock.width,
          childHeight: child.height,
          childWidth: child.width,
          blockPath,
          largestX,
          xOffset,
          yOffset
        }
      )
      return {
        ..._children,
        ...firstChildTree
      }
    }

    const _childrenArray = Object.entries(_children)
    const largestXPosition = getLargestXPosition(_childrenArray)

    const subTree = buildBlock(
      blocks,
      blocksArray,
      childKey,
      {
        x: largestXPosition + (xOffset),
        y: parrentBlock.y + yOffset,
        height: child.height,
        width: child.width,
        yOffset,
        xOffset,
        largestX: largestXPosition,
        blockPath: [...blockPath, childKey]
      }
    )

    const _subTreeArray = Object.entries(subTree)
    if (_subTreeArray.length > 1) {
      const smallestX = getSmallestXPosition(_subTreeArray)
      /**
       * reposition children
       * if coliding
       */
      if (smallestX < largestXPosition) {
        return {
          ..._children,
          ...buildBlock(
            blocks,
            blocksArray,
            childKey,
            {
              // use larger offset when between two block trees
              x: largestXPosition + (largestXPosition - smallestX) + (xOffset * 3),
              y: parrentBlock.y + yOffset,
              height: child.height,
              width: child.width,
              yOffset,
              xOffset,
              largestX: largestXPosition + (largestXPosition - smallestX) + xOffset,
              blockPath: [...blockPath, childKey]
            }
          )
        }
      }
    }

    return {
      ..._children,
      ...subTree
    }
  }, {} as Blocks)

  return {
    ...positionedChildren,
    [parrentBlockKey]: parrentBlock
  }
}

function repositionBlocks (
  blocks: Blocks,
  blocksArray: Array<[string, Block]>,
  blockKey: string,
  previousRootBlocks: Blocks,
  xOffset: number,
  yOffset: number,
  startBlockY: number,
  height: number,
  width: number

): Blocks {
  const prevoiusRootBlocksArray = Object.entries(previousRootBlocks)
  const largestXOfPreviousRootBlocks = getLargestXPosition(prevoiusRootBlocksArray)
  console.log('largestXOfPreviousRootBlocks', largestXOfPreviousRootBlocks)

  const subTree = buildBlock(
    blocks,
    blocksArray,
    blockKey,
    {
      x: largestXOfPreviousRootBlocks + (xOffset),
      y: yOffset,
      height: height,
      width: width,
      yOffset,
      xOffset,
      largestX: largestXOfPreviousRootBlocks,
    }
  )

  const _subTreeArray = Object.entries(subTree)
  if (_subTreeArray.length > 1) {
    const smallestX = getSmallestXPosition(_subTreeArray)
    /**
     * reposition children
     * if coliding
     */
    if (smallestX < largestXOfPreviousRootBlocks) {
      return buildBlock(
        blocks,
        blocksArray,
        blockKey,
        {
          // use larger offset when between two block trees
          x: largestXOfPreviousRootBlocks + (largestXOfPreviousRootBlocks - smallestX) + (xOffset * 3),
          y: startBlockY,
          height: height,
          width: width,
          yOffset,
          xOffset,
          largestX: largestXOfPreviousRootBlocks + (largestXOfPreviousRootBlocks - smallestX) + xOffset,
        }
      )
    }
  }

  return subTree
}

export function buildBlocks (
  blocks: Blocks,
  height: number,
  width: number,
  xOffset = 30,
  yOffset = 150
): Blocks {
  const blocksArray = Object.entries(blocks)
  const startBlocks = blocksArray.filter(
    ([_, block]) => block.parrents.length === 0)

  const startBlockX = width / 5
  const startBlockY = height / 6
  let previousRootBlocks: Blocks = {}
  const _blocks = startBlocks.reduce((_blocks, [startBlockKey, startBlock], index) => {

    if (index === 0) {
      const _startBlock = {
        ...startBlock,
        x: startBlockX,
        y: startBlockY
      } as Block

      const rootBlocks = {
        [startBlockKey]: _startBlock,
        ...buildBlock(
          blocks,
          blocksArray,
          startBlockKey,
          {
            x: startBlockX,
            y: startBlockY,
            height: startBlock.height,
            width: startBlock.width,
            xOffset,
            yOffset,
          }
        )
      }

      previousRootBlocks = rootBlocks

      return {
        ..._blocks,
        ...rootBlocks
      }
    }

     const rootBlocks = repositionBlocks(
      blocks,
      blocksArray,
      startBlockKey,
      previousRootBlocks,
      xOffset,
      yOffset,
      startBlockY,
      startBlock.height,
      startBlock.width
    )

    previousRootBlocks = rootBlocks

    return {
      ..._blocks,
      ...rootBlocks
    }
  }, {})

  return _blocks
}
