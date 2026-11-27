<template>
    <div class="flex-grow py-10 md:py-14 relative">
        <!-- Botón de crear nuevo proyecto (solo admin) -->
        <AdminOnly>
            <button
                type="button"
                @click="handleNewProject"
                class="btn btn-primary fixed bottom-6 right-6 h-12 shadow-lg z-50"
            >
                <span aria-hidden="true" class="material-symbols-outlined text-lg">add</span>
                <span>Nuevo Proyecto</span>
            </button>
        </AdminOnly>

        <div class="page">
            <PageHeader
                command="ls -la ./projects"
                :lead="projectsSubtitle || $t('projects.subtitleDefault')"
            >
                <p
                    v-if="!loadingProjects"
                    class="mt-3 font-mono text-xs text-console-muted"
                >
                    total {{ projects.length }}
                </p>
            </PageHeader>

            <!-- Botón de editar subtítulo (solo admin) -->
            <AdminOnly>
                <div class="flex justify-end mt-4">
                    <button
                        type="button"
                        @click="handleEditSubtitle"
                        class="btn btn-ghost h-8 px-3 text-xs"
                    >
                        <span aria-hidden="true" class="material-symbols-outlined text-[16px]"
                            >edit</span
                        >
                        Editar subtítulo
                    </button>
                </div>
            </AdminOnly>

            <!-- Línea de comandos: búsqueda + flags -->
            <div class="mt-10 pane p-2 md:p-3">
                <form
                    role="search"
                    class="flex items-center gap-2 rounded-md bg-[#0b0f14] border border-console-border focus-within:border-primary transition-colors pl-4 pr-1.5"
                    @submit.prevent="executeSearch"
                >
                    <span class="font-mono text-prompt select-none" aria-hidden="true">$</span>
                    <input
                        v-model="searchQuery"
                        @input="handleSearch"
                        class="w-full min-w-0 h-12 bg-transparent border-none text-white font-mono text-sm md:text-base placeholder:text-console-muted focus:ring-0 focus:outline-none"
                        placeholder="grep -i 'kubernetes'"
                        type="search"
                        maxlength="100"
                        autocomplete="off"
                        spellcheck="false"
                        :aria-label="$t('projects.searchLabel')"
                    />
                    <button type="submit" class="btn btn-primary h-9 shrink-0 px-3 sm:px-4">
                        <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                            >keyboard_return</span
                        >
                        <span class="sr-only sm:not-sr-only">run</span>
                    </button>
                </form>

                <div
                    class="flex flex-wrap gap-1.5 mt-2 md:mt-3"
                    role="group"
                    :aria-label="$t('projects.filterLabel')"
                >
                    <button
                        v-for="filter in filters"
                        :key="filter"
                        type="button"
                        :aria-pressed="activeFilter === filter"
                        @click="setFilter(filter)"
                        class="inline-flex items-center gap-2 h-8 px-3 rounded-md border font-mono text-xs transition-colors duration-150"
                        :class="
                            activeFilter === filter
                                ? 'border-primary bg-primary/15 text-white'
                                : 'border-console-border text-console-muted hover:border-console-muted hover:text-white'
                        "
                    >
                        --{{ filter }}
                        <span
                            class="tabular"
                            :class="activeFilter === filter ? 'text-primary' : 'text-console-muted'"
                            >{{ filterCounts[filter] }}</span
                        >
                    </button>
                </div>
            </div>

            <!-- Proyecto destacado - solo sin filtros activos -->
            <section
                v-if="featuredProject && !hasActiveFilters"
                class="mt-14"
                aria-labelledby="featured-title"
            >
                <h2
                    id="featured-title"
                    class="flex items-baseline gap-3 mb-5 font-display text-xl md:text-2xl font-bold tracking-[-0.02em] text-white"
                >
                    <span class="font-mono text-primary text-lg" aria-hidden="true">&gt;&gt;</span>
                    {{ $t('projects.latestDeployment') }}
                </h2>
                <ProjectCard :project="featuredProject">
                    <template #actions>
                        <AdminOnly>
                            <button
                                type="button"
                                @click="handleEditProject(featuredProject)"
                                class="btn btn-ghost px-3"
                                title="Editar proyecto"
                                aria-label="Editar proyecto"
                            >
                                <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                                    >edit</span
                                >
                            </button>
                            <button
                                type="button"
                                @click="handleDeleteProject(featuredProject)"
                                class="btn px-3 border border-red-500/40 text-red-400 hover:bg-red-500/10"
                                title="Eliminar proyecto"
                                aria-label="Eliminar proyecto"
                            >
                                <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                                    >delete</span
                                >
                            </button>
                        </AdminOnly>
                    </template>
                </ProjectCard>
            </section>

            <!-- Resto de repositorios -->
            <section class="mt-14" aria-labelledby="repos-title">
                <div class="flex flex-wrap items-baseline justify-between gap-3 mb-5">
                    <h2
                        id="repos-title"
                        class="flex items-baseline gap-3 font-display text-xl md:text-2xl font-bold tracking-[-0.02em] text-white"
                    >
                        <span class="font-mono text-primary text-lg" aria-hidden="true">&gt;&gt;</span>
                        {{ hasActiveFilters ? $t('projects.results') : $t('projects.moreRepositories') }}
                    </h2>
                    <span
                        v-if="!loadingProjects"
                        class="font-mono text-xs text-console-muted"
                        aria-live="polite"
                        >{{ filteredProjects.length }} / {{ projects.length }}</span
                    >
                </div>

                <ProjectList
                    v-if="filteredProjects.length > 0"
                    :projects="filteredProjects"
                    :format-date="formatDate"
                >
                    <template #actions="{ project }">
                        <AdminOnly>
                            <button
                                type="button"
                                @click.stop="handleEditProject(project)"
                                class="p-1.5 rounded border border-console-border text-console-muted hover:text-primary hover:border-primary transition-colors"
                                title="Editar proyecto"
                                aria-label="Editar proyecto"
                            >
                                <span aria-hidden="true" class="material-symbols-outlined text-sm"
                                    >edit</span
                                >
                            </button>
                            <button
                                type="button"
                                @click.stop="handleDeleteProject(project)"
                                class="p-1.5 rounded border border-console-border text-console-muted hover:text-red-400 hover:border-red-500/50 transition-colors"
                                title="Eliminar proyecto"
                                aria-label="Eliminar proyecto"
                            >
                                <span aria-hidden="true" class="material-symbols-outlined text-sm"
                                    >delete</span
                                >
                            </button>
                        </AdminOnly>
                    </template>
                </ProjectList>

                <p
                    v-else-if="loadingProjects"
                    role="status"
                    class="pane font-mono text-sm text-console-muted text-center py-16"
                >
                    {{ $t('projects.loadingList') }}<span class="cursor-blink">_</span>
                </p>

                <div
                    v-else-if="hasActiveFilters"
                    role="status"
                    class="pane font-mono text-sm p-6 md:p-8"
                >
                    <p class="text-console-muted">
                        <span class="text-prompt">$</span>
                        grep -i '{{ searchQuery || activeFilter }}' ./projects
                    </p>
                    <p class="mt-2 text-console-text">{{ $t('projects.noResults') }}</p>
                    <button
                        type="button"
                        class="btn btn-ghost mt-6"
                        @click="setFilter('all')"
                    >
                        <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                            >filter_alt_off</span
                        >
                        {{ $t('projects.clearFilters') }}
                    </button>
                </div>

                <p
                    v-else-if="!featuredProject"
                    class="pane font-mono text-sm text-console-muted p-6 md:p-8"
                >
                    total 0 — {{ $t('projects.empty') }}
                </p>
            </section>
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
import EditProjectModal from '../components/EditProjectModal.vue';
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue';
import EditProjectsSubtitleModal from '../components/EditProjectsSubtitleModal.vue';
import AdminOnly from '../components/AdminOnly.vue';
import PageHeader from '../components/PageHeader.vue';
import ProjectCard from '../components/ProjectCard.vue';
import ProjectList from '../components/ProjectList.vue';

const { locale } = useI18n();

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

// Flags disponibles en la línea de comandos
const filters = ['all', 'azure', 'aws', 'docker', 'kubernetes', 'terraform', 'python'];

const matchesFilter = (p, filter) => {
    const f = filter.toLowerCase();
    return (
        p.tags?.some((tag) => tag.toLowerCase() === f) ||
        p.technologies?.some((tech) => tech.toLowerCase().includes(f)) ||
        false
    );
};

// Nº de proyectos que coinciden con cada flag (sobre la lista completa)
const filterCounts = computed(() =>
    Object.fromEntries(
        filters.map((f) => [
            f,
            f === 'all'
                ? projects.value.length
                : projects.value.filter((p) => matchesFilter(p, f)).length,
        ]),
    ),
);

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
        filtered = filtered.filter((p) => matchesFilter(p, activeFilter.value));
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
