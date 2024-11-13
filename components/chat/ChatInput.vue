<template>
  <div class="relative">
    <!-- Action buttons -->
    <div class="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
      <button
        class="p-2 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-neutral-100 transition-colors"
        title="Upload files"
      >
        <Icon icon="mdi:upload" class="text-xl" />
      </button>
      <button
        class="p-2 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-neutral-100 transition-colors"
        title="Search"
      >
        <Icon icon="mdi:magnify" class="text-xl" />
      </button>
    </div>

    <textarea
      ref="inputRef"
      v-model="inputValue"
      rows="1"
      class="w-full bg-neutral-50 rounded-xl pl-20 pr-12 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none overflow-hidden"
      :class="{ 'opacity-50': disabled }"
      placeholder="Type a message... (Enter to send, Shift + Enter for new line)"
      @input="adjustHeight"
      @keydown="handleKeydown"
      :disabled="disabled"
    />
    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-neutral-100 transition-colors disabled:opacity-50"
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
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  loading?: boolean
  disabled?: boolean
}>(), {
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': [message: string]
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
  
  inputRef.value.style.height = 'auto'
  inputRef.value.style.height = `${inputRef.value.scrollHeight}px`
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const sendMessage = () => {
  if (!canSend.value) return
  
  emit('send', inputValue.value.trim())
  inputValue.value = ''
  
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.style.height = 'auto'
    }
  })
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})
</script>

<style scoped>
textarea {
  min-height: 48px;
  max-height: 200px;
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
</style>