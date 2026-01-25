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
      <div v-if="project.tag || project.provider" class="flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 w-fit px-2 py-1 rounded">
        <span class="material-symbols-outlined text-sm">cloud_queue</span>
        <span>{{ project.tag || project.provider }}</span>
      </div>
      
      <h4 
        @click="goToProject"
        class="text-2xl font-bold text-white cursor-pointer hover:text-primary transition-colors"
      >
        {{ project.title }}
      </h4>
      
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
      
      <div v-if="project.github" class="pt-4">
        <button 
          @click="$emit('view-source', project)"
          class="w-full bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2 px-4 rounded transition-colors flex justify-center items-center gap-2"
        >
          <span class="material-symbols-outlined text-[18px]">code</span>
          <span>Ver Código</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const emit = defineEmits(['view-source'])

const goToProject = () => {
  if (props.project.id) {
    router.push(`/projects/${props.project.id}`)
  }
}
</script>

