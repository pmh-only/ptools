import { Transform } from './Transform'

export const Base64DecodeTransform: Transform = {
  name: 'base64d',
  fn: async (v) => atob(v),
}

export const Base64EncodeTransform: Transform = {
  name: 'base64e',
  fn: async (v) => btoa(v),
}
