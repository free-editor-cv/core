<template>
  <div>
    <label :for="label">{{ label }}</label>
    <slot></slot>
    <span v-if="!disabled">
      <button @click="$emit('cancel')">Cancel</button>
      <button @click="$emit('save')">Save</button>
    </span>
    <span v-else>
      <button @click="$emit('remove')">Remove</button>
      <button @click="$emit('tweak')">Tweak</button>
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'abstract-section',
  emits: ['cancel', 'save', 'tweak', 'remove'],
  props: {
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}

span {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
