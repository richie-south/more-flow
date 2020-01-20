import { Blocks } from "./lib/block-types";

export const startBlocks: Blocks = {
  'new-visitor': {
    type: 'new-visitor-block',
    typeMeta: {},
    data: {},
    parrents: [],
    x: 0,
    y: 0,
    height: 80,
    width: 220,
  },

  'is-device-mobile': {
    type: 'match-block',
    typeMeta: {
      match: 'mobile'
    },
    data: {},
    parrents: ['new-visitor'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'change-style': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['is-device-mobile'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'support-match': {
    type: 'match-block',
    typeMeta: {
      match: '/support'
    },
    data: {},
    parrents: ['new-visitor'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  '4': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['support-match'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },
  '5': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['support-match'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  '6': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['5'],
    x: 0,
    y: 0,
    height: 420,
    width: 320,
  },

  '7': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['6'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  '8': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['7'],
    x: 0,
    y: 0,
    height: 120,
    width: 520,
  },

  '9': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['7'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'Active visitor': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: [],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  '10': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: [
      'Active visitor'
    ],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },
}
