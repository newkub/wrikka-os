<template>
  <nav class="w-64 bg-white border-r border-neutral-200 h-[calc(100vh-2rem)] overflow-y-auto sticky top-0">
    <div class="p-4">
      <!-- General Settings -->
      <div class="mb-6">
        <h3 class="text-neutral-500 text-sm font-medium mb-2">General</h3>
        <div class="space-y-1">
          <button
            v-for="item in generalSettings"
            :key="item.id"
            @click="$emit('select', item.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            :class="selectedSection === item.id ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'"
          >
            <Icon :icon="item.icon" class="text-lg" />
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- AI Settings -->
      <div>
        <h3 class="text-neutral-500 text-sm font-medium mb-2">AI</h3>
        <div class="space-y-1">
          <button
            v-for="item in aiSettings"
            :key="item.id"
            @click="$emit('select', item.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            :class="selectedSection === item.id ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'"
          >
            <Icon :icon="item.icon" class="text-lg" />
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  selectedSection: string
}>()

defineEmits<{
  select: [section: string]
}>()

const generalSettings = [
  { id: 'appearance', label: 'Appearance', icon: 'mdi:palette' },
  { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts', icon: 'mdi:keyboard' },
  { id: 'voice-input', label: 'Voice Input', icon: 'mdi:microphone' }
]

const aiSettings = [
  { id: 'models', label: 'Models', icon: 'mdi:robot' },
  { id: 'extensions', label: 'Extensions', icon: 'mdi:puzzle' },
  { id: 'api-keys', label: 'API Keys', icon: 'mdi:key' }
]
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB #F9FAFB;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #F9FAFB;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 3px;
}
</style>