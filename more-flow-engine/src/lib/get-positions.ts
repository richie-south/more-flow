import { Block } from "./block-types"

export function getLargestXPosition (blocks: Array<Block>) {
  return blocks.reduce((left, block) => {
    const rightEdge = block.x + block.width

    return rightEdge > left
      ? rightEdge
      : left
  }, 0)
}

export function getSmallestXPosition (blocks: Array<Block>) {
  return blocks.reduce((left, block) =>
     block.x < left
      ? block.x
      : left
  , blocks[0].x)
}

export function getCenterBlocksPosition (
  children: Array<[string, Block]>,
  xOffset: number,
  parrentX: number,
  parrentWidth: number
) {
  const totalChildWidth = children
    .map(([_, b]) => b.width)
    .reduce((a, b) => (a + b) + xOffset, 0) - xOffset

  return parrentX - totalChildWidth / 2 + parrentWidth / 2
}
