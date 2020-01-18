export type Block = {
  type: string,
  data: object
  typeMeta: object
  parrents: Array<string>
  x: number
  y: number
  width: number
  height: number
}

export type Blocks = {
  [key: string]: Block
}
