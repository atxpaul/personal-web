# 🚀 Configuración de Variables de Entorno en Netlify

## Pasos para Añadir Variables de Entorno

### 1. Acceder a la Configuración del Sitio

1. Ve a [Netlify Dashboard](https://app.netlify.com/)
2. Inicia sesión con tu cuenta
3. Selecciona tu sitio (ej: `pablopan.netlify.app`)

### 2. Navegar a Environment Variables

1. En el menú superior, haz clic en **Site settings**
2. En el menú lateral izquierdo, busca y haz clic en **Environment variables**
3. Verás una lista de variables existentes (si las hay)

### 3. Añadir las Variables de Firebase

Haz clic en **Add a variable** y añade cada una de estas variables:

#### Variable 1: API Key
- **Key:** `VITE_FIREBASE_API_KEY`
- **Value:** `AIzaSyCmroGdpYPU2RpAls54uL4e7-0ZxloBgg4` (o tu nueva API key si la regeneraste)
- **Scopes:** Selecciona según necesites (recomendado: **All scopes**)

#### Variable 2: Auth Domain
- **Key:** `VITE_FIREBASE_AUTH_DOMAIN`
- **Value:** `personal-web-5f1b2.firebaseapp.com`

#### Variable 3: Project ID
- **Key:** `VITE_FIREBASE_PROJECT_ID`
- **Value:** `personal-web-5f1b2`

#### Variable 4: Storage Bucket
- **Key:** `VITE_FIREBASE_STORAGE_BUCKET`
- **Value:** `personal-web-5f1b2.firebasestorage.app`

#### Variable 5: Messaging Sender ID
- **Key:** `VITE_FIREBASE_MESSAGING_SENDER_ID`
- **Value:** `645709390139`

#### Variable 6: App ID
- **Key:** `VITE_FIREBASE_APP_ID`
- **Value:** `1:645709390139:web:3eed2f43a3d67d49cc171e`

#### Variable 7: Measurement ID
- **Key:** `VITE_FIREBASE_MEASUREMENT_ID`
- **Value:** `G-HS817B2JPQ`

### 4. Configurar Scopes (Opcional)

Para cada variable, puedes seleccionar en qué contextos se aplica:

- **All scopes**: La variable estará disponible en producción, previews y branch deploys
- **Production**: Solo en el sitio de producción
- **Deploy previews**: Solo en previews de PRs
- **Branch deploys**: Solo en deploys de branches específicos

**Recomendación:** Usa **All scopes** para que funcione en todos los contextos.

### 5. Guardar y Hacer Deploy

1. Después de añadir todas las variables, haz clic en **Save** en cada una
2. Para aplicar los cambios, necesitas hacer un nuevo deploy:
   - **Opción A:** Si tienes auto-deploy activado, haz un commit y push a tu repositorio
   - **Opción B:** Ve a **Deploys** > **Trigger deploy** > **Deploy site**

### 6. Verificar que Funciona

1. Después del deploy, visita tu sitio
2. Abre la consola del navegador (F12)
3. Verifica que no hay errores relacionados con Firebase
4. Prueba el login para confirmar que funciona

## 🔍 Verificar Variables en Netlify

Para ver todas las variables configuradas:

1. Ve a **Site settings** > **Environment variables**
2. Verás una lista con todas las variables
3. Puedes editar o eliminar cualquier variable haciendo clic en los tres puntos (⋯)

## ⚠️ Importante

- **Nunca** commitees el archivo `.env` con valores reales
- Las variables en Netlify están encriptadas y seguras
- Si regeneras tus credenciales de Firebase, actualiza también las variables en Netlify
- Cada vez que cambies una variable, necesitas hacer un nuevo deploy

## 🐛 Troubleshooting

### El sitio no carga las variables

1. Verifica que las variables tienen el prefijo `VITE_`
2. Asegúrate de que hiciste un nuevo deploy después de añadir las variables
3. Revisa los logs del build en Netlify para ver si hay errores

### Firebase no funciona en producción

1. Verifica que todas las variables están correctamente escritas
2. Asegúrate de que el dominio de producción está añadido en Firebase Console:
   - Firebase Console > Authentication > Settings > Authorized domains
   - Añade tu dominio de Netlify (ej: `pablopan.netlify.app`)

### Variables no se aplican en previews

1. Verifica que seleccionaste **All scopes** o **Deploy previews** al crear las variables
2. Si solo seleccionaste **Production**, las variables no estarán disponibles en previews
