import PDFDocument from 'pdfkit'
import fs from 'fs'
import {
  PDFNodes,
  PDFElements,
  PDFElement,
  PDFTextNode,
  PDFDocumentElement,
} from './PDF'
import { NodeMap } from './nodeOps'
import { createPDFFilename } from '../utils/formatter'

interface IPDFWriter {
  filename: string
  nodeMap: NodeMap
}
export default function createPDFWriter({ filename, nodeMap }: IPDFWriter) {
  const pdf = new PDFDocument()

  const formattedFilename = createPDFFilename(filename)

  const streamPath = './tmp/' + formattedFilename

  const stream = pdf.pipe(fs.createWriteStream(streamPath))
  stream.on('finish', () => {
    console.info(`[write] Finished writing operation to ${formattedFilename}`)
  })

  function walk(nodeMap: NodeMap, node: PDFNodes | PDFElements): void {
    if (node instanceof PDFElement) {
      for (const childId of node.children) {
        draw(nodeMap, nodeMap[childId])
        walk(nodeMap, nodeMap[childId])
      }
    }
  }

  function draw(nodeMap: NodeMap, node: PDFNodes | PDFElements): void {
    const color = node.styles.color || getParentStyle(nodeMap, 'color', node)
    pdf.fill(color)

    if (node instanceof PDFTextNode) {
      pdf.text(node.text)
    }
  }

  const defaultStyles: Record<string, string> = {
    color: 'black',
  }
  function getParentStyle(
    nodeMap: NodeMap,
    attr: string,
    parent: PDFNodes | PDFElements
  ): string {
    if (parent instanceof PDFDocumentElement) {
      return defaultStyles[attr]
    }

    if (attr in parent.styles) {
      return parent.styles[attr]
    }

    return getParentStyle(nodeMap, attr, nodeMap[parent.parent as string])
  }

  return {
    write() {
      walk(nodeMap, nodeMap['root'])
      pdf.end()
      startDeleteAfter10Mins()
      return formattedFilename
    },
  }

  function startDeleteAfter10Mins() {}
}
