<template>
  <article v-if="project" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch rounded-xl bg-console-bg border border-console-border p-1 overflow-hidden">
    <div class="relative w-full h-64 md:h-auto overflow-hidden rounded-lg bg-[#0d1117] border border-console-border/50" aria-hidden="true">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0d1117] to-[#0d1117]"></div>
      <div
        v-if="project.image"
        class="relative w-full h-full bg-cover bg-center opacity-80"
        :style="{ backgroundImage: `url('${project.image}')` }"
      ></div>
    </div>

    <div class="flex flex-col justify-center p-6 gap-4 min-w-0">
      <div v-if="project.tag || project.provider" class="flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 w-fit max-w-full px-2 py-1 rounded">
        <span aria-hidden="true" class="material-symbols-outlined text-sm">cloud_queue</span>
        <span class="truncate">{{ project.tag || project.provider }}</span>
      </div>

      <h3 class="text-2xl font-bold text-white [overflow-wrap:anywhere]">
        <router-link
          v-if="project.id"
          :to="`/projects/${project.id}`"
          class="hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
        >
          {{ project.title }}
        </router-link>
        <template v-else>{{ project.title }}</template>
      </h3>

      <p class="text-gray-400 text-sm leading-relaxed [overflow-wrap:anywhere]">
        {{ project.description }}
      </p>

      <div v-if="project.technologies?.length" class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="text-xs border border-console-border bg-[#161b22] text-gray-400 px-2 py-1 rounded"
        >
          {{ tech }}
        </span>
      </div>

      <div v-if="project.github" class="pt-4">
        <a
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2 px-4 rounded transition-colors flex justify-center items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span aria-hidden="true" class="material-symbols-outlined text-[18px]">code</span>
          <span>{{ $t('projects.viewCode') }}</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>
