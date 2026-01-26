import { ref, computed } from 'vue'
import { 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../config/firebase.js'

// UID del usuario admin
const ADMIN_UID = 'gWDgJ5BzJ5hFCVvLOyZ8iO7OQp22'

// Estado global compartido
const user = ref(null)
const loading = ref(true)
const error = ref(null)

// Computed para verificar si el usuario actual es admin
const isAdmin = computed(() => {
  return user.value?.uid === ADMIN_UID
})

// Inicializar el listener de autenticación una sola vez
let initialized = false
if (!initialized) {
  onAuthStateChanged(auth, (firebaseUser) => {
    // Si hay un usuario pero no es el admin, cerrar sesión automáticamente
    if (firebaseUser && firebaseUser.uid !== ADMIN_UID) {
      signOut(auth)
      user.value = null
    } else {
      user.value = firebaseUser
    }
    loading.value = false
    error.value = null
  })
  initialized = true
}

// Configurar Google Auth Provider
const googleProvider = new GoogleAuthProvider()

const login = async () => {
  try {
    loading.value = true
    error.value = null
    const result = await signInWithPopup(auth, googleProvider)
    
    // Verificar si el usuario es el admin
    if (result.user.uid !== ADMIN_UID) {
      // Cerrar sesión si no es el admin
      await signOut(auth)
      return { 
        success: false, 
        error: 'No tienes permisos para acceder. Solo el administrador puede iniciar sesión.' 
      }
    }
    
    return { success: true, user: result.user }
  } catch (err) {
    const errorMessage = err.code === 'auth/popup-closed-by-user'
      ? 'Login cancelado'
      : err.message || 'Error al iniciar sesión'
    error.value = errorMessage
    return { success: false, error: errorMessage }
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  try {
    loading.value = true
    error.value = null
    await signOut(auth)
    return { success: true }
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  } finally {
    loading.value = false
  }
}

export function useAuth() {
  return {
    user,
    loading,
    error,
    isAdmin,
    login,
    logout
  }
}

// Composable específico para verificar si el usuario es admin
export function useAdmin() {
  return {
    isAdmin,
    user
  }
}
