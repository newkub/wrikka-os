<template>
  <div class="relative">
    <textarea
      ref="inputRef"
      v-model="inputValue"
      rows="3"
      class="w-full bg-neutral-50 rounded-xl px-4 py-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-base resize-none overflow-y-auto"
      :class="{ 'opacity-50': disabled }"
      placeholder="Type a message... (Enter to send, Shift + Enter for new line)"
      @input="adjustHeight"
      @keydown="handleKeydown"
      @paste="handlePaste"
      :disabled="disabled"
    />
    
    <div class="absolute right-2 top-4 flex items-center gap-2">
      <button
        class="p-2 rounded-lg text-neutral-400 hover:text-primary-base hover:bg-neutral-100 transition-colors"
        title="Voice input"
        @click="handleVoiceInput"
      >
        <Icon icon="mdi:microphone" class="text-xl" />
      </button>
      <button
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
        :class="[
          hasContent ? 'text-primary-600 hover:text-primary-700' : 'text-neutral-400 hover:text-primary-base',
          'hover:bg-neutral-100'
        ]"
        :disabled="!canSend"
        @click="sendMessage"
      >
        <Icon 
          :icon="loading ? 'mdi:loading' : 'mdi:send'" 
          class="text-xl"
          :class="{ 'animate-spin': loading }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  loading?: boolean
  disabled?: boolean
  hasContent?: boolean
}>(), {
  loading: false,
  disabled: false,
  hasContent: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': [message: string]
  'paste-image': [file: File]
}>()

const inputRef = ref<HTMLTextAreaElement>()
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const canSend = computed(() => 
  inputValue.value.trim().length > 0 && !props.loading && !props.disabled
)

const adjustHeight = () => {
  if (!inputRef.value) return
  
  // Reset height to auto to get the correct scrollHeight
  inputRef.value.style.height = 'auto'
  
  // Calculate new height (minimum 3 lines)
  const minHeight = 96 // 3 lines (24px line-height * 3 + padding)
  const newHeight = Math.max(minHeight, inputRef.value.scrollHeight)
  
  // Set new height
  inputRef.value.style.height = `${newHeight}px`
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  } else if (event.key === 'Enter' && event.shiftKey) {
    // Let the newline be added and adjust height
    nextTick(() => {
      adjustHeight()
    })
  }
}

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  if (!items) return

  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        event.preventDefault()
        emit('paste-image', file)
      }
    }
  }
}

const handleVoiceInput = () => {
  // Voice input logic will be implemented here
}

const sendMessage = () => {
  if (!canSend.value) return
  
  emit('send', inputValue.value.trim())
  inputValue.value = ''
  
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.style.height = '96px' // Reset to minimum height
    }
  })
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
    adjustHeight()
  }
})
</script>

<style scoped>
textarea {
  min-height: 96px; /* 3 lines */
  max-height: 400px; /* Maximum height before scrolling */
  line-height: 1.5;
}

textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}

/* Firefox scrollbar styling */
textarea {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}
</style>