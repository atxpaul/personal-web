<template>
    <div class="flex flex-1 overflow-hidden">
        <Sidebar />

        <!-- Main Content Area: Code Editor View -->
        <main
            class="flex-1 flex flex-col bg-[#111418] overflow-hidden relative"
        >
            <!-- Botón de edición para admin (cambia según la pestaña activa) -->
            <AdminOnly>
                <button
                    @click="handleEditClick"
                    class="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors flex items-center gap-2 shadow-lg z-50"
                >
                    <span class="material-symbols-outlined text-lg">edit</span>
                    <span>Editar</span>
                </button>
            </AdminOnly>
            <!-- Tab Bar (Simulated) -->
            <div class="flex h-9 bg-[#111418] border-b border-[#293038]">
                <div
                    class="flex items-center gap-2 px-4 border-r text-sm cursor-pointer min-w-[140px]"
                    :class="
                        activeTab === 'about'
                            ? 'border-t-2 border-b border-t-primary border-b-[#111418] border-r-[#293038] bg-[#111418] text-white'
                            : 'border-b border-b-[#293038] border-r-[#293038] bg-[#161e27] text-[#9dabb8] hover:bg-[#1c242e]'
                    "
                    @click="activeTab = 'about'"
                >
                    <span
                        class="material-symbols-outlined text-base text-[#42a5f5]"
                        >description</span
                    >
                    <span>about-me.md</span>
                    <span
                        class="material-symbols-outlined text-sm ml-auto text-[#9dabb8] hover:text-white"
                        >close</span
                    >
                </div>
                <div
                    class="flex items-center gap-2 px-4 border-r text-sm cursor-pointer min-w-[140px]"
                    :class="
                        activeTab === 'skills'
                            ? 'border-t-2 border-b border-t-primary border-b-[#111418] border-r-[#293038] bg-[#111418] text-white'
                            : 'border-b border-b-[#293038] border-r-[#293038] bg-[#161e27] text-[#9dabb8] hover:bg-[#1c242e]'
                    "
                    @click="activeTab = 'skills'"
                >
                    <span
                        class="material-symbols-outlined text-base text-[#fbc02d]"
                        >data_object</span
                    >
                    <span>skills.json</span>
                    <span
                        class="material-symbols-outlined text-sm ml-auto text-[#9dabb8] hover:text-white"
                        >close</span
                    >
                </div>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 md:pl-4 md:pr-8">
                <div class="max-w-4xl md:ml-0">
                    <!-- ABOUT TAB -->
                    <div v-if="activeTab === 'about'">
                        <!-- Page Heading Component -->
                        <div class="mb-8 animate-fade-in">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-primary text-xl font-bold"
                                    >$</span
                                >
                                <h1
                                    class="text-white text-4xl md:text-5xl font-bold tracking-[-0.033em]"
                                >
                                    {{ $t('about.whoami') }}
                                </h1>
                                <span
                                    class="w-3 h-8 bg-primary animate-pulse ml-1"
                                ></span>
                            </div>
                            <p
                                class="text-[#9dabb8] text-lg md:text-xl font-normal leading-relaxed mt-4 border-l-2 border-[#293038] pl-4"
                            >
                                {{ aboutMeData?.intro || $t('about.intro') }}
                            </p>
                        </div>

                        <!-- Main Description -->
                        <div
                            class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"
                        >
                            <div
                                class="lg:col-span-2 text-[#9dabb8] space-y-4 leading-relaxed"
                            >
                                <p>
                                    <span class="text-primary font-medium">
                                        &gt;
                                    </span>
                                    {{
                                        aboutMeData?.description1 ||
                                        $t('about.description1')
                                    }}
                                </p>
                                <p>
                                    <span class="text-primary font-medium">
                                        &gt;
                                    </span>
                                    {{
                                        aboutMeData?.description2 ||
                                        $t('about.description2')
                                    }}
                                </p>

                                <div
                                    class="mt-6 p-4 bg-[#161e27] border border-[#293038] rounded-lg font-mono text-sm"
                                >
                                    <div
                                        class="flex gap-4 text-[#9dabb8] mb-2 border-b border-[#293038] pb-2"
                                    >
                                        <span>contact_info.json</span>
                                    </div>
                                    <div class="text-[#f8f9fa]">
                                        <span class="text-[#abb2bf]">{</span
                                        ><br />
                                        &nbsp;&nbsp;<span class="text-[#e06c75]"
                                            >"email"</span
                                        >:
                                        <span class="text-[#98c379]"
                                            >"{{ contactInfo.email }}"</span
                                        >,<br />
                                        &nbsp;&nbsp;<span class="text-[#e06c75]"
                                            >"location"</span
                                        >:
                                        <span class="text-[#98c379]"
                                            >"{{ contactInfo.location }}"</span
                                        >,<br />
                                        &nbsp;&nbsp;<span class="text-[#e06c75]"
                                            >"status"</span
                                        >:
                                        <span class="text-[#61afef]"
                                            >"{{ contactInfo.status }}"</span
                                        ><br />
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
                                        style="
                                            background-image: radial-gradient(
                                                #293038 1px,
                                                transparent 1px
                                            );
                                            background-size: 20px 20px;
                                        "
                                    ></div>
                                    <span
                                        class="material-symbols-outlined text-6xl text-[#9dabb8]"
                                        >terminal</span
                                    >
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
                            <h3
                                class="text-white text-lg font-bold mb-4 flex items-center gap-2"
                            >
                                <span
                                    class="material-symbols-outlined text-primary"
                                    >bar_chart</span
                                >
                                {{ $t('about.systemMetrics') }}
                            </h3>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div
                                    v-for="metric in metrics"
                                    :key="metric.key"
                                    class="flex flex-col gap-2 rounded-lg p-6 border border-[#293038] bg-[#161e27] hover:border-primary/50 transition-colors"
                                >
                                    <div
                                        class="flex justify-between items-start"
                                    >
                                        <p
                                            class="text-[#9dabb8] text-sm font-medium"
                                        >
                                            {{
                                                $t(
                                                    `about.metrics.${metric.key}.label`,
                                                )
                                            }}
                                        </p>
                                        <span
                                            class="material-symbols-outlined text-sm"
                                            :class="metric.iconColor"
                                        >
                                            {{ metric.icon }}
                                        </span>
                                    </div>
                                    <p
                                        class="text-white text-2xl font-bold leading-tight"
                                    >
                                        {{ metric.value }}
                                    </p>
                                    <p
                                        class="text-xs font-medium leading-normal flex items-center gap-1"
                                        :class="metric.statusColor"
                                    >
                                        <span
                                            class="material-symbols-outlined text-xs"
                                        >
                                            {{ metric.statusIcon }}
                                        </span>
                                        {{
                                            $t(
                                                `about.metrics.${metric.key}.status`,
                                            )
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Skills / Chips Component -->
                        <div class="mb-10 relative">
                            <div class="flex items-center justify-between mb-4">
                                <h3
                                    class="text-white text-lg font-bold flex items-center gap-2"
                                >
                                    <span
                                        class="material-symbols-outlined text-primary"
                                        >extension</span
                                    >
                                    {{ $t('about.techStack') }}
                                </h3>
                                <AdminOnly>
                                    <button
                                        @click="handleEditTechStack"
                                        class="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors bg-console-bg border border-console-border text-gray-400 hover:border-primary hover:text-primary"
                                        title="Editar tech stack"
                                    >
                                        <span
                                            class="material-symbols-outlined text-[16px]"
                                            >edit</span
                                        >
                                        Editar
                                    </button>
                                </AdminOnly>
                            </div>
                            <div
                                class="bg-[#161e27] border border-[#293038] rounded-lg px-6 pt-4 pb-6"
                            >
                                <div
                                    v-for="(
                                        category, categoryKey, index
                                    ) in techStack"
                                    :key="categoryKey"
                                    :class="index > 0 ? 'mt-8' : ''"
                                >
                                    <p
                                        class="text-[#9dabb8] text-xs uppercase font-bold tracking-wider mb-4"
                                    >
                                        {{
                                            $t(
                                                `about.techStackCategories.${categoryKey}`,
                                            )
                                        }}
                                    </p>
                                    <div class="flex gap-3 flex-wrap">
                                        <div
                                            v-for="tech in category"
                                            :key="tech.name"
                                            class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded border border-[#293038] bg-[#111418] pl-3 pr-3 hover:border-primary/50 transition-colors cursor-default"
                                        >
                                            <span
                                                class="w-2 h-2 rounded-full"
                                                :style="{
                                                    backgroundColor: tech.color,
                                                }"
                                            ></span>
                                            <p
                                                class="text-white text-sm font-medium"
                                            >
                                                {{ tech.name }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer-like Terminal Line -->
                        <div
                            class="flex items-center gap-2 mt-12 mb-4 pt-8 border-t border-[#293038] text-[#9dabb8] text-sm font-mono"
                        >
                            <span class="text-primary">root@server:~$</span>
                            <span class="animate-pulse">_</span>
                        </div>
                    </div>

                    <!-- SKILLS.JSON TAB -->
                    <div v-else>
                        <div
                            class="flex-1 overflow-y-auto py-4 font-mono text-sm text-[#abb2bf] subpixel-antialiased"
                            style="counter-reset: line"
                        >
                            <pre
                                class="whitespace-pre-wrap"
                            ><code class="block json-viewer">
<span
  v-for="(line, index) in skillsLines"
  :key="index"
  class="code-line"
  v-html="highlightJsonLine(line)"
></span>
</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Modales de edición -->
        <EditAboutModal
            :is-open="showEditAboutModal"
            :initial-data="aboutMeData"
            @close="showEditAboutModal = false"
            @saved="handleAboutSaved"
        />

        <EditSkillsModal
            :is-open="showEditSkillsModal"
            :initial-data="skills"
            @close="showEditSkillsModal = false"
            @saved="handleSkillsSaved"
        />

        <EditTechStackModal
            :is-open="showEditTechStackModal"
            :initial-tech-stack="techStack"
            @close="showEditTechStackModal = false"
            @saved="handleTechStackSaved"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, provide, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Sidebar from '../components/Sidebar.vue';
import EditAboutModal from '../components/EditAboutModal.vue';
import EditSkillsModal from '../components/EditSkillsModal.vue';
import EditTechStackModal from '../components/EditTechStackModal.vue';
import AdminOnly from '../components/AdminOnly.vue';
import {
    getContactInfo,
    getMetrics,
    getTechStack,
    getSkills as getStaticSkills,
} from '../data/static.js';
import {
    getAboutMe,
    getSkills as getFirestoreSkills,
    getTechStack as getFirestoreTechStack,
} from '../data/firestore.js';
import { useAdmin } from '../composables/useAuth.js';

const { t, locale } = useI18n();
const { isAdmin } = useAdmin();
const showEditAboutModal = ref(false);
const showEditSkillsModal = ref(false);
const showEditTechStackModal = ref(false);

const activeTab = ref('about');

// Proporcionar función para cambiar el tab desde el Sidebar y el estado actual
const setActiveTab = (tab) => {
    activeTab.value = tab;
};
provide('setActiveTab', setActiveTab);
provide('activeTab', activeTab);

const contactInfo = ref({
    email: 'dev@root.sh',
    location: 'Remote / Madrid',
    status: 'Open for hire',
});

const metrics = ref([
    {
        key: 'uptime',
        value: '99.99%',
        icon: 'check_circle',
        iconColor: 'text-[#0bda5b]',
        statusIcon: 'arrow_upward',
        statusColor: 'text-[#0bda5b]',
    },
    {
        key: 'deployments',
        value: '1,250+',
        icon: 'rocket_launch',
        iconColor: 'text-primary',
        statusIcon: 'add',
        statusColor: 'text-primary',
    },
    {
        key: 'automation',
        value: '85%',
        icon: 'bolt',
        iconColor: 'text-[#fbc02d]',
        statusIcon: 'trending_up',
        statusColor: 'text-[#fbc02d]',
    },
]);

const techStack = ref({
    core: [
        { name: 'AWS', color: '#ff9900' },
        { name: 'Docker', color: '#0db7ed' },
        { name: 'Kubernetes', color: '#326ce5' },
        { name: 'Terraform', color: '#7b42bc' },
        { name: 'Ansible', color: '#ee0000' },
    ],
    scripting: [
        { name: 'Python', color: '#3776ab' },
        { name: 'Bash', color: '#4EAA25' },
        { name: 'Jenkins', color: '#D24939' },
        { name: 'GitHub Actions', color: '#2088FF' },
    ],
});

const skills = ref(null);
const aboutMeData = ref(null);

const skillsLines = computed(() => {
    if (!skills.value) return [];
    const jsonString = JSON.stringify(skills.value, null, 2);
    return jsonString.split('\n');
});

// Función para aplicar syntax highlighting a cada línea del JSON
const highlightJsonLine = (line) => {
    if (!line || line.trim() === '') return line;

    // Escapar HTML primero
    let escaped = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Colorear puntuación primero (para evitar conflictos)
    escaped = escaped.replace(
        /([{}[\]])/g,
        '<span class="json-punct">$1</span>',
    );
    escaped = escaped.replace(
        /(,)(?!\s*$)/g,
        '<span class="json-punct">$1</span>',
    );

    // Colorear keys (palabras entre comillas seguidas de :)
    escaped = escaped.replace(
        /"([^"]+)":/g,
        '<span class="json-key">"$1"</span>:',
    );

    // Colorear strings (valores entre comillas que no son keys)
    // Buscar patrones como: : "valor" o , "valor"
    escaped = escaped.replace(
        /([:,\[])\s*"([^"]*)"/g,
        (match, punct, value) => {
            return `${punct === ':' ? ':' : punct} <span class="json-string">"${value}"</span>`;
        },
    );

    // Colorear números (solo si no están dentro de strings ya coloreados)
    escaped = escaped.replace(
        /: (\d+\.?\d*)(?![^<]*<\/span>)/g,
        ': <span class="json-number">$1</span>',
    );

    // Colorear booleanos
    escaped = escaped.replace(
        /: (true|false)(?![^<]*<\/span>)/g,
        ': <span class="json-boolean">$1</span>',
    );

    // Colorear null
    escaped = escaped.replace(
        /: (null)(?![^<]*<\/span>)/g,
        ': <span class="json-null">$1</span>',
    );

    return escaped;
};

// Cargar datos de About desde Firestore con fallback a static
const loadAboutMeData = async () => {
    try {
        // Intentar cargar desde Firestore
        const firestoreData = await getAboutMe(locale.value);
        if (firestoreData) {
            aboutMeData.value = firestoreData;
            // Actualizar los refs locales con los datos de Firestore
            if (firestoreData.contactInfo) {
                contactInfo.value = firestoreData.contactInfo;
            }
            if (firestoreData.metrics) {
                metrics.value = firestoreData.metrics;
            }
            return;
        }
    } catch (err) {
        console.warn('Error loading from Firestore, using static data:', err);
    }

    // Fallback a datos estáticos
    const contact = await getContactInfo();
    if (contact) contactInfo.value = contact;

    const metricsData = await getMetrics();
    if (metricsData) metrics.value = metricsData;

    // Crear objeto aboutMeData con datos estáticos
    aboutMeData.value = {
        intro: t('about.intro'),
        description1: t('about.description1'),
        description2: t('about.description2'),
        contactInfo: contactInfo.value,
        metrics: metrics.value,
    };
};

// Cargar datos cuando cambia el idioma
watch(
    locale,
    () => {
        loadAboutMeData();
    },
    { immediate: true },
);

const handleAboutSaved = () => {
    // Recargar datos después de guardar
    loadAboutMeData();
};

// Cargar skills desde Firestore con fallback a static
const loadSkillsData = async () => {
    try {
        // Intentar cargar desde Firestore
        const firestoreSkills = await getFirestoreSkills();
        if (firestoreSkills) {
            skills.value = firestoreSkills;
            return;
        }
    } catch (err) {
        console.warn(
            'Error loading skills from Firestore, using static data:',
            err,
        );
    }

    // Fallback a datos estáticos
    const staticSkills = await getStaticSkills();
    if (staticSkills) {
        skills.value = staticSkills;
    }
};

const handleSkillsSaved = () => {
    // Recargar skills después de guardar
    loadSkillsData();
};

// Función para manejar el clic en editar según la pestaña activa
const handleEditClick = () => {
    if (activeTab.value === 'about') {
        showEditAboutModal.value = true;
    } else if (activeTab.value === 'skills') {
        showEditSkillsModal.value = true;
    }
};

const handleEditTechStack = () => {
    showEditTechStackModal.value = true;
};

const handleTechStackSaved = () => {
    // Recargar tech stack después de guardar
    loadTechStackData();
};

// Cargar tech stack desde Firestore con fallback a static
const loadTechStackData = async () => {
    try {
        // Intentar cargar desde Firestore
        const firestoreTechStack = await getFirestoreTechStack();
        if (firestoreTechStack) {
            techStack.value = firestoreTechStack;
            return;
        }
    } catch (err) {
        console.warn(
            'Error loading tech stack from Firestore, using static data:',
            err,
        );
    }

    // Fallback a datos estáticos
    const staticTechStack = await getTechStack();
    if (staticTechStack) {
        techStack.value = staticTechStack;
    }
};

onMounted(async () => {
    // Cargar datos de About
    await loadAboutMeData();

    // Cargar tech stack desde Firestore
    await loadTechStackData();

    // Cargar skills
    await loadSkillsData();
});
</script>
