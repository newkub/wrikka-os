<template>
  <div class="h-full bg-neutral-50">
    <div class="h-full max-w-7xl mx-auto">
      <ChatHeader @select-chat="handleChatSelect" />
      <div class="flex gap-4 h-[calc(100%-4rem)] mt-4">
        <div class="flex-1 bg-white rounded-xl shadow-sm h-full">
          <ChatContainer />
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

const handleChatSelect = (chat: any) => {
  console.log('Selected chat:', chat)
}
</script>