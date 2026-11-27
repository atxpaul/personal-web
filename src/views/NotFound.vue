<template>
    <div
        class="flex-grow flex flex-col items-center justify-center px-4 py-12 md:px-8"
    >
        <section
            class="w-full max-w-3xl bg-console-bg border border-console-border rounded-xl shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)] overflow-hidden font-mono text-sm"
            aria-labelledby="not-found-title"
        >
            <div
                class="bg-console-raised px-4 h-11 border-b border-console-border flex items-center gap-2"
                aria-hidden="true"
            >
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                <span class="ml-4 text-xs text-console-muted">pablo@portfolio:~</span>
            </div>

            <div class="p-6 md:p-10 space-y-5">
                <p class="flex flex-col md:flex-row md:items-center gap-2">
                    <span class="text-prompt whitespace-nowrap"
                        >pablo@portfolio:~$</span
                    >
                    <span class="text-white break-all">cd {{ path }}</span>
                </p>

                <h1
                    id="not-found-title"
                    class="font-display text-2xl md:text-4xl font-bold tracking-[-0.02em] text-red-400 [overflow-wrap:anywhere] leading-tight"
                >
                    bash: cd: {{ path }}: {{ $t('notFound.title') }}
                </h1>

                <p class="font-display text-lg text-console-text leading-relaxed max-w-[60ch]">
                    {{ $t('notFound.body') }}
                </p>

                <div class="flex flex-wrap gap-3 pt-4">
                    <router-link
                        to="/"
                        class="btn btn-primary"
                    >
                        <span
                            aria-hidden="true"
                            class="material-symbols-outlined text-[18px]"
                            >home</span
                        >
                        <span>{{ $t('notFound.home') }}</span>
                    </router-link>
                    <router-link
                        to="/projects"
                        class="btn btn-ghost"
                    >
                        <span
                            aria-hidden="true"
                            class="material-symbols-outlined text-[18px]"
                            >folder_open</span
                        >
                        <span>{{ $t('notFound.projects') }}</span>
                    </router-link>
                </div>

                <div class="flex items-center gap-2 pt-2" aria-hidden="true">
                    <span class="text-prompt">pablo@portfolio:~$</span>
                    <div class="w-2.5 h-5 bg-primary cursor-blink"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Ruta pedida, recortada para que una URL enorme no rompa el layout
const path = computed(() => {
    const full = route.path || '/';
    return full.length > 80 ? `${full.slice(0, 77)}...` : full;
});
</script>
