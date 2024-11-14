<template>
  <div class="space-y-4">
    <!-- Search Input -->
    <div class="relative">
      <Icon 
        icon="mdi:video" 
        class="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-neutral-400"
      />
      <input
        type="text"
        placeholder="Search videos"
        class="w-full bg-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button class="absolute right-4 top-1/2 -translate-y-1/2">
        <Icon icon="mdi:plus" class="text-xl text-neutral-400" />
      </button>
    </div>

    <!-- Results List -->
    <div class="space-y-4">
      <div v-for="(result, index) in searchResults" 
        :key="result.id"
        class="flex items-start gap-4 p-4 hover:bg-neutral-800/50 rounded-xl transition-colors cursor-pointer"
      >
        <!-- Number -->
        <span class="text-neutral-400 text-sm mt-1">{{ index + 1 }}</span>
        
        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h3 class="text-white font-medium mb-1">{{ result.title }}</h3>
          <p class="text-neutral-400 text-sm line-clamp-2">{{ result.description }}</p>
          
          <!-- Source -->
          <div class="flex items-center gap-2 mt-2">
            <img 
              v-if="result.favicon"
              :src="result.favicon" 
              :alt="result.source"
              class="w-4 h-4 rounded"
            />
            <Icon 
              v-else
              :icon="result.icon" 
              class="text-lg text-neutral-400" 
            />
            <span class="text-neutral-400 text-sm">{{ result.source }}</span>
          </div>
        </div>

        <!-- Thumbnail -->
        <div v-if="result.thumbnail" class="w-24 h-16 rounded overflow-hidden flex-shrink-0">
          <img 
            :src="result.thumbnail" 
            :alt="result.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

// Sample data - replace with actual data source
const searchResults = [
  {
    id: 1,
    title: 'Geag Surname Meaning & Geag Family History',
    description: 'Gear, Gerg, Gegg, Gong, Feng, Bean, Bear, Guan. 154 record(s) for Geag. 64 Birth, Marriage, and Deaths; 14...',
    source: 'www.ancestry.com',
    icon: 'mdi:web',
    thumbnail: 'https://picsum.photos/200/150?1'
  },
  {
    id: 2,
    title: 'Greg Ross',
    description: '... song Stigmatized by The Calling. Greg Ross GearGreg\'s Gear:GR Custom Drums/DW ... Joshua Turner and 7 others · 8 · 3 : Greg Ross...',
    source: 'www.facebook.com',
    icon: 'mdi:facebook',
    favicon: 'https://www.facebook.com/favicon.ico'
  },
  {
    id: 3,
    title: 'When I start my car and put it in drive, ...',
    description: 'Aug 22, 2018 ... May be low on transmission fluid. A more endemic problem is "morning sickness", where fluid in the torque converter drains back...',
    source: 'www.quora.com',
    icon: 'mdi:help-circle',
    favicon: 'https://www.quora.com/favicon.ico'
  }
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>