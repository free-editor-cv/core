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
        :name="label + '-name'"
        :value="value"
        @input="$emit('value:change', $event.target.value)"
        :disabled="disabled"
      />
      <select
        :name="label + '-color'"
        v-model="selectedColor"
        @change="
          $emit('value-option:change', { key: 'color', value: selectedColor })
        "
      >
        <option v-for="color in colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <!-- <select name="text-selection-tag" v-model="selectedTag" @change="$emit()">
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select> -->
    </div>
  </AbstractSection>
</template>

<script>
import { defineComponent, ref } from 'vue'
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
    'value-option:change',
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
  inheritAttrs: true,
  setup() {
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']
    const selectedTag = ref('p')

    const colors = ['red', 'pink', 'black', 'yellow']
    const selectedColor = ref('black')

    return {
      tags,
      selectedTag,
      colors,
      selectedColor,
    }
  },
})
</script>

<style scoped>
.row {
  display: flex;
}
</style>
