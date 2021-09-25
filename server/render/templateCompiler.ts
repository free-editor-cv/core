import { compile, defineComponent, h } from 'vue'

const Document = definePDFComponent('Document')
const View = definePDFComponent('View')
const Text = definePDFComponent('Text')

export default function compileTemplateToApp(template: string) {
  return defineComponent({
    name: 'compiled-template',
    components: { Text, View },
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
