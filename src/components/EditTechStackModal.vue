<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div
                v-if="isOpen"
                class="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
            >
                <div
                    class="modal-content bg-console-bg border border-console-border rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    <!-- Header -->
                    <div
                        class="bg-[#161b22] border-b border-console-border px-4 py-3 flex items-center justify-between flex-shrink-0"
                    >
                        <div class="flex items-center gap-2">
                            <div class="flex gap-1.5">
                                <div
                                    class="w-3 h-3 rounded-full bg-[#ff5f56]"
                                ></div>
                                <div
                                    class="w-3 h-3 rounded-full bg-[#ffbd2e]"
                                ></div>
                                <div
                                    class="w-3 h-3 rounded-full bg-[#27c93f]"
                                ></div>
                            </div>
                            <span class="ml-4 text-xs text-gray-500 font-mono"
                                >edit_tech_stack.sh</span
                            >
                        </div>
                        <button
                            @click="close"
                            class="text-gray-500 hover:text-white transition-colors"
                        >
                            <span class="material-symbols-outlined text-lg"
                                >close</span
                            >
                        </button>
                    </div>

                    <!-- Content - Scrollable -->
                    <div class="p-6 overflow-y-auto flex-1 min-h-0">
                        <div class="mb-6">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-primary text-xl font-bold"
                                    >$</span
                                >
                                <h2
                                    class="text-white text-2xl font-bold font-mono"
                                    >./edit_tech_stack.sh</h2
                                >
                            </div>
                            <p class="text-gray-400 text-sm">
                                Editando tech stack (categorías, tecnologías y
                                colores)
                            </p>
                        </div>

                        <form @submit.prevent="handleSave" class="space-y-6">
                            <!-- Categories -->
                            <div
                                v-for="(
                                    category, categoryKey
                                ) in formData.techStack"
                                :key="categoryKey"
                                class="bg-[#161b22] border border-console-border rounded-lg p-4"
                            >
                                <div
                                    class="flex items-center justify-between mb-4"
                                >
                                    <h3
                                        class="text-white text-lg font-bold font-mono uppercase"
                                        >{{ categoryKey }}</h3
                                    >
                                    <button
                                        type="button"
                                        @click="removeCategory(categoryKey)"
                                        class="text-red-400 hover:text-red-300 transition-colors"
                                        title="Eliminar categoría"
                                    >
                                        <span
                                            class="material-symbols-outlined text-lg"
                                            >delete</span
                                        >
                                    </button>
                                </div>

                                <!-- Technologies in this category -->
                                <div class="space-y-3">
                                    <div
                                        v-for="(tech, techIndex) in category"
                                        :key="techIndex"
                                        class="flex items-center gap-3 bg-[#0d1117] border border-console-border rounded p-3"
                                    >
                                        <div
                                            class="flex items-center gap-3 flex-1"
                                        >
                                            <!-- Color Picker -->
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <label
                                                    class="text-xs text-gray-400 font-mono"
                                                    >color:</label
                                                >
                                                <div class="relative">
                                                    <input
                                                        v-model="tech.color"
                                                        type="color"
                                                        class="w-12 h-8 rounded border border-console-border cursor-pointer"
                                                        title="Seleccionar color"
                                                    />
                                                </div>
                                                <input
                                                    v-model="tech.color"
                                                    type="text"
                                                    placeholder="#ff9900"
                                                    class="w-24 bg-[#161b22] border border-console-border rounded px-2 py-1 text-white text-xs font-mono focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                    pattern="^#[0-9A-Fa-f]{6}$"
                                                />
                                            </div>

                                            <!-- Tech Name -->
                                            <div class="flex-1">
                                                <input
                                                    v-model="tech.name"
                                                    type="text"
                                                    required
                                                    placeholder="Nombre de la tecnología"
                                                    class="w-full bg-[#161b22] border border-console-border rounded px-3 py-1.5 text-white text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                />
                                            </div>

                                            <!-- Remove Tech Button -->
                                            <button
                                                type="button"
                                                @click="
                                                    removeTech(
                                                        categoryKey,
                                                        techIndex,
                                                    )
                                                "
                                                class="text-red-400 hover:text-red-300 transition-colors"
                                                title="Eliminar tecnología"
                                            >
                                                <span
                                                    class="material-symbols-outlined text-lg"
                                                    >close</span
                                                >
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Add Tech Button -->
                                    <button
                                        type="button"
                                        @click="addTech(categoryKey)"
                                        class="w-full bg-[#21262d] hover:bg-[#30363d] border border-console-border border-dashed text-gray-400 hover:text-white py-2 rounded transition-colors flex items-center justify-center gap-2 text-sm font-mono"
                                    >
                                        <span
                                            class="material-symbols-outlined text-lg"
                                            >add</span
                                        >
                                        Añadir tecnología
                                    </button>
                                </div>
                            </div>

                            <!-- Add Category Button -->
                            <div>
                                <div class="flex items-center gap-3 mb-3">
                                    <input
                                        v-model="newCategoryName"
                                        type="text"
                                        placeholder="Nombre de la categoría (ej: core, scripting)"
                                        class="flex-1 bg-[#161b22] border border-console-border rounded px-3 py-2 text-white text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        @keyup.enter="addCategory"
                                    />
                                    <button
                                        type="button"
                                        @click="addCategory"
                                        class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded font-medium text-sm transition-colors flex items-center gap-2"
                                        :disabled="!newCategoryName.trim()"
                                    >
                                        <span
                                            class="material-symbols-outlined text-lg"
                                            >add</span
                                        >
                                        Añadir categoría
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 font-mono"
                                    >Usa nombres en minúsculas sin espacios (ej:
                                    core, scripting, tools)</p
                                >
                            </div>

                            <div
                                v-if="error"
                                class="text-red-400 text-sm font-mono bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                            >
                                <span class="text-red-500">Error:</span>
                                {{ error }}
                            </div>

                            <div
                                v-if="success"
                                class="text-green-400 text-sm font-mono bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                            >
                                <span class="text-green-500">✓</span> Tech stack
                                guardado correctamente
                            </div>

                            <div class="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    @click="close"
                                    class="flex-1 bg-[#21262d] hover:bg-[#30363d] border border-console-border text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    :disabled="loading"
                                    class="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <span
                                        v-if="loading"
                                        class="material-symbols-outlined text-[18px] animate-spin"
                                        >sync</span
                                    >
                                    <span
                                        v-else
                                        class="material-symbols-outlined text-[18px]"
                                        >save</span
                                    >
                                    <span>{{
                                        loading ? 'Guardando...' : 'Guardar'
                                    }}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Teleport, Transition } from 'vue';
import {
    saveTechStack,
    getTechStack as getFirestoreTechStack,
} from '../data/firestore.js';
import { auth } from '../config/firebase.js';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    initialTechStack: {
        type: Object,
        default: () => ({
            core: [],
            scripting: [],
        }),
    },
});

const emit = defineEmits(['close', 'saved']);

const loading = ref(false);
const error = ref(null);
const success = ref(false);
const newCategoryName = ref('');

const formData = ref({
    techStack: {},
});

// Sincronizar datos iniciales cuando cambian
watch(
    () => props.initialTechStack,
    (newTechStack) => {
        if (newTechStack) {
            formData.value.techStack = JSON.parse(JSON.stringify(newTechStack));
        }
    },
    { immediate: true, deep: true },
);

// Resetear cuando se abre el modal
watch(
    () => props.isOpen,
    (isOpen) => {
        if (isOpen && props.initialTechStack) {
            formData.value.techStack = JSON.parse(
                JSON.stringify(props.initialTechStack),
            );
            newCategoryName.value = '';
            error.value = null;
            success.value = false;
        }
    },
);

const addCategory = () => {
    const categoryName = newCategoryName.value.trim().toLowerCase();
    if (!categoryName) return;

    if (formData.value.techStack[categoryName]) {
        error.value = 'Esta categoría ya existe';
        return;
    }

    formData.value.techStack[categoryName] = [];
    newCategoryName.value = '';
    error.value = null;
};

const removeCategory = (categoryKey) => {
    if (Object.keys(formData.value.techStack).length <= 1) {
        error.value = 'Debe haber al menos una categoría';
        return;
    }
    delete formData.value.techStack[categoryKey];
    error.value = null;
};

const addTech = (categoryKey) => {
    if (!formData.value.techStack[categoryKey]) {
        formData.value.techStack[categoryKey] = [];
    }
    formData.value.techStack[categoryKey].push({
        name: '',
        color: '#1976d2',
    });
};

const removeTech = (categoryKey, techIndex) => {
    formData.value.techStack[categoryKey].splice(techIndex, 1);
    if (formData.value.techStack[categoryKey].length === 0) {
        delete formData.value.techStack[categoryKey];
    }
};

const close = () => {
    error.value = null;
    success.value = false;
    loading.value = false;
    newCategoryName.value = '';
    emit('close');
};

const handleSave = async () => {
    try {
        loading.value = true;
        error.value = null;
        success.value = false;

        // Validar que haya al menos una categoría con al menos una tecnología
        const categories = Object.keys(formData.value.techStack);
        if (categories.length === 0) {
            throw new Error('Debe haber al menos una categoría');
        }

        let hasValidTech = false;
        for (const categoryKey of categories) {
            const techs = formData.value.techStack[categoryKey];
            if (techs && techs.length > 0) {
                // Validar que todas las tecnologías tengan nombre y color válido
                for (const tech of techs) {
                    if (!tech.name || !tech.name.trim()) {
                        throw new Error(
                            `La tecnología en "${categoryKey}" debe tener un nombre`,
                        );
                    }
                    if (!tech.color || !/^#[0-9A-Fa-f]{6}$/i.test(tech.color)) {
                        throw new Error(
                            `La tecnología "${tech.name}" debe tener un color válido (formato: #RRGGBB)`,
                        );
                    }
                }
                hasValidTech = true;
            }
        }

        if (!hasValidTech) {
            throw new Error(
                'Debe haber al menos una tecnología en alguna categoría',
            );
        }

        // Verificar autenticación antes de guardar
        if (!auth.currentUser) {
            throw new Error('No estás autenticado. Por favor, inicia sesión.');
        }

        await saveTechStack(formData.value.techStack, auth);

        success.value = true;
        setTimeout(() => {
            emit('saved');
            close();
        }, 1000);
    } catch (err) {
        error.value = err.message || 'Error al guardar el tech stack';
        console.error('Error saving tech stack:', err);
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 9999 !important;
}

.modal-content {
    position: relative;
    z-index: 10000;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
    transition:
        transform 0.2s ease,
        opacity 0.2s ease;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
    transform: scale(0.95);
    opacity: 0;
}
</style>
