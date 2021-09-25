import { RendererOptions } from 'vue'
import {
  PDFDocumentElement,
  PDFTextElement,
  PDFTextNode,
  PDFViewElement,
  PDFNodes,
  PDFElements,
} from './PDF'

export type NodeMap = Record<string, PDFNodes | PDFElements>

export default function initNodeParser() {
  const nodeMap: NodeMap = {}

  const nodeOps = createNodeOps(nodeMap)

  const root = new PDFDocumentElement()

  return {
    nodeMap,
    root,
    nodeOps,
  }
}

function createNodeOps(nodeMap: NodeMap) {
  const nodeOps: RendererOptions<PDFNodes, PDFElements> = {
    patchProp(el, key, prevVal, nextVal) {
      if (key === 'styles') {
        el.styles = { ...el.styles, ...nextVal }
      }
    },

    insert(child, parent) {
      if (parent instanceof PDFDocumentElement) {
        parent.id = 'root'
        nodeMap['root'] = parent
      }

      if (!(child.id in nodeMap)) {
        nodeMap[child.id] = child
      }

      parent.children.push(child.id)
      child.parent = parent.id
    },

    createElement(tag) {
      switch (tag) {
        case 'View':
          return new PDFViewElement()
        case 'Text':
          return new PDFTextElement()
        default:
          throw new Error(`Illegal tag ${tag}`)
      }
    },

    createText(text) {
      return new PDFTextNode(text)
    },

    parentNode: () => noop('parentNode'),
    remove: () => noop('remove'),
    createComment: () => noop('createComment'),
    setText: () => noop('setText'),
    setElementText: () => noop('setElementText'),
    nextSibling: () => noop('nextSibling'),
  }

  function noop(fn: string): any {
    throw new Error(`no-op ${fn}`)
  }

  return nodeOps
}
