<template>
  <div class="flex flex-1 overflow-hidden">
    <Sidebar />

    <!-- Main Content Area: Code Editor View -->
    <main class="flex-1 flex flex-col bg-[#111418] overflow-hidden relative">
      <!-- Tab Bar (Simulated) -->
      <div class="flex h-9 bg-[#111418] border-b border-[#293038]">
        <div
          class="flex items-center gap-2 px-4 border-r text-sm cursor-pointer min-w-[140px]"
          :class="activeTab === 'about'
            ? 'border-t-2 border-b border-t-primary border-b-[#111418] border-r-[#293038] bg-[#111418] text-white'
            : 'border-b border-b-[#293038] border-r-[#293038] bg-[#161e27] text-[#9dabb8] hover:bg-[#1c242e]'"
          @click="activeTab = 'about'"
        >
          <span class="material-symbols-outlined text-base text-[#42a5f5]">description</span>
          <span>about-me.md</span>
          <span class="material-symbols-outlined text-sm ml-auto text-[#9dabb8] hover:text-white">close</span>
        </div>
        <div
          class="flex items-center gap-2 px-4 border-r text-sm cursor-pointer min-w-[140px]"
          :class="activeTab === 'skills'
            ? 'border-t-2 border-b border-t-primary border-b-[#111418] border-r-[#293038] bg-[#111418] text-white'
            : 'border-b border-b-[#293038] border-r-[#293038] bg-[#161e27] text-[#9dabb8] hover:bg-[#1c242e]'"
          @click="activeTab = 'skills'"
        >
          <span class="material-symbols-outlined text-base text-[#fbc02d]">data_object</span>
          <span>skills.json</span>
          <span class="material-symbols-outlined text-sm ml-auto text-[#9dabb8] hover:text-white">close</span>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
          <!-- ABOUT TAB -->
          <div v-if="activeTab === 'about'">
            <!-- Page Heading Component -->
            <div class="mb-8 animate-fade-in">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-primary text-xl font-bold">$</span>
                <h1 class="text-white text-4xl md:text-5xl font-bold tracking-[-0.033em]">
                  {{ $t('about.whoami') }}
                </h1>
                <span class="w-3 h-8 bg-primary animate-pulse ml-1"></span>
              </div>
              <p
                class="text-[#9dabb8] text-lg md:text-xl font-normal leading-relaxed mt-4 border-l-2 border-[#293038] pl-4"
              >
                {{ $t('about.intro') }}
              </p>
            </div>

            <!-- Main Description -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div class="lg:col-span-2 text-[#9dabb8] space-y-4 leading-relaxed">
                <p>
                  <span class="text-primary font-medium"> &gt; </span>
                  {{ $t('about.description1') }}
                </p>
                <p>
                  <span class="text-primary font-medium"> &gt; </span>
                  {{ $t('about.description2') }}
                </p>

                <div class="mt-6 p-4 bg-[#161e27] border border-[#293038] rounded-lg font-mono text-sm">
                  <div class="flex gap-4 text-[#9dabb8] mb-2 border-b border-[#293038] pb-2">
                    <span>contact_info.json</span>
                  </div>
                  <div class="text-[#f8f9fa]">
                    <span class="text-[#abb2bf]">{</span><br />
                    &nbsp;&nbsp;<span class="text-[#e06c75]">"email"</span>:
                    <span class="text-[#98c379]">"{{ contactInfo.email }}"</span>,<br />
                    &nbsp;&nbsp;<span class="text-[#e06c75]">"location"</span>:
                    <span class="text-[#98c379]">"{{ contactInfo.location }}"</span>,<br />
                    &nbsp;&nbsp;<span class="text-[#e06c75]">"status"</span>:
                    <span class="text-[#61afef]">"{{ contactInfo.status }}"</span><br />
                    <span class="text-[#abb2bf]">}</span>
                  </div>
                </div>
              </div>

              <!-- Profile Image / Avatar Placeholder -->
              <div class="relative group">
                <div
                  class="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
                ></div>
                <div
                  class="relative w-full aspect-square rounded-lg bg-[#161e27] border border-[#293038] flex items-center justify-center overflow-hidden"
                >
                  <!-- Abstract tech background placeholder -->
                  <div
                    class="absolute inset-0 opacity-20"
                    style="background-image: radial-gradient(#293038 1px, transparent 1px); background-size: 20px 20px;"
                  ></div>
                  <span class="material-symbols-outlined text-6xl text-[#9dabb8]">terminal</span>
                  <img
                    alt="Server room with blue LED lights representing infrastructure"
                    class="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay hover:opacity-70 transition-opacity"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnJBD2x2pgNyJaRhfu54mMk-ztM3kUu9Fo8JKsEqJT0-LX9ieL_Unh3LOLx2prvXVcJo6pDEU17Ap015qZ7bw6og2Et5NX77BuqpEQMJwkMLkotIRAGTEHXtbpnub5-O_Lxwo8PjZAUABOWltLilU1QpaOr1Tf-NF5svmRjE4i4k_SBZWDiHGlQgUQBwrmp2JXY8G4YJimG3KwZeS1yvW9pZHl1_Z2IsEzLhQ7vIJtWF7oWISr0NJWTkhMThPEizGH4i8SlQ-PPTu-"
                  />
                </div>
              </div>
            </div>

            <!-- Stats Component -->
            <div class="mb-10">
              <h3 class="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">bar_chart</span>
                {{ $t('about.systemMetrics') }}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  v-for="metric in metrics"
                  :key="metric.key"
                  class="flex flex-col gap-2 rounded-lg p-6 border border-[#293038] bg-[#161e27] hover:border-primary/50 transition-colors"
                >
                  <div class="flex justify-between items-start">
                    <p class="text-[#9dabb8] text-sm font-medium">
                      {{ $t(`about.metrics.${metric.key}.label`) }}
                    </p>
                    <span class="material-symbols-outlined text-sm" :class="metric.iconColor">
                      {{ metric.icon }}
                    </span>
                  </div>
                  <p class="text-white text-2xl font-bold leading-tight">
                    {{ metric.value }}
                  </p>
                  <p
                    class="text-xs font-medium leading-normal flex items-center gap-1"
                    :class="metric.statusColor"
                  >
                    <span class="material-symbols-outlined text-xs">
                      {{ metric.statusIcon }}
                    </span>
                    {{ $t(`about.metrics.${metric.key}.status`) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Skills / Chips Component -->
            <div class="mb-10">
              <h3 class="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">extension</span>
                {{ $t('about.techStack') }}
              </h3>
              <div class="bg-[#161e27] border border-[#293038] rounded-lg p-6">
                <div
                  v-for="(category, categoryKey) in techStack"
                  :key="categoryKey"
                  :class="{ 'mt-6': categoryKey !== 'core' }"
                >
                  <p class="text-[#9dabb8] text-xs uppercase font-bold tracking-wider mb-4">
                    {{ $t(`about.techStackCategories.${categoryKey}`) }}
                  </p>
                  <div class="flex gap-3 flex-wrap">
                    <div
                      v-for="tech in category"
                      :key="tech.name"
                      class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded border border-[#293038] bg-[#111418] pl-3 pr-3 hover:border-primary/50 transition-colors cursor-default"
                    >
                      <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: tech.color }"></span>
                      <p class="text-white text-sm font-medium">
                        {{ tech.name }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer-like Terminal Line -->
            <div class="flex items-center gap-2 mt-12 mb-4 pt-8 border-t border-[#293038] text-[#9dabb8] text-sm font-mono">
              <span class="text-primary">root@server:~$</span>
              <span class="animate-pulse">_</span>
            </div>
          </div>

          <!-- SKILLS.JSON TAB -->
          <div v-else>
            <div
              class="flex-1 overflow-y-auto py-4 font-mono text-sm text-[#abb2bf] subpixel-antialiased"
              style="counter-reset: line;"
            >
              <pre class="whitespace-pre-wrap"><code class="block">
<span
  v-for="(line, index) in skillsLines"
  :key="index"
  class="code-line"
>
  {{ line }}
</span>
</code></pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import Sidebar from '../components/Sidebar.vue'
import { getContactInfo, getMetrics, getTechStack, getSkills } from '../data/static.js'

const { t } = useI18n()

const activeTab = ref('about')

// Proporcionar función para cambiar el tab desde el Sidebar y el estado actual
const setActiveTab = (tab) => {
  activeTab.value = tab
}
provide('setActiveTab', setActiveTab)
provide('activeTab', activeTab)

const contactInfo = ref({
  email: 'dev@root.sh',
  location: 'Remote / Madrid',
  status: 'Open for hire'
})

const metrics = ref([
  {
    key: 'uptime',
    value: '99.99%',
    icon: 'check_circle',
    iconColor: 'text-[#0bda5b]',
    statusIcon: 'arrow_upward',
    statusColor: 'text-[#0bda5b]'
  },
  {
    key: 'deployments',
    value: '1,250+',
    icon: 'rocket_launch',
    iconColor: 'text-primary',
    statusIcon: 'add',
    statusColor: 'text-primary'
  },
  {
    key: 'automation',
    value: '85%',
    icon: 'bolt',
    iconColor: 'text-[#fbc02d]',
    statusIcon: 'trending_up',
    statusColor: 'text-[#fbc02d]'
  }
])

const techStack = ref({
  core: [
    { name: 'AWS', color: '#ff9900' },
    { name: 'Docker', color: '#0db7ed' },
    { name: 'Kubernetes', color: '#326ce5' },
    { name: 'Terraform', color: '#7b42bc' },
    { name: 'Ansible', color: '#ee0000' }
  ],
  scripting: [
    { name: 'Python', color: '#3776ab' },
    { name: 'Bash', color: '#4EAA25' },
    { name: 'Jenkins', color: '#D24939' },
    { name: 'GitHub Actions', color: '#2088FF' }
  ]
})

const skills = ref(null)

const skillsLines = computed(() => {
  if (!skills.value) return []
  const jsonString = JSON.stringify(skills.value, null, 2)
  return jsonString.split('\n')
})

onMounted(async () => {
  // En el futuro, estos datos vendrán del backend
  const contact = await getContactInfo()
  if (contact) contactInfo.value = contact

  const metricsData = await getMetrics()
  if (metricsData) metrics.value = metricsData

  const tech = await getTechStack()
  if (tech) techStack.value = tech

  const skillsData = await getSkills()
  if (skillsData) skills.value = skillsData
})
</script>

