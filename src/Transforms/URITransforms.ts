import { Transform } from "./Transform";

export const URIDecodeTransform: Transform = {
  name: 'urid',

  fn: (v, o) =>
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
  
  fn: (v, o) =>
    o.get('cmp')?.value === true
      ? encodeURIComponent(v)
      : encodeURI(v),

  options: [{
    type: 'CHECKBOX',
    key: 'cmp'
  }]
}
