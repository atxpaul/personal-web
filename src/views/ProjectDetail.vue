<template>
    <main
        class="flex-grow flex flex-col items-center py-8 px-4 md:px-10 lg:px-20"
    >
        <!-- Breadcrumb -->
        <div
            class="w-full max-w-6xl mb-6 flex items-center gap-2 font-mono text-sm text-gray-500"
        >
            <router-link
                to="/projects"
                class="hover:text-primary transition-colors flex items-center gap-1"
            >
                <span class="material-symbols-outlined text-base"
                    >arrow_back</span
                >
                cd ..
            </router-link>
            <span>/</span>
            <span class="text-white">{{ project?.id || 'loading' }}.yml</span>
        </div>

        <!-- Project Detail Card -->
        <div
            v-if="project"
            class="w-full max-w-6xl bg-console-bg border border-console-border rounded-lg shadow-2xl overflow-hidden flex flex-col mb-16 relative group"
        >
            <!-- Header -->
            <div
                class="bg-[#161b22] border-b border-console-border flex items-center justify-between px-4 py-2 select-none"
            >
                <div class="flex items-center gap-2">
                    <div class="flex gap-1.5 mr-4">
                        <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div
                        class="flex items-center bg-console-bg border-t border-x border-console-border rounded-t px-3 py-1 text-xs text-gray-300 font-mono relative top-[5px]"
                    >
                        <span
                            class="material-symbols-outlined text-[14px] mr-2 text-yellow-500"
                            >description</span
                        >
                        project_detail.yml
                        <span
                            @click="goBack"
                            class="ml-2 hover:text-white cursor-pointer"
                            >×</span
                        >
                    </div>
                </div>
                <div class="text-xs font-mono text-gray-500">vim</div>
            </div>

            <!-- Content -->
            <div
                class="flex flex-col md:flex-row overflow-x-auto min-h-[600px] relative"
            >
                <!-- Line Numbers -->
                <div
                    class="hidden md:flex flex-col items-end px-3 py-6 bg-console-bg border-r border-console-border text-gray-600 font-mono text-sm leading-6 select-none min-w-[3rem]"
                >
                    <span v-for="n in 40" :key="n">{{ n }}</span>
                </div>

                <!-- Code Content -->
                <div
                    class="flex-1 p-4 md:p-6 font-mono text-sm md:text-base leading-6 text-gray-300 overflow-x-auto"
                >
                    <div class="space-y-1">
                        <div><span class="text-gray-500">---</span></div>
                        <div>
                            <span class="text-syntax-key">project</span>:
                            <span class="text-secondary"
                                >"{{ project.title }}"</span
                            >
                        </div>
                        <div>
                            <span class="text-syntax-key">version</span>:
                            <span class="text-accent">{{
                                project.version || '1.0.0'
                            }}</span>
                        </div>
                        <div>
                            <span class="text-syntax-key">status</span>:
                            <span
                                class="px-1 rounded text-xs border"
                                :class="
                                    project.status === 'DEPLOYED'
                                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                "
                            >
                                {{ project.status }}
                            </span>
                        </div>
                        <div v-if="project.providerFull || project.provider">
                            <span class="text-syntax-key">provider</span>:
                            <span class="text-secondary"
                                >"{{
                                    project.providerFull || project.provider
                                }}"</span
                            >
                        </div>
                        <div class="h-4"></div>

                        <div>
                            <span class="text-syntax-key">summary</span>:
                            <span class="text-syntax-string">|</span>
                        </div>
                        <div
                            class="pl-4 text-gray-400 border-l-2 border-console-border ml-1 mb-2 whitespace-pre-line"
                        >
                            {{ project.summary || project.description }}
                        </div>

                        <div class="h-4"></div>

                        <div>
                            <span class="text-syntax-key">tech_stack</span>:
                        </div>
                        <div
                            class="pl-4 grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 max-w-2xl"
                        >
                            <div
                                v-for="tech in techStackList"
                                :key="tech.name"
                                class="flex items-center gap-2 group hover:bg-[#161b22] p-1 rounded transition-colors cursor-default"
                            >
                                <span class="text-gray-500">-</span>
                                <span
                                    class="material-symbols-outlined text-[16px] text-primary"
                                    >{{ tech.icon || 'dns' }}</span
                                >
                                <span class="text-syntax-string">{{
                                    tech.name
                                }}</span>
                                <span
                                    v-if="tech.comment"
                                    class="text-syntax-comment text-xs italic opacity-0 group-hover:opacity-100"
                                >
                                    // {{ tech.comment }}
                                </span>
                            </div>
                        </div>

                        <div v-if="project.architecture" class="h-4"></div>

                        <div v-if="project.architecture">
                            <span class="text-syntax-key">architecture</span>:
                            <span class="text-syntax-string">|-</span>
                        </div>
                        <div
                            v-if="project.architecture"
                            class="pl-4 mt-2 overflow-x-auto pb-4"
                        >
                            <pre
                                class="architecture-diagram text-blue-400 select-none m-0 p-0"
                                >{{ architectureText }}</pre
                            >
                        </div>

                        <div class="h-4"></div>

                        <div> <span class="text-syntax-key">links</span>: </div>
                        <div class="pl-4 mt-2 flex flex-wrap gap-4">
                            <a
                                v-if="project.github"
                                @click.prevent="openGitHub(project.github)"
                                class="group relative inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-console-border rounded hover:border-primary hover:text-white text-gray-300 transition-all cursor-pointer"
                            >
                                <span
                                    class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                                ></span>
                                <span
                                    class="material-symbols-outlined text-[18px]"
                                    >code</span
                                >
                                <span>./view_repo.sh</span>
                            </a>
                        </div>

                        <div class="h-4"></div>
                        <div class="blinking-cursor text-primary"
                            >$ <span class="text-gray-500">_</span></div
                        >
                    </div>
                </div>
            </div>

            <!-- Footer Status Bar -->
            <div
                class="bg-primary text-white text-xs font-mono py-1 px-4 flex justify-between items-center z-10"
            >
                <div class="flex gap-4 font-bold">
                    <span>NORMAL</span>
                    <span class="font-normal text-white/80"
                        >{{ project.id }}.yml</span
                    >
                </div>
                <div class="flex gap-4">
                    <span>utf-8</span>
                    <span>yaml</span>
                    <span>100%</span>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div
            v-if="loading"
            class="w-full max-w-6xl text-center text-gray-400 py-12"
        >
            <p>Loading project...</p>
        </div>

        <!-- Error State -->
        <div
            v-if="error"
            class="w-full max-w-6xl text-center text-red-400 py-12"
        >
            <p>{{ error }}</p>
        </div>

        <!-- Related Projects -->
        <div v-if="relatedProjects.length > 0" class="w-full max-w-6xl">
            <div
                class="flex items-center gap-3 mb-6 border-b border-console-border pb-2"
            >
                <span class="material-symbols-outlined text-primary"
                    >history</span
                >
                <h3 class="text-xl font-bold text-white font-mono"
                    >Related Logs</h3
                >
                <span class="text-gray-600 font-mono text-sm ml-auto"
                    >ls -t | head -n {{ relatedProjects.length }}</span
                >
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="related in relatedProjects"
                    :key="related.id"
                    class="group relative bg-console-bg border border-console-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(25,127,230,0.1)] flex flex-col h-full"
                >
                    <div class="flex items-start justify-between mb-4">
                        <div
                            class="p-2 bg-[#161b22] rounded-lg border border-console-border group-hover:border-primary/30 text-white"
                        >
                            <span class="material-symbols-outlined">{{
                                related.icon || 'folder'
                            }}</span>
                        </div>
                        <span class="text-xs font-mono text-gray-500">{{
                            formatDate(related.updatedAt)
                        }}</span>
                    </div>
                    <h4
                        @click="goToProject(related.id)"
                        class="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors cursor-pointer font-mono"
                    >
                        {{ related.title }}
                    </h4>
                    <p class="text-sm text-gray-400 mb-4 flex-grow">
                        {{ related.description }}
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span
                            v-for="tech in related.technologies?.slice(0, 3)"
                            :key="tech"
                            class="text-[10px] px-1.5 py-0.5 rounded bg-[#161b22] border border-console-border text-gray-300 font-mono"
                        >
                            {{ tech }}
                        </span>
                    </div>
                    <a
                        v-if="related.github"
                        @click.prevent="openGitHub(related.github)"
                        class="text-sm font-medium text-primary flex items-center gap-1 hover:underline cursor-pointer font-mono"
                    >
                        cd ./repo
                        <span class="material-symbols-outlined text-[16px]"
                            >arrow_forward</span
                        >
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
    getProjectById as getFirestoreProjectById,
    getProjects as getFirestoreProjects,
    getRelatedProjects as getFirestoreRelatedProjects,
} from '../data/firestore.js';
import {
    getProjectById as getStaticProjectById,
    getRelatedProjects as getStaticRelatedProjects,
} from '../data/static.js';
import { useAdmin } from '../composables/useAuth.js';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const { isAdmin } = useAdmin();

// TODO: Añadir funcionalidades de edición para admin
// - Botón de editar proyecto
// - Editar todos los campos del proyecto
// - Eliminar proyecto
// - Cambiar estado (deployed/in progress)

const project = ref(null);
const relatedProjects = ref([]);
const loading = ref(true);
const error = ref(null);

const loadProjectData = async (projectId) => {
    try {
        loading.value = true;
        error.value = null;

        // Intentar cargar desde Firestore primero
        let projectData = null;
        let relatedData = [];

        try {
            projectData = await getFirestoreProjectById(
                projectId,
                locale.value,
            );
            if (projectData) {
                // Si encontramos el proyecto en Firestore, buscar relacionados también desde Firestore
                relatedData = await getFirestoreRelatedProjects(
                    projectId,
                    locale.value,
                    3,
                );
            }
        } catch (firestoreErr) {
            console.warn(
                'Error loading from Firestore, trying static data:',
                firestoreErr,
            );
        }

        // Fallback a datos estáticos si no se encontró en Firestore
        if (!projectData) {
            projectData = await getStaticProjectById(projectId);
            if (projectData) {
                relatedData = await getStaticRelatedProjects(projectId, 3);
            }
        }

        if (!projectData) {
            error.value = 'Project not found';
            project.value = null;
            relatedProjects.value = [];
            return;
        }

        project.value = projectData;
        relatedProjects.value = relatedData;
    } catch (err) {
        error.value = err.message || 'Error loading project';
        console.error('Error loading project:', err);
        project.value = null;
        relatedProjects.value = [];
    } finally {
        loading.value = false;
    }
};

const techStackList = computed(() => {
    if (!project.value) return [];

    // Si tiene techStack con iconos y comentarios, usarlo
    if (project.value.techStack && Array.isArray(project.value.techStack)) {
        return project.value.techStack;
    }

    // Si no, crear lista básica desde technologies
    return (
        project.value.technologies?.map((tech) => ({
            name: tech,
            icon: 'dns',
            comment: null,
        })) || []
    );
});

const architectureText = computed(() => {
    if (!project.value?.architecture) return '';
    // Preservar exactamente el formato ASCII
    return project.value.architecture;
});

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1d ago';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
};

const goBack = () => {
    router.push('/projects');
};

const goToProject = (projectId) => {
    router.push(`/projects/${projectId}`);
};

const openGitHub = (url) => {
    if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
};

// Cargar datos cuando cambia el ID del proyecto o el idioma
watch(
    () => route.params.id,
    async (newId) => {
        if (newId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            await loadProjectData(newId);
        }
    },
    { immediate: true },
);

// Recargar cuando cambia el idioma
watch(locale, async () => {
    if (route.params.id) {
        await loadProjectData(route.params.id);
    }
});

onMounted(() => {
    // Scroll al inicio cuando se monta por primera vez
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>
