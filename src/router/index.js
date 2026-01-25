import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AboutMe from '../views/AboutMe.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: AboutMe,
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import('../views/Projects.vue'), // Lazy load para más adelante
    },
    {
        path: '/projects/:id',
        name: 'ProjectDetail',
        component: () => import('../views/ProjectDetail.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog.vue'), // Lazy load para más adelante
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Si hay una posición guardada (navegación hacia atrás/adelante), usarla
        if (savedPosition) {
            return savedPosition
        }
        // Si hay un hash, scroll a ese elemento
        if (to.hash) {
            return { el: to.hash }
        }
        // Por defecto, scroll al inicio
        return { top: 0, behavior: 'smooth' }
    }
});

export default router;
