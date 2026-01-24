// Ejemplo de cómo integrar con un backend API
// Renombra este archivo a api.js y actualiza useData.js para usarlo

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const getLatestProject = async () => {
  const response = await fetch(`${API_BASE_URL}/projects/latest`)
  if (!response.ok) {
    throw new Error('Failed to fetch latest project')
  }
  return await response.json()
}

export const getSocialLinks = async () => {
  const response = await fetch(`${API_BASE_URL}/social`)
  if (!response.ok) {
    throw new Error('Failed to fetch social links')
  }
  return await response.json()
}

export const getProfileData = async () => {
  const response = await fetch(`${API_BASE_URL}/profile`)
  if (!response.ok) {
    throw new Error('Failed to fetch profile data')
  }
  return await response.json()
}

// Ejemplo con axios (si prefieres usarlo):
/*
import axios from 'axios'

const api = axios.create({
  baseURL: API_BASE_URL
})

export const getLatestProject = async () => {
  const { data } = await api.get('/projects/latest')
  return data
}

export const getSocialLinks = async () => {
  const { data } = await api.get('/social')
  return data
}

export const getProfileData = async () => {
  const { data } = await api.get('/profile')
  return data
}
*/

