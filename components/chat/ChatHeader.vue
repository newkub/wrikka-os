<template>
  <div class="bg-white border-b border-neutral-200 p-3 rounded-t-xl flex items-center gap-4">
    <!-- Model Selector Dropdown -->
    <div class="relative">
      <button
        @click="isModelDropdownOpen = !isModelDropdownOpen"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
      >
        <img 
          v-if="selectedModel.provider === 'anthropic'"
          src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4"
          class="w-5 h-5 rounded"
          alt="Anthropic"
        />
        <img 
          v-else-if="selectedModel.provider === 'groq'"
          src="https://avatars.githubusercontent.com/u/142387426?s=200&v=4"
          class="w-5 h-5 rounded"
          alt="Groq"
        />
        <span class="font-medium">{{ selectedModel.name }}</span>
        <Icon 
          :icon="isModelDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="text-lg text-neutral-500"
        />
      </button>

      <div
        v-if="isModelDropdownOpen"
        class="absolute z-50 w-64 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg"
      >
        <div class="p-2 border-b border-neutral-200">
          <input
            v-model="modelSearch"
            type="text"
            placeholder="Search models..."
            class="w-full p-2 bg-neutral-50 rounded-lg text-sm"
          />
        </div>
        <div class="max-h-64 overflow-y-auto p-2">
          <div v-for="provider in filteredProviders" :key="provider.id" class="mb-2">
            <div class="flex items-center gap-2 p-1">
              <img
                v-if="provider.id === 'anthropic'"
                src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4"
                class="w-5 h-5 rounded"
                alt="Anthropic"
              />
              <img
                v-else-if="provider.id === 'groq'"
                src="https://avatars.githubusercontent.com/u/142387426?s=200&v=4"
                class="w-5 h-5 rounded"
                alt="Groq"
              />
              <span class="text-sm font-medium">{{ provider.name }}</span>
            </div>
            <div class="space-y-1 ml-6">
              <button
                v-for="model in provider.models"
                :key="model.id"
                @click="selectModel(model)"
                class="w-full text-left px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
                :class="selectedModel.id === model.id ? 'bg-neutral-100' : ''"
              >
                {{ model.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History Dropdown -->
    <div class="relative">
      <button
        @click="isHistoryDropdownOpen = !isHistoryDropdownOpen"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
      >
        <Icon icon="mdi:history" class="text-lg" />
        <span class="font-medium">History</span>
        <Icon 
          :icon="isHistoryDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="text-lg text-neutral-500"
        />
      </button>

      <div
        v-if="isHistoryDropdownOpen"
        class="absolute z-50 w-64 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg"
      >
        <div class="p-2 border-b border-neutral-200">
          <input
            v-model="historySearch"
            type="text"
            placeholder="Search conversations..."
            class="w-full p-2 bg-neutral-50 rounded-lg text-sm"
          />
        </div>
        <div class="max-h-64 overflow-y-auto p-2">
          <div v-for="chat in filteredHistory" :key="chat.id" class="mb-2">
            <button
              class="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              @click="selectChat(chat)"
            >
              <div class="flex items-center gap-2 mb-1">
                <Icon :icon="chat.model.icon" class="text-lg" />
                <span class="text-sm font-medium">{{ chat.title }}</span>
              </div>
              <p class="text-xs text-neutral-500 truncate">
                {{ chat.lastMessage }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Presets Dropdown -->
    <div class="relative">
      <button
        @click="isPresetsDropdownOpen = !isPresetsDropdownOpen"
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
      >
        <Icon icon="mdi:bookmark-outline" class="text-lg" />
        <span class="font-medium">Presets</span>
        <Icon 
          :icon="isPresetsDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="text-lg text-neutral-500"
        />
      </button>

      <div
        v-if="isPresetsDropdownOpen"
        class="absolute z-50 w-64 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg"
      >
        <div class="p-2 border-b border-neutral-200">
          <input
            v-model="presetSearch"
            type="text"
            placeholder="Search presets..."
            class="w-full p-2 bg-neutral-50 rounded-lg text-sm"
          />
        </div>
        <div class="max-h-64 overflow-y-auto p-2">
          <div v-for="preset in filteredPresets" :key="preset.id" class="mb-2">
            <button
              class="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              @click="selectPreset(preset)"
            >
              <div class="flex items-center gap-2 mb-1">
                <Icon :icon="preset.icon" class="text-lg" />
                <span class="text-sm font-medium">{{ preset.name }}</span>
              </div>
              <p class="text-xs text-neutral-500 truncate">
                {{ preset.description }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center gap-2 ml-auto">
      <NuxtLink 
        to="/bookmark" 
        class="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
      >
        <Icon icon="mdi:bookmark-outline" class="text-lg" />
      </NuxtLink>
      <button 
        class="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
        @click="handleShare"
        @mouseenter="isHoveringShare = true"
        @mouseleave="isHoveringShare = false"
      >
        <Icon :icon="isHoveringShare ? 'mdi:content-copy' : 'mdi:share'" class="text-lg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

// Model selector state
const isModelDropdownOpen = ref(false)
const modelSearch = ref('')
const selectedModel = ref({
  id: 'groq-1',
  name: 'Groq',
  provider: 'groq',
  icon: 'simple-icons:groq'
})

const providers = [
  {
    id: 'groq',
    name: 'Groq',
    models: [
      { id: 'groq-1', name: 'Groq', provider: 'groq' },
      { id: 'groq-2', name: 'Groq Pro', provider: 'groq' }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: [
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'anthropic' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic' }
    ]
  }
]

const filteredProviders = computed(() => {
  if (!modelSearch.value) return providers
  return providers.map(provider => ({
    ...provider,
    models: provider.models.filter(model =>
      model.name.toLowerCase().includes(modelSearch.value.toLowerCase())
    )
  })).filter(provider => provider.models.length > 0)
})

// History dropdown state
const isHistoryDropdownOpen = ref(false)
const historySearch = ref('')
const chatHistory = [
  {
    id: 1,
    title: 'Project Planning',
    lastMessage: 'Let\'s break down the tasks for the new feature...',
    model: { icon: 'simple-icons:groq' }
  },
  {
    id: 2,
    title: 'Code Review',
    lastMessage: 'Here\'s my analysis of the pull request...',
    model: { icon: 'simple-icons:anthropic' }
  }
]

// Presets dropdown state
const isPresetsDropdownOpen = ref(false)
const presetSearch = ref('')
const presets = [
  {
    id: 1,
    name: 'Code Review',
    description: 'Review code for best practices and potential issues',
    icon: 'mdi:code-braces'
  },
  {
    id: 2,
    name: 'Writing Assistant',
    description: 'Help with writing and editing content',
    icon: 'mdi:pencil'
  },
  {
    id: 3,
    name: 'Technical Expert',
    description: 'Detailed technical explanations and problem-solving',
    icon: 'mdi:tools'
  }
]

// Share button state
const isHoveringShare = ref(false)

const filteredHistory = computed(() => {
  if (!historySearch.value) return chatHistory
  return chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(historySearch.value.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(historySearch.value.toLowerCase())
  )
})

const filteredPresets = computed(() => {
  if (!presetSearch.value) return presets
  return presets.filter(preset =>
    preset.name.toLowerCase().includes(presetSearch.value.toLowerCase()) ||
    preset.description.toLowerCase().includes(presetSearch.value.toLowerCase())
  )
})

// Event handlers
const selectModel = (model: any) => {
  selectedModel.value = model
  isModelDropdownOpen.value = false
}

const selectChat = (chat: any) => {
  emit('select-chat', chat)
  isHistoryDropdownOpen.value = false
}

const selectPreset = (preset: any) => {
  // Handle preset selection
  isPresetsDropdownOpen.value = false
}

const handleShare = () => {
  // Copy conversation to clipboard
  // This is a mock implementation
  navigator.clipboard.writeText('Conversation copied to clipboard')
    .then(() => {
      alert('Conversation copied to clipboard!')
    })
    .catch(err => {
      console.error('Failed to copy:', err)
    })
}

// Close dropdowns when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      isModelDropdownOpen.value = false
      isHistoryDropdownOpen.value = false
      isPresetsDropdownOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

const emit = defineEmits<{
  'select-chat': [chat: any]
}>()
</script>

<style scoped>
.max-h-64 {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.max-h-64::-webkit-scrollbar {
  width: 4px;
}

.max-h-64::-webkit-scrollbar-track {
  background: transparent;
}

.max-h-64::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}
</style>