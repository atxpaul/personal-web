<template>
    <div class="flex-grow py-10 md:py-14">
        <div class="page">
            <PageHeader command="ls ./blog" :lead="$t('blog.lead')" />

            <div class="mt-12 pane overflow-hidden max-w-3xl">
                <div class="pane-head">
                    <span aria-hidden="true" class="material-symbols-outlined text-[16px]">folder_open</span>
                    ~/blog
                </div>
                <div class="p-6 md:p-8 font-mono text-sm">
                    <p class="text-console-muted">total 0</p>
                    <p class="mt-3 text-console-text">{{ $t('blog.comingSoon') }}</p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <router-link to="/projects" class="btn btn-ghost">
                            <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                                >folder_open</span
                            >
                            {{ $t('nav.projects') }}
                        </router-link>
                    </div>
                    <p class="mt-8 flex items-center gap-2" aria-hidden="true">
                        <span class="text-prompt">$</span>
                        <span class="w-2.5 h-5 bg-primary cursor-blink"></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PageHeader from '../components/PageHeader.vue';
</script>
