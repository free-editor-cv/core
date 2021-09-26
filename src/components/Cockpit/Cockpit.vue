<template>
  <div class="cockpit">
    <div class="adders">
      <label for="section-label">Section label:</label>
      <br />
      <input type="text" name="section-label" v-model="newSection.label" />
      <br />
      <label for="section-component">Section type:</label>
      <select name="section-component" v-model="newSection.component">
        <option value="Text">Text</option>
      </select>
      <br />
      <button @click="handle_createSection" :disabled="activeIndex !== null">
        create
      </button>
    </div>

    <div class="sections">
      <div v-for="(section, index) in sections" :key="section.id">
        <component
          :is="section.component"
          :value="section.value"
          :label="section.label"
          :disabled="index !== activeIndex"
          @value:change="handle_editSection"
          @value-style:change="handle_valueStyleChange"
          @section:cancel="handle_cancelSection"
          @section:save="activeIndex = null"
          @section:tweak="activeIndex = index"
          @section:remove="handle_removeSection(index)"
        />
      </div>
    </div>

    <hr />
    <div class="buttons">
      <slot></slot>
    </div>
    <!-- <button @click="handle_addPage">add page</button> -->
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import TreeBuilder from '../../visualizer/Builder'

import TextSection from './Sections/TextSection.vue'

export default defineComponent({
  name: 'cockpit',
  components: { Text: TextSection },
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
  emits: ['add-page'],
  setup(props) {
    const { activePage, builder } = toRefs(props)
    const sections = reactive([])
    const activeIndex = ref(null)
    const activeSection = computed(() => sections[activeIndex.value])

    const newSection = reactive({
      label: 'section label',
      component: 'Text',
      options: {},
    })

    return {
      sections,
      activeIndex,
      newSection,
      handle_createSection,
      handle_cancelSection,
      handle_editSection,
      handle_removeSection,
      handle_valueStyleChange,
      // handle_addPage,
    }

    function handle_valueStyleChange({ key, value }) {
      const sectionId = activeSection.value.id

      if (!builder.value.patchSection(activePage.value, sectionId, key, value))
        return
    }

    function handle_createSection() {
      if (activeIndex.value !== null) return

      // init Section in builder
      const compilerTag = newSection.component.split('-')[0]
      const sectionId = builder.value.initSection(
        activePage.value,
        compilerTag,
        {
          tag: 'p', // received it from TextSection,
          styles: {
            color: 'black',
          },
        }
      )

      // sync the UI
      sections.push({
        id: sectionId,
        component: newSection.component,
        label: newSection.label,
        value: '',
      })

      // activate newly crated section
      activeIndex.value = sections.length - 1

      // reset newSection
      newSection.label = 'section label'
      newSection.component = 'Text'
      newSection.options = {}
    }

    function handle_cancelSection() {
      // retrieve section id
      const sectionId = activeSection.value.id

      // find and remove from builder
      if (!builder.value.removeSection(activePage.value, sectionId)) return // not found

      // remove section from UI
      sections.splice(activeIndex.value, 1)

      activeIndex.value = null
    }

    function handle_editSection(input) {
      const sectionId = activeSection.value.id

      activeSection.value.value = input

      builder.value.editSection(activePage.value, sectionId, input)
    }

    function handle_removeSection(sectionIndex) {
      const sectionId = sections[sectionIndex].id

      if (!builder.value.removeSection(activePage.value, sectionId)) return // not found

      sections.splice(activeIndex.value, 1)

      activeIndex.value = null
    }
  },
})
</script>

<style scoped>
.cockpit {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.adders {
  height: 100px;
}

.sections {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.buttons {
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 50px;
}
</style>
