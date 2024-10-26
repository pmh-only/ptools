import { Base64DecodeTransform } from "./Base64DecodeTransform"

export interface Transform {
  name: string
  fn: () => string
}

export const transforms: Transform[] = [
  Base64DecodeTransform,
  Base64DecodeTransform,
  Base64DecodeTransform,
]
