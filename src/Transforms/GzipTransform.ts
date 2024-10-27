import { Transform } from "./Transform"

const decompressGzip = async (base64: string) => {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++)
    byteNumbers[i] = byteCharacters.charCodeAt(i)

  const decompressedStream =
    new Blob([new Uint8Array(byteNumbers)])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"))

  return await new Response(decompressedStream).text()
}

export const GzipDecompressTransform: Transform = {
  name: 'gzipd',
  
  fn: (v) => decompressGzip(v)
}

