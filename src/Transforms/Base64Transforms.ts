import { Transform } from "./Transform";

export const Base64DecodeTransform: Transform = {
  name: 'base64d',
  fn: (v) => btoa(v)
}

export const Base64EncodeTransform: Transform = {
  name: 'base64e',
  fn: (v) => atob(v)
}
