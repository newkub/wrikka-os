<template>
  <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <p v-if="description" class="text-sm text-neutral-600">{{ description }}</p>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>