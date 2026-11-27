<template>
    <div class="flex-grow py-8 md:py-14">
        <div class="page">
            <div class="relative">
                <Terminal :profile="profile" :info="contactInfo" :stack="stack" />

                <!-- Botón de edición para admin (esquina inferior derecha del Terminal) -->
                <AdminOnly>
                    <button
                        type="button"
                        @click="showEditModal = true"
                        class="btn btn-primary absolute bottom-4 right-4 h-8 px-3 text-xs z-10 shadow-lg"
                    >
                        <span aria-hidden="true" class="material-symbols-outlined text-sm">edit</span>
                        <span>Editar</span>
                    </button>
                </AdminOnly>
            </div>

            <!-- Proyecto destacado: se oculta entero si no hay ninguno -->
            <section
                v-if="loading || project"
                class="mt-16 md:mt-24"
                :aria-busy="loading"
                aria-labelledby="latest-deployment"
            >
                <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
                    <h2
                        id="latest-deployment"
                        class="flex items-baseline gap-3 font-display text-2xl md:text-3xl font-bold tracking-[-0.02em] text-white"
                    >
                        <span class="font-mono text-primary text-xl" aria-hidden="true"
                            >&gt;&gt;</span
                        >
                        {{ $t('projects.latestDeployment') }}
                    </h2>
                    <router-link to="/projects" class="cmd-link">
                        ls ./projects
                        <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                            >arrow_forward</span
                        >
                    </router-link>
                </div>

                <ProjectCard v-if="project" :project="project" />

                <p
                    v-else
                    role="status"
                    class="pane font-mono text-sm text-console-muted py-16 text-center"
                >
                    {{ $t('common.loading') }}<span class="cursor-blink">_</span>
                </p>
            </section>
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
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Terminal from '../components/Terminal.vue';
import ProjectCard from '../components/ProjectCard.vue';
import EditConfigModal from '../components/EditConfigModal.vue';
import AdminOnly from '../components/AdminOnly.vue';
import {
    getSiteConfig,
    getProjects as getFirestoreProjects,
    getAboutMe,
    getTechStack as getFirestoreTechStack,
} from '../data/firestore.js';
import {
    getProjects as getStaticProjects,
    getContactInfo,
    getTechStack as getStaticTechStack,
} from '../data/static.js';

const { locale } = useI18n();
const showEditModal = ref(false);
const profile = ref(null);
const project = ref(null);
const loading = ref(true);
const contactInfo = ref(null);
const techStack = ref(null);

// Stack plano para el panel neofetch
const stack = computed(() =>
    Object.values(techStack.value || {})
        .filter(Array.isArray)
        .flat()
        .filter((tech) => tech?.name),
);

// Cada carga recibe un número; si el idioma cambia a mitad de una carga,
// la respuesta antigua se descarta en lugar de pisar a la nueva.
let profileRequest = 0;
let projectRequest = 0;
let contactRequest = 0;

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

// Ubicación y estado para neofetch: estático al instante, Firestore si existe
const loadContactInfo = async () => {
    const requestId = ++contactRequest;
    if (!contactInfo.value) contactInfo.value = await getContactInfo();
    try {
        const about = await getAboutMe(locale.value);
        if (requestId === contactRequest && about?.contactInfo) {
            contactInfo.value = about.contactInfo;
        }
    } catch (err) {
        console.warn('Error loading contact info from Firestore:', err);
    }
};

const loadTechStack = async () => {
    techStack.value = await getStaticTechStack();
    try {
        const remote = await getFirestoreTechStack();
        if (remote) techStack.value = remote;
    } catch (err) {
        console.warn('Error loading tech stack from Firestore:', err);
    }
};

// Carga inicial y recarga cuando cambia el idioma
watch(
    locale,
    () => {
        loadProfileData();
        loadFeaturedProject();
        loadContactInfo();
    },
    { immediate: true },
);

onMounted(loadTechStack);

const handleConfigSaved = () => {
    loadProfileData();
};
</script>
