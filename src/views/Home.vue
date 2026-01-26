<template>
    <div
        class="flex-grow flex flex-col items-center justify-center px-4 py-8 md:px-8"
    >
        <div class="w-full max-w-5xl">
            <Terminal :profile="profile" />
        </div>

        <div class="w-full max-w-5xl mt-12 mb-8">
            <div class="flex items-center gap-2 mb-6">
                <span class="text-primary font-bold text-lg">&gt;&gt;</span>
                <h3 class="text-white text-xl font-bold">{{
                    $t('projects.latestDeployment')
                }}</h3>
            </div>

            <ProjectCard
                v-if="project"
                :project="project"
                @view-source="handleViewSource"
            />

            <div v-if="loading" class="text-center text-gray-500 py-8">
                Loading...
            </div>

            <div v-if="error" class="text-center text-red-500 py-8">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script setup>
import Terminal from '../components/Terminal.vue';
import ProjectCard from '../components/ProjectCard.vue';
import { useData } from '../composables/useData.js';
import { useAdmin } from '../composables/useAuth.js';

const { project, profile, loading, error } = useData();
const { isAdmin } = useAdmin();

// TODO: Añadir funcionalidades de edición para admin
// - Botón de editar proyecto destacado
// - Editar perfil
// - Gestión de contenido

const handleViewSource = (project) => {
    if (project.github) {
        window.open(project.github, '_blank', 'noopener,noreferrer');
    }
};
</script>
