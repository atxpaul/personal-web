<template>
    <div
        class="flex-grow flex flex-col items-center justify-center px-4 py-8 md:px-8"
    >
        <section
            class="w-full max-w-3xl bg-console-bg border border-console-border rounded-xl shadow-2xl overflow-hidden font-mono text-sm md:text-base"
            aria-labelledby="not-found-title"
        >
            <div
                class="bg-[#161b22] px-4 py-3 border-b border-console-border flex items-center gap-2"
                aria-hidden="true"
            >
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                <span class="ml-4 text-xs text-gray-500">pablo@portfolio:~</span>
            </div>

            <div class="p-6 md:p-8 space-y-4">
                <p class="flex flex-col md:flex-row md:items-center gap-2">
                    <span class="text-green-400 whitespace-nowrap"
                        >pablo@portfolio:~$</span
                    >
                    <span class="text-white break-all">cd {{ path }}</span>
                </p>

                <h1
                    id="not-found-title"
                    class="text-red-400 break-all"
                >
                    bash: cd: {{ path }}: {{ $t('notFound.title') }}
                </h1>

                <p class="text-gray-400 leading-relaxed max-w-2xl">
                    {{ $t('notFound.body') }}
                </p>

                <div class="flex flex-wrap gap-4 pt-2">
                    <router-link
                        to="/"
                        class="bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        <span
                            aria-hidden="true"
                            class="material-symbols-outlined text-sm"
                            >home</span
                        >
                        <span>{{ $t('notFound.home') }}</span>
                    </router-link>
                    <router-link
                        to="/projects"
                        class="border border-console-border hover:border-primary text-gray-300 hover:text-white bg-[#21262d] px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                        <span
                            aria-hidden="true"
                            class="material-symbols-outlined text-sm"
                            >folder_open</span
                        >
                        <span>{{ $t('notFound.projects') }}</span>
                    </router-link>
                </div>

                <div class="flex items-center gap-2 pt-2" aria-hidden="true">
                    <span class="text-green-400">pablo@portfolio:~$</span>
                    <div class="w-3 h-5 bg-primary cursor-blink"></div>
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
