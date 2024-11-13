<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-50 to-background py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-neutral-900 mb-4">Bring Your Stories to Life</h1>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Transform text into captivating videos. Choose your style, set parameters, and create engaging content in minutes.
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-6">
        <!-- Generation Panel -->
        <VideoGenerationPanel class="w-96 flex-shrink-0" />

        <!-- Video Showcase -->
        <div class="flex-1">
          <VideoShowcase />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will be implemented in separate components
</script>