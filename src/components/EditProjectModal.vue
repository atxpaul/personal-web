<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      >
        <div class="modal-content bg-console-bg border border-console-border rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="bg-[#161b22] border-b border-console-border px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span class="ml-4 text-xs text-gray-500 font-mono">{{ isNew ? 'new_project.sh' : 'edit_project.sh' }}</span>
            </div>
            <button
              @click="close"
              class="text-gray-500 hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <!-- Content - Scrollable -->
          <div class="p-6 overflow-y-auto flex-1 min-h-0">
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-primary text-xl font-bold">$</span>
                <h2 class="text-white text-2xl font-bold font-mono">{{ isNew ? './new_project.sh' : './edit_project.sh' }}</h2>
              </div>
              <p class="text-gray-400 text-sm">
                {{ isNew ? 'Creando nuevo proyecto' : 'Editando proyecto' }} para idioma: <span class="text-primary font-mono">{{ locale.toUpperCase() }}</span>
              </p>
            </div>

            <form @submit.prevent="handleSave" class="space-y-6">
              <!-- Project ID (solo para nuevos proyectos) -->
              <div v-if="isNew">
                <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                  project_id: <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="projectId"
                  type="text"
                  required
                  pattern="[a-z0-9-]+"
                  class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                  placeholder="mi-nuevo-proyecto"
                />
                <p class="text-xs text-gray-500 mt-1">Solo letras minúsculas, números y guiones. Se usará como ID del documento.</p>
              </div>

              <!-- Campos específicos del idioma -->
              <div class="border-t border-console-border pt-4">
                <h3 class="text-white text-lg font-bold mb-4 font-mono">Datos para {{ locale.toUpperCase() }}:</h3>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      title: <span class="text-red-400">*</span>
                    </label>
                    <input
                      v-model="formData.title"
                      type="text"
                      required
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                      placeholder="Nombre del proyecto"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      description: <span class="text-red-400">*</span>
                    </label>
                    <textarea
                      v-model="formData.description"
                      required
                      rows="3"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm resize-none"
                      placeholder="Descripción corta del proyecto"
                    ></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      summary:
                    </label>
                    <textarea
                      v-model="formData.summary"
                      rows="5"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm resize-none"
                      placeholder="Resumen detallado del proyecto (multilínea)"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Campos comunes (no dependen del idioma) -->
              <div class="border-t border-console-border pt-4">
                <h3 class="text-white text-lg font-bold mb-4 font-mono">Configuración común:</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      status:
                    </label>
                    <select
                      v-model="commonData.status"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                    >
                      <option value="DEPLOYED">DEPLOYED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      version:
                    </label>
                    <input
                      v-model="commonData.version"
                      type="text"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                      placeholder="1.0.0"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      provider:
                    </label>
                    <input
                      v-model="commonData.provider"
                      type="text"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                      placeholder="AWS, GCP, Azure, etc."
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      providerFull:
                    </label>
                    <input
                      v-model="commonData.providerFull"
                      type="text"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                      placeholder="Amazon Web Services (AWS)"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      github:
                    </label>
                    <input
                      v-model="commonData.github"
                      type="url"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                      placeholder="https://github.com/user/repo"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                      image:
                    </label>
                    <input
                      v-model="commonData.image"
                      type="url"
                      class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    tags: <span class="text-gray-500 text-xs">(separados por comas)</span>
                  </label>
                  <input
                    v-model="tagsInput"
                    type="text"
                    class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                    placeholder="kubernetes, terraform, aws"
                  />
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    technologies: <span class="text-gray-500 text-xs">(separados por comas)</span>
                  </label>
                  <input
                    v-model="technologiesInput"
                    type="text"
                    class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                    placeholder="Terraform, Kubernetes, Docker"
                  />
                </div>

                <div class="mt-4">
                  <label class="flex items-center gap-2 text-sm font-medium text-gray-300 font-mono">
                    <input
                      v-model="commonData.featured"
                      type="checkbox"
                      class="w-4 h-4 text-primary bg-[#161b22] border-console-border rounded focus:ring-primary"
                    />
                    featured (proyecto destacado)
                  </label>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-300 mb-2 font-mono">
                    architecture: <span class="text-gray-500 text-xs">(ASCII art, multilínea)</span>
                  </label>
                  <textarea
                    v-model="commonData.architecture"
                    rows="15"
                    class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-xs resize-none"
                    placeholder="       +-------------+        +-------------+&#10;       |   Clients   |        |   DevTeam   |&#10;       +------+------+        +------+------+"
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">Usa espacios y caracteres ASCII para crear el diagrama. Se mostrará tal cual lo escribas.</p>
                </div>
              </div>

              <div v-if="error" class="text-red-400 text-sm font-mono bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <span class="text-red-500">Error:</span> {{ error }}
              </div>

              <div v-if="success" class="text-green-400 text-sm font-mono bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <span class="text-green-500">✓</span> Proyecto guardado correctamente
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  type="button"
                  @click="close"
                  class="flex-1 bg-[#21262d] hover:bg-[#30363d] border border-console-border text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span v-if="loading" class="material-symbols-outlined text-[18px] animate-spin">sync</span>
                  <span v-else class="material-symbols-outlined text-[18px]">save</span>
                  <span>{{ loading ? 'Guardando...' : 'Guardar' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Teleport, Transition } from 'vue'
import { saveProject } from '../data/firestore.js'
import { useI18n } from 'vue-i18n'
import { auth } from '../config/firebase.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  project: {
    type: Object,
    default: null
  },
  isNew: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'saved'])

const { locale } = useI18n()
const loading = ref(false)
const error = ref(null)
const success = ref(false)
const projectId = ref('')

const formData = ref({
  title: '',
  description: '',
  summary: ''
})

const commonData = ref({
  status: 'IN_PROGRESS',
  provider: '',
  providerFull: '',
  version: '1.0.0',
  github: '',
  image: '',
  featured: false,
  architecture: ''
})

const tagsInput = ref('')
const technologiesInput = ref('')

// Computed para convertir tags y technologies
const tagsArray = computed(() => {
  return tagsInput.value.split(',').map(t => t.trim()).filter(t => t)
})

const technologiesArray = computed(() => {
  return technologiesInput.value.split(',').map(t => t.trim()).filter(t => t)
})

// Sincronizar datos cuando cambian
watch(() => props.project, (newProject) => {
  if (newProject && !props.isNew) {
    formData.value = {
      title: newProject.title || '',
      description: newProject.description || '',
      summary: newProject.summary || ''
    }
    commonData.value = {
      status: newProject.status || 'IN_PROGRESS',
      provider: newProject.provider || '',
      providerFull: newProject.providerFull || '',
      version: newProject.version || '1.0.0',
      github: newProject.github || '',
      image: newProject.image || '',
      featured: newProject.featured || false,
      architecture: newProject.architecture || ''
    }
    tagsInput.value = (newProject.tags || []).join(', ')
    technologiesInput.value = (newProject.technologies || []).join(', ')
    projectId.value = newProject.id || ''
  }
}, { immediate: true })

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    if (props.isNew) {
      // Resetear para nuevo proyecto
      formData.value = { title: '', description: '', summary: '' }
      commonData.value = {
        status: 'IN_PROGRESS',
        provider: '',
        providerFull: '',
        version: '1.0.0',
        github: '',
        image: '',
        featured: false,
        architecture: ''
      }
      tagsInput.value = ''
      technologiesInput.value = ''
      projectId.value = ''
    }
    error.value = null
    success.value = false
  }
})

const close = () => {
  error.value = null
  success.value = false
  loading.value = false
  emit('close')
}

const handleSave = async () => {
  try {
    loading.value = true
    error.value = null
    success.value = false

    if (!auth.currentUser) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.')
    }

    const finalProjectId = props.isNew ? projectId.value : props.project.id
    
    if (!finalProjectId) {
      throw new Error('El ID del proyecto es requerido')
    }

    await saveProject(
      finalProjectId,
      locale.value,
      formData.value,
      {
        ...commonData.value,
        tags: tagsArray.value,
        technologies: technologiesArray.value
      },
      auth
    )

    success.value = true
    setTimeout(() => {
      emit('saved')
      close()
    }, 1000)
  } catch (err) {
    error.value = err.message || 'Error al guardar el proyecto'
    console.error('Error saving project:', err)
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
