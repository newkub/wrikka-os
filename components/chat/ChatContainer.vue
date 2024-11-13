<template>
  <div class="flex flex-col h-full">
    <!-- Messages Area -->
    <div class="flex-1 overflow-y-auto p-6" ref="messagesRef">
      <div v-if="messages.length === 0" class="h-full flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:robot" class="text-3xl text-primary-600" />
          </div>
          <h2 class="text-xl font-bold mb-2">Welcome to Chat</h2>
          <p class="text-neutral-600">Start a conversation with the AI assistant</p>
        </div>
      </div>
      
      <template v-else>
        <div v-for="msg in messages" :key="msg.id" class="mb-6 last:mb-0">
          <ChatMessage :message="msg" :selected-model="selectedModel" />
        </div>
      </template>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t border-neutral-200">
      <ChatInput
        v-model="inputMessage"
        :loading="isLoading"
        @send="handleSend"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const props = defineProps<{
  selectedModel: string
  messages: Message[]
}>()

const emit = defineEmits<{
  'update:messages': [messages: Message[]]
}>()

const inputMessage = ref('')
const isLoading = ref(false)
const messagesRef = ref<HTMLElement>()

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

const handleSend = async (content: string) => {
  const newMessages = [...props.messages]
  
  // Add user message
  newMessages.push({
    id: Date.now().toString(),
    role: 'user',
    content
  })

  emit('update:messages', newMessages)

  // Simulate AI response
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    newMessages.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I understand you said: "${content}". This is a demo response.`
    })
    
    emit('update:messages', newMessages)
  } finally {
    isLoading.value = false
  }
}

// Auto-scroll when new messages arrive
watch(() => props.messages.length, scrollToBottom)
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 3px;
}
</style>