import { createI18n } from 'vue-i18n'
import es from './locales/es.js'
import en from './locales/en.js'

const messages = {
  es,
  en
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'es',
  fallbackLocale: 'es',
  messages
})

export default i18n

