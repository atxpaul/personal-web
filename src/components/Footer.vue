<template>
  <footer class="border-t border-console-border bg-[#0d1117] mt-auto">
    <div class="max-w-[1280px] mx-auto px-4 py-8 md:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-6">
          <a 
            v-for="(url, key) in socialLinks" 
            :key="key"
            :href="url" 
            class="group flex flex-col items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors">
              {{ getIcon(key) }}
            </span>
            <span class="text-[10px] text-gray-600 font-mono group-hover:text-primary">
              {{ $t(`social.${key}`) }}
            </span>
          </a>
        </div>
        
        <div class="flex items-center gap-4 text-xs font-mono text-gray-500 bg-[#161b22] px-4 py-2 rounded-full border border-console-border">
          <span class="flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-green-500"></span> 
            {{ $t('footer.online') }}
          </span>
          <span class="w-px h-3 bg-gray-700"></span>
          <span>{{ $t('footer.encoding') }}</span>
          <span class="w-px h-3 bg-gray-700"></span>
          <span class="flex items-center gap-1 text-primary">
            <span class="material-symbols-outlined text-[14px]">language</span> 
            {{ $t('footer.locale') }}
          </span>
          <span class="w-px h-3 bg-gray-700"></span>
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">call_split</span> 
            {{ $t('footer.branch') }}
          </span>
        </div>
      </div>
      
      <div class="text-center mt-6 text-xs text-gray-600">
        {{ $t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  socialLinks: {
    type: Object,
    default: () => ({})
  }
})

const getIcon = (key) => {
  const icons = {
    github: 'terminal',
    gitlab: 'hub',
    stackoverflow: 'code',
    linkedin: 'person_search'
  }
  return icons[key] || 'link'
}
</script>

