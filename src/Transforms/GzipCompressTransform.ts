// GzipCompressTransform.ts
import { Transform } from "./Transform"

/**
 * Compresses a string using Gzip and encodes the result in Base64.
 * @param input - The input string to compress.
 * @returns A promise that resolves to the Base64-encoded compressed string.
 */
const compressGzip = async (input: string): Promise<string> => {
  // Check if CompressionStream is supported
  if (typeof CompressionStream === "undefined") {
    throw new Error("CompressionStream API is not supported in this environment.")
  }

  // Encode the input string to a Uint8Array
  const encoder = new TextEncoder()
  const encoded = encoder.encode(input)

  // Create a ReadableStream from the encoded data
  const readable = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoded)
      controller.close()
    }
  })

  // Create a CompressionStream for Gzip
  const compressionStream = new CompressionStream("gzip")

  // Pipe the readable stream through the compression stream
  const compressedStream = readable.pipeThrough(compressionStream)

  // Collect the compressed chunks
  const reader = compressedStream.getReader()
  const chunks: Uint8Array[] = []
  let done = false

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    if (value) {
      chunks.push(value)
    }
    done = doneReading
  }

  // Concatenate all chunks into a single Uint8Array
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const compressedData = new Uint8Array(totalLength)
  let offset = 0
  for (const chunk of chunks) {
    compressedData.set(chunk, offset)
    offset += chunk.length
  }

  // Convert the compressed data to a Base64 string
  const base64String = arrayBufferToBase64(compressedData)

  return base64String
}

/**
 * Converts a Uint8Array to a Base64-encoded string.
 * @param buffer - The Uint8Array to convert.
 * @returns The Base64-encoded string.
 */
const arrayBufferToBase64 = (buffer: Uint8Array): string => {
  let binary = ""
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i])
  }
  return btoa(binary)
}

export const GzipCompressTransform: Transform = {
  name: 'gzipc', // Unique identifier for the transform

  fn: (v: string) => compressGzip(v),

  options: [] // Add any options if needed
}
