
export type AvailableBlock = {
  name: string
  type: string
  typeMeta: {
    [key: string]: any
  }
  height: number
  width: number
}

export type AvailableBlocks = {
  [key: string]: AvailableBlock
}

export const availableBlocks: AvailableBlocks = {
  'new-visitor-block': {
    name: 'New visitor',
    type: 'new-visitor-block',
    typeMeta: {},
    height: 80,
    width: 220,
  },

  'match-block': {
    name: 'Match',
    type: 'match-block',
    typeMeta: {
      match: ''
    },
    height: 120,
    width: 320,
  },

  'standard-block': {
    name: 'Standard',
    type: 'standard-block',
    typeMeta: {},
    height: 120,
    width: 320,
  },

  '_chat': {
    name: 'Chat',
    type: 'standard-block',
    typeMeta: {},
    height: 120,
    width: 320,
  },

  '_faq': {
    name: 'Faq',
    type: 'standard-block',
    typeMeta: {},
    height: 120,
    width: 320,
  },
}
