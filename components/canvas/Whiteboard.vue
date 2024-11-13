<template>
  <div class="h-full">
    <TldrawEditor :store="store" :components="components">
      <template #main="{ app }">
        <div class="tldraw__editor">
          <TldrawUi app={app} />
        </div>
      </template>
    </TldrawEditor>
  </div>
</template>

<script setup lang="ts">
import { TldrawEditor, TldrawUi, createTldrawUiComponents, useEditor } from '@tldraw/vue'
import { computed } from 'vue'
import { createTLStore } from '@tldraw/tldraw'

// Create store
const store = createTLStore()

// Create components
const components = createTldrawUiComponents()

// Use editor
const { editor } = useEditor()

// Watch for changes
watch(() => editor.value?.store.getSnapshot(), (snapshot) => {
  if (snapshot) {
    // Handle changes in the editor
    console.log('Editor content changed:', snapshot)
  }
}, { deep: true })
</script>

<style>
.tldraw__editor {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>