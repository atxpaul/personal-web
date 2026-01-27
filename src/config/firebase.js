// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Las variables de entorno deben tener el prefijo VITE_ para ser accesibles en el cliente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validar que todas las variables de entorno estén definidas
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error('Error: Faltan variables de entorno de Firebase. Por favor, crea un archivo .env con las credenciales.');
  throw new Error('Firebase configuration is missing. Please check your .env file.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (solo en producción o si lo necesitas)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with long polling (compatible mode)
// Esto evita problemas con bloqueadores de anuncios o WebSockets bloqueados
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { app, analytics };
export default app;
