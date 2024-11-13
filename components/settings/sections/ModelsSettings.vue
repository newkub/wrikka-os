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
        <!-- Text Models -->
        <div class="p-4 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:text" class="text-xl text-neutral-600" />
              <h3 class="font-medium">Text Models</h3>
            </div>
          </div>
          
          <div class="space-y-4">
            <div v-for="provider in textProviders" :key="provider.id" 
              class="border-t border-neutral-100 pt-3 first:border-0 first:pt-0">
              <div class="flex items-center gap-3 mb-2">
                <img v-if="provider.id === 'anthropic'" 
                  src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4"
                  class="w-6 h-6 rounded"
                  alt="Anthropic"
                />
                <Icon v-else-if="provider.id === 'openai'"
                  icon="simple-icons:openai"
                  class="w-6 h-6"
                />
                <span class="text-sm font-medium">{{ provider.name }}</span>
              </div>
              
              <div class="space-y-2">
                <div v-for="model in provider.models" :key="model.id"
                  class="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg">
                  <div>
                    <span class="text-sm">{{ model.name }}</span>
                    <Badge v-if="model.tag" variant="neutral" class="ml-2">{{ model.tag }}</Badge>
                  </div>
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

        <!-- Image Models -->
        <div class="p-4 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:image" class="text-xl text-neutral-600" />
              <h3 class="font-medium">Image Models</h3>
            </div>
          </div>
          
          <div class="space-y-4">
            <div v-for="provider in imageProviders" :key="provider.id" 
              class="border-t border-neutral-100 pt-3 first:border-0 first:pt-0">
              <div class="flex items-center gap-3 mb-2">
                <Icon v-if="provider.id === 'openai'"
                  icon="simple-icons:openai"
                  class="w-6 h-6"
                />
                <Icon v-else-if="provider.id === 'stability'"
                  icon="simple-icons:stability" 
                  class="w-6 h-6"
                />
                <Icon v-else-if="provider.id === 'midjourney'"
                  icon="simple-icons:midjourney"
                  class="w-6 h-6"
                />
                <span class="text-sm font-medium">{{ provider.name }}</span>
              </div>
              
              <div class="space-y-2">
                <div v-for="model in provider.models" :key="model.id"
                  class="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg">
                  <div>
                    <span class="text-sm">{{ model.name }}</span>
                    <Badge v-if="model.tag" variant="neutral" class="ml-2">{{ model.tag }}</Badge>
                  </div>
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

        <!-- Video Models -->
        <div class="p-4 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:video" class="text-xl text-neutral-600" />
              <h3 class="font-medium">Video Models</h3>
            </div>
          </div>
          
          <div class="space-y-4">
            <div v-for="provider in videoProviders" :key="provider.id" 
              class="border-t border-neutral-100 pt-3 first:border-0 first:pt-0">
              <div class="flex items-center gap-3 mb-2">
                <Icon v-if="provider.id === 'openai'"
                  icon="simple-icons:openai"
                  class="w-6 h-6"
                />
                <Icon v-else-if="provider.id === 'runway'"
                  icon="simple-icons:runway"
                  class="w-6 h-6"
                />
                <span class="text-sm font-medium">{{ provider.name }}</span>
              </div>
              
              <div class="space-y-2">
                <div v-for="model in provider.models" :key="model.id"
                  class="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg">
                  <div>
                    <span class="text-sm">{{ model.name }}</span>
                    <Badge v-if="model.tag" variant="neutral" class="ml-2">{{ model.tag }}</Badge>
                  </div>
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

        <!-- Multi-Modal Models -->
        <div class="p-4 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:cube" class="text-xl text-neutral-600" />
              <h3 class="font-medium">Multi-Modal Models</h3>
            </div>
          </div>
          
          <div class="space-y-4">
            <div v-for="provider in multiModalProviders" :key="provider.id" 
              class="border-t border-neutral-100 pt-3 first:border-0 first:pt-0">
              <div class="flex items-center gap-3 mb-2">
                <Icon v-if="provider.id === 'openai'"
                  icon="simple-icons:openai"
                  class="w-6 h-6"
                />
                <Icon v-else-if="provider.id === 'anthropic'"
                  icon="simple-icons:anthropic"
                  class="w-6 h-6"
                />
                <span class="text-sm font-medium">{{ provider.name }}</span>
              </div>
              
              <div class="space-y-2">
                <div v-for="model in provider.models" :key="model.id"
                  class="flex items-center justify-between p-2 hover:bg-neutral-50 rounded-lg">
                  <div>
                    <span class="text-sm">{{ model.name }}</span>
                    <Badge v-if="model.tag" variant="neutral" class="ml-2">{{ model.tag }}</Badge>
                  </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const textProviders = reactive([
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: [
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', enabled: true, tag: 'Fast' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', enabled: true, tag: 'Advanced' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', enabled: true, tag: 'Balanced' }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { id: 'gpt-4', name: 'GPT-4', enabled: true, tag: 'Advanced' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', enabled: true, tag: 'Fast' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', enabled: true, tag: 'Efficient' }
    ]
  }
])

const imageProviders = reactive([
  {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { id: 'dall-e-3', name: 'DALL·E 3', enabled: true, tag: 'Advanced' },
      { id: 'dall-e-2', name: 'DALL·E 2', enabled: false, tag: 'Legacy' }
    ]
  },
  {
    id: 'stability',
    name: 'Stability AI',
    models: [
      { id: 'sdxl', name: 'Stable Diffusion XL', enabled: true, tag: 'Advanced' },
      { id: 'sd-turbo', name: 'SD Turbo', enabled: true, tag: 'Fast' }
    ]
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    models: [
      { id: 'mj-v6', name: 'Midjourney V6', enabled: true, tag: 'Latest' },
      { id: 'mj-v5', name: 'Midjourney V5', enabled: false, tag: 'Legacy' }
    ]
  }
])

const videoProviders = reactive([
  {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { id: 'sora', name: 'Sora', enabled: true, tag: 'Preview' }
    ]
  },
  {
    id: 'runway',
    name: 'Runway',
    models: [
      { id: 'gen-2', name: 'Gen-2', enabled: true, tag: 'Latest' },
      { id: 'gen-1', name: 'Gen-1', enabled: false, tag: 'Legacy' }
    ]
  }
])

const multiModalProviders = reactive([
  {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { id: 'gpt-4-vision', name: 'GPT-4 Vision', enabled: true, tag: 'Vision' }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: [
      { id: 'claude-3-opus-multi', name: 'Claude 3 Opus', enabled: true, tag: 'Vision' },
      { id: 'claude-3-sonnet-multi', name: 'Claude 3 Sonnet', enabled: true, tag: 'Vision' }
    ]
  }
])
</script>