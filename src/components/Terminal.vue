<template>
    <div
        class="bg-console-bg border border-console-border rounded-xl shadow-2xl overflow-hidden font-mono text-sm md:text-base"
    >
        <div
            class="bg-[#161b22] px-4 py-3 border-b border-console-border flex items-center justify-between relative"
        >
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div
                class="text-xs text-gray-500 font-medium absolute left-1/2 transform -translate-x-1/2"
            >
                pablo@portfolio:~
            </div>
            <div class="flex items-center gap-2 text-[10px] text-gray-500">
                <span class="material-symbols-outlined text-[14px]"
                    >language</span
                >
                <span>LC_ALL={{ $t('footer.locale') }}.UTF-8</span>
            </div>
        </div>

        <div class="p-6 md:p-8 space-y-4 md:space-y-6 min-h-[400px]">
            <!-- Init command -->
            <div class="flex flex-col md:flex-row md:items-center gap-2">
                <span class="text-green-400 whitespace-nowrap"
                    >pablo@portfolio:~$</span
                >
                <span class="text-white">{{ $t('terminal.initCommand') }}</span>
            </div>
            <div
                class="pl-4 md:pl-0 text-gray-400 space-y-1 text-xs md:text-sm"
            >
                <p
                    >&gt; {{ $t('terminal.initOutput.loading') }}
                    <span class="text-green-400">{{
                        $t('terminal.initOutput.done')
                    }}</span></p
                >
                <p
                    >&gt; {{ $t('terminal.initOutput.mounting') }}
                    <span class="text-green-400">{{
                        $t('terminal.initOutput.done')
                    }}</span></p
                >
                <p
                    >&gt; {{ $t('terminal.initOutput.connecting') }}
                    <span class="text-green-400">{{
                        $t('terminal.initOutput.connected')
                    }}</span></p
                >
            </div>

            <!-- Name and role -->
            <div class="flex flex-col md:flex-row md:items-start gap-2 pt-4">
                <span class="text-green-400 whitespace-nowrap"
                    >pablo@portfolio:~$</span
                >
                <div class="flex flex-col gap-2">
                    <span class="text-white">{{
                        $t('terminal.nameCommand')
                    }}</span>
                    <h1
                        class="text-4xl md:text-6xl font-black text-white tracking-tight mt-2"
                    >
                        {{ profile?.name || $t('terminal.name') }}
                    </h1>
                    <h2 class="text-xl md:text-2xl text-primary font-bold">
                        {{ profile?.role || $t('terminal.role') }}
                    </h2>
                </div>
            </div>

            <!-- Mission statement -->
            <div class="flex flex-col md:flex-row md:items-start gap-2 pt-4">
                <span class="text-green-400 whitespace-nowrap"
                    >pablo@portfolio:~$</span
                >
                <div class="flex flex-col gap-4">
                    <span class="text-white">{{
                        $t('terminal.missionCommand')
                    }}</span>
                    <p
                        class="text-gray-300 leading-relaxed max-w-2xl border-l-2 border-primary/30 pl-4 py-1"
                    >
                        {{ profile?.mission || $t('terminal.mission') }}
                        <br />
                        <span class="text-primary mt-2 block opacity-75">{{
                            $t('terminal.status')
                        }}</span>
                    </p>
                    <div class="flex flex-wrap gap-4 mt-2">
                        <router-link
                            to="/projects"
                            class="group bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-all inline-flex"
                        >
                            <span class="material-symbols-outlined text-sm"
                                >terminal</span
                            >
                            <span>{{ $t('terminal.viewProjects') }}</span>
                        </router-link>
                        <button
                            class="group border border-console-border hover:border-primary text-gray-300 hover:text-white bg-[#21262d] px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            <span class="material-symbols-outlined text-sm"
                                >mail</span
                            >
                            <span>{{ $t('terminal.contact') }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Cursor -->
            <div class="flex items-center gap-2 pt-2">
                <span class="text-green-400">pablo@portfolio:~$</span>
                <div class="w-3 h-5 bg-primary cursor-blink"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    profile: {
        type: Object,
        default: null,
    },
});
</script>
