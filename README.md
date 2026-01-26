# Personal Web Portfolio

Portfolio personal con diseño de terminal/CLI, construido con Vue 3 y Tailwind CSS.

## 🚀 Características

- **Vue 3** con Composition API
- **Vite** como build tool
- **Tailwind CSS** para estilos
- **vue-i18n** para internacionalización (es, en, de, fr)
- Estructura preparada para datos dinámicos del backend
- Diseño responsive y dark mode

## 📦 Instalación

```bash
npm install
```

### Configuración de Variables de Entorno

1. Copia el archivo de ejemplo de variables de entorno:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` y añade tus credenciales de Firebase:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto
   - Ve a Configuración del proyecto > Tus aplicaciones
   - Copia las credenciales a tu archivo `.env`

**⚠️ IMPORTANTE:** El archivo `.env` contiene credenciales sensibles y NO debe ser commiteado al repositorio. Ya está incluido en `.gitignore`.

## 🛠️ Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
personal-web/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          # Estilos globales y Tailwind
│   ├── components/
│   │   ├── Header.vue            # Barra de navegación
│   │   ├── Terminal.vue          # Componente principal tipo terminal
│   │   ├── ProjectCard.vue       # Tarjeta de proyecto
│   │   └── Footer.vue            # Pie de página
│   ├── composables/
│   │   └── useData.js            # Composable para manejar datos
│   ├── data/
│   │   └── static.js             # Datos estáticos (preparado para backend)
│   ├── i18n/
│   │   ├── index.js              # Configuración de i18n
│   │   └── locales/
│   │       ├── es.js             # Traducciones en español
│   │       ├── en.js             # Traducciones en inglés
│   │       ├── de.js             # Traducciones en alemán
│   │       └── fr.js             # Traducciones en francés
│   ├── App.vue                   # Componente principal
│   └── main.js                   # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🌐 Internacionalización

Las traducciones están en `src/i18n/locales/`. Para agregar un nuevo idioma:

1. Crea un nuevo archivo en `src/i18n/locales/` (ej: `pt.js`)
2. Agrega el idioma en `src/i18n/index.js`
3. Agrega la opción en el selector de idioma en `Header.vue`

## 🔌 Integración con Backend

Para cambiar de datos estáticos a datos dinámicos:

1. Modifica las funciones en `src/data/static.js` para hacer llamadas a tu API
2. O crea un nuevo archivo `src/data/api.js` con las funciones de API
3. Actualiza `src/composables/useData.js` para usar las nuevas funciones

Ejemplo:

```javascript
// src/data/api.js
export const getLatestProject = async () => {
  const response = await fetch('/api/projects/latest')
  return await response.json()
}
```

Luego en `useData.js`, importa desde `api.js` en lugar de `static.js`.

## 🎨 Personalización

- **Colores**: Modifica `tailwind.config.js` en la sección `colors`
- **Fuentes**: Modifica `tailwind.config.js` en la sección `fontFamily`
- **Contenido**: Edita los archivos de traducción en `src/i18n/locales/`

## 📝 Notas

- Los datos actualmente son estáticos pero la estructura está preparada para backend
- El idioma se guarda en `localStorage` y persiste entre sesiones
- El diseño es completamente responsive

