<template>
    <footer class="mt-auto border-t border-console-border bg-console-bg font-mono text-xs">
        <div class="page py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <nav :aria-label="$t('footer.social')" class="flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                    v-for="(url, key) in socialLinks"
                    :key="key"
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center gap-1.5 text-sm text-console-text hover:text-primary transition-colors rounded-sm"
                >
                    <span class="text-console-muted group-hover:text-primary" aria-hidden="true">~/</span>{{ $t(`social.${key}`).toLowerCase() }}
                    <span
                        aria-hidden="true"
                        class="material-symbols-outlined text-[14px] text-console-muted group-hover:text-primary transition-transform duration-200 ease-out-expo group-hover:-translate-y-px group-hover:translate-x-px"
                        >north_east</span
                    >
                </a>
            </nav>

            <!-- Barra de estado -->
            <ul role="list" class="flex flex-wrap items-center gap-x-5 gap-y-2 text-console-muted">
                <li class="flex items-center gap-2 text-prompt">
                    <span class="w-1.5 h-1.5 rounded-full bg-prompt live-dot" aria-hidden="true"></span>
                    {{ $t('footer.online') }}
                </li>
                <li>{{ $t('footer.encoding') }}</li>
                <li>{{ $t('footer.locale') }}</li>
                <li class="flex items-center gap-1">
                    <span aria-hidden="true" class="material-symbols-outlined text-[14px]">call_split</span>
                    {{ $t('footer.branch') }}
                </li>
            </ul>
        </div>

        <div class="border-t border-console-border">
            <div class="page py-4 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between text-[11px] text-console-muted">
                <p>{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
                <p>{{ $t('footer.localStorageNotice') }}</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
defineProps({
    socialLinks: {
        type: Object,
        default: () => ({}),
    },
});
</script>
