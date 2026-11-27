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
                    <span aria-hidden="true" class="material-symbols-outlined text-sm">edit</span>
                    <span>Editar</span>
                </button>
            </AdminOnly>
        </div>

        <!-- Proyecto destacado: se oculta entero si no hay ninguno -->
        <section
            v-if="loading || project"
            class="w-full max-w-5xl mt-12 mb-8"
            :aria-busy="loading"
        >
            <div class="flex items-center gap-2 mb-6">
                <span class="text-primary font-bold text-lg" aria-hidden="true"
                    >&gt;&gt;</span
                >
                <h2 class="text-white text-xl font-bold">{{
                    $t('projects.latestDeployment')
                }}</h2>
            </div>

            <ProjectCard v-if="project" :project="project" />

            <p
                v-else
                role="status"
                class="font-mono text-sm text-gray-500 py-8 text-center"
            >
                {{ $t('common.loading') }}
            </p>
        </section>

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
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Terminal from '../components/Terminal.vue';
import ProjectCard from '../components/ProjectCard.vue';
import EditConfigModal from '../components/EditConfigModal.vue';
import AdminOnly from '../components/AdminOnly.vue';
import {
    getSiteConfig,
    getProjects as getFirestoreProjects,
} from '../data/firestore.js';
import { getProjects as getStaticProjects } from '../data/static.js';

const { locale } = useI18n();
const showEditModal = ref(false);
const profile = ref(null);
const project = ref(null);
const loading = ref(true);

// Cada carga recibe un número; si el idioma cambia a mitad de una carga,
// la respuesta antigua se descarta en lugar de pisar a la nueva.
let profileRequest = 0;
let projectRequest = 0;

// Perfil desde Firestore. Si no hay datos, profile queda en null y el
// Terminal muestra los textos traducidos de i18n (en el idioma del visitante).
const loadProfileData = async () => {
    const requestId = ++profileRequest;
    let data = null;
    try {
        data = await getSiteConfig(locale.value);
    } catch (err) {
        console.warn('Error loading site config from Firestore:', err);
    }
    if (requestId === profileRequest) {
        profile.value = data || null;
    }
};

// Proyecto destacado desde Firestore con fallback a static
const loadFeaturedProject = async () => {
    const requestId = ++projectRequest;
    loading.value = true;
    let featured = null;

    try {
        const projects = await getFirestoreProjects(locale.value);
        featured = projects?.find((p) => p.featured) || null;
    } catch (err) {
        console.warn('Error loading from Firestore, trying static data:', err);
    }

    if (!featured) {
        try {
            const staticProjects = await getStaticProjects();
            featured = staticProjects?.find((p) => p.featured) || null;
        } catch (err) {
            console.error('Error loading featured project:', err);
        }
    }

    if (requestId === projectRequest) {
        project.value = featured;
        loading.value = false;
    }
};

// Carga inicial y recarga cuando cambia el idioma
watch(
    locale,
    () => {
        loadProfileData();
        loadFeaturedProject();
    },
    { immediate: true },
);

const handleConfigSaved = () => {
    loadProfileData();
};
</script>
