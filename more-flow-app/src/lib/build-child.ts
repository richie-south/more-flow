import { Blocks, Block } from "./block-types"
import { getLargestXPosition, getSmallestXPosition } from "./get-positions"

function buildSingelChild (
  blocks: Blocks,
  blocksArray: Array<[string, Block]>,
  parrentBlockKey: string,
  child: [string, Block],
  parrentBlock: Block,
  {
    yOffset = 150,
    largestX = 0,
    blockPath = []
  }: {
    yOffset: number
    largestX: number
    blockPath: Array<string>
  }
) {
  const [childKey, childBlock] = child
  const positionedChild = {
    ...childBlock,
    x: parrentBlock.x,
    y: parrentBlock.y + yOffset
  }

  if (childBlock.parrents.length > 0) {
    return {
      ...buildChild(
        blocks,
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

export function buildChild (
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
    if (children.length > 1) {
      const positionedChildren = children.reduce((_children, [childKey, child], index) => {
        if (index === 0) {
          return {
            ..._children,
            ...buildChild(
              blocks,
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

        const subTree = buildChild(
          blocks,
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
              ...buildChild(
                blocks,
                blocksArray,
                childKey,
                {
                  x: largestXPosition + (largestXPosition - smallestX) + (xOffset * 4),
                  y: parrentBlock.y + yOffset,
                  height: child.height,
                  width: child.width,
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

    /**
     * single child should be directly under
     */
    if (children.length === 1) {
      return buildSingelChild(
        blocks,
        blocksArray,
        parrentBlockKey,
        children[0],
        parrentBlock,
        {
          yOffset,
          largestX,
          blockPath
        }
      )
    }

    return {
      [parrentBlockKey]: parrentBlock
    }
  }
