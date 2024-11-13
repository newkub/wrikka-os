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
          <ChatMessage :message="msg" />
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
import { ref, watch, nextTick, onMounted } from 'vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const messages = ref<Message[]>([])
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
  // Add user message
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content,
    timestamp: new Date()
  })

  // Simulate AI response
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I understand you said: "${content}". This is a demo response.`,
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
  }
}

// Add welcome message when component is mounted
onMounted(() => {
  messages.value.push({
    id: Date.now().toString(),
    role: 'assistant',
    content: "👋 Hi there! I'm your AI assistant. I can help you with writing, analysis, coding, and more. Feel free to ask me anything!",
    timestamp: new Date()
  })
})

// Auto-scroll when new messages arrive
watch(() => messages.value.length, scrollToBottom)
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