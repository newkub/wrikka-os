<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Models Hub</h1>
        <p class="text-neutral-600">Explore and manage AI models for your creative projects</p>
      </div>

      <!-- Model Categories -->
      <div class="space-y-12">
        <ModelCategory
          v-for="category in modelCategories"
          :key="category.id"
          :title="category.title"
          :description="category.description"
          :models="category.models"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelCategories = [
  {
    id: 'image',
    title: 'Image Generation',
    description: 'Models specialized in creating and editing images',
    models: [
      {
        id: 'stable-diffusion',
        name: 'Stable Diffusion XL',
        provider: 'Stability AI',
        capabilities: ['Text to Image', 'Image to Image', 'Inpainting'],
        pricing: 'Pay as you go'
      },
      {
        id: 'dalle',
        name: 'DALL·E 3',
        provider: 'OpenAI',
        capabilities: ['Text to Image', 'Variations'],
        pricing: 'Credits based'
      }
    ]
  },
  {
    id: 'video',
    title: 'Video Generation',
    description: 'Models for video creation and editing',
    models: [
      {
        id: 'runway',
        name: 'Gen-2',
        provider: 'Runway',
        capabilities: ['Text to Video', 'Image to Video', 'Stylization'],
        pricing: 'Subscription'
      }
    ]
  }
]
</script>