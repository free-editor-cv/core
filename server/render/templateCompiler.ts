import { compile, Component, defineComponent, h } from 'vue'

const list = ['Document', 'Page', 'View', 'Text']

interface Components {
  [name: string]: Component
}

const components = list.reduce((acc, cur) => {
  acc[cur] = definePDFComponent(cur)
  return acc
}, {} as Components)

export default function compileTemplateToApp(template: string) {
  return defineComponent({
    name: 'compiled-template',
    components,
    render: compile(template),
  })
}

function definePDFComponent(tag: string) {
  return defineComponent({
    name: tag,
    render() {
      return h(tag, this.$attrs, this.$slots?.default?.())
    },
  })
}
