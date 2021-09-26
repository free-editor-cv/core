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
      :pagesAmount="builder.pages.length"
      @change="$emit('pagination:change', $event)"
    />
  </div>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue'

import TreeBuilder from '../../visualizer/Builder'
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
    builder: {
      type: TreeBuilder,
      required: true,
    },
  },
  setup(props) {
    const { activePage, builder } = toRefs(props)

    const pageElements = computed(
      () => builder.value.pages[activePage.value].elements
    )

    return {
      activePage,
      pageElements,
      pages: builder.value.pages,
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
