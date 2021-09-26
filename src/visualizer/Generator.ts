import Tree from './Tree'
import { TreeText } from './TreeElement'

export default function generateTemplate(tree: Tree): string {
  let template = ''

  const { pages } = tree

  pages.forEach(({ elements }) => {
    elements.forEach(element => {
      if (element instanceof TreeText) {
        if (!element.hasStyle) {
          template += wrapTextNoStyle(element.value)
        } else {
          template += wrapTextWithStyle(element.styles)(element.value)
        }
      }
    })
  })

  console.info('template', template)

  return template
}

const wrapTextNoStyle = wrapWithElement('Text')()
const wrapTextWithStyle = wrapWithElement('Text')

function wrapWithElement(tag: 'Text' | 'View') {
  return function addStyleToElement(styles?: any) {
    return function addContentToElement(value: string) {
      const serializedStyles = serialize(styles)

      console.info('serializedStyles', serializedStyles)

      return `<${tag} ${
        styles ? `:styles="${serializedStyles}"` : ''
      }>${value}</${tag}>`
    }
  }
}

function serialize(obj: Object) {
  const entries = Object.entries(obj)
  return (
    '{' +
    entries.reduce((acc, [key, value], index) => {
      acc += `${key}: '${value}'`
      if (index < entries.length - 1) acc += ', '
      return acc
    }, '') +
    '}'
  )
}
