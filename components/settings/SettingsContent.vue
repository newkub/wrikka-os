<template>
  <div class="flex-1 min-h-[calc(100vh-2rem)] overflow-y-auto bg-white">
    <div class="max-w-4xl mx-auto p-8">
      <!-- Section Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-2">{{ sectionTitle }}</h1>
        <p class="text-neutral-600">{{ sectionDescription }}</p>
      </div>

      <!-- Section Content -->
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppearanceSettings from './sections/AppearanceSettings.vue'
import KeyboardShortcuts from './sections/KeyboardShortcuts.vue'
import ApiKeys from './sections/ApiKeys.vue'
import ModelsSettings from './sections/ModelsSettings.vue'

const props = defineProps<{
  section: string
}>()

const sectionInfo = {
  appearance: {
    title: 'Appearance',
    description: 'Customize the application look and feel',
    component: AppearanceSettings
  },
  'keyboard-shortcuts': {
    title: 'Keyboard Shortcuts',
    description: 'Configure keyboard shortcuts for quick access',
    component: KeyboardShortcuts
  },
  'api-keys': {
    title: 'API Keys',
    description: 'Manage your API keys for different providers',
    component: ApiKeys
  },
  models: {
    title: 'Models',
    description: 'Configure and manage AI models',
    component: ModelsSettings
  }
}

const currentComponent = computed(() => 
  sectionInfo[props.section as keyof typeof sectionInfo]?.component
)

const sectionTitle = computed(() => 
  sectionInfo[props.section as keyof typeof sectionInfo]?.title ?? props.section
)

const sectionDescription = computed(() => 
  sectionInfo[props.section as keyof typeof sectionInfo]?.description ?? 
  `Configure settings for ${props.section}`
)
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