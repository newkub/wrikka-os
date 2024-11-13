<template>
  <div class="flex flex-col h-full">
    <ChatMessageList 
      :messages="messages"
      :selected-model="selectedModel"
    />
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

const handleSend = async (content: string) => {
  const newMessages = [...props.messages]
  
  newMessages.push({
    id: Date.now().toString(),
    role: 'user',
    content
  })

  emit('update:messages', newMessages)

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
</script>