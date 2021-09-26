<template>
  <Layout>
    <template #cockpit>
      <Cockpit
        :builder="builder"
        :activePage="activePage"
        @add-page="activePage = $event"
      >
        <button @click="handle_generatePDF">Generate PDF</button>
        <button @click="handle_openPDF" :disabled="!fileUrl">Open PDF</button>
      </Cockpit>
    </template>
    <template #preview>
      <Preview
        :activePage="activePage"
        :builder="builder"
        @pagination:change="activePage = $event"
      />
    </template>
  </Layout>

  <!-- <FreeEditorCV /> -->
</template>

<script lang="ts">
import FreeEditorCV from './components/FreeEditorCV.vue'
import Layout from './components/Layout.vue'
import Cockpit from './components/Cockpit/Cockpit.vue'
import Preview from './components/Preview/Preview.vue'

import { defineComponent, ref } from 'vue'

import TreeBuilder from './visualizer/Builder'
import Tree from './visualizer/Tree'
import generateTemplate from './visualizer/Generator'

export default defineComponent({
  name: 'app',
  components: { FreeEditorCV, Layout, Cockpit, Preview },
  setup() {
    const builder = TreeBuilder.init()
    const activePage = ref(0)
    const fileUrl = ref(null)

    return {
      activePage,
      builder,
      fileUrl,
      handle_generatePDF,
      handle_openPDF,
    }

    function handle_generatePDF() {
      const template = generateTemplate(builder.tree as Tree)

      const body = JSON.stringify({
        filename: 'test',
        template,
      })

      fetch('http://127.0.0.1:8080/write', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      })
        .then(res => res.json())
        .then(res => {
          const { template, fileReference } = res.data
          fileUrl.value = fileReference
        })
    }

    function handle_openPDF() {
      if (fileUrl.value == null) return
      window.open(
        `http://127.0.0.1:8080/read?filename=${fileUrl.value}`,
        '_blank'
      )
    }
  },
})
</script>

<style>
* {
  margin: unset;
  padding: unset;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
