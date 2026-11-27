import { createI18n } from 'vue-i18n';
import es from './locales/es.js';
import en from './locales/en.js';
import de from './locales/de.js';
import fr from './locales/fr.js';

const messages = {
    es,
    en,
    de,
    fr,
};

export const SUPPORTED_LOCALES = ['es', 'en', 'de', 'fr'];
export const DEFAULT_LOCALE = 'en';

function readSavedLocale() {
    try {
        return localStorage.getItem('locale');
    } catch {
        return null;
    }
}

/**
 * Guarda el idioma elegido. Si el almacenamiento está bloqueado
 * (modo privado, cookies desactivadas) se ignora sin romper la app.
 */
export function saveLocale(locale) {
    try {
        localStorage.setItem('locale', locale);
    } catch {
        // Almacenamiento no disponible
    }
}

/**
 * Obtiene el idioma inicial: primero localStorage, luego idioma del navegador.
 * Si el idioma del usuario no está soportado (es/en/de/fr), devuelve inglés.
 */
function getInitialLocale() {
    const saved = readSavedLocale();
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
    saveLocale(detected);
    return detected;
}

const i18n = createI18n({
    legacy: false,
    locale: getInitialLocale(),
    fallbackLocale: DEFAULT_LOCALE,
    messages,
});

export default i18n;
