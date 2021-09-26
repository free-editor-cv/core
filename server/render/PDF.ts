abstract class PDFNode {
  id = (Math.random() * 1000).toFixed(0)
  parent?: string
  children: string[] = []
  styles: Record<string, string>
  constructor() {
    this.styles = {}
  }
}

export abstract class PDFElement extends PDFNode {}

export class PDFTextNode extends PDFNode {
  text: string
  constructor(value: string) {
    super()
    this.text = value
  }
}

export class PDFDocumentElement extends PDFElement {}

export class PDFPageElement extends PDFElement {}

export class PDFViewElement extends PDFElement {}

export class PDFTextElement extends PDFElement {}

export type PDFNodes = PDFNode
export type PDFElements = PDFDocumentElement | PDFViewElement | PDFTextElement
