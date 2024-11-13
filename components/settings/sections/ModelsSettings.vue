<template>
  <div class="space-y-6">
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Available Models</h2>
        <button class="btn-primary">
          <Icon icon="mdi:plus" class="text-lg" />
          Add Model
        </button>
      </div>
      
      <div class="space-y-4">
        <div v-for="provider in providers" :key="provider.id" 
          class="p-4 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <img v-if="provider.id === 'anthropic'" 
                src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4"
                class="w-8 h-8 rounded"
                alt="Anthropic"
              />
              <Icon v-else-if="provider.id === 'openai'"
                icon="simple-icons:openai"
                class="w-8 h-8"
              />
              <h3 class="font-medium">{{ provider.name }}</h3>
            </div>
            <button class="text-neutral-500 hover:text-neutral-700">
              <Icon icon="mdi:dots-vertical" class="text-xl" />
            </button>
          </div>
          
          <div class="space-y-2">
            <div v-for="model in provider.models" :key="model.id"
              class="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg">
              <span>{{ model.name }}</span>
              <BaseToggle
                :model-value="model.enabled"
                @update:model-value="model.enabled = $event"
                :label="''"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const providers = reactive([
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: [
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', enabled: true },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', enabled: true },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', enabled: true }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { id: 'gpt-4', name: 'GPT-4', enabled: true },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', enabled: true },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', enabled: true }
    ]
  }
])
</script>