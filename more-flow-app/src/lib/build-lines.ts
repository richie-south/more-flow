import {Blocks, Block} from './block-types'

export type Line = {
  id: string
  linePosition: string
  arrowPosition: string
  x: number
  y: number
}

function buildLine(
  blocks: Blocks,
  blocksArray: Array<[string, Block]>,
  parrentBlockKey: string,
  parrentBlock: Block,
  yOffset: number,
  xOffset: number
): Array<Line> {
  const children = blocksArray.filter(([_key, _block]) =>
    _block.parrents.includes(parrentBlockKey)
  )

  if (!children[0]) {
    return []
  }

  if (children.length === 1) {
    const [childBlockKey, childBlock] = children[0]
    const linePosition = `M${Math.ceil(
      parrentBlock.x + parrentBlock.width / 2
    )},${0} L${Math.ceil(
      parrentBlock.x + parrentBlock.width / 2
    )},${yOffset - 5}`

    const arrowPosition = `M${Math.ceil(
      parrentBlock.x + parrentBlock.width / 2
    )},${yOffset - 5} H${Math.ceil(parrentBlock.x + parrentBlock.width / 2) -
      5} L${Math.ceil(
      parrentBlock.x + parrentBlock.width / 2
    )},${yOffset} L${Math.ceil(parrentBlock.x + parrentBlock.width / 2) +
      5},${yOffset - 5}Z`

    return [
      ...buildLine(
        blocks,
        blocksArray,
        childBlockKey,
        childBlock,
        yOffset,
        xOffset
      ),
      {
        id: `down-${childBlockKey}`,
        linePosition,
        arrowPosition,
        x: Math.ceil(parrentBlock.x + parrentBlock.width / 2 - 10),
        y: parrentBlock.y + parrentBlock.height
      }
    ]
  }

  return children.reduce((_lines, [childBlockKey, childBlock]) => {
    // go left
    if (childBlock.x < parrentBlock.x) {
      const linePosition = `M${Math.ceil(
        parrentBlock.x + parrentBlock.width / 2
      )},${0} L${Math.ceil(
        parrentBlock.x + parrentBlock.width / 2
      )},${Math.ceil(yOffset / 2)} H${Math.ceil(
        childBlock.x + childBlock.width / 2
      )}, L${Math.ceil(childBlock.x + childBlock.width / 2)},${Math.ceil(
        yOffset - 4
      )}`

      const arrowPosition = `M${Math.ceil(
        childBlock.x + childBlock.width / 2
      )},${yOffset - 5} H${Math.ceil(childBlock.x + childBlock.width / 2) -
        5} L${Math.ceil(
        childBlock.x + childBlock.width / 2
      )},${yOffset} L${Math.ceil(childBlock.x + childBlock.width / 2) +
        5},${yOffset - 5}Z`

      return [
        ..._lines,
        ...buildLine(
          blocks,
          blocksArray,
          childBlockKey,
          childBlock,
          yOffset,
          xOffset
        ),
        {
          id: `left-${childBlockKey}`,
          linePosition,
          arrowPosition,
          x: Math.ceil(childBlock.x + childBlock.width / 2 - 10),
          y: parrentBlock.y + parrentBlock.height
        }
      ]
    }

    // go down!
    if (childBlock.x === parrentBlock.x) {
      const linePosition = `M${Math.ceil(
        parrentBlock.x + parrentBlock.width / 2
      )},${0} L${Math.ceil(
        parrentBlock.x + parrentBlock.width / 2
      )},${yOffset - 5}`

      const arrowPosition = `M${Math.ceil(
        parrentBlock.x + parrentBlock.width / 2
      )},${yOffset - 5} H${Math.ceil(parrentBlock.x + parrentBlock.width / 2) -
        5} L${Math.ceil(
        parrentBlock.x + parrentBlock.width / 2
      )},${yOffset} L${Math.ceil(parrentBlock.x + parrentBlock.width / 2) +
        5},${yOffset - 5}Z`

      return [
        ..._lines,
        ...buildLine(
          blocks,
          blocksArray,
          childBlockKey,
          childBlock,
          yOffset,
          xOffset
        ),
        {
          id: `down-${childBlock.x + parrentBlock.x + childBlock.width}`,
          linePosition,
          arrowPosition,
          x: Math.ceil(parrentBlock.x + parrentBlock.width / 2 - 10),
          y: parrentBlock.y + parrentBlock.height
        }
      ]
    }

    // go right
    const linePosition = `M${Math.ceil(
      childBlock.x + childBlock.width / 2
    )},${yOffset - 2} L${Math.ceil(
      childBlock.x + childBlock.width / 2
    )},${Math.ceil(yOffset / 2)} H${Math.ceil(
      parrentBlock.x + parrentBlock.width / 2
    )}, L${Math.ceil(parrentBlock.x + parrentBlock.width / 2)},${
      0
    }`

    const arrowPosition = `M${Math.ceil(
      childBlock.x + childBlock.width / 2
    )},${yOffset - 5} H${Math.ceil(childBlock.x + childBlock.width / 2) -
      5} L${Math.ceil(
      childBlock.x + childBlock.width / 2
    )},${yOffset} L${Math.ceil(childBlock.x + childBlock.width / 2) +
      5},${yOffset - 5}Z`

    return [
      ..._lines,
      ...buildLine(
        blocks,
        blocksArray,
        childBlockKey,
        childBlock,
        yOffset,
        xOffset
      ),
      {
        id: `right-${childBlockKey}`, // might be to slow
        linePosition,
        arrowPosition,
        x: Math.ceil(parrentBlock.x + parrentBlock.width / 2 + -4),
        y: parrentBlock.y + parrentBlock.height
      }
    ]
  }, [] as Array<Line>)
}

export function buildLines(
  blocks: Blocks,
  yOffset: number = 80,
  xOffset: number = 30
): Array<Line> {
  const blocksArray = Object.entries(blocks)
  const startBlocks = blocksArray.filter(
    ([_, block]) => block.parrents.length === 0
  )

  const lines = startBlocks.reduce((_lines, [startBlockKey, startBlock]) => {
    return [
      ..._lines,
      ...buildLine(
        blocks,
        blocksArray,
        startBlockKey,
        startBlock,
        yOffset,
        xOffset
      )
    ]
  }, [] as Array<Line>)

  console.log('lines', lines)
  return lines
}
