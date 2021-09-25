<template>
  <h1>Free Editor CV</h1>
  <textarea
    name="template"
    id="template"
    cols="30"
    rows="10"
    v-model="textarea"
  ></textarea>
  <br />
  <button @click="handleGenerate">Generate</button>
  <button @click="handleOpen" :disabled="!fileUrl">Open</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'free-editor-cv',
  setup() {
    const textarea = ref('<Text>Ciao</Text>')
    const fileUrl = ref(null)

    return { textarea, fileUrl, handleGenerate, handleOpen }

    function handleGenerate() {
      if (textarea.value == null || textarea.value === '') return
      console.log(textarea.value)

      const body = JSON.stringify({
        filename: 'test',
        template: textarea.value,
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

    function handleOpen() {
      if (fileUrl.value == null) return
      window.open(
        `http://127.0.0.1:8080/read?filename=${fileUrl.value}`,
        '_blank'
      )
    }
  },
})
</script>

<style scoped></style>
