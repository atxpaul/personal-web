import { createI18n } from 'vue-i18n';
import es from './locales/es.js';
import en from './locales/en.js';

const messages = {
    es,
    en,
};

const SUPPORTED_LOCALES = ['es', 'en'];
const DEFAULT_LOCALE = 'en';

/**
 * Obtiene el idioma inicial: primero localStorage, luego idioma del navegador.
 * Si el idioma del usuario no está soportado (es/en), devuelve inglés.
 */
function getInitialLocale() {
    const saved = localStorage.getItem('locale');
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
        return saved;
    }
    const browserLang =
        typeof navigator !== 'undefined' && navigator.language
            ? navigator.language.toLowerCase()
            : '';
    const browserLangShort = browserLang.split(/[-_]/)[0];
    const detected = SUPPORTED_LOCALES.includes(browserLangShort)
        ? browserLangShort
        : DEFAULT_LOCALE;
    localStorage.setItem('locale', detected);
    return detected;
}

const i18n = createI18n({
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: DEFAULT_LOCALE,
    messages,
});

export default i18n;
