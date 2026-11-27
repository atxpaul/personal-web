<template>
  <header class="sticky top-0 z-50 w-full border-b border-console-border bg-background-dark/90 backdrop-blur-md supports-[backdrop-filter]:bg-background-dark/75">
    <div class="page">
      <div class="flex h-16 items-center justify-between gap-6">
        <router-link
          to="/"
          class="group flex items-center gap-2.5 font-mono text-sm font-bold text-white rounded-sm"
        >
          <span
            class="grid place-items-center w-7 h-7 rounded-md border border-console-border bg-console-bg text-prompt text-xs transition-colors group-hover:border-primary"
            aria-hidden="true"
            >&gt;_</span
          >
          <span class="whitespace-nowrap">~/devops_portfolio</span>
        </router-link>

        <nav class="hidden md:flex items-stretch self-stretch gap-0 lg:gap-1" :aria-label="$t('header.nav')">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="nav-link relative flex items-center px-2 lg:px-3 whitespace-nowrap font-mono text-[13px] text-console-muted hover:text-white transition-colors"
            active-class="is-active"
          >
            {{ $t(link.label) }}
          </router-link>
        </nav>

        <div class="flex items-center gap-2">
          <!-- Admin Badge -->
          <span v-if="isAdmin" class="hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-prompt/40 font-mono text-[11px] text-prompt">
            <span aria-hidden="true" class="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            root
          </span>

          <label class="hidden md:inline-flex relative items-center h-8 pl-3 pr-7 rounded-md border border-console-border bg-console-bg font-mono text-xs hover:border-console-muted focus-within:border-primary transition-colors">
            <span class="text-console-muted mr-1.5" aria-hidden="true">lang</span>
            <select
              v-model="currentLocale"
              :aria-label="$t('header.language')"
              @change="changeLocale"
              class="bg-transparent border-none p-0 text-xs font-mono text-white focus:ring-0 focus:outline-none cursor-pointer appearance-none"
            >
              <option v-for="l in locales" :key="l" class="bg-console-bg" :value="l">{{ l }}</option>
            </select>
            <span aria-hidden="true" class="material-symbols-outlined text-sm text-console-muted absolute right-1.5 pointer-events-none">expand_more</span>
          </label>

          <!-- Acceso: solo lo usa el propietario, así que no compite con las acciones del visitante -->
          <button
            v-if="!user"
            type="button"
            @click="showLoginModal = true"
            :aria-label="$t('nav.login')"
            class="hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md font-mono text-xs whitespace-nowrap text-console-muted hover:text-white hover:bg-console-raised transition-colors"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-[16px]">login</span>
            <span class="hidden lg:inline">{{ $t('nav.login') }}</span>
          </button>
          <button
            v-else
            type="button"
            @click="handleLogout"
            :aria-label="$t('nav.logout')"
            class="hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md font-mono text-xs whitespace-nowrap text-console-muted hover:text-white hover:bg-console-raised transition-colors"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-[16px]">logout</span>
            <span class="hidden lg:inline">{{ $t('nav.logout') }}</span>
          </button>

          <button
            type="button"
            class="md:hidden grid place-items-center w-10 h-10 -mr-2 rounded-md text-console-text hover:text-white hover:bg-console-raised"
            @click="toggleMobileMenu"
            :aria-expanded="isMobileOpen ? 'true' : 'false'"
            aria-controls="mobile-menu"
            :aria-label="$t('header.menu')"
          >
            <span aria-hidden="true" class="material-symbols-outlined">
              {{ isMobileOpen ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="isMobileOpen"
        id="mobile-menu"
        class="md:hidden border-t border-console-border pb-5"
      >
        <nav class="flex flex-col pt-3" :aria-label="$t('header.nav')">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 h-11 px-2 rounded-md font-mono text-sm text-console-text hover:bg-console-raised"
            active-class="!text-white bg-console-raised"
          >
            <span class="text-prompt" aria-hidden="true">$</span>
            {{ $t(link.label) }}
          </router-link>
        </nav>

        <div class="mt-4 pt-4 border-t border-console-border flex items-center justify-between gap-3">
          <label class="relative inline-flex items-center h-10 pl-3 pr-8 rounded-md border border-console-border bg-console-bg font-mono text-sm">
            <span class="text-console-muted mr-2" aria-hidden="true">lang</span>
            <select
              v-model="currentLocale"
              :aria-label="$t('header.language')"
              @change="changeLocale"
              class="bg-transparent border-none p-0 text-sm font-mono text-white focus:ring-0 focus:outline-none cursor-pointer appearance-none"
            >
              <option v-for="l in locales" :key="l" class="bg-console-bg" :value="l">{{ l }}</option>
            </select>
            <span aria-hidden="true" class="material-symbols-outlined text-sm text-console-muted absolute right-2 pointer-events-none">expand_more</span>
          </label>

          <span v-if="isAdmin" class="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-prompt/40 font-mono text-[11px] text-prompt">
            root
          </span>

          <button
            v-if="!user"
            type="button"
            @click="showLoginModal = true"
            class="inline-flex items-center gap-1.5 h-10 px-3 rounded-md font-mono text-sm text-console-muted hover:text-white hover:bg-console-raised"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-[18px]">login</span>
            <span>{{ $t('nav.login') }}</span>
          </button>
          <button
            v-else
            type="button"
            @click="handleLogout"
            class="inline-flex items-center gap-1.5 h-10 px-3 rounded-md font-mono text-sm text-console-muted hover:text-white hover:bg-console-raised"
          >
            <span aria-hidden="true" class="material-symbols-outlined text-[18px]">logout</span>
            <span>{{ $t('nav.logout') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal
      :is-open="showLoginModal"
      @close="showLoginModal = false"
      @success="handleLoginSuccess"
    />
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { saveLocale, SUPPORTED_LOCALES } from '../i18n'
import LoginModal from './LoginModal.vue'

const { locale } = useI18n()
const route = useRoute()
const { user, logout, isAdmin } = useAuth()

const links = [
  { to: '/about', label: 'nav.about' },
  { to: '/projects', label: 'nav.projects' },
  { to: '/blog', label: 'nav.blog' },
]
const locales = SUPPORTED_LOCALES

const currentLocale = ref(locale.value)
const isMobileOpen = ref(false)
const showLoginModal = ref(false)

const handleLoginSuccess = () => {
  showLoginModal.value = false
}

const handleLogout = async () => {
  await logout()
}

const changeLocale = () => {
  locale.value = currentLocale.value
  saveLocale(currentLocale.value)
}

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value
}

watch(() => locale.value, (newLocale) => {
  currentLocale.value = newLocale
})

watch(
  () => route.fullPath,
  () => {
    // Cerrar el menú móvil al navegar
    isMobileOpen.value = false
  }
)
</script>

<style scoped>
/* Pestaña activa: subrayado azul pegado al borde inferior del header */
.nav-link::after {
  content: '';
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: -1px;
  height: 2px;
  background: #197fe6;
  transform: scaleX(0);
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link.is-active {
  color: #ffffff;
}

.nav-link.is-active::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after {
    transition: none;
  }
}
</style>
