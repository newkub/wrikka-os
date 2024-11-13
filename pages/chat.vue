<template>
  <div class="h-full bg-neutral-50">
    <div class="h-full max-w-7xl mx-auto">
      <ChatHeader 
        @select-chat="handleChatSelect" 
        v-model:selected-model="selectedModel"
        :selected-chat="selectedChat"
      />
      <div class="flex gap-4 h-[calc(100%-4rem)] mt-4">
        <div class="flex-1 bg-white rounded-xl shadow-sm h-full">
          <ChatContainer 
            :selected-model="selectedModel"
            :messages="currentMessages"
            @update:messages="updateMessages"
          />
        </div>
        <div class="w-80 bg-white rounded-xl shadow-sm h-full">
          <ChatSidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'chat'
})

interface ChatHistory {
  id: number
  title: string
  model: {
    id: string
    icon: string
  }
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
  }>
}

const selectedModel = ref('claude-3-haiku')
const selectedChat = ref<ChatHistory | null>(null)
const currentMessages = ref<ChatHistory['messages']>([])

const handleChatSelect = (chat: ChatHistory) => {
  selectedChat.value = chat
  selectedModel.value = chat.model.id
  currentMessages.value = chat.messages
}

const updateMessages = (messages: ChatHistory['messages']) => {
  currentMessages.value = messages
  if (selectedChat.value) {
    selectedChat.value.messages = messages
  }
}
</script>