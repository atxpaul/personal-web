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
                                >edit_skills.sh</span
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
                                    >./edit_skills.sh</h2
                                >
                            </div>
                            <p class="text-gray-400 text-sm">
                                Editando skills.json. Los datos se guardan como
                                JSON.
                            </p>
                        </div>

                        <form @submit.prevent="handleSave" class="space-y-6">
                            <!-- Title -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-300 mb-2 font-mono"
                                >
                                    title: <span class="text-red-400">*</span>
                                </label>
                                <input
                                    v-model="formData.title"
                                    type="text"
                                    required
                                    class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                                    placeholder="DevOps Engineer Skills"
                                />
                            </div>

                            <!-- Categories -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-300 mb-2 font-mono"
                                >
                                    categories:
                                </label>
                                <div class="space-y-4">
                                    <div
                                        v-for="(
                                            category, categoryIndex
                                        ) in formData.categories"
                                        :key="categoryIndex"
                                        class="bg-[#161b22] border border-console-border rounded-lg p-4"
                                    >
                                        <div
                                            class="flex items-center justify-between mb-3"
                                        >
                                            <span
                                                class="text-primary font-mono text-sm"
                                                >category[{{
                                                    categoryIndex
                                                }}]:</span
                                            >
                                            <button
                                                type="button"
                                                @click="
                                                    removeCategory(
                                                        categoryIndex,
                                                    )
                                                "
                                                class="text-red-400 hover:text-red-300 text-sm font-mono"
                                            >
                                                Eliminar
                                            </button>
                                        </div>

                                        <div class="mb-3">
                                            <label
                                                class="block text-xs font-medium text-gray-400 mb-1 font-mono"
                                            >
                                                name:
                                            </label>
                                            <input
                                                v-model="category.name"
                                                type="text"
                                                required
                                                class="w-full bg-[#0d1117] border border-console-border rounded px-3 py-1.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                                                placeholder="Cloud Platforms"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                class="block text-xs font-medium text-gray-400 mb-1 font-mono"
                                            >
                                                skills:
                                                <span
                                                    class="text-gray-500 text-xs"
                                                    >(separados por comas)</span
                                                >
                                            </label>
                                            <input
                                                v-model="category.skillsInput"
                                                type="text"
                                                required
                                                class="w-full bg-[#0d1117] border border-console-border rounded px-3 py-1.5 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                                                placeholder="AWS, Azure, GCP"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        @click="addCategory"
                                        class="w-full bg-[#21262d] hover:bg-[#30363d] border border-console-border text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span
                                            class="material-symbols-outlined text-[18px]"
                                            >add</span
                                        >
                                        Añadir Categoría
                                    </button>
                                </div>
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
                                <span class="text-green-500">✓</span> Skills
                                guardados correctamente
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
import { saveSkills } from '../data/firestore.js';
import { auth } from '../config/firebase.js';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    initialData: {
        type: Object,
        default: () => ({
            title: '',
            categories: [],
        }),
    },
});

const emit = defineEmits(['close', 'saved']);

const loading = ref(false);
const error = ref(null);
const success = ref(false);

const formData = ref({
    title: '',
    categories: [],
});

// Convertir skills array a string para input
const processCategories = (categories) => {
    return categories.map((cat) => ({
        name: cat.name || '',
        skills: cat.skills || [],
        skillsInput: Array.isArray(cat.skills)
            ? cat.skills.join(', ')
            : cat.skills || '',
    }));
};

// Sincronizar datos iniciales
watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            formData.value = {
                title: newData.title || '',
                categories: newData.categories
                    ? processCategories(newData.categories)
                    : [],
            };
        }
    },
    { immediate: true, deep: true },
);

// Resetear cuando se abre el modal
watch(
    () => props.isOpen,
    (isOpen) => {
        if (isOpen && props.initialData) {
            formData.value = {
                title: props.initialData.title || '',
                categories: props.initialData.categories
                    ? processCategories(props.initialData.categories)
                    : [],
            };
            error.value = null;
            success.value = false;
        }
    },
);

const addCategory = () => {
    formData.value.categories.push({
        name: '',
        skills: [],
        skillsInput: '',
    });
};

const removeCategory = (index) => {
    formData.value.categories.splice(index, 1);
};

const close = () => {
    error.value = null;
    success.value = false;
    loading.value = false;
    emit('close');
};

const handleSave = async () => {
    try {
        loading.value = true;
        error.value = null;
        success.value = false;

        if (!auth.currentUser) {
            throw new Error('No estás autenticado. Por favor, inicia sesión.');
        }

        // Convertir skillsInput de vuelta a array
        const categoriesToSave = formData.value.categories.map((cat) => ({
            name: cat.name,
            skills: cat.skillsInput
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s),
        }));

        await saveSkills(
            {
                title: formData.value.title,
                categories: categoriesToSave,
            },
            auth,
        );

        success.value = true;
        setTimeout(() => {
            emit('saved');
            close();
        }, 1000);
    } catch (err) {
        error.value = err.message || 'Error al guardar los skills';
        console.error('Error saving skills:', err);
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
