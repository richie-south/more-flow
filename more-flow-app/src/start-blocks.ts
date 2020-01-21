import { Blocks } from "more-flow-engine";

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
      match: '/produkter'
    },
    data: {},
    parrents: ['new-visitor'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'faq': {
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
      match: '/produkter/kassa'
    },
    data: {},
    parrents: ['new-visitor',],
    x: 0,
    y: 0,
    height: 420,
    width: 320,
  },


 /*  'match-all': {
    type: 'match-block',
    typeMeta: {
      match: '/'
    },
    data: {},
    parrents: ['new-visitor',],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  }, */

  'agent-online': {
    type: 'match-block',
    typeMeta: {
      match: 'agent online'
    },
    data: {},
    parrents: ['new-visitor'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'agent-offline': {
    type: 'match-block',
    typeMeta: {
      match: 'agent offline'
    },
    data: {},
    parrents: ['new-visitor'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'chat': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['agent-online'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'faq_': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['agent-offline'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },

  'faq__': {
    type: 'standard-block',
    typeMeta: {},
    data: {},
    parrents: ['chat'],
    x: 0,
    y: 0,
    height: 120,
    width: 320,
  },
/*   '5': {
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
  }, */
}
