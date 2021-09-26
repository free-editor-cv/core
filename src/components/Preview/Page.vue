<template>
  <article>
    <div v-for="content in pageElements" :key="content.value">
      <component :is="content.tag">{{ content.value }}</component>
    </div>
  </article>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'preview-page',
  props: {
    pageElements: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style scoped>
article {
  background-color: white;
  border: 1px solid black;
  width: 35%;
  height: 70%;
  display: block;
  padding: 10px;
}

div {
  display: block;
  text-align: start;
}
</style>
