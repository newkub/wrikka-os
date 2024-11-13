<template>
  <nav class="fixed left-0 top-0 h-screen w-20 bg-surface border-r border-border flex flex-col items-center py-4 overflow-hidden">
    <!-- Fixed Logo Section -->
    <div class="flex-shrink-0">
      <NuxtLink 
        to="/"
        class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-neutral-100"
        :class="{ 'bg-neutral-200': route.path === '/' }"
      >
        <Icon icon="mdi:home" class="text-2xl text-primary-600" />
        <span class="text-xs font-medium text-neutral-700">Home</span>
      </NuxtLink>
    </div>

    <!-- Scrollable Menu Section -->
    <div class="flex-1 overflow-y-auto w-full px-3 my-4 scrollbar-thin">
      <div class="flex flex-col items-center gap-4">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-neutral-100"
          :class="{ 'bg-neutral-200': route.path === item.path }"
        >
          <Icon :icon="item.icon" class="text-2xl text-neutral-700" />
          <span class="text-xs font-medium text-neutral-700">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Fixed Bottom Section -->
    <div class="flex-shrink-0 flex flex-col items-center gap-4">
      <NuxtLink 
        v-for="item in bottomMenuItems" 
        :key="item.path"
        :to="item.path"
        class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-neutral-100"
        :class="{ 'bg-neutral-200': route.path === item.path }"
      >
        <Icon :icon="item.icon" class="text-2xl text-neutral-700" />
        <span class="text-xs font-medium text-neutral-700">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const route = useRoute()

const menuItems = [
  { path: '/chat', label: 'Chat', icon: 'mdi:chat' },
  { path: '/images', label: 'Images', icon: 'mdi:image' },
  { path: '/videos', label: 'Videos', icon: 'mdi:video' },
  { path: '/bots', label: 'Bots', icon: 'mdi:robot-industrial' },
  { path: '/canvas', label: 'Canvas', icon: 'mdi:brush' },
  { path: '/bookmark', label: 'Bookmark', icon: 'mdi:bookmark' }
]

const bottomMenuItems = [
  { path: '/profile', label: 'Profile', icon: 'mdi:account' },
  { path: '/settings', label: 'Settings', icon: 'mdi:cog' }
]
</script>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}

/* Hide scrollbar when not hovering */
.scrollbar-thin:not(:hover)::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.scrollbar-thin:not(:hover) {
  scrollbar-color: transparent transparent;
}
</style>