<template>
  <div class="space-y-6">
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">API Keys</h2>
      <div class="space-y-4">
        <div v-for="provider in providers" :key="provider.id" 
          class="p-4 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center gap-3 mb-3">
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
          
          <div class="space-y-2">
            <div class="flex gap-2">
              <input
                :type="provider.showKey ? 'text' : 'password'"
                :value="provider.apiKey"
                class="flex-1 rounded-lg border border-neutral-200 px-3 py-2"
                :placeholder="`Enter ${provider.name} API Key`"
              />
              <button
                class="p-2 text-neutral-500 hover:text-neutral-700"
                @click="provider.showKey = !provider.showKey"
              >
                <Icon :icon="provider.showKey ? 'mdi:eye-off' : 'mdi:eye'" class="text-xl" />
              </button>
            </div>
            <p class="text-sm text-neutral-500">
              {{ provider.description }}
            </p>
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
    apiKey: '',
    showKey: false,
    description: 'Required for Claude models'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    apiKey: '',
    showKey: false,
    description: 'Required for GPT models'
  }
])
</script>