<template>
  <article
    v-if="project"
    class="pane overflow-hidden grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
  >
    <!-- Visual: la imagen del proyecto, entonada al azul del sistema -->
    <div
      class="relative min-h-[13rem] md:min-h-full overflow-hidden border-b md:border-b-0 md:border-r border-console-border bg-console-raised"
    >
      <div
        v-if="project.image"
        aria-hidden="true"
        class="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-60"
        :style="{ backgroundImage: `url('${project.image}')` }"
      ></div>
      <div class="absolute inset-0 bg-primary/25 mix-blend-color" aria-hidden="true"></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-console-bg via-console-bg/30 to-transparent"
        aria-hidden="true"
      ></div>

      <div
        class="absolute left-5 right-5 bottom-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs"
      >
        <span v-if="project.status" class="flex items-center gap-2 text-prompt">
          <span class="w-1.5 h-1.5 rounded-full bg-prompt live-dot" aria-hidden="true"></span>
          {{ project.status }}
        </span>
        <span v-if="project.provider || project.tag" class="text-console-text">
          {{ project.provider || project.tag }}
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-5 p-6 md:p-8 lg:p-10 min-w-0">
      <p class="font-mono text-xs text-console-muted truncate">
        ~/projects/{{ project.id }}
      </p>

      <h3
        class="font-display text-2xl md:text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-white [overflow-wrap:anywhere]"
      >
        <router-link
          v-if="project.id"
          :to="`/projects/${project.id}`"
          class="hover:text-primary transition-colors rounded-sm"
        >
          {{ project.title }}
        </router-link>
        <template v-else>{{ project.title }}</template>
      </h3>

      <p
        v-if="project.description"
        class="text-console-text/85 leading-relaxed max-w-[60ch] [overflow-wrap:anywhere]"
      >
        {{ project.description }}
      </p>

      <div v-if="project.technologies?.length" class="flex flex-wrap gap-1.5">
        <span v-for="tech in project.technologies" :key="tech" class="flag">
          --{{ tech.toLowerCase().replace(/\s+/g, '-') }}
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-3 pt-2 mt-auto">
        <router-link
          v-if="project.id"
          :to="`/projects/${project.id}`"
          class="btn btn-primary"
        >
          <span aria-hidden="true" class="material-symbols-outlined text-[18px]">description</span>
          <span>{{ $t('projects.openDetail') }}</span>
        </router-link>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-ghost"
        >
          <span aria-hidden="true" class="material-symbols-outlined text-[18px]">code</span>
          <span>{{ $t('projects.viewCode') }}</span>
        </a>
        <slot name="actions" />
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
