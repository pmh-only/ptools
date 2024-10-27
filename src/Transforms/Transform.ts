import { Base64DecodeTransform, Base64EncodeTransform } from "./Base64Transforms"
import { GzipDecompressTransform } from "./GzipTransform"
import { JSONBeautifyTransform, JSONEscapeTransform, JSONSimplifyTransform, JSONUnescapeTransform } from "./JSONTransforms"
import { RegexpTransform } from "./RegexpTransform"
import { URIDecodeTransform, URIEncodeTransform } from "./URITransforms"
import { JSON2YAMLTransform, YAML2JSONTransform } from "./YAMLTransforms"

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

export interface TransformIntboxOption {
  type: 'INTBOX',
  key: string,
  label?: string,
  value?: number
}

export type TransformOption = 
  TransformCheckboxOption | TransformTextboxOption | TransformIntboxOption

export const isTransformCheckboxOption = (object: any): object is TransformCheckboxOption =>
  object.type === 'CHECKBOX'

export const isTransformTextboxOption = (object: any): object is TransformTextboxOption =>
  object.type === 'TEXTBOX'

export const isTransformIntboxOption = (object: any): object is TransformIntboxOption =>
  object.type === 'INTBOX'

export interface Transform {
  name: string
  fn: (value: string, options: Map<string, TransformOption>) => Promise<string>
  options?: TransformOption[]
}

export interface WrappedTransformResult {
  error: boolean
  value: string
}

export interface WrappedTransform extends Omit<Transform, 'fn' | 'options'> {
  wrapped: true,

  fn: (value: string, options: Map<string, TransformOption>) =>
    Promise<WrappedTransformResult>,

  options: Map<string, TransformOption>
}

export const wrapTransform = (transform: Transform): WrappedTransform => ({
  ...transform,

  fn: async (...args) =>
    await transform.fn(...args)
      .then((value) =>
        ({ error: false, value: value.toString() }))
      .catch((error) =>
        ({ error: true, value: error.toString() })),

  options: new Map<string, TransformOption>(
    (transform.options ?? []).map((v) => [v.key, v])
  ),
  wrapped: true
})

export const transforms: Transform[] = [
  RegexpTransform,
  GzipDecompressTransform,
  Base64DecodeTransform,
  Base64EncodeTransform,
  URIDecodeTransform,
  URIEncodeTransform,
  JSONBeautifyTransform,
  JSONSimplifyTransform,
  JSONEscapeTransform,
  JSONUnescapeTransform,
  JSON2YAMLTransform,
  YAML2JSONTransform
]
