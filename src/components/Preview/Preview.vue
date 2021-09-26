<template>
  <div class="preview">
    <Page
      v-for="page in pages"
      :key="page.index"
      v-show="activePage === page.index"
      :page-elements="pageElements"
    />
    <Pagination
      :activePage="activePage"
      :pagesAmount="visualizer.pages.length"
      @change="$emit('pagination:change', $event)"
    />
  </div>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue'

import Visualizer from '../../visualizer'
import Pagination from './Pagination.vue'
import Page from './Page.vue'

export default defineComponent({
  name: 'preview',
  components: { Pagination, Page },
  emits: ['pagination:change'],
  props: {
    activePage: {
      type: Number,
      required: true,
    },
    visualizer: {
      type: Visualizer,
      required: true,
    },
  },
  setup(props) {
    const { activePage, visualizer } = toRefs(props)

    const pageElements = computed(
      () => visualizer.value.pages[activePage.value].elements
    )

    return {
      activePage,
      pageElements,
      pages: visualizer.value.pages,
    }
  },
})
</script>

<style scoped>
.preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
