<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-console-text overflow-x-hidden min-h-screen flex flex-col">
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
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useData } from './composables/useData.js'

const { socialLinks } = useData()

onMounted(() => {
  // Establecer el idioma del HTML según el locale guardado
  const savedLocale = localStorage.getItem('locale') || 'es'
  document.documentElement.lang = savedLocale
})
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

