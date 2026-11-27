<template>
    <div class="pane overflow-hidden">
        <!-- Cabecera de columnas, como la salida de ls -la -->
        <div
            class="hidden md:grid grid-cols-[minmax(0,1fr)_14rem_8rem_6.5rem] gap-6 px-5 h-10 items-center border-b border-console-border bg-console-raised font-mono text-[11px] uppercase tracking-[0.08em] text-console-muted"
            aria-hidden="true"
        >
            <span>{{ $t('projects.colName') }}</span>
            <span>{{ $t('projects.colStack') }}</span>
            <span class="text-right">{{ $t('projects.colModified') }}</span>
            <span></span>
        </div>

        <ul role="list" class="divide-y divide-console-border">
            <li
                v-for="project in projects"
                :key="project.id"
                class="group relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_14rem_8rem_6.5rem] gap-x-6 gap-y-3 px-5 py-5 md:items-center transition-colors duration-150 hover:bg-console-raised focus-within:bg-console-raised"
            >
                <div class="min-w-0">
                    <h3
                        class="font-display text-lg font-semibold leading-snug text-white [overflow-wrap:anywhere]"
                    >
                        <router-link
                            :to="`/projects/${project.id}`"
                            class="stretched-link transition-colors group-hover:text-primary focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
                        >
                            {{ project.title }}
                        </router-link>
                    </h3>
                    <p
                        v-if="project.description"
                        class="mt-1.5 text-sm leading-relaxed text-console-muted line-clamp-2 max-w-[70ch] [overflow-wrap:anywhere]"
                    >
                        {{ project.description }}
                    </p>
                </div>

                <div
                    v-if="project.technologies?.length"
                    class="flex flex-wrap gap-1.5 content-center"
                >
                    <span
                        v-for="tech in project.technologies.slice(0, 3)"
                        :key="tech"
                        class="flag"
                        >{{ tech }}</span
                    >
                    <span
                        v-if="project.technologies.length > 3"
                        class="flag border-dashed"
                        >+{{ project.technologies.length - 3 }}</span
                    >
                </div>
                <div v-else class="hidden md:block"></div>

                <div
                    class="flex items-center justify-between gap-4 md:contents"
                >
                    <time
                        v-if="project.updatedAt"
                        :datetime="project.updatedAt"
                        class="font-mono text-xs text-console-muted md:text-right"
                        >{{ formatDate(project.updatedAt) }}</time
                    >
                    <span v-else class="md:block"></span>

                    <div
                        class="relative z-10 flex items-center justify-end gap-2"
                    >
                        <slot name="actions" :project="project" />
                        <a
                            v-if="project.github"
                            :href="project.github"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="cmd-link py-1.5 -my-1.5"
                            :aria-label="`${$t('projects.viewCode')}: ${project.title}`"
                        >
                            cd ./repo
                            <span
                                aria-hidden="true"
                                class="material-symbols-outlined text-[16px] transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5"
                                >arrow_forward</span
                            >
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    projects: { type: Array, required: true },
    formatDate: { type: Function, required: true },
});
</script>
