import { Tree, TreeText } from '.'

export default function generateTemplate(tree: Tree): string {
  let template = ''

  const { pages } = tree

  pages.forEach(({ elements }) => {
    elements.forEach(element => {
      if (element instanceof TreeText) {
        template += wrapTextNoStyle(element.value)
      }
    })
  })

  return template
}

const wrapTextNoStyle = wrapWithElement('Text')()

function wrapWithElement(tag: 'Text' | 'View') {
  return function addStyleToElement(style?: any) {
    return function addContentToElement(value: string) {
      return `<${tag}>${value}</${tag}>`
    }
  }
}
