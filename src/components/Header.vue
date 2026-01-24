<template>
  <header class="sticky top-0 z-50 w-full border-b border-console-border bg-background-dark/95 backdrop-blur supports-[backdrop-filter]:bg-background-dark/60">
    <div class="px-4 md:px-6 lg:px-8 max-w-[1280px] mx-auto">
      <div class="flex h-16 items-center justify-between">
        <router-link
          to="/"
          class="flex items-center gap-2 text-white hover:text-primary transition-colors"
        >
          <span class="material-symbols-outlined text-primary text-2xl">terminal</span>
          <h1 class="text-lg font-bold tracking-tight">~/devops_portfolio</h1>
        </router-link>
        
        <nav class="hidden md:flex items-center gap-6">
          <router-link 
            to="/about"
            class="text-sm font-medium hover:text-primary transition-colors text-gray-300"
            active-class="text-primary"
          >
            {{ $t('nav.about') }}
          </router-link>
          <router-link 
            to="/projects"
            class="text-sm font-medium hover:text-primary transition-colors text-gray-300"
            active-class="text-primary"
          >
            {{ $t('nav.projects') }}
          </router-link>
          <router-link 
            to="/blog"
            class="text-sm font-medium hover:text-primary transition-colors text-gray-300"
            active-class="text-primary"
          >
            {{ $t('nav.blog') }}
          </router-link>
          <a class="text-sm font-medium hover:text-primary transition-colors text-gray-300" href="#">
            {{ $t('nav.cv') }}
          </a>
        </nav>
        
        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center gap-2 bg-[#0d1117] border border-console-border px-3 py-1.5 rounded-lg">
            <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">LANG:</span>
            <div class="relative flex items-center group">
              <span class="text-xs font-mono text-green-400">lang --set</span>
              <select 
                v-model="currentLocale"
                @change="changeLocale"
                class="bg-transparent border-none text-xs font-mono text-white focus:ring-0 cursor-pointer py-0 pl-1 pr-4 appearance-none"
              >
                <option class="bg-console-bg" value="es">es</option>
                <option class="bg-console-bg" value="en">en</option>
                <option class="bg-console-bg" value="de">de</option>
                <option class="bg-console-bg" value="fr">fr</option>
              </select>
              <span class="material-symbols-outlined text-xs text-gray-500 absolute right-0 pointer-events-none">expand_more</span>
            </div>
          </div>
          
          <div class="hidden md:flex">
            <button class="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">login</span>
              <span>{{ $t('nav.login') }}</span>
            </button>
          </div>
          
          <button class="md:hidden p-2 text-gray-300 hover:text-white">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

const changeLocale = () => {
  locale.value = currentLocale.value
  localStorage.setItem('locale', currentLocale.value)
  document.documentElement.lang = currentLocale.value
}

watch(() => locale.value, (newLocale) => {
  currentLocale.value = newLocale
})
</script>

