<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div
                v-if="isOpen"
                class="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
            >
                <div
                    class="modal-content bg-console-bg border border-console-border rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] sm:max-h-none flex flex-col"
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
                                >edit_projects_subtitle.sh</span
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

                    <!-- Content -->
                    <div class="p-6 overflow-y-auto flex-1 min-h-0">
                        <div class="mb-6">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-primary text-xl font-bold"
                                    >$</span
                                >
                                <h2
                                    class="text-white text-2xl font-bold font-mono"
                                    >./edit_projects_subtitle.sh</h2
                                >
                            </div>
                            <p class="text-gray-400 text-sm">
                                Editando subtítulo para idioma:
                                <span class="text-primary font-mono">{{
                                    locale.toUpperCase()
                                }}</span>
                            </p>
                        </div>

                        <form @submit.prevent="handleSave" class="space-y-6">
                            <!-- Subtitle -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-300 mb-2 font-mono"
                                >
                                    subtitle:
                                </label>
                                <textarea
                                    v-model="formData.subtitle"
                                    required
                                    rows="3"
                                    class="w-full bg-[#161b22] border border-console-border rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm resize-none"
                                    placeholder="Explorando soluciones de infraestructura como código..."
                                ></textarea>
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
                                <span class="text-green-500">✓</span> Subtítulo
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
    saveProjectsSubtitle,
    getProjectsSubtitle,
} from '../data/firestore.js';
import { useI18n } from 'vue-i18n';
import { auth } from '../config/firebase.js';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    initialSubtitle: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['close', 'saved']);

const { locale } = useI18n();
const loading = ref(false);
const error = ref(null);
const success = ref(false);

const formData = ref({
    subtitle: '',
});

// Sincronizar datos iniciales cuando cambian
watch(
    () => props.initialSubtitle,
    (newSubtitle) => {
        if (newSubtitle !== undefined) {
            formData.value.subtitle = newSubtitle || '';
        }
    },
    { immediate: true },
);

// Resetear cuando se abre el modal
watch(
    () => props.isOpen,
    (isOpen) => {
        if (isOpen) {
            formData.value.subtitle = props.initialSubtitle || '';
            error.value = null;
            success.value = false;
        }
    },
);

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

        // Verificar autenticación antes de guardar
        if (!auth.currentUser) {
            throw new Error('No estás autenticado. Por favor, inicia sesión.');
        }

        await saveProjectsSubtitle(locale.value, formData.value.subtitle, auth);

        success.value = true;
        setTimeout(() => {
            emit('saved');
            close();
        }, 1000);
    } catch (err) {
        error.value = err.message || 'Error al guardar el subtítulo';
        console.error('Error saving projects subtitle:', err);
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
