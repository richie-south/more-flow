import { Block } from "./block-types"

export function getLargestXPosition (blocks: Array<[string, Block]>) {
  return blocks.reduce((left, [_, block]) => {
    const rightEdge = block.x + block.width

    return rightEdge > left
      ? rightEdge
      : left
  }, 0)
}

export function getSmallestXPosition (blocks: Array<[string, Block]>) {
  return blocks.reduce((left, [_, block]) =>
     block.x < left
      ? block.x
      : left
  , blocks[0][1].x)
}
