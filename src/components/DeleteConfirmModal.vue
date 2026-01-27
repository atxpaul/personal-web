<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      >
        <div class="modal-content bg-console-bg border border-console-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
          <!-- Header -->
          <div class="bg-[#161b22] border-b border-console-border px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span class="ml-4 text-xs text-gray-500 font-mono">rm_project.sh</span>
            </div>
            <button
              @click="close"
              class="text-gray-500 hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-red-500 text-xl font-bold">$</span>
                <h2 class="text-white text-2xl font-bold font-mono">./rm_project.sh</h2>
              </div>
              <p class="text-gray-400 text-sm">
                ¿Estás seguro de que quieres eliminar este proyecto?
              </p>
            </div>

            <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p class="text-white font-mono text-sm mb-2">
                <span class="text-red-400">Proyecto:</span> {{ projectTitle }}
              </p>
              <p class="text-red-400 text-xs font-mono">
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div v-if="error" class="text-red-400 text-sm font-mono bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
              <span class="text-red-500">Error:</span> {{ error }}
            </div>

            <div class="flex gap-3">
              <button
                type="button"
                @click="close"
                class="flex-1 bg-[#21262d] hover:bg-[#30363d] border border-console-border text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="handleDelete"
                :disabled="loading"
                class="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span v-if="loading" class="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span v-else class="material-symbols-outlined text-[18px]">delete</span>
                <span>{{ loading ? 'Eliminando...' : 'Eliminar' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Teleport, Transition } from 'vue'
import { deleteProject } from '../data/firestore.js'
import { auth } from '../config/firebase.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  projectId: {
    type: String,
    default: ''
  },
  projectTitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'deleted'])

const loading = ref(false)
const error = ref(null)

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    error.value = null
  }
})

const close = () => {
  error.value = null
  loading.value = false
  emit('close')
}

const handleDelete = async () => {
  try {
    loading.value = true
    error.value = null

    if (!auth.currentUser) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.')
    }

    if (!props.projectId) {
      throw new Error('ID del proyecto no válido')
    }

    await deleteProject(props.projectId, auth)
    emit('deleted')
    close()
  } catch (err) {
    error.value = err.message || 'Error al eliminar el proyecto'
    console.error('Error deleting project:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 9999 !important;
}

.modal-content {
  position: relative;
  z-index: 10000;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.95);
  opacity: 0;
}
</style>
