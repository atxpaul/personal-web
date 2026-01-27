<template>
    <div
        class="flex-grow flex flex-col items-center justify-center px-4 py-8 md:px-8"
    >
        <div class="w-full max-w-5xl relative">
            <Terminal :profile="profile" />
            
            <!-- Botón de edición para admin (esquina inferior derecha del Terminal) -->
            <AdminOnly>
                <button
                    @click="showEditModal = true"
                    class="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 z-10 shadow-lg"
                >
                    <span class="material-symbols-outlined text-sm">edit</span>
                    <span>Editar</span>
                </button>
            </AdminOnly>
        </div>

        <div class="w-full max-w-5xl mt-12 mb-8">
            <div class="flex items-center gap-2 mb-6">
                <span class="text-primary font-bold text-lg">&gt;&gt;</span>
                <h3 class="text-white text-xl font-bold">{{
                    $t('projects.latestDeployment')
                }}</h3>
            </div>

            <ProjectCard
                v-if="project"
                :project="project"
                @view-source="handleViewSource"
            />

            <div v-if="loading" class="text-center text-gray-500 py-8">
                Loading...
            </div>

            <div v-if="error" class="text-center text-red-500 py-8">
                {{ error }}
            </div>
        </div>

        <!-- Modal de edición -->
        <EditConfigModal
            :is-open="showEditModal"
            :initial-data="profile"
            @close="showEditModal = false"
            @saved="handleConfigSaved"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Terminal from '../components/Terminal.vue';
import ProjectCard from '../components/ProjectCard.vue';
import EditConfigModal from '../components/EditConfigModal.vue';
import AdminOnly from '../components/AdminOnly.vue';
import { useData } from '../composables/useData.js';
import { useAdmin } from '../composables/useAuth.js';
import { getSiteConfig } from '../data/firestore.js';
import { getProfileData } from '../data/static.js';

const { locale } = useI18n()
const { project, loading, error, reload } = useData();
const { isAdmin } = useAdmin();
const showEditModal = ref(false)
const profile = ref(null)

// Cargar datos de Firestore con fallback a static
const loadProfileData = async () => {
  try {
    // Intentar cargar desde Firestore
    const firestoreData = await getSiteConfig(locale.value)
    if (firestoreData) {
      profile.value = firestoreData
      return
    }
  } catch (err) {
    console.warn('Error loading from Firestore, using static data:', err)
  }
  
  // Fallback a datos estáticos
  const staticData = await getProfileData()
  if (staticData) {
    profile.value = staticData
  }
}

// Cargar datos cuando cambia el idioma
watch(locale, () => {
  loadProfileData()
}, { immediate: true })

const handleConfigSaved = () => {
  // Recargar datos después de guardar
  loadProfileData()
}

const handleViewSource = (project) => {
    if (project.github) {
        window.open(project.github, '_blank', 'noopener,noreferrer');
    }
};
</script>
