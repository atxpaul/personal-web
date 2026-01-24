<template>
  <div v-if="project" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch rounded-xl bg-console-bg border border-console-border p-1 overflow-hidden">
    <div class="relative w-full h-64 md:h-auto overflow-hidden rounded-lg bg-[#0d1117] border border-console-border/50">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0d1117] to-[#0d1117]"></div>
      <div 
        class="w-full h-full bg-cover bg-center opacity-80" 
        :style="{ backgroundImage: `url('${project.image}')` }"
        :alt="project.title"
      ></div>
    </div>
    
    <div class="flex flex-col justify-center p-6 gap-4">
      <div class="flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 w-fit px-2 py-1 rounded">
        <span class="material-symbols-outlined text-sm">cloud_queue</span>
        <span>{{ project.tag }}</span>
      </div>
      
      <h4 class="text-2xl font-bold text-white">{{ project.title }}</h4>
      
      <p class="text-gray-400 text-sm leading-relaxed">
        {{ project.description }}
      </p>
      
      <div class="flex flex-wrap gap-2 mt-2">
        <span 
          v-for="tech in project.technologies" 
          :key="tech"
          class="text-xs border border-console-border bg-[#161b22] text-gray-400 px-2 py-1 rounded"
        >
          {{ tech }}
        </span>
      </div>
      
      <div class="pt-4 flex gap-3">
        <button 
          @click="$emit('view-source', project)"
          class="flex-1 bg-[#21262d] hover:bg-[#30363d] border border-console-border text-white text-sm font-bold py-2 px-4 rounded transition-colors flex justify-center items-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">code</span>
          <span>View Source</span>
        </button>
        <button 
          @click="$emit('deploy', project)"
          class="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2 px-4 rounded transition-colors flex justify-center items-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">rocket_launch</span>
          <span>Deploy</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['view-source', 'deploy'])
</script>

