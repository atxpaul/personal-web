<template>
    <div class="flex-grow py-10 md:py-14">
        <!-- Botón de edición para admin (cambia según la pestaña activa) -->
        <AdminOnly>
            <button
                type="button"
                @click="handleEditClick"
                class="btn btn-primary fixed bottom-6 right-6 h-12 shadow-lg z-50"
            >
                <span aria-hidden="true" class="material-symbols-outlined text-lg">edit</span>
                <span>Editar</span>
            </button>
        </AdminOnly>

        <div class="page">
            <PageHeader
                :command="$t('about.whoami')"
                :lead="aboutMeData?.intro || $t('about.intro')"
            />

            <div
                class="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-6 lg:gap-8 items-start"
            >
                <!-- Documento: about-me.md / skills.json -->
                <section class="pane overflow-hidden min-w-0">
                    <div
                        class="flex border-b border-console-border bg-console-raised overflow-x-auto"
                        role="tablist"
                        :aria-label="$t('about.files')"
                    >
                        <button
                            v-for="tab in tabs"
                            :id="`tab-${tab.id}`"
                            :key="tab.id"
                            type="button"
                            role="tab"
                            :aria-selected="activeTab === tab.id"
                            :aria-controls="`panel-${tab.id}`"
                            :tabindex="activeTab === tab.id ? 0 : -1"
                            @keydown.right.prevent="focusTab(1)"
                            @keydown.left.prevent="focusTab(-1)"
                            @keydown.home.prevent="focusTab('first')"
                            @keydown.end.prevent="focusTab('last')"
                            class="relative flex items-center gap-2 h-11 px-5 shrink-0 border-r border-console-border font-mono text-xs transition-colors"
                            :class="
                                activeTab === tab.id
                                    ? 'bg-console-bg text-white'
                                    : 'text-console-muted hover:text-white'
                            "
                            @click="activeTab = tab.id"
                        >
                            <span
                                aria-hidden="true"
                                class="material-symbols-outlined text-[16px]"
                                :class="tab.iconColor"
                                >{{ tab.icon }}</span
                            >
                            {{ tab.label }}
                            <span
                                v-if="activeTab === tab.id"
                                class="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                                aria-hidden="true"
                            ></span>
                        </button>
                    </div>

                    <!-- ABOUT-ME.MD -->
                    <div
                        v-if="activeTab === 'about'"
                        id="panel-about"
                        role="tabpanel"
                        aria-labelledby="tab-about"
                        class="p-6 md:p-10"
                    >
                        <div
                            class="max-w-[65ch] space-y-5 font-display text-[1.0625rem] leading-[1.75] text-console-text"
                        >
                            <p>
                                {{ aboutMeData?.description1 || $t('about.description1') }}
                            </p>
                            <p>
                                {{ aboutMeData?.description2 || $t('about.description2') }}
                            </p>
                        </div>

                        <!-- Stack -->
                        <div class="mt-12 pt-10 border-t border-console-border">
                            <div class="flex items-center justify-between gap-4 mb-6">
                                <h2
                                    class="flex items-baseline gap-3 font-display text-xl md:text-2xl font-bold tracking-[-0.02em] text-white"
                                >
                                    <span class="font-mono text-primary text-lg" aria-hidden="true"
                                        >##</span
                                    >
                                    {{ $t('about.techStack') }}
                                </h2>
                                <AdminOnly>
                                    <button
                                        type="button"
                                        @click="handleEditTechStack"
                                        class="btn btn-ghost h-8 px-3 text-xs"
                                        title="Editar tech stack"
                                    >
                                        <span
                                            aria-hidden="true"
                                            class="material-symbols-outlined text-[16px]"
                                            >edit</span
                                        >
                                        Editar
                                    </button>
                                </AdminOnly>
                            </div>

                            <div class="space-y-7">
                                <div v-for="(category, categoryKey) in techStack" :key="categoryKey">
                                    <h3 class="font-mono text-xs text-console-muted mb-3">
                                        {{ $t(`about.techStackCategories.${categoryKey}`) }}:
                                    </h3>
                                    <ul role="list" class="flex flex-wrap gap-2">
                                        <li
                                            v-for="tech in category"
                                            :key="tech.name"
                                            class="flag text-sm text-console-text px-3 py-2"
                                        >
                                            <span
                                                class="w-2 h-2 rounded-full"
                                                :style="{ backgroundColor: tech.color }"
                                                aria-hidden="true"
                                            ></span>
                                            {{ tech.name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- SKILLS.JSON -->
                    <div
                        v-else
                        id="panel-skills"
                        role="tabpanel"
                        aria-labelledby="tab-skills"
                        class="py-6 pr-6 pl-3 overflow-x-auto font-mono text-sm leading-relaxed text-[#abb2bf]"
                        style="counter-reset: line"
                    >
                        <pre
                            class="whitespace-pre-wrap"
                        ><code class="block json-viewer"><span
  v-for="(line, index) in skillsLines"
  :key="index"
  class="code-line"
  v-html="highlightJsonLine(line)"
></span></code></pre>
                    </div>
                </section>

                <!-- Lateral: contacto -->
                <aside class="space-y-6 lg:sticky lg:top-24">
                    <section class="pane overflow-hidden" aria-labelledby="contact-title">
                        <h2 id="contact-title" class="pane-head">
                            <span
                                aria-hidden="true"
                                class="material-symbols-outlined text-[16px] text-[#fbc02d]"
                                >data_object</span
                            >
                            contact_info.json
                        </h2>
                        <div class="p-5 font-mono text-[13px] leading-7 [overflow-wrap:anywhere]">
                            <span class="json-punct">{</span>
                            <dl class="pl-4">
                                <div v-if="contactInfo.status">
                                    <dt class="inline json-key">"status"</dt><span class="json-punct">: </span>
                                    <dd class="inline text-prompt">
                                        <span
                                            class="inline-block w-1.5 h-1.5 mr-1 align-middle rounded-full bg-prompt live-dot"
                                            aria-hidden="true"
                                        ></span
                                        >"{{ contactInfo.status }}"</dd
                                    ><span class="json-punct">,</span>
                                </div>
                                <div v-if="contactInfo.location">
                                    <dt class="inline json-key">"location"</dt><span class="json-punct">: </span>
                                    <dd class="inline json-string">"{{ contactInfo.location }}"</dd
                                    ><span class="json-punct">,</span>
                                </div>
                                <div v-if="contactInfo.email">
                                    <dt class="inline json-key">"email"</dt><span class="json-punct">: </span>
                                    <dd class="inline json-string">"{{ contactInfo.email }}"</dd
                                    ><span class="json-punct">,</span>
                                </div>
                                <div>
                                    <dt class="inline json-key">"linkedin"</dt><span class="json-punct">: </span>
                                    <dd class="inline">
                                        <a
                                            :href="CONTACT_URL"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-primary hover:underline rounded-sm"
                                            >"{{ contactHandle }}"</a
                                        >
                                    </dd>
                                </div>
                            </dl>
                            <span class="json-punct">}</span>
                        </div>
                        <div class="px-5 pb-5">
                            <a
                                :href="CONTACT_URL"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn btn-primary w-full"
                            >
                                <span aria-hidden="true" class="material-symbols-outlined text-[18px]"
                                    >mail</span
                                >
                                {{ $t('terminal.contact') }}
                            </a>
                        </div>
                    </section>

                    <router-link
                        to="/projects"
                        class="pane group flex items-center justify-between gap-4 p-5 transition-colors hover:border-primary"
                    >
                        <span>
                            <span class="block font-mono text-xs text-console-muted">~/projects</span>
                            <span class="mt-1 block font-display font-semibold text-white">
                                {{ $t('about.seeProjects') }}
                            </span>
                        </span>
                        <span
                            aria-hidden="true"
                            class="material-symbols-outlined text-primary transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
                            >arrow_forward</span
                        >
                    </router-link>
                </aside>
            </div>
        </div>

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
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import PageHeader from '../components/PageHeader.vue';
import EditAboutModal from '../components/EditAboutModal.vue';
import EditSkillsModal from '../components/EditSkillsModal.vue';
import EditTechStackModal from '../components/EditTechStackModal.vue';
import AdminOnly from '../components/AdminOnly.vue';
import {
    getContactInfo,
    getMetrics,
    getTechStack,
    getSkills as getStaticSkills,
    CONTACT_URL,
} from '../data/static.js';
import {
    getAboutMe,
    getSkills as getFirestoreSkills,
    getTechStack as getFirestoreTechStack,
} from '../data/firestore.js';

const { t, locale } = useI18n();
const showEditAboutModal = ref(false);
const showEditSkillsModal = ref(false);
const showEditTechStackModal = ref(false);

const activeTab = ref('about');

const tabs = [
    { id: 'about', label: 'about-me.md', icon: 'description', iconColor: 'text-[#61afef]' },
    { id: 'skills', label: 'skills.json', icon: 'data_object', iconColor: 'text-[#fbc02d]' },
];

// Flechas izquierda/derecha (y Inicio/Fin) cambian de pestaña y mueven el foco
const focusTab = (step) => {
    const ids = tabs.map((t) => t.id);
    const current = ids.indexOf(activeTab.value);
    const next =
        step === 'first'
            ? 0
            : step === 'last'
              ? ids.length - 1
              : (current + step + ids.length) % ids.length;
    activeTab.value = ids[next];
    nextTick(() => document.getElementById(`tab-${ids[next]}`)?.focus());
};

const contactHandle = CONTACT_URL.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '');

const contactInfo = ref({
    email: '',
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
// Si el idioma cambia a mitad de una carga, la respuesta antigua se descarta
let aboutRequest = 0;

const loadAboutMeData = async () => {
    const requestId = ++aboutRequest;
    try {
        // Intentar cargar desde Firestore
        const firestoreData = await getAboutMe(locale.value);
        if (requestId !== aboutRequest) return;
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

    if (requestId !== aboutRequest) return;

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
