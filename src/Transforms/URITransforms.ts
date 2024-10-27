import { Transform } from "./Transform";

export const URIDecodeTransform: Transform = {
  name: 'urid',

  fn: async (v, o) =>
    o.get('cmp')?.value === true
      ? decodeURIComponent(v)
      : decodeURI(v),

  options: [{
    type: 'CHECKBOX',
    key: 'cmp'
  }]
}

export const URIEncodeTransform: Transform = {
  name: 'urie',
  
  fn: async (v, o) =>
    o.get('cmp')?.value === true
      ? encodeURIComponent(v)
      : encodeURI(v),

  options: [{
    type: 'CHECKBOX',
    key: 'cmp'
  }]
}
