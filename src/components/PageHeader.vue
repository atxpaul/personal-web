<template>
    <header class="page-header">
        <h1
            class="flex items-baseline gap-3 font-mono font-bold text-white text-[2rem] leading-tight md:text-5xl tracking-[-0.03em] [overflow-wrap:anywhere]"
        >
            <span
                class="text-prompt font-medium text-[0.7em] select-none"
                aria-hidden="true"
                >$</span
            >
            <span><slot name="command">{{ command }}</slot></span>
        </h1>
        <p
            v-if="lead || $slots.lead"
            class="mt-5 max-w-[62ch] font-display text-lg md:text-xl leading-relaxed text-console-text"
        >
            <slot name="lead">{{ lead }}</slot>
        </p>
        <slot />
    </header>
</template>

<script setup>
defineProps({
    command: { type: String, default: '' },
    lead: { type: String, default: '' },
});
</script>
