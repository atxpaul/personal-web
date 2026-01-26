// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmroGdpYPU2RpAls54uL4e7-0ZxloBgg4",
  authDomain: "personal-web-5f1b2.firebaseapp.com",
  projectId: "personal-web-5f1b2",
  storageBucket: "personal-web-5f1b2.firebasestorage.app",
  messagingSenderId: "645709390139",
  appId: "1:645709390139:web:3eed2f43a3d67d49cc171e",
  measurementId: "G-HS817B2JPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (solo en producción o si lo necesitas)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Auth
export const auth = getAuth(app);

export { app, analytics };
export default app;
