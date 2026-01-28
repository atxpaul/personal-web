import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

/**
 * Obtener configuración del sitio (site/config)
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Promise<Object|null>}
 */
export const getSiteConfig = async (locale = 'es') => {
    try {
        const docRef = doc(db, 'site', 'config');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Retornar datos del idioma específico o datos por defecto
            return data[locale] || data.es || null;
        }
        return null;
    } catch (error) {
        console.error('Error getting site config:', error);
        throw error;
    }
};

/**
 * Guardar configuración del sitio (site/config)
 * @param {string} locale - Idioma ('es' o 'en')
 * @param {Object} configData - Datos de configuración para ese idioma
 * @param {Object} auth - Objeto de autenticación de Firebase (opcional, para verificar permisos)
 * @returns {Promise<void>}
 */
export const saveSiteConfig = async (locale, configData, auth = null) => {
    try {
        // Verificar que el usuario esté autenticado
        if (auth && !auth.currentUser) {
            throw new Error(
                'Debes estar autenticado para guardar la configuración',
            );
        }

        const docRef = doc(db, 'site', 'config');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Actualizar solo el idioma específico
            await updateDoc(docRef, {
                [locale]: configData,
                updatedAt: new Date().toISOString(),
            });
        } else {
            // Crear documento nuevo
            await setDoc(docRef, {
                [locale]: configData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
    } catch (error) {
        console.error('Error saving site config:', error);
        // Proporcionar mensajes de error más descriptivos
        if (error.code === 'permission-denied') {
            throw new Error(
                'No tienes permisos para guardar. Verifica que estés autenticado como admin y que el documento /site/admins exista con tu UID.',
            );
        }
        throw error;
    }
};

/**
 * Obtener perfil (site/aboutme)
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Promise<Object|null>}
 */
export const getAboutMe = async (locale = 'es') => {
    try {
        const docRef = doc(db, 'site', 'aboutme');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return data[locale] || data.es || null;
        }
        return null;
    } catch (error) {
        console.error('Error getting about me:', error);
        throw error;
    }
};

/**
 * Guardar perfil (site/aboutme)
 * @param {string} locale - Idioma ('es' o 'en')
 * @param {Object} aboutMeData - Datos del perfil para ese idioma
 * @param {Object} auth - Objeto de autenticación de Firebase (opcional, para verificar permisos)
 * @returns {Promise<void>}
 */
export const saveAboutMe = async (locale, aboutMeData, auth = null) => {
    try {
        // Verificar que el usuario esté autenticado
        if (auth && !auth.currentUser) {
            throw new Error(
                'Debes estar autenticado para guardar la información',
            );
        }

        const docRef = doc(db, 'site', 'aboutme');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                [locale]: aboutMeData,
                updatedAt: new Date().toISOString(),
            });
        } else {
            await setDoc(docRef, {
                [locale]: aboutMeData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
    } catch (error) {
        console.error('Error saving about me:', error);
        // Proporcionar mensajes de error más descriptivos
        if (error.code === 'permission-denied') {
            throw new Error(
                'No tienes permisos para guardar. Verifica que estés autenticado como admin y que el documento /site/admins exista con tu UID.',
            );
        }
        throw error;
    }
};

/**
 * Obtener skills (site/skills)
 * @returns {Promise<Object|null>}
 */
export const getSkills = async () => {
    try {
        const docRef = doc(db, 'site', 'skills');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting skills:', error);
        throw error;
    }
};

/**
 * Guardar skills (site/skills)
 * @param {Object} skillsData - Datos de skills
 * @param {Object} auth - Objeto de autenticación de Firebase (opcional)
 * @returns {Promise<void>}
 */
export const saveSkills = async (skillsData, auth = null) => {
    try {
        // Verificar que el usuario esté autenticado
        if (auth && !auth.currentUser) {
            throw new Error('Debes estar autenticado para guardar los skills');
        }

        const docRef = doc(db, 'site', 'skills');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                ...skillsData,
                updatedAt: new Date().toISOString(),
            });
        } else {
            await setDoc(docRef, {
                ...skillsData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
    } catch (error) {
        console.error('Error saving skills:', error);
        if (error.code === 'permission-denied') {
            throw new Error(
                'No tienes permisos para guardar. Verifica que estés autenticado como admin.',
            );
        }
        throw error;
    }
};

/**
 * Obtener todos los proyectos
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Promise<Array>}
 */
export const getProjects = async (locale = 'es') => {
    try {
        const projectsRef = collection(db, 'projects');
        const querySnapshot = await getDocs(projectsRef);

        const projects = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Obtener datos del idioma específico o datos por defecto
            const projectData = data[locale] || data.es || {};
            projects.push({
                id: doc.id,
                // Campos comunes (no dependen del idioma)
                featured: data.featured || false,
                status: data.status || 'IN_PROGRESS',
                provider: data.provider || '',
                providerFull: data.providerFull || '',
                version: data.version || '1.0.0',
                github: data.github || '',
                image: data.image || '',
                tags: data.tags || [],
                technologies: data.technologies || [],
                techStack: data.techStack || [],
                architecture: data.architecture || '',
                // Campos específicos del idioma
                ...projectData,
            });
        });

        return projects;
    } catch (error) {
        console.error('Error getting projects:', error);
        throw error;
    }
};

/**
 * Obtener un proyecto por ID
 * @param {string} projectId - ID del proyecto
 * @param {string} locale - Idioma ('es' o 'en')
 * @returns {Promise<Object|null>}
 */
export const getProjectById = async (projectId, locale = 'es') => {
    try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const projectData = data[locale] || data.es || {};
            return {
                id: docSnap.id,
                // Campos comunes
                featured: data.featured || false,
                status: data.status || 'IN_PROGRESS',
                provider: data.provider || '',
                providerFull: data.providerFull || '',
                version: data.version || '1.0.0',
                github: data.github || '',
                image: data.image || '',
                tags: data.tags || [],
                technologies: data.technologies || [],
                techStack: data.techStack || [],
                architecture: data.architecture || '',
                // Campos específicos del idioma
                ...projectData,
            };
        }
        return null;
    } catch (error) {
        console.error('Error getting project:', error);
        throw error;
    }
};

/**
 * Guardar proyecto
 * @param {string} projectId - ID del proyecto (si existe, actualiza; si no, crea)
 * @param {string} locale - Idioma ('es' o 'en')
 * @param {Object} projectData - Datos del proyecto para ese idioma
 * @param {Object} commonData - Datos comunes (no dependen del idioma)
 * @param {Object} auth - Objeto de autenticación de Firebase (opcional)
 * @returns {Promise<void>}
 */
export const saveProject = async (
    projectId,
    locale,
    projectData,
    commonData = {},
    auth = null,
) => {
    try {
        // Verificar que el usuario esté autenticado
        if (auth && !auth.currentUser) {
            throw new Error('Debes estar autenticado para guardar el proyecto');
        }

        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Actualizar: mantener otros idiomas y campos comunes
            const existingData = docSnap.data();
            await updateDoc(docRef, {
                [locale]: projectData,
                ...commonData,
                updatedAt: new Date().toISOString(),
            });
        } else {
            // Crear nuevo proyecto
            await setDoc(docRef, {
                [locale]: projectData,
                ...commonData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
    } catch (error) {
        console.error('Error saving project:', error);
        if (error.code === 'permission-denied') {
            throw new Error(
                'No tienes permisos para guardar. Verifica que estés autenticado como admin.',
            );
        }
        throw error;
    }
};

/**
 * Eliminar proyecto
 * @param {string} projectId - ID del proyecto a eliminar
 * @param {Object} auth - Objeto de autenticación de Firebase (opcional)
 * @returns {Promise<void>}
 */
export const deleteProject = async (projectId, auth = null) => {
    try {
        // Verificar que el usuario esté autenticado
        if (auth && !auth.currentUser) {
            throw new Error(
                'Debes estar autenticado para eliminar el proyecto',
            );
        }

        const docRef = doc(db, 'projects', projectId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting project:', error);
        if (error.code === 'permission-denied') {
            throw new Error(
                'No tienes permisos para eliminar. Verifica que estés autenticado como admin.',
            );
        }
        throw error;
    }
};

/**
 * Obtener proyectos relacionados
 * @param {string} currentProjectId - ID del proyecto actual
 * @param {string} locale - Idioma ('es' o 'en')
 * @param {number} limit - Número máximo de proyectos relacionados a retornar
 * @returns {Promise<Array>}
 */
export const getRelatedProjects = async (
    currentProjectId,
    locale = 'es',
    limit = 3,
) => {
    try {
        // Obtener el proyecto actual para comparar tags y tecnologías
        const currentProject = await getProjectById(currentProjectId, locale);
        if (!currentProject) {
            return [];
        }

        // Obtener todos los proyectos
        const allProjects = await getProjects(locale);

        // Filtrar proyectos relacionados por tags o tecnologías similares
        const related = allProjects
            .filter(
                (p) =>
                    p.id !== currentProjectId &&
                    !p.featured && // Excluir featured
                    (p.tags?.some((tag) =>
                        currentProject.tags?.includes(tag),
                    ) ||
                        p.technologies?.some((tech) =>
                            currentProject.technologies?.some(
                                (ct) =>
                                    ct
                                        .toLowerCase()
                                        .includes(tech.toLowerCase()) ||
                                    tech
                                        .toLowerCase()
                                        .includes(ct.toLowerCase()),
                            ),
                        )),
            )
            .sort((a, b) => {
                // Ordenar por updatedAt si existe, sino por createdAt
                const dateA =
                    a.updatedAt || a.createdAt
                        ? new Date(a.updatedAt || a.createdAt)
                        : new Date(0);
                const dateB =
                    b.updatedAt || b.createdAt
                        ? new Date(b.updatedAt || b.createdAt)
                        : new Date(0);
                return dateB - dateA; // Más recientes primero
            })
            .slice(0, limit);

        return related;
    } catch (error) {
        console.error('Error getting related projects:', error);
        throw error;
    }
};
