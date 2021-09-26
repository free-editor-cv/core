import PDFDocument from 'pdfkit'
import fs from 'fs'
import {
  PDFNodes,
  PDFElements,
  PDFElement,
  PDFTextNode,
  PDFDocumentElement,
  PDFPageElement,
} from './PDF'
import { NodeMap } from './nodeOps'
import { createPDFFilename } from '../utils/formatter'

interface IPDFWriter {
  filename: string
  nodeMap: NodeMap
  outputDir?: string
}
export default function createPDFWriter({
  filename,
  nodeMap,
  outputDir = './tmp/',
}: IPDFWriter) {
  const pdf = new PDFDocument()

  const formattedFilename = createPDFFilename(filename)

  const streamPath = outputDir + formattedFilename

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
    if (node instanceof PDFPageElement) pdf.addPage()

    if (node instanceof PDFTextNode) {
      const nodeWriter = new TextNodeWriter(pdf, node, nodeMap)!
        .writeColor()!
        .writeFontSize()!

      nodeWriter.save()
    }
  }

  return {
    write() {
      walk(nodeMap, nodeMap['root'])
      pdf.end()
      return formattedFilename
    },
  }
}

class TextNodeWriter {
  constructor(
    private pdf: PDFKit.PDFDocument,
    private node: PDFTextNode,
    private nodeMap: NodeMap
  ) {}

  writeColor() {
    const color =
      this.node.styles.color ||
      this.getParentStyle(this.nodeMap, 'color', this.node)
    this.pdf.fill(color)
    return this
  }

  writeFontSize() {
    const fontSize = this.getParentStyle(this.nodeMap, 'fontSize', this.node)
    if (fontSize) {
      const int_fontSize = parseInt(fontSize.substr(0, fontSize.length - 2))
      this.pdf.fontSize(int_fontSize)
      return this
    }
  }

  save() {
    this.pdf.text(this.node.text)
  }

  static defaultStyles: Record<string, string> = {
    color: 'black',
  }
  private getParentStyle(
    nodeMap: NodeMap,
    attr: string,
    parent: PDFNodes | PDFElements
  ): string {
    if (parent instanceof PDFDocumentElement) {
      return TextNodeWriter.defaultStyles[attr]
    }

    if (attr in parent.styles) {
      return parent.styles[attr]
    }

    return this.getParentStyle(nodeMap, attr, nodeMap[parent.parent as string])
  }
}
