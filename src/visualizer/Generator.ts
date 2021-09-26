import { Tree, TreeText } from '.'

export default function generateTemplate(tree: Tree): string {
  let template = ''

  const { pages } = tree

  pages.forEach(({ elements }) => {
    elements.forEach(element => {
      if (element instanceof TreeText) {
        console.log(element)
        if (!element.hasStyle) {
          template += wrapTextNoStyle(element.value)
        } else {
          template += wrapTextWithStyle(element.styles)(element.value)
        }
      }
    })
  })

  console.log(template)

  return template
}

const wrapTextNoStyle = wrapWithElement('Text')()
const wrapTextWithStyle = wrapWithElement('Text')

function wrapWithElement(tag: 'Text' | 'View') {
  return function addStyleToElement(styles?: any) {
    return function addContentToElement(value: string) {
      return `<${tag} ${
        styles ? `:styles="${serialize(styles)}"` : ''
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
