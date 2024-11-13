<template>
  <nav class="flex items-center justify-between bg-white rounded-lg border border-neutral-200 p-1">
    <button
      v-for="item in navItems"
      :key="item.id"
      class="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors text-sm"
      :class="{ 'text-primary-600': item.id === activeItem }"
      @click="$emit('select', item.id)"
    >
      <template v-if="item.id === 'file' && hasImage">
        <Icon icon="mdi:image" class="text-lg" />
      </template>
      <template v-else>
        <Icon :icon="item.icon" class="text-lg" />
      </template>
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  activeItem: string
  hasImage?: boolean
}>()

defineEmits<{
  select: [id: string]
}>()

const navItems = [
  { id: 'file', label: 'File', icon: 'mdi:file-outline' },
  { id: 'screenshot', label: 'Screenshot', icon: 'mdi:camera' },
  { id: 'prompt', label: 'Prompt', icon: 'mdi:lightbulb' },
  { id: 'search', label: 'Search', icon: 'mdi:magnify' },
  { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
]
</script>