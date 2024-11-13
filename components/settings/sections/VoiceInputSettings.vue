<template>
  <div class="space-y-6">
    <!-- Voice Recognition -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Voice Recognition</h2>
      <div class="space-y-4">
        <BaseToggle
          label="Enable Voice Input"
          v-model="settings.enabled"
        />
        
        <div v-if="settings.enabled">
          <!-- Language Selection -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Primary Language</label>
            <select v-model="settings.language" class="w-full rounded-lg border border-neutral-200 p-2">
              <option value="en-US">English (US)</option>
              <option value="th-TH">Thai</option>
              <option value="ja-JP">Japanese</option>
              <option value="zh-CN">Chinese (Simplified)</option>
            </select>
          </div>

          <!-- Voice Commands -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Voice Commands</label>
            <div class="space-y-2">
              <div v-for="command in voiceCommands" :key="command.id"
                class="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
                <div>
                  <div class="font-medium">{{ command.name }}</div>
                  <div class="text-sm text-neutral-600">{{ command.description }}</div>
                </div>
                <BaseToggle
                  v-model="command.enabled"
                  :label="''"
                />
              </div>
            </div>
          </div>

          <!-- Activation Phrase -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Activation Phrase</label>
            <input
              v-model="settings.activationPhrase"
              type="text"
              class="w-full rounded-lg border border-neutral-200 p-2"
              placeholder="Hey Assistant"
            />
            <p class="text-sm text-neutral-600 mt-1">
              Speak this phrase to activate voice input
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Speech Settings -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Speech Settings</h2>
      <div class="space-y-4">
        <BaseSlider
          label="Speech Recognition Sensitivity"
          v-model="settings.sensitivity"
          :min="0"
          :max="100"
          :step="1"
        />
        
        <BaseToggle
          label="Background Noise Reduction"
          v-model="settings.noiseReduction"
        />
        
        <BaseToggle
          label="Continuous Listening Mode"
          v-model="settings.continuousMode"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const settings = reactive({
  enabled: false,
  language: 'en-US',
  activationPhrase: 'Hey Assistant',
  sensitivity: 75,
  noiseReduction: true,
  continuousMode: false
})

const voiceCommands = reactive([
  {
    id: 1,
    name: 'New Chat',
    description: 'Start a new chat session',
    enabled: true
  },
  {
    id: 2,
    name: 'Clear Chat',
    description: 'Clear current chat history',
    enabled: true
  },
  {
    id: 3,
    name: 'Switch Model',
    description: 'Change AI model',
    enabled: true
  }
])
</script>