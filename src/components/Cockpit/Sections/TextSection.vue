<template>
  <AbstractSection
    :label="label"
    @save="$emit('section:save')"
    @cancel="$emit('section:cancel')"
    @tweak="$emit('section:tweak')"
    @remove="$emit('section:remove')"
    :disabled="disabled"
  >
    <div class="row">
      <input
        type="text"
        :name="label"
        :value="value"
        @input="$emit('value:change', $event.target.value)"
        :disabled="disabled"
      />
      <!-- <select name="text-selection-tag" v-model="selectedTag" @change="$emit()">
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select> -->
    </div>
  </AbstractSection>
</template>

<script>
import { defineComponent, ref, toRef, toRefs } from 'vue'
import AbstractSection from './AbstractSection.vue'

export default defineComponent({
  name: 'preview-text-section',
  components: { AbstractSection },
  emits: [
    'section:save',
    'section:cancel',
    'section:tweak',
    'section:remove',
    'value:change',
  ],
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']
    const selectedTag = ref('h1')

    return {
      tags,
      selectedTag,
    }
  },
})
</script>

<style scoped>
.row {
  display: flex;
}
</style>
