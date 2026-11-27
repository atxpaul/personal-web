<template>
    <main class="flex-grow py-8 md:py-12">
        <div class="page">
            <!-- Breadcrumb -->
            <nav
                class="mb-8 flex items-center gap-2 font-mono text-sm text-console-muted min-w-0"
                aria-label="Breadcrumb"
            >
                <router-link
                    to="/projects"
                    class="hover:text-primary transition-colors flex items-center gap-1 rounded-sm"
                >
                    <span aria-hidden="true" class="material-symbols-outlined text-base"
                        >arrow_back</span
                    >
                    cd ..
                </router-link>
                <span aria-hidden="true">/</span>
                <span class="text-white truncate min-w-0">{{ route.params.id }}.yml</span>
            </nav>

            <template v-if="project">
                <!-- Cabecera del proyecto -->
                <header class="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div class="min-w-0">
                        <div
                            class="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-console-muted"
                        >
                            <span
                                v-if="project.status"
                                class="flex items-center gap-2"
                                :class="isDeployed ? 'text-prompt' : 'text-[#ffbd2e]'"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full"
                                    :class="isDeployed ? 'bg-prompt live-dot' : 'bg-[#ffbd2e]'"
                                ></span>
                                {{ project.status }}
                            </span>
                            <span v-if="project.providerFull || project.provider">{{
                                project.providerFull || project.provider
                            }}</span>
                            <span>v{{ project.version || '1.0.0' }}</span>
                            <time v-if="project.updatedAt" :datetime="project.updatedAt">{{
                                formatDate(project.updatedAt)
                            }}</time>
                        </div>
                        <h1
                            class="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.035em] text-white [overflow-wrap:anywhere]"
                        >
                            {{ project.title }}
                        </h1>
                        <p
                            v-if="project.description"
                            class="mt-5 max-w-[62ch] font-display text-lg md:text-xl leading-relaxed text-console-text"
                        >
                            {{ project.description }}
                        </p>
                    </div>
                    <div v-if="project.github" class="flex flex-wrap gap-3">
                        <a
                            :href="project.github"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-primary"
                        >
                            <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                                >code</span
                            >
                            {{ $t('projects.viewCode') }}
                        </a>
                    </div>
                </header>

                <!-- Ventana del editor con el manifiesto del proyecto -->
                <div
                    class="bg-console-bg border border-console-border rounded-xl shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)] overflow-hidden flex flex-col mb-20"
                >
                    <div
                        class="bg-console-raised border-b border-console-border flex items-center justify-between px-4 h-11 select-none"
                    >
                        <div class="flex items-center gap-4 h-full min-w-0">
                            <div class="flex gap-2 shrink-0" aria-hidden="true">
                                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <div
                                class="flex items-center gap-2 h-full px-3 bg-console-bg border-x border-console-border font-mono text-xs text-console-text min-w-0 relative top-px"
                            >
                                <span
                                    aria-hidden="true"
                                    class="material-symbols-outlined text-[14px] text-[#ffbd2e]"
                                    >description</span
                                >
                                <span class="truncate">{{ project.id }}.yml</span>
                                <router-link
                                    to="/projects"
                                    class="ml-1 flex items-center text-console-muted hover:text-white rounded-sm"
                                    :aria-label="$t('common.close')"
                                >
                                    <span aria-hidden="true" class="material-symbols-outlined text-[14px]"
                                        >close</span
                                    >
                                </router-link>
                            </div>
                        </div>
                        <div class="font-mono text-xs text-console-muted shrink-0">vim</div>
                    </div>

                    <div class="flex overflow-x-auto relative">
                        <!-- Números de línea: tantos como líneas visuales tiene el contenido -->
                        <div
                            class="hidden md:flex flex-col items-end shrink-0 px-4 py-6 border-r border-console-border font-mono text-sm leading-6 text-[#6e7681] select-none tabular"
                            aria-hidden="true"
                        >
                            <span v-for="n in lineCount" :key="n">{{ n }}</span>
                        </div>

                        <div
                            ref="codeEl"
                            class="flex-1 min-w-0 px-5 py-6 md:px-8 font-mono text-sm leading-6 text-console-text overflow-x-auto"
                        >
                    <div>
                        <div><span class="text-console-muted">---</span></div>
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
                        <div class="h-6" aria-hidden="true"></div>

                        <div>
                            <span class="text-syntax-key">summary</span>:
                            <span class="text-syntax-string">|</span>
                        </div>
                        <div
                            class="pl-4 text-console-text/80 border-l-2 border-console-border ml-1 whitespace-pre-line"
                        >
                            {{ project.summary || project.description }}
                        </div>

                        <div class="h-6" aria-hidden="true"></div>

                        <div>
                            <span class="text-syntax-key">tech_stack</span>:
                        </div>
                        <div
                            class="pl-4"
                        >
                            <div
                                v-for="tech in techStackList"
                                :key="tech.name"
                                class="flex items-center gap-2 group h-6"
                            >
                                <span class="text-console-muted">-</span>
                                <span
                                    aria-hidden="true"
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

                        <div v-if="project.architecture" class="h-6"></div>

                        <div v-if="project.architecture">
                            <span class="text-syntax-key">architecture</span>:
                            <span class="text-syntax-string">|-</span>
                        </div>
                        <div
                            v-if="project.architecture"
                            class="pl-4 py-2 overflow-x-auto"
                        >
                            <pre
                                class="architecture-diagram text-blue-400 select-none m-0 p-0"
                                >{{ architectureText }}</pre
                            >
                        </div>

                        <div class="h-6" aria-hidden="true"></div>

                        <div> <span class="text-syntax-key">links</span>: </div>
                        <div class="pl-4 h-12 flex flex-wrap items-center gap-4">
                            <a
                                v-if="project.github"
                                :href="project.github"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group relative inline-flex items-center gap-2 px-4 py-2 bg-console-raised border border-console-border rounded-md hover:border-primary hover:text-white text-console-text transition-colors"
                            >
                                <span
                                    class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                                ></span>
                                <span
                                    aria-hidden="true"
                                    class="material-symbols-outlined text-[18px]"
                                    >code</span
                                >
                                <span>./view_repo.sh</span>
                            </a>
                        </div>

                        <div class="h-6" aria-hidden="true"></div>
                        <div class="blinking-cursor text-primary"
                            >$ <span class="text-console-muted">_</span></div
                        >
                    </div>
                        </div>
                    </div>

                    <!-- Barra de estado de vim -->
                    <div
                        class="bg-console-raised border-t border-console-border font-mono text-xs flex justify-between items-stretch h-7"
                    >
                        <div class="flex items-stretch gap-4 min-w-0">
                            <span class="bg-primary text-white font-bold px-3 flex items-center">NORMAL</span>
                            <span class="flex items-center text-console-muted truncate">{{ project.id }}.yml</span>
                        </div>
                        <div class="flex items-center gap-4 px-4 text-console-muted">
                            <span>utf-8</span>
                            <span class="hidden sm:inline">yaml</span>
                            <span class="tabular">{{ lineCount }}L</span>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Loading State -->
            <p
                v-if="loading && !project"
                role="status"
                class="pane font-mono text-sm text-console-muted text-center py-16"
            >
                {{ $t('projects.loadingProject') }}<span class="cursor-blink">_</span>
            </p>

            <!-- Not found / error: salida de terminal con salida clara -->
            <div
                v-else-if="error"
                role="alert"
                class="pane p-6 md:p-8 mb-16 font-mono text-sm"
            >
                <p class="flex flex-wrap gap-x-2">
                    <span class="text-prompt">pablo@portfolio:~$</span>
                    <span class="text-white break-all">cat ./projects/{{ route.params.id }}.yml</span>
                </p>
                <p class="mt-3 text-red-400">
                    {{ error === 'not-found' ? $t('projects.notFound') : $t('projects.loadError') }}
                </p>
                <div class="mt-6 flex flex-wrap gap-3">
                    <router-link to="/projects" class="btn btn-primary">
                        <span aria-hidden="true" class="material-symbols-outlined text-[18px]">folder_open</span>
                        <span>{{ $t('nav.projects') }}</span>
                    </router-link>
                    <button
                        v-if="error !== 'not-found'"
                        type="button"
                        class="btn btn-ghost"
                        @click="loadProjectData(route.params.id)"
                    >
                        <span aria-hidden="true" class="material-symbols-outlined text-[18px]">refresh</span>
                        <span>{{ $t('common.retry') }}</span>
                    </button>
                </div>
            </div>

            <!-- Related Projects -->
            <section v-if="relatedProjects.length > 0" aria-labelledby="related-title">
                <div class="flex flex-wrap items-baseline justify-between gap-3 mb-5">
                    <h2
                        id="related-title"
                        class="flex items-baseline gap-3 font-display text-xl md:text-2xl font-bold tracking-[-0.02em] text-white"
                    >
                        <span class="font-mono text-primary text-lg" aria-hidden="true">&gt;&gt;</span>
                        {{ $t('projects.relatedLogs') }}
                    </h2>
                    <span class="font-mono text-xs text-console-muted"
                        >ls -t | head -n {{ relatedProjects.length }}</span
                    >
                </div>
                <ProjectList :projects="relatedProjects" :format-date="formatDate" />
            </section>
        </div>
    </main>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue';
import ProjectList from '../components/ProjectList.vue';
import { useRoute } from 'vue-router';
import { formatRelativeDate } from '../utils/relativeTime.js';
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

const route = useRoute();
const { locale } = useI18n();

// TODO: Añadir funcionalidades de edición para admin
// - Botón de editar proyecto
// - Editar todos los campos del proyecto
// - Eliminar proyecto
// - Cambiar estado (deployed/in progress)

const project = ref(null);
const relatedProjects = ref([]);
const loading = ref(true);
const error = ref(null);

// Cada carga recibe un número; si el visitante navega a otro proyecto o
// cambia de idioma a mitad de una carga, la respuesta antigua se descarta.
let loadRequest = 0;

const loadProjectData = async (projectId) => {
    const requestId = ++loadRequest;
    const isCurrent = () => requestId === loadRequest;
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

        if (!isCurrent()) return;

        if (!projectData) {
            error.value = 'not-found';
            project.value = null;
            relatedProjects.value = [];
            return;
        }

        project.value = projectData;
        relatedProjects.value = relatedData || [];
    } catch (err) {
        if (!isCurrent()) return;
        console.error('Error loading project:', err);
        error.value = 'load-failed';
        project.value = null;
        relatedProjects.value = [];
    } finally {
        if (isCurrent()) loading.value = false;
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

const isDeployed = computed(() => project.value?.status === 'DEPLOYED');

// Números de línea reales: altura del contenido / altura de línea (24px)
const codeEl = ref(null);
const lineCount = ref(1);
let resizeObserver = null;

const measureLines = () => {
    if (!codeEl.value) return;
    const style = getComputedStyle(codeEl.value);
    const inner =
        codeEl.value.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom);
    lineCount.value = Math.max(1, Math.round(inner / 24));
};

watch(codeEl, (el) => {
    resizeObserver?.disconnect();
    if (!el || typeof ResizeObserver === 'undefined') return;
    resizeObserver = new ResizeObserver(measureLines);
    resizeObserver.observe(el);
    nextTick(measureLines);
});

onBeforeUnmount(() => resizeObserver?.disconnect());

const formatDate = (dateString) =>
    formatRelativeDate(dateString, locale.value);


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

</script>
