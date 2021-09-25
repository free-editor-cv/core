import { createUid } from './uid'

export function createPDFFilename(filename: string) {
  const date = new Date().toISOString()
  const id = createUid()
  return `__${filename}_${date}_${id}__.pdf`
}
