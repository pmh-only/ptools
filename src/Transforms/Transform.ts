import { Base64DecodeTransform, Base64EncodeTransform } from "./Base64Transforms"
import { URIDecodeTransform, URIEncodeTransform } from "./URITransforms"

export interface TransformCheckboxOption {
  type: 'CHECKBOX',
  key: string,
  label?: string,
  value?: boolean
}


export interface TransformTextboxOption {
  type: 'TEXTBOX',
  key: string,
  label?: string,
  value?: string
}

export type TransformOption = 
  TransformCheckboxOption | TransformTextboxOption

export interface Transform {
  name: string
  fn: (value: string, options: Map<string, TransformOption>) => string
  options?: TransformOption[]
}

export interface WrappedTransform extends Omit<Transform, 'fn'> {
  wrapped: true,
  fn: (value: string, options: Map<string, TransformOption>) => {
    error: boolean,
    value: string
  }
}

export const wrapTransform = (transform: Transform): WrappedTransform => ({
  ...transform,
  fn: (...args) => {
    try {
      return {
        error: false,
        value: transform.fn(...args)
      }
    } catch (err: any) {
      return {
        error: true,
        value: err.toString()
      }
    }
  },
  wrapped: true
})

export const transforms: Transform[] = [
  Base64DecodeTransform,
  Base64EncodeTransform,
  URIDecodeTransform,
  URIEncodeTransform
]
