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
          $emit('value-style:change', { key: 'color', value: selectedColor })
        "
      >
        <option v-for="color in colors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
      <select
        :name="label + '-font-size'"
        v-model="selectedFontSize"
        @change="
          $emit('value-style:change', {
            key: 'fontSize',
            value: selectedFontSize + 'px',
          })
        "
      >
        <option v-for="fontSize in fontSizes" :key="fontSize" :value="fontSize">
          {{ fontSize }}
        </option>
      </select>
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
    'value-style:change',
    'value-tag:change',
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
    const fontSizes = Array.from(Array(72).keys())
    const selectedFontSize = ref(18)

    const colors = ['red', 'pink', 'black', 'blue']
    const selectedColor = ref('black')

    return {
      fontSizes,
      selectedFontSize,
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
