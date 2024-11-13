<template>
  <div class="min-h-screen bg-background p-6">
    <div class="flex gap-6">
      <!-- Document Browser -->
      <div class="w-80 bg-white rounded-xl border border-neutral-200 flex flex-col">
        <div class="p-4 border-b border-neutral-200">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Documents</h2>
            <button class="btn-primary" @click="showUploadModal = true">
              <Icon icon="mdi:plus" class="text-lg" />
              Upload
            </button>
          </div>
          <div class="relative">
            <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search documents..."
              class="w-full pl-10 pr-4 py-2 bg-neutral-50 rounded-lg text-sm"
            />
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto p-2">
          <DocumentList
            :documents="filteredDocuments"
            :selected-id="selectedDocument?.id"
            @select="selectDocument"
          />
        </div>
      </div>

      <!-- Document Viewer/Editor -->
      <div class="flex-1 bg-white rounded-xl border border-neutral-200">
        <template v-if="selectedDocument">
          <DocumentViewer
            :document="selectedDocument"
            @update="updateDocument"
          />
        </template>
        <template v-else>
          <div class="h-full flex items-center justify-center text-neutral-500">
            <div class="text-center">
              <Icon icon="mdi:file-document-outline" class="text-4xl mb-2" />
              <p>Select a document to view or edit</p>
            </div>
          </div>
        </template>
      </div>

      <!-- Training Settings -->
      <div class="w-80 bg-white rounded-xl border border-neutral-200">
        <TrainingSettings
          v-if="selectedDocument"
          :document="selectedDocument"
          @update="updateTrainingSettings"
        />
        <div v-else class="p-4 text-neutral-500 text-center">
          <p>Select a document to configure training settings</p>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <UploadModal
      v-if="showUploadModal"
      @close="showUploadModal = false"
      @upload="handleUpload"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Document {
  id: string
  title: string
  type: 'text' | 'pdf' | 'webpage'
  content: string
  metadata: {
    source: string
    dateAdded: Date
    lastModified: Date
    tags: string[]
    chunks: number
    embedding: string
  }
  training: {
    enabled: boolean
    priority: number
    chunkSize: number
    overlap: number
    quality: 'high' | 'medium' | 'low'
  }
}

const searchQuery = ref('')
const showUploadModal = ref(false)
const selectedDocument = ref<Document | null>(null)

// Sample data
const documents = ref<Document[]>([
  {
    id: '1',
    title: 'Product Documentation',
    type: 'text',
    content: 'Sample content...',
    metadata: {
      source: 'Internal Wiki',
      dateAdded: new Date('2024-03-15'),
      lastModified: new Date('2024-03-15'),
      tags: ['documentation', 'product'],
      chunks: 15,
      embedding: 'ada-002'
    },
    training: {
      enabled: true,
      priority: 1,
      chunkSize: 512,
      overlap: 50,
      quality: 'high'
    }
  },
  {
    id: '2',
    title: 'API Reference',
    type: 'webpage',
    content: 'API documentation...',
    metadata: {
      source: 'Developer Portal',
      dateAdded: new Date('2024-03-14'),
      lastModified: new Date('2024-03-14'),
      tags: ['api', 'reference'],
      chunks: 25,
      embedding: 'ada-002'
    },
    training: {
      enabled: true,
      priority: 2,
      chunkSize: 512,
      overlap: 50,
      quality: 'medium'
    }
  }
])

const filteredDocuments = computed(() => {
  if (!searchQuery.value) return documents.value
  
  const query = searchQuery.value.toLowerCase()
  return documents.value.filter(doc => 
    doc.title.toLowerCase().includes(query) ||
    doc.metadata.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

const selectDocument = (id: string) => {
  selectedDocument.value = documents.value.find(d => d.id === id) || null
}

const updateDocument = (updatedDoc: Document) => {
  const index = documents.value.findIndex(d => d.id === updatedDoc.id)
  if (index !== -1) {
    documents.value[index] = updatedDoc
    selectedDocument.value = updatedDoc
  }
}

const updateTrainingSettings = (id: string, settings: Document['training']) => {
  const doc = documents.value.find(d => d.id === id)
  if (doc) {
    doc.training = settings
    selectedDocument.value = { ...doc }
  }
}

const handleUpload = (newDoc: Document) => {
  documents.value.push(newDoc)
  showUploadModal.value = false
  selectedDocument.value = newDoc
}
</script>