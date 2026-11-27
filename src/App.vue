<template>
    <div
        class="bg-background-light dark:bg-background-dark font-display text-console-text overflow-x-hidden min-h-screen flex flex-col"
    >
        <Header />

        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>

        <Footer :social-links="socialLinks" />
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useData } from './composables/useData.js';

const { locale } = useI18n();
const { socialLinks } = useData();

// Mantener <html lang> sincronizado con el idioma activo (es, en, de, fr)
watch(
    locale,
    (newLocale) => {
        document.documentElement.lang = newLocale;
    },
    { immediate: true },
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
