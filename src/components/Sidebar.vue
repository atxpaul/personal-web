<template>
    <aside
        class="hidden md:flex w-64 flex-col border-r border-[#293038] bg-[#111418]"
    >
        <div
            class="p-3 text-xs font-bold text-[#9dabb8] uppercase tracking-wider flex items-center gap-2"
        >
            <span class="material-symbols-outlined text-sm">expand_more</span>
            EXPLORER
        </div>

        <div class="flex flex-col gap-0.5">
            <div
                class="flex items-center gap-2 px-4 py-1 text-[#9dabb8] hover:bg-[#1c242e] cursor-pointer"
            >
                <span class="material-symbols-outlined text-base text-[#9dabb8]"
                    >folder</span
                >
                <span class="text-sm">.github</span>
            </div>

            <div
                class="flex items-center gap-2 px-4 py-1 text-[#9dabb8] hover:bg-[#1c242e] cursor-pointer"
            >
                <span
                    class="material-symbols-outlined text-base"
                    :class="isSrcOpen ? 'text-primary' : 'text-[#9dabb8]'"
                >
                    {{ isSrcOpen ? 'folder_open' : 'folder' }}
                </span>
                <span
                    class="text-sm"
                    :class="isSrcOpen ? 'text-white' : 'text-[#9dabb8]'"
                >
                    src
                </span>
            </div>

            <!-- Nested Files -->
            <div v-if="isSrcOpen" class="pl-4 flex flex-col">
                <router-link
                    to="/"
                    class="flex items-center gap-2 px-4 py-1.5 text-[#9dabb8] hover:bg-[#1c242e] hover:text-white border-l-2 border-transparent hover:border-primary/50 transition-colors"
                    :class="{
                        'bg-[#1c242e] text-white border-l-2 border-primary':
                            $route.path === '/',
                    }"
                >
                    <span
                        class="material-symbols-outlined text-base text-[#e37933]"
                        >html</span
                    >
                    <span class="text-sm">home.html</span>
                </router-link>

                <router-link
                    to="/about"
                    class="flex items-center gap-2 px-4 py-1.5 text-[#9dabb8] hover:bg-[#1c242e] hover:text-white border-l-2 border-transparent hover:border-primary/50 transition-colors"
                    :class="{
                        'bg-[#1c242e] text-white border-l-2 border-primary':
                            $route.path === '/about',
                    }"
                >
                    <span
                        class="material-symbols-outlined text-base text-[#42a5f5]"
                        >description</span
                    >
                    <span class="text-sm">about-me.md</span>
                </router-link>

                <a
                    href="#"
                    class="flex items-center gap-2 px-4 py-1.5 text-[#9dabb8] hover:bg-[#1c242e] hover:text-white border-l-2 border-transparent hover:border-primary/50 transition-colors"
                >
                    <span
                        class="material-symbols-outlined text-base text-[#fbc02d]"
                        >data_object</span
                    >
                    <span class="text-sm">skills.json</span>
                </a>

                <router-link
                    to="/projects"
                    class="flex items-center gap-2 px-4 py-1.5 text-[#9dabb8] hover:bg-[#1c242e] hover:text-white border-l-2 border-transparent hover:border-primary/50 transition-colors"
                    :class="{
                        'bg-[#1c242e] text-white border-l-2 border-primary':
                            $route.path === '/projects',
                    }"
                >
                    <span
                        class="material-symbols-outlined text-base text-[#a87ffb]"
                        >code</span
                    >
                    <span class="text-sm">projects.yml</span>
                </router-link>
            </div>

            <div
                class="flex items-center gap-2 px-4 py-1 mt-2 text-[#9dabb8] hover:bg-[#1c242e] cursor-pointer"
            >
                <span class="material-symbols-outlined text-base"
                    >description</span
                >
                <span class="text-sm">Dockerfile</span>
            </div>

            <div
                class="flex items-center gap-2 px-4 py-1 text-[#9dabb8] hover:bg-[#1c242e] cursor-pointer"
            >
                <span class="material-symbols-outlined text-base"
                    >settings</span
                >
                <span class="text-sm">compose.yaml</span>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isSrcOpen = ref(true);

// Mantener abierto si estamos en una ruta dentro de src
watch(
    () => route.path,
    (path) => {
        if (path === '/' || path === '/about' || path === '/projects') {
            isSrcOpen.value = true;
        }
    },
    { immediate: true }
);
</script>
