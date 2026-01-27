<template>
  <div class="flex-grow flex flex-col items-center px-4 py-8 md:px-8 relative">
    <!-- Botón de crear nuevo proyecto (solo admin) -->
    <AdminOnly>
      <button
        @click="handleNewProject"
        class="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-lg z-50"
      >
        <span class="material-symbols-outlined text-lg">add</span>
        <span>Nuevo Proyecto</span>
      </button>
    </AdminOnly>

    <!-- Hero / Search Section -->
    <div class="w-full max-w-6xl mb-10">
      <div class="flex flex-col gap-6 md:flex-row md:items-end justify-between">
        <div class="flex flex-col gap-2">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            <span class="text-primary">ls</span> -la ./projects
          </h1>
          <p class="text-gray-400 max-w-2xl text-base md:text-lg">
            Explorando soluciones de infraestructura como código, orquestación de contenedores y pipelines de automatización.
          </p>
        </div>
      </div>
      
      <!-- Command Input -->
      <div class="mt-8 relative group">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
        <div class="relative flex items-center bg-console-bg border border-console-border rounded-lg p-1">
          <div class="flex items-center pl-4 pr-2 text-green-400 font-mono text-lg">
            $
          </div>
          <input 
            v-model="searchQuery"
            @input="handleSearch"
            class="w-full bg-transparent border-none text-white focus:ring-0 placeholder-gray-600 font-mono text-base h-12" 
            placeholder="grep --filter='kubernetes'..." 
            type="text"
          />
          <button 
            @click="executeSearch"
            class="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">play_arrow</span>
            EXECUTE
          </button>
        </div>
      </div>
      
      <!-- Chips / Filters -->
      <div class="flex flex-wrap gap-3 mt-6">
        <button 
          @click="setFilter('all')"
          class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
          :class="activeFilter === 'all' 
            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white' 
            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'"
        >
          <span class="material-symbols-outlined text-[16px]">check_circle</span>
          --all
        </button>
        <button 
          @click="setFilter('azure')"
          class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
          :class="activeFilter === 'azure' 
            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white' 
            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'"
        >
          <span class="material-symbols-outlined text-[16px]">cloud</span>
          --azure
        </button>
        <button 
          @click="setFilter('aws')"
          class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
          :class="activeFilter === 'aws' 
            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white' 
            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'"
        >
          <span class="material-symbols-outlined text-[16px]">cloud</span>
          --aws
        </button>
        <button 
          @click="setFilter('docker')"
          class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
          :class="activeFilter === 'docker' 
            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white' 
            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'"
        >
          <span class="material-symbols-outlined text-[16px]">deployed_code</span>
          --docker
        </button>
        <button 
          @click="setFilter('kubernetes')"
          class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
          :class="activeFilter === 'kubernetes' 
            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white' 
            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'"
        >
          <span class="material-symbols-outlined text-[16px]">hub</span>
          --kubernetes
        </button>
        <button 
          @click="setFilter('terraform')"
          class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
          :class="activeFilter === 'terraform' 
            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white' 
            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'"
        >
          <span class="material-symbols-outlined text-[16px]">settings</span>
          --terraform
        </button>
      </div>
    </div>
    
    <!-- Featured Project (High Priority) - Solo se muestra si no hay filtros activos -->
    <div v-if="featuredProject && !hasActiveFilters" class="w-full max-w-6xl mb-12">
      <div class="border border-console-border rounded-xl bg-console-bg overflow-hidden relative">
        <!-- Header simulating window -->
        <div class="bg-[#161b22] border-b border-console-border px-4 py-2 flex items-center gap-2">
          <div class="flex gap-1.5">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div class="ml-4 text-xs text-gray-500 font-mono">featured_project_v2.yml</div>
        </div>
        <div class="flex flex-col lg:flex-row">
          <!-- Text Content -->
          <div class="p-6 lg:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <span class="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                  STATUS: {{ featuredProject.status }}
                </span>
                <span v-if="featuredProject.provider" class="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  PROVIDER: {{ featuredProject.provider }}
                </span>
              </div>
              <h3 
                @click="goToProject(featuredProject.id)"
                class="text-2xl font-bold text-white mb-2 cursor-pointer hover:text-primary transition-colors"
              >
                {{ featuredProject.title }}
              </h3>
              <p class="text-gray-400 mb-6 leading-relaxed">
                {{ featuredProject.description }}
              </p>
              <!-- Tech Stack grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div 
                  v-for="tech in featuredProject.technologies" 
                  :key="tech"
                  class="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span class="material-symbols-outlined text-primary text-[18px]">dns</span>
                  {{ tech }}
                </div>
              </div>
            </div>
            <div class="flex gap-4">
              <button 
                v-if="featuredProject.github"
                @click="openGitHub(featuredProject.github)"
                class="flex-1 bg-primary hover:bg-blue-600 text-white py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-[20px]">code</span>
                Ver Código
              </button>
              
              <!-- Botones de admin para proyecto destacado -->
              <AdminOnly>
                <button
                  @click="handleEditProject(featuredProject)"
                  class="bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                  title="Editar proyecto"
                >
                  <span class="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button
                  @click="handleDeleteProject(featuredProject)"
                  class="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                  title="Eliminar proyecto"
                >
                  <span class="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </AdminOnly>
            </div>
          </div>
          <!-- Image/Visual -->
          <div v-if="featuredProject.image" class="lg:w-1/2 bg-black relative min-h-[300px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-console-border">
            <div 
              class="absolute inset-0 bg-cover bg-center opacity-80" 
              :style="{ backgroundImage: `url('${featuredProject.image}')` }"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-t from-console-bg to-transparent"></div>
            <!-- Overlay Code Snippet Aesthetic -->
            <div class="absolute bottom-4 left-4 right-4 bg-[#161b22]/90 backdrop-blur-sm border border-console-border rounded p-3 font-mono text-xs text-gray-400 overflow-hidden">
              <div class="flex gap-2">
                <span class="text-primary">resource</span> "google_container_cluster" "primary" {<br/>
                &nbsp;&nbsp;name     = <span class="text-green-400">"devops-cluster"</span><br/>
                &nbsp;&nbsp;location = <span class="text-green-400">"us-central1"</span><br/>
                &nbsp;&nbsp;initial_node_count = 3<br/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Secondary Projects Grid -->
    <div class="w-full max-w-6xl">
      <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span class="text-primary material-symbols-outlined">folder_open</span>
        Otros Repositorios
      </h3>
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="group relative bg-console-bg border border-console-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(25,127,230,0.1)] flex flex-col h-full"
        >
          <!-- Botones de admin -->
          <AdminOnly>
            <div class="absolute top-3 right-3 flex gap-2 z-10">
              <button
                @click.stop="handleEditProject(project)"
                class="bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary p-1.5 rounded transition-colors"
                title="Editar proyecto"
              >
                <span class="material-symbols-outlined text-sm">edit</span>
              </button>
              <button
                @click.stop="handleDeleteProject(project)"
                class="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 p-1.5 rounded transition-colors"
                title="Eliminar proyecto"
              >
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </AdminOnly>

          <div class="flex items-start justify-between mb-4">
            <div class="p-2 bg-[#161b22] rounded-lg border border-console-border group-hover:border-primary/30 text-white">
              <span class="material-symbols-outlined">{{ project.icon || 'folder' }}</span>
            </div>
            <span class="text-xs font-mono text-gray-500">{{ formatDate(project.updatedAt) }}</span>
          </div>
          <h4 
            @click="goToProject(project.id)"
            class="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors cursor-pointer"
          >
            {{ project.title }}
          </h4>
          <p class="text-sm text-gray-400 mb-4 flex-grow">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="text-[10px] px-1.5 py-0.5 rounded bg-[#161b22] border border-console-border text-gray-300"
            >
              {{ tech }}
            </span>
          </div>
          <a 
            v-if="project.github"
            @click.prevent="openGitHub(project.github)"
            class="text-sm font-medium text-primary flex items-center gap-1 hover:underline cursor-pointer"
          >
            cd ./repo <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 py-12">
        <p>No se encontraron proyectos con los filtros seleccionados.</p>
      </div>
    </div>

    <!-- Modales -->
    <EditProjectModal
      :is-open="showEditModal"
      :project="selectedProject"
      :is-new="isNewProject"
      @close="closeEditModal"
      @saved="handleProjectSaved"
    />

    <DeleteConfirmModal
      :is-open="showDeleteModal"
      :project-id="selectedProjectId"
      :project-title="selectedProjectTitle"
      @close="showDeleteModal = false"
      @deleted="handleProjectDeleted"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProjects as getStaticProjects } from '../data/static.js'
import { getProjects as getFirestoreProjects } from '../data/firestore.js'
import { useAdmin } from '../composables/useAuth.js'
import EditProjectModal from '../components/EditProjectModal.vue'
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue'
import AdminOnly from '../components/AdminOnly.vue'

const router = useRouter()
const { locale } = useI18n()
const { isAdmin } = useAdmin()

const projects = ref([])
const searchQuery = ref('')
const activeFilter = ref('all')
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedProject = ref(null)
const selectedProjectId = ref('')
const selectedProjectTitle = ref('')
const isNewProject = ref(false)

const featuredProject = computed(() => {
  // Obtener el primer proyecto con featured: true
  return projects.value.find(p => p.featured) || null
})

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() !== '' || activeFilter.value !== 'all'
})

const filteredProjects = computed(() => {
  // Si hay filtros activos, incluir también el featured en los resultados filtrados
  let filtered = hasActiveFilters.value 
    ? [...projects.value] // Incluir todos (incluido featured)
    : projects.value.filter(p => !p.featured) // Sin filtros: excluir el featured
  
  // Filtrar por búsqueda de texto
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      p.technologies?.some(tech => tech.toLowerCase().includes(query))
    )
  }
  
  // Filtrar por tag/tecnología
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(p => 
      p.tags?.some(tag => tag.toLowerCase() === activeFilter.value.toLowerCase()) ||
      p.technologies?.some(tech => tech.toLowerCase().includes(activeFilter.value.toLowerCase()))
    )
  }
  
  return filtered
})

const setFilter = (filter) => {
  activeFilter.value = filter
  searchQuery.value = '' // Limpiar búsqueda al cambiar filtro
}

const handleSearch = () => {
  // La búsqueda se actualiza automáticamente con v-model
  // Podemos resetear el filtro si hay búsqueda
  if (searchQuery.value.trim()) {
    activeFilter.value = 'all'
  }
}

const executeSearch = () => {
  // La búsqueda ya se ejecuta automáticamente con v-model
  // Este botón puede usarse para acciones adicionales si es necesario
}

const goToProject = (projectId) => {
  // Navegar a la descripción del proyecto
  router.push(`/projects/${projectId}`)
}

const openGitHub = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return '1d ago'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

// Cargar proyectos desde Firestore con fallback a static
const loadProjects = async () => {
  try {
    // Intentar cargar desde Firestore
    const firestoreProjects = await getFirestoreProjects(locale.value)
    if (firestoreProjects && firestoreProjects.length > 0) {
      projects.value = firestoreProjects
      return
    }
  } catch (err) {
    console.warn('Error loading from Firestore, using static data:', err)
  }
  
  // Fallback a datos estáticos
  const staticProjects = await getStaticProjects()
  if (staticProjects) {
    projects.value = staticProjects
  }
}

// Cargar proyectos cuando cambia el idioma
watch(locale, () => {
  loadProjects()
}, { immediate: true })

// Funciones de gestión de proyectos (admin)
const handleNewProject = () => {
  selectedProject.value = null
  isNewProject.value = true
  showEditModal.value = true
}

const handleEditProject = (project) => {
  selectedProject.value = project
  isNewProject.value = false
  showEditModal.value = true
}

const handleDeleteProject = (project) => {
  selectedProjectId.value = project.id
  selectedProjectTitle.value = project.title
  showDeleteModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedProject.value = null
  isNewProject.value = false
}

const handleProjectSaved = () => {
  // Recargar proyectos después de guardar
  loadProjects()
}

const handleProjectDeleted = () => {
  // Recargar proyectos después de eliminar
  loadProjects()
}

onMounted(async () => {
  await loadProjects()
})
</script>
