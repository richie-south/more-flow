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

    const activeBlocks = buildBlock(
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

    const repositionedBlocks = repositionBlocks(
      blocks,
      blocksArray,
      childKey,
      activeBlocks,
      largestXPosition,
      xOffset,
      yOffset,
      parrentBlock.y + yOffset,
      child.height,
      child.width
    )

    return {
      ..._children,
      ...repositionedBlocks
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
  activeBlocks: Blocks,
  largestXOfPreviousRootBlocks: number,
  xOffset: number,
  yOffset: number,
  startBlockY: number,
  height: number,
  width: number
): Blocks {

  const activeBlocksArray = Object.entries(activeBlocks)
  if (activeBlocksArray.length > 1) {
    const smallestX = getSmallestXPosition(activeBlocksArray)
    /**
     * reposition children
     * if colliding
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

  return activeBlocks
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

    const prevoiusRootBlocksArray = Object.entries(previousRootBlocks)
    const largestXOfPreviousRootBlocks = getLargestXPosition(prevoiusRootBlocksArray)

    const activeBlocks = buildBlock(
      blocks,
      blocksArray,
      startBlockKey,
      {
        x: largestXOfPreviousRootBlocks + (xOffset),
        y: startBlockY,
        height: startBlock.height,
        width: startBlock.width,
        yOffset,
        xOffset,
        largestX: largestXOfPreviousRootBlocks,
      }
    )

    const repositionedBlocks = repositionBlocks(
      blocks,
      blocksArray,
      startBlockKey,
      activeBlocks,
      largestXOfPreviousRootBlocks,
      xOffset,
      yOffset,
      startBlockY,
      startBlock.height,
      startBlock.width
    )

    previousRootBlocks = repositionedBlocks

    return {
      ..._blocks,
      ...repositionedBlocks
    }
  }, {})

  return _blocks
}
