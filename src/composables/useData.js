import { ref, onMounted } from 'vue'
import { getProjects, getSocialLinks, getProfileData } from '../data/static.js'

// Composable para manejar datos
// Fácil de cambiar a datos dinámicos del backend en el futuro
export function useData() {
  const project = ref(null)
  const socialLinks = ref(null)
  const profile = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const loadData = async () => {
    try {
      loading.value = true
      error.value = null
      
      // Cargar datos en paralelo
      const [projectsData, socialData, profileData] = await Promise.all([
        getProjects(),
        getSocialLinks(),
        getProfileData()
      ])
      
      // Obtener el proyecto featured (el primero con featured: true)
      const featured = projectsData?.find(p => p.featured) || null
      project.value = featured
      socialLinks.value = socialData
      profile.value = profileData
    } catch (err) {
      error.value = err.message || 'Error loading data'
      console.error('Error loading data:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadData()
  })

  return {
    project,
    socialLinks,
    profile,
    loading,
    error,
    reload: loadData
  }
}

