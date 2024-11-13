<template>
  <div class="min-h-screen bg-background p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-2">
        <button 
          class="px-3 py-1.5 rounded-lg font-medium transition-colors"
          :class="activeTab === 'explore' ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100'"
          @click="activeTab = 'explore'"
        >
          Explore
        </button>
        <button 
          class="px-3 py-1.5 rounded-lg font-medium transition-colors"
          :class="activeTab === 'my-bots' ? 'bg-primary-500 text-white' : 'hover:bg-neutral-100'"
          @click="activeTab = 'my-bots'"
        >
          My Bots
        </button>
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/docs" class="text-neutral-600 hover:text-neutral-900">Docs</NuxtLink>
        <button class="btn-primary">
          <Icon icon="mdi:plus" class="text-lg" />
          Create Bot
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="relative mb-8">
      <Icon icon="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-neutral-400" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search bots..."
        class="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>

    <!-- Categories -->
    <div class="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
      <button 
        v-for="category in categories" 
        :key="category.id"
        class="px-3 py-1.5 text-sm rounded-lg transition-colors whitespace-nowrap"
        :class="selectedCategory === category.id ? 'bg-primary-500 text-white' : 'bg-neutral-100 hover:bg-neutral-200'"
        @click="selectedCategory = category.id"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Recommended Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Recommended</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div 
          v-for="bot in filteredRecommendedBots" 
          :key="bot.id"
          class="bg-white p-4 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow"
        >
          <div class="flex gap-3">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon :icon="bot.icon" class="text-xl text-primary-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">{{ bot.name }}</h3>
              <p class="text-sm text-neutral-600 mb-3 line-clamp-2">{{ bot.description }}</p>
              <div class="text-xs text-neutral-500">By {{ bot.author }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Bots -->
    <div>
      <h2 class="text-2xl font-bold mb-6">All Bots</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div 
          v-for="bot in filteredBots" 
          :key="bot.id"
          class="bg-white p-4 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow"
        >
          <div class="flex gap-3">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon :icon="bot.icon" class="text-xl text-primary-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-1">{{ bot.name }}</h3>
              <p class="text-sm text-neutral-600 mb-3 line-clamp-2">{{ bot.description }}</p>
              <div class="flex items-center gap-2 flex-wrap">
                <span 
                  v-for="tag in bot.tags" 
                  :key="tag"
                  class="px-2 py-0.5 bg-neutral-100 rounded text-xs text-neutral-600"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const activeTab = ref('explore')
const searchQuery = ref('')
const selectedCategory = ref('top')

const categories = [
  { id: 'top', name: 'Top' },
  { id: 'models', name: 'Models' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'developer', name: 'Developer' },
  { id: 'education', name: 'Education' },
  { id: 'product', name: 'Product' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'design', name: 'Design' },
  { id: 'research', name: 'Research' },
  { id: 'lifestyle', name: 'Lifestyle' }
]

const recommendedBots = [
  {
    id: 1,
    name: 'Writing Agent',
    description: 'Writing Agent provides text generation services to assist with various writing tasks.',
    author: 'Monica Team',
    icon: 'mdi:pencil',
    category: 'productivity',
    tags: ['Writing', 'AI', 'Productivity']
  },
  {
    id: 2,
    name: 'Document Assistant',
    description: 'Get summary of any document in seconds. Chat with document, ask questions, get answers.',
    author: 'Monica Team',
    icon: 'mdi:file-document',
    category: 'productivity',
    tags: ['Document', 'AI', 'Summary']
  },
  {
    id: 3,
    name: 'Travel Planner',
    description: 'Curates personalized travel recommendations based on your preferences.',
    author: 'Monica Team',
    icon: 'mdi:airplane',
    category: 'lifestyle',
    tags: ['Travel', 'Planning', 'AI']
  },
  {
    id: 4,
    name: 'Code Assistant',
    description: 'Your AI programming partner for code review and suggestions.',
    author: 'Monica Team',
    icon: 'mdi:code-braces',
    category: 'developer',
    tags: ['Coding', 'Development', 'AI']
  }
]

const allBots = [
  ...recommendedBots,
  {
    id: 5,
    name: 'Design Helper',
    description: 'AI-powered design suggestions and feedback.',
    author: 'Monica Team',
    icon: 'mdi:palette',
    category: 'design',
    tags: ['Design', 'UI/UX', 'AI']
  },
  {
    id: 6,
    name: 'Research Assistant',
    description: 'Helps with academic research and paper writing.',
    author: 'Monica Team',
    icon: 'mdi:book-search',
    category: 'research',
    tags: ['Research', 'Academic', 'AI']
  },
  {
    id: 7,
    name: 'Marketing Copywriter',
    description: 'Generates engaging marketing copy for your campaigns.',
    author: 'Monica Team',
    icon: 'mdi:bullhorn',
    category: 'marketing',
    tags: ['Marketing', 'Copywriting', 'AI']
  },
  {
    id: 8,
    name: 'Math Tutor',
    description: 'Interactive math learning and problem-solving assistance.',
    author: 'Monica Team',
    icon: 'mdi:calculator',
    category: 'education',
    tags: ['Education', 'Math', 'AI']
  }
]

const filteredRecommendedBots = computed(() => {
  return recommendedBots.filter(bot => {
    const matchesSearch = 
      bot.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'top' || bot.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const filteredBots = computed(() => {
  return allBots.filter(bot => {
    const matchesSearch = 
      bot.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      bot.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCategory = selectedCategory.value === 'top' || bot.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<style scoped>
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}
</style>