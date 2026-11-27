<template>
    <div
        class="flex-grow flex flex-col items-center px-4 py-8 md:px-8 relative"
    >
        <!-- Botón de crear nuevo proyecto (solo admin) -->
        <AdminOnly>
            <button
                @click="handleNewProject"
                class="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-lg z-50"
            >
                <span aria-hidden="true" class="material-symbols-outlined text-lg">add</span>
                <span>Nuevo Proyecto</span>
            </button>
        </AdminOnly>

        <!-- Hero / Search Section -->
        <div class="w-full max-w-6xl mb-10">
            <div
                class="flex flex-col gap-6 md:flex-row md:items-end justify-between"
            >
                <div class="flex flex-col gap-2">
                    <h1
                        class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2"
                    >
                        <span class="text-primary">ls</span> -la ./projects
                    </h1>
                    <p class="text-gray-400 max-w-2xl text-base md:text-lg">
                        {{ projectsSubtitle || $t('projects.subtitleDefault') }}
                    </p>
                </div>
            </div>

            <!-- Command Input -->
            <div class="mt-8 relative group">
                <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-200"
                ></div>
                <form
                    role="search"
                    class="relative flex items-center bg-console-bg border border-console-border rounded-lg p-1 focus-within:border-primary/60 transition-colors"
                    @submit.prevent="executeSearch"
                >
                    <div
                        class="flex items-center pl-4 pr-2 text-green-400 font-mono text-lg"
                    >
                        $
                    </div>
                    <input
                        v-model="searchQuery"
                        @input="handleSearch"
                        class="w-full min-w-0 bg-transparent border-none text-white focus:ring-0 focus:outline-none placeholder-gray-500 font-mono text-base h-12"
                        placeholder="grep --filter='kubernetes'..."
                        type="search"
                        maxlength="100"
                        autocomplete="off"
                        spellcheck="false"
                        :aria-label="$t('projects.searchLabel')"
                    />
                    <button
                        type="submit"
                        class="shrink-0 bg-primary hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                            >play_arrow</span
                        >
                        EXECUTE
                    </button>
                </form>
            </div>

            <!-- Botón de editar subtítulo (solo admin) -->
            <div class="flex justify-end mt-6">
                <AdminOnly>
                    <button
                        @click="handleEditSubtitle"
                        class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors bg-console-bg border border-console-border text-gray-400 hover:border-primary hover:text-primary"
                        title="Editar subtítulo"
                    >
                        <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                            >edit</span
                        >
                        Editar subtítulo
                    </button>
                </AdminOnly>
            </div>

            <!-- Chips / Filters -->
            <div
                class="flex flex-wrap gap-3 mt-6"
                role="group"
                :aria-label="$t('projects.filterLabel')"
            >
                <button
                    type="button"
                    :aria-pressed="activeFilter === 'all'"
                    @click="setFilter('all')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
                    :class="
                        activeFilter === 'all'
                            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'
                    "
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                        >check_circle</span
                    >
                    --all
                </button>
                <button
                    type="button"
                    :aria-pressed="activeFilter === 'azure'"
                    @click="setFilter('azure')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
                    :class="
                        activeFilter === 'azure'
                            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'
                    "
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                        >cloud</span
                    >
                    --azure
                </button>
                <button
                    type="button"
                    :aria-pressed="activeFilter === 'aws'"
                    @click="setFilter('aws')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
                    :class="
                        activeFilter === 'aws'
                            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'
                    "
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                        >cloud</span
                    >
                    --aws
                </button>
                <button
                    type="button"
                    :aria-pressed="activeFilter === 'docker'"
                    @click="setFilter('docker')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
                    :class="
                        activeFilter === 'docker'
                            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'
                    "
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                        >deployed_code</span
                    >
                    --docker
                </button>
                <button
                    type="button"
                    :aria-pressed="activeFilter === 'kubernetes'"
                    @click="setFilter('kubernetes')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
                    :class="
                        activeFilter === 'kubernetes'
                            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'
                    "
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                        >hub</span
                    >
                    --kubernetes
                </button>
                <button
                    type="button"
                    :aria-pressed="activeFilter === 'terraform'"
                    @click="setFilter('terraform')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
                    :class="
                        activeFilter === 'terraform'
                            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'
                    "
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                        >settings</span
                    >
                    --terraform
                </button>
                <button
                    type="button"
                    :aria-pressed="activeFilter === 'python'"
                    @click="setFilter('python')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
                    :class="
                        activeFilter === 'python'
                            ? 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                            : 'bg-console-bg border border-console-border text-gray-400 hover:border-gray-500 hover:text-white'
                    "
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                        >code</span
                    >
                    --python
                </button>
            </div>
        </div>

        <!-- Featured Project (High Priority) - Solo se muestra si no hay filtros activos -->
        <div
            v-if="featuredProject && !hasActiveFilters"
            class="w-full max-w-6xl mb-12"
        >
            <div
                class="border border-console-border rounded-xl bg-console-bg overflow-hidden relative"
            >
                <!-- Header simulating window -->
                <div
                    class="bg-[#161b22] border-b border-console-border px-4 py-2 flex items-center gap-2"
                >
                    <div class="flex gap-1.5">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div class="ml-4 text-xs text-gray-500 font-mono"
                        >featured_project_v2.yml</div
                    >
                </div>
                <div class="flex flex-col lg:flex-row">
                    <!-- Text Content -->
                    <div
                        class="p-6 lg:p-8 flex-1 flex flex-col justify-between"
                    >
                        <div>
                            <div class="flex items-center gap-2 mb-4">
                                <span
                                    class="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20"
                                >
                                    STATUS: {{ featuredProject.status }}
                                </span>
                                <span
                                    v-if="featuredProject.provider"
                                    class="px-2 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                >
                                    PROVIDER: {{ featuredProject.provider }}
                                </span>
                            </div>
                            <h2
                                class="text-2xl font-bold text-white mb-2 [overflow-wrap:anywhere]"
                            >
                                <router-link
                                    :to="`/projects/${featuredProject.id}`"
                                    class="hover:text-primary transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    >{{ featuredProject.title }}</router-link
                                >
                            </h2>
                            <p class="text-gray-400 mb-6 leading-relaxed">
                                {{ featuredProject.description }}
                            </p>
                            <!-- Tech Stack grid -->
                            <div
                                class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
                            >
                                <div
                                    v-for="tech in featuredProject.technologies"
                                    :key="tech"
                                    class="flex items-center gap-2 text-sm text-gray-300"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="material-symbols-outlined text-primary text-[18px]"
                                        >dns</span
                                    >
                                    {{ tech }}
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <a
                                v-if="featuredProject.github"
                                :href="featuredProject.github"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex-1 bg-primary hover:bg-blue-600 text-white py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                <span
                                    aria-hidden="true"
                                    class="material-symbols-outlined text-[20px]"
                                    >code</span
                                >
                                {{ $t('projects.viewCode') }}
                            </a>

                            <!-- Botones de admin para proyecto destacado -->
                            <AdminOnly>
                                <button
                                    @click="handleEditProject(featuredProject)"
                                    class="bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                                    title="Editar proyecto"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="material-symbols-outlined text-[20px]"
                                        >edit</span
                                    >
                                </button>
                                <button
                                    @click="
                                        handleDeleteProject(featuredProject)
                                    "
                                    class="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 py-2.5 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                                    title="Eliminar proyecto"
                                >
                                    <span
                                        aria-hidden="true"
                                        class="material-symbols-outlined text-[20px]"
                                        >delete</span
                                    >
                                </button>
                            </AdminOnly>
                        </div>
                    </div>
                    <!-- Image/Visual -->
                    <div
                        v-if="featuredProject.image"
                        class="lg:w-1/2 bg-black relative min-h-[300px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-console-border"
                    >
                        <div
                            class="absolute inset-0 bg-cover bg-center opacity-80"
                            :style="{
                                backgroundImage: `url('${featuredProject.image}')`,
                            }"
                        ></div>
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-console-bg to-transparent"
                        ></div>
                        <!-- Overlay Code Snippet Aesthetic -->
                        <div
                            class="absolute bottom-4 left-4 right-4 bg-[#161b22]/90 backdrop-blur-sm border border-console-border rounded p-3 font-mono text-xs text-gray-400 overflow-hidden"
                        >
                            <div class="whitespace-nowrap overflow-x-auto" aria-hidden="true">
                                <span class="text-primary">resource</span>
                                "google_container_cluster" "primary" {<br />
                                &nbsp;&nbsp;name =
                                <span class="text-green-400"
                                    >"devops-cluster"</span
                                ><br />
                                &nbsp;&nbsp;location =
                                <span class="text-green-400">"us-central1"</span
                                ><br />
                                &nbsp;&nbsp;initial_node_count = 3<br />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Secondary Projects Grid -->
        <div class="w-full max-w-6xl">
            <h2
                class="text-xl font-bold text-white mb-6 flex items-center gap-2"
            >
                <span class="text-primary material-symbols-outlined"
                    >folder_open</span
                >
                {{ $t('projects.moreRepositories') }}
            </h2>
            <div
                v-if="filteredProjects.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
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
                                <span aria-hidden="true" class="material-symbols-outlined text-sm"
                                    >edit</span
                                >
                            </button>
                            <button
                                @click.stop="handleDeleteProject(project)"
                                class="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 p-1.5 rounded transition-colors"
                                title="Eliminar proyecto"
                            >
                                <span aria-hidden="true" class="material-symbols-outlined text-sm"
                                    >delete</span
                                >
                            </button>
                        </div>
                    </AdminOnly>

                    <div class="flex items-start justify-between mb-4">
                        <div
                            class="p-2 bg-[#161b22] rounded-lg border border-console-border group-hover:border-primary/30 text-white"
                        >
                            <span aria-hidden="true" class="material-symbols-outlined">{{
                                project.icon || 'folder'
                            }}</span>
                        </div>
                        <time
                            v-if="project.updatedAt"
                            :datetime="project.updatedAt"
                            class="text-xs font-mono text-gray-500"
                            >{{ formatDate(project.updatedAt) }}</time
                        >
                    </div>
                    <h3
                        class="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors [overflow-wrap:anywhere]"
                    >
                        <router-link
                            :to="`/projects/${project.id}`"
                            class="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >{{ project.title }}</router-link
                        >
                    </h3>
                    <p class="text-sm text-gray-400 mb-4 flex-grow [overflow-wrap:anywhere]">
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
                        :href="project.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-fit text-sm font-medium text-primary flex items-center gap-1 hover:underline underline-offset-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        cd ./repo
                        <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                            >arrow_forward</span
                        >
                    </a>
                </div>
            </div>
            <p
                v-else-if="loadingProjects"
                role="status"
                class="font-mono text-sm text-gray-500 text-center py-12"
            >
                {{ $t('common.loading') }}
            </p>
            <div
                v-else-if="hasActiveFilters"
                role="status"
                class="flex flex-col items-center gap-4 text-center py-12"
            >
                <p class="text-gray-400">{{ $t('projects.noResults') }}</p>
                <button
                    type="button"
                    class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono bg-console-bg border border-console-border text-gray-300 hover:border-primary hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    @click="setFilter('all')"
                >
                    <span
                        aria-hidden="true"
                        class="material-symbols-outlined text-[16px]"
                        >filter_alt_off</span
                    >
                    {{ $t('projects.clearFilters') }}
                </button>
            </div>
            <p
                v-else-if="!featuredProject"
                class="text-gray-400 text-center py-12"
            >
                {{ $t('projects.empty') }}
            </p>
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

        <EditProjectsSubtitleModal
            :is-open="showEditSubtitleModal"
            :initial-subtitle="projectsSubtitle"
            @close="showEditSubtitleModal = false"
            @saved="handleSubtitleSaved"
        />
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatRelativeDate } from '../utils/relativeTime.js';
import { getProjects as getStaticProjects } from '../data/static.js';
import {
    getProjects as getFirestoreProjects,
    getProjectsSubtitle,
} from '../data/firestore.js';
import { useAdmin } from '../composables/useAuth.js';
import EditProjectModal from '../components/EditProjectModal.vue';
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue';
import EditProjectsSubtitleModal from '../components/EditProjectsSubtitleModal.vue';
import AdminOnly from '../components/AdminOnly.vue';

const { locale } = useI18n();
const { isAdmin } = useAdmin();

const projects = ref([]);
const loadingProjects = ref(true);
const projectsSubtitle = ref('');
const searchQuery = ref('');
const activeFilter = ref('all');
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showEditSubtitleModal = ref(false);
const selectedProject = ref(null);
const selectedProjectId = ref('');
const selectedProjectTitle = ref('');
const isNewProject = ref(false);

const featuredProject = computed(() => {
    // Obtener el primer proyecto con featured: true
    return projects.value.find((p) => p.featured) || null;
});

const hasActiveFilters = computed(() => {
    return searchQuery.value.trim() !== '' || activeFilter.value !== 'all';
});

const filteredProjects = computed(() => {
    // Si hay filtros activos, incluir también el featured en los resultados filtrados
    let filtered = hasActiveFilters.value
        ? [...projects.value] // Incluir todos (incluido featured)
        : projects.value.filter((p) => !p.featured); // Sin filtros: excluir el featured

    // Filtrar por búsqueda de texto
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.trim().toLowerCase();
        filtered = filtered.filter(
            (p) =>
                (p.title || '').toLowerCase().includes(query) ||
                (p.description || '').toLowerCase().includes(query) ||
                p.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
                p.technologies?.some((tech) =>
                    tech.toLowerCase().includes(query),
                ),
        );
    }

    // Filtrar por tag/tecnología
    if (activeFilter.value !== 'all') {
        filtered = filtered.filter(
            (p) =>
                p.tags?.some(
                    (tag) =>
                        tag.toLowerCase() === activeFilter.value.toLowerCase(),
                ) ||
                p.technologies?.some((tech) =>
                    tech
                        .toLowerCase()
                        .includes(activeFilter.value.toLowerCase()),
                ),
        );
    }

    return filtered;
});

const setFilter = (filter) => {
    activeFilter.value = filter;
    searchQuery.value = ''; // Limpiar búsqueda al cambiar filtro
};

const handleSearch = () => {
    // La búsqueda se actualiza automáticamente con v-model
    // Podemos resetear el filtro si hay búsqueda
    if (searchQuery.value.trim()) {
        activeFilter.value = 'all';
    }
};

// El filtrado ya es en vivo con v-model. EXECUTE (o Enter) envía el
// formulario; aquí solo se evita la recarga y se normaliza la consulta.
const executeSearch = () => {
    searchQuery.value = searchQuery.value.trim();
};

const formatDate = (dateString) =>
    formatRelativeDate(dateString, locale.value);

// Cada carga recibe un número; si el idioma cambia a mitad de una carga,
// la respuesta antigua se descarta en lugar de pisar a la nueva.
let projectsRequest = 0;
let subtitleRequest = 0;

// Cargar proyectos desde Firestore con fallback a static
const loadProjects = async () => {
    const requestId = ++projectsRequest;
    loadingProjects.value = true;
    let list = null;

    try {
        const firestoreProjects = await getFirestoreProjects(locale.value);
        if (firestoreProjects && firestoreProjects.length > 0) {
            list = firestoreProjects;
        }
    } catch (err) {
        console.warn('Error loading from Firestore, using static data:', err);
    }

    if (!list) {
        try {
            list = (await getStaticProjects()) || [];
        } catch (err) {
            console.error('Error loading static projects:', err);
            list = [];
        }
    }

    if (requestId === projectsRequest) {
        projects.value = list;
        loadingProjects.value = false;
    }
};

// Subtítulo desde Firestore (con fallback de idioma en firestore.js);
// si no hay ninguno, la plantilla usa el texto traducido por defecto.
const loadProjectsSubtitle = async () => {
    const requestId = ++subtitleRequest;
    let subtitle = '';
    try {
        subtitle = (await getProjectsSubtitle(locale.value)) || '';
    } catch (err) {
        console.warn('Error loading projects subtitle from Firestore:', err);
    }
    if (requestId === subtitleRequest) {
        projectsSubtitle.value = subtitle;
    }
};

// Carga inicial y recarga cuando cambia el idioma
watch(
    locale,
    () => {
        loadProjects();
        loadProjectsSubtitle();
    },
    { immediate: true },
);

// Funciones de gestión de proyectos (admin)
const handleNewProject = () => {
    selectedProject.value = null;
    isNewProject.value = true;
    showEditModal.value = true;
};

const handleEditProject = (project) => {
    selectedProject.value = project;
    isNewProject.value = false;
    showEditModal.value = true;
};

const handleDeleteProject = (project) => {
    selectedProjectId.value = project.id;
    selectedProjectTitle.value = project.title;
    showDeleteModal.value = true;
};

const closeEditModal = () => {
    showEditModal.value = false;
    selectedProject.value = null;
    isNewProject.value = false;
};

const handleProjectSaved = () => {
    // Recargar proyectos después de guardar
    loadProjects();
};

const handleProjectDeleted = () => {
    // Recargar proyectos después de eliminar
    loadProjects();
};

const handleEditSubtitle = () => {
    showEditSubtitleModal.value = true;
};

const handleSubtitleSaved = () => {
    // Recargar subtítulo después de guardar
    loadProjectsSubtitle();
};
</script>
