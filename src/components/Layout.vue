<template>
  <div class="full-height">
    <aside class="full-height">
      <slot name="cockpit"></slot>
    </aside>
    <main class="full-height">
      <slot name="preview"></slot>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'layout',
})
</script>

<style scoped>
div {
  display: flex;
  width: 100%;
}

aside {
  width: 30%;
  background-color: rgb(236, 243, 242);
}

main {
  width: 70%;
  background-color: rgb(255, 253, 250);
}

.full-height {
  height: 100%;
}
</style>
