<template>
  <div>
    <button
      @click="$emit('change', activePage - 1)"
      :disabled="activePage === 0"
    >
      previous
    </button>
    <span>{{ activePage }}</span>
    <button
      @click="$emit('change', activePage + 1)"
      :disabled="activePage === pagesAmount - 1"
    >
      next
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'preview-pagination',
  emits: ['change'],
  props: {
    activePage: {
      type: Number,
      required: true,
    },
    pagesAmount: {
      type: Number,
      required: true,
    },
  },
})
</script>

<style scoped>
div {
  height: 5%;
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
