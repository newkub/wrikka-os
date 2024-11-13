<template>
  <div class="min-h-screen bg-background">
    <div class="h-[calc(100vh-2rem)] flex">
      <!-- Whiteboard -->
      <div class="flex-1">
        <ClientOnly>
          <Whiteboard />
        </ClientOnly>
      </div>

      <!-- Output Panel -->
      <div class="w-96 bg-white border-l border-neutral-200 flex flex-col">
        <div class="p-4 border-b border-neutral-200">
          <h2 class="text-lg font-semibold">Output</h2>
        </div>
        
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="outputs.length === 0" class="h-full flex items-center justify-center text-neutral-500">
            <div class="text-center">
              <Icon icon="mdi:drawing" class="text-4xl mb-2" />
              <p>Draw or write something to see the output</p>
            </div>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="output in outputs" :key="output.id" 
              class="p-4 bg-neutral-50 rounded-lg">
              <div class="flex items-start justify-between mb-2">
                <span class="text-sm font-medium">{{ output.type }}</span>
                <div class="flex items-center gap-2">
                  <button class="p-1 text-neutral-500 hover:text-primary-600 rounded">
                    <Icon icon="mdi:content-copy" class="text-lg" />
                  </button>
                  <button class="p-1 text-neutral-500 hover:text-error-600 rounded">
                    <Icon icon="mdi:delete" class="text-lg" />
                  </button>
                </div>
              </div>
              <p class="text-sm">{{ output.content }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-4 border-t border-neutral-200">
          <div class="flex items-center gap-2">
            <button class="flex-1 btn-primary">
              <Icon icon="mdi:wand" class="text-lg mr-1" />
              Generate
            </button>
            <button class="p-2 text-neutral-600 hover:text-primary-600 rounded-lg border border-neutral-200">
              <Icon icon="mdi:cog" class="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

// Sample outputs
const outputs = ref([
  {
    id: 1,
    type: 'Text Recognition',
    content: 'Sample recognized text from the whiteboard'
  },
  {
    id: 2,
    type: 'Analysis',
    content: 'Analysis of the drawn diagram'
  }
])
</script>