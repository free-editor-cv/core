import { createRenderer } from 'vue'
import initNodeParser from './nodeOps'
import compileTemplateToApp from './templateCompiler'

export default function buildNodeMap(template: string) {
  const App = compileTemplateToApp(template)
  const { root, nodeOps, nodeMap } = initNodeParser()

  const { createApp } = createRenderer(nodeOps)
  const app = createApp(App)
  const vm = app.mount(root)

  return nodeMap
}
