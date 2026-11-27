<template>
    <div
        class="bg-console-bg border border-console-border rounded-xl shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.5)] overflow-hidden"
    >
        <!-- Barra de título de la ventana -->
        <div
            class="bg-console-raised px-4 h-11 border-b border-console-border flex items-center justify-between relative font-mono"
        >
            <div class="flex items-center gap-2" aria-hidden="true">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div
                class="hidden sm:block text-xs text-console-muted absolute left-1/2 -translate-x-1/2"
            >
                pablo@portfolio: ~ — zsh
            </div>
            <div class="flex items-center gap-1.5 text-[11px] text-console-muted">
                <span
                    class="material-symbols-outlined text-[14px]"
                    aria-hidden="true"
                    >language</span
                >
                <span>LC_ALL={{ $t('footer.locale') }}.UTF-8</span>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_21rem]">
            <!-- Panel izquierdo: la sesión de shell -->
            <div class="p-6 md:p-10 lg:p-12 font-mono text-sm min-w-0">
                <p class="boot flex flex-wrap gap-x-2" style="--i: 0">
                    <span class="text-prompt">{{ $t('terminal.prompt') }}</span>
                    <span class="text-white">{{ $t('terminal.initCommand') }}</span>
                </p>
                <div class="mt-3 space-y-1 text-xs text-console-muted">
                    <p class="boot" style="--i: 1">
                        [ <span class="text-prompt">OK</span> ]
                        {{ $t('terminal.initOutput.loading') }}
                    </p>
                    <p class="boot" style="--i: 2">
                        [ <span class="text-prompt">OK</span> ]
                        {{ $t('terminal.initOutput.mounting') }}
                    </p>
                    <p class="boot" style="--i: 3">
                        [ <span class="text-prompt">OK</span> ]
                        {{ $t('terminal.initOutput.connecting') }}
                    </p>
                </div>

                <p class="boot mt-8 flex flex-wrap gap-x-2" style="--i: 4">
                    <span class="text-prompt">{{ $t('terminal.prompt') }}</span>
                    <span class="text-white">{{ $t('terminal.nameCommand') }}</span>
                </p>
                <h1
                    class="boot mt-4 font-display font-bold text-white text-[2.75rem] sm:text-6xl xl:text-[5.25rem] leading-[0.95] tracking-[-0.04em] [overflow-wrap:anywhere]"
                    style="--i: 5"
                >
                    {{ profile?.name || $t('terminal.name') }}
                </h1>
                <p
                    class="boot mt-4 text-base md:text-lg text-console-text"
                    style="--i: 6"
                >
                    {{ profile?.role || $t('terminal.role') }}
                </p>

                <p class="boot mt-10 flex flex-wrap gap-x-2" style="--i: 7">
                    <span class="text-prompt">{{ $t('terminal.prompt') }}</span>
                    <span class="text-white">{{ $t('terminal.missionCommand') }}</span>
                </p>
                <p
                    class="boot mt-4 max-w-[58ch] font-display text-lg md:text-xl leading-relaxed text-console-text"
                    style="--i: 8"
                >
                    {{ profile?.mission || $t('terminal.mission') }}
                </p>
                <p
                    class="boot mt-4 flex items-center gap-2 text-xs text-prompt"
                    style="--i: 9"
                >
                    <span class="w-1.5 h-1.5 rounded-full bg-prompt live-dot"></span>
                    {{ $t('terminal.status') }}
                </p>

                <div class="boot mt-8 flex flex-wrap gap-3" style="--i: 10">
                    <router-link to="/projects" class="btn btn-primary">
                        <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                            >terminal</span
                        >
                        <span>{{ $t('terminal.viewProjects') }}</span>
                    </router-link>
                    <a
                        :href="CONTACT_URL"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-ghost"
                    >
                        <span
                            class="material-symbols-outlined text-[18px]"
                            aria-hidden="true"
                            >mail</span
                        >
                        <span>{{ $t('terminal.contact') }}</span>
                    </a>
                </div>

                <div class="mt-10 flex items-center gap-2" aria-hidden="true">
                    <span class="text-prompt">{{ $t('terminal.prompt') }}</span>
                    <span class="w-2.5 h-5 bg-primary cursor-blink"></span>
                </div>
            </div>

            <!-- Panel derecho: neofetch, solo con datos reales -->
            <aside
                class="border-t lg:border-t-0 lg:border-l border-console-border bg-[#0b0f14] p-6 md:p-8 font-mono text-sm"
                :aria-label="$t('home.summary')"
            >
                <p class="boot flex flex-wrap gap-x-2" style="--i: 3">
                    <span class="text-prompt">$</span>
                    <span class="text-white">neofetch</span>
                </p>

                <p class="boot mt-6 text-white" style="--i: 4">
                    <span class="text-primary">pablo</span>@<span class="text-primary">portfolio</span>
                </p>
                <p class="text-console-border select-none" aria-hidden="true">
                    ─────────────────
                </p>

                <dl class="mt-3 space-y-2.5">
                    <div
                        v-for="(row, index) in rows"
                        :key="row.key"
                        class="boot grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3"
                        :style="{ '--i': 5 + index }"
                    >
                        <dt class="text-console-muted">{{ $t(`home.fetch.${row.key}`) }}</dt>
                        <dd
                            class="min-w-0 [overflow-wrap:anywhere]"
                            :class="row.key === 'status' ? 'text-prompt' : 'text-console-text'"
                        >
                            <span
                                v-if="row.key === 'status'"
                                class="inline-block w-1.5 h-1.5 mr-1.5 align-middle rounded-full bg-prompt"
                                aria-hidden="true"
                            ></span>
                            <a
                                v-if="row.href"
                                :href="row.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-primary hover:underline rounded-sm"
                                >{{ row.value }}</a
                            >
                            <template v-else>{{ row.value }}</template>
                        </dd>
                    </div>
                </dl>

                <div
                    v-if="stack.length"
                    class="boot mt-6 pt-6 border-t border-console-border"
                    style="--i: 10"
                >
                    <p class="text-console-muted mb-3">{{ $t('home.fetch.stack') }}</p>
                    <ul role="list" class="flex flex-wrap gap-1.5">
                        <li v-for="tech in stack" :key="tech.name" class="flag text-console-text">
                            <span
                                class="w-1.5 h-1.5 rounded-full"
                                :style="{ backgroundColor: tech.color || '#8b949e' }"
                                aria-hidden="true"
                            ></span>
                            {{ tech.name }}
                        </li>
                    </ul>
                </div>

                <!-- Paleta de colores, la firma de neofetch -->
                <div class="mt-8 flex gap-1" aria-hidden="true">
                    <span
                        v-for="color in palette"
                        :key="color"
                        class="w-5 h-3 rounded-sm"
                        :style="{ backgroundColor: color }"
                    ></span>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { CONTACT_URL } from '../data/static.js';

const props = defineProps({
    profile: {
        type: Object,
        default: null,
    },
    // { location, status } de contact_info
    info: {
        type: Object,
        default: null,
    },
    // Lista plana de tecnologías [{ name, color }]
    stack: {
        type: Array,
        default: () => [],
    },
});

const rows = computed(() => {
    const list = [{ key: 'role', value: 'DevOps Engineer' }];
    if (props.info?.location) list.push({ key: 'location', value: props.info.location });
    if (props.info?.status) list.push({ key: 'status', value: props.info.status });
    list.push({
        key: 'contact',
        value: CONTACT_URL.replace(/^https?:\/\/(www\.)?linkedin\.com\//, ''),
        href: CONTACT_URL,
    });
    return list;
});

const palette = ['#30363d', '#ff5f56', '#4ade80', '#ffbd2e', '#197fe6', '#c678dd', '#61afef', '#c9d1d9'];
</script>
