<template>
  <div class="space-y-6">
    <!-- General Notifications -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">General Notifications</h2>
      <div class="space-y-4">
        <BaseToggle
          label="Enable Notifications"
          v-model="settings.enabled"
        />
        
        <div v-if="settings.enabled">
          <div class="space-y-3">
            <div v-for="notification in notifications" :key="notification.id"
              class="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
              <div>
                <div class="font-medium">{{ notification.name }}</div>
                <div class="text-sm text-neutral-600">{{ notification.description }}</div>
              </div>
              <select 
                v-model="notification.type"
                class="rounded-lg border border-neutral-200 p-1.5 text-sm"
              >
                <option value="all">All</option>
                <option value="important">Important Only</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delivery Methods -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Delivery Methods</h2>
      <div class="space-y-4">
        <div v-for="method in deliveryMethods" :key="method.id"
          class="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center gap-3">
            <Icon :icon="method.icon" class="text-xl" />
            <div>
              <div class="font-medium">{{ method.name }}</div>
              <div class="text-sm text-neutral-600">{{ method.value || 'Not set' }}</div>
            </div>
          </div>
          <button 
            class="text-primary-600 hover:text-primary-700 text-sm"
            @click="editDeliveryMethod(method)"
          >
            {{ method.value ? 'Edit' : 'Add' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Schedule -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Quiet Hours</h2>
      <div class="space-y-4">
        <BaseToggle
          label="Enable Quiet Hours"
          v-model="settings.quietHours"
        />
        
        <div v-if="settings.quietHours" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Start Time</label>
            <input
              v-model="settings.quietHoursStart"
              type="time"
              class="w-full rounded-lg border border-neutral-200 p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">End Time</label>
            <input
              v-model="settings.quietHoursEnd"
              type="time"
              class="w-full rounded-lg border border-neutral-200 p-2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const settings = reactive({
  enabled: true,
  quietHours: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00'
})

const notifications = reactive([
  {
    id: 1,
    name: 'Chat Notifications',
    description: 'New messages and mentions',
    type: 'all'
  },
  {
    id: 2,
    name: 'System Updates',
    description: 'Important system and security updates',
    type: 'important'
  },
  {
    id: 3,
    name: 'Marketing',
    description: 'News and promotional content',
    type: 'none'
  }
])

const deliveryMethods = reactive([
  {
    id: 1,
    name: 'Email',
    icon: 'mdi:email',
    value: 'john@example.com'
  },
  {
    id: 2,
    name: 'Push Notifications',
    icon: 'mdi:bell',
    value: 'Enabled'
  },
  {
    id: 3,
    name: 'SMS',
    icon: 'mdi:message',
    value: ''
  }
])

const editDeliveryMethod = (method: typeof deliveryMethods[0]) => {
  // Implementation for editing delivery method
  console.log('Edit delivery method:', method)
}
</script>