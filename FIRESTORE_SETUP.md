# 🔥 Configuración de Firestore - Setup de Seguridad

## ⚠️ Problema: Reglas de Seguridad

Si estás recibiendo errores de permisos al guardar datos, necesitas configurar el documento de admins en Firestore.

## 📋 Pasos para Configurar

### 1. Crear el documento `/site/admins` en Firestore

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: `personal-web-5f1b2`
3. Ve a **Firestore Database**
4. Crea una colección llamada `site` (si no existe)
5. Crea un documento dentro de `site` con el ID: `admins`
6. Añade el siguiente campo:
   - **Campo:** `uids`
   - **Tipo:** Array
   - **Valor:** `["gWDgJ5BzJ5hFCVvLOyZ8iO7OQp22"]` (tu UID de admin)

### 2. Estructura del documento `/site/admins`

```json
{
  "uids": ["gWDgJ5BzJ5hFCVvLOyZ8iO7OQp22"]
}
```

**Nota:** Si en el futuro quieres añadir más admins, simplemente añade más UIDs al array:
```json
{
  "uids": [
    "gWDgJ5BzJ5hFCVvLOyZ8iO7OQp22",
    "otro-uid-de-admin"
  ]
}
```

### 3. Verificar que estás autenticado

Asegúrate de que:
1. Has iniciado sesión con tu cuenta de Google
2. Tu UID coincide con el que está en `/site/admins`
3. Puedes verificar tu UID en la consola del navegador:
   ```javascript
   // En la consola del navegador después de iniciar sesión
   import { auth } from './src/config/firebase.js'
   console.log(auth.currentUser?.uid)
   ```

### 4. Probar las reglas

Una vez configurado, intenta guardar de nuevo. Si sigue fallando:

1. **Verifica en la consola del navegador** el error exacto
2. **Revisa las reglas de Firestore** en Firebase Console > Firestore Database > Rules
3. **Verifica que el documento `/site/admins` existe** y tiene la estructura correcta

## 🔍 Debugging

### Verificar autenticación
```javascript
// En la consola del navegador
import { auth } from './src/config/firebase.js'
console.log('Usuario autenticado:', auth.currentUser)
console.log('UID:', auth.currentUser?.uid)
```

### Verificar documento de admins
```javascript
// En la consola del navegador
import { db } from './src/config/firebase.js'
import { doc, getDoc } from 'firebase/firestore'

const adminsRef = doc(db, 'site', 'admins')
const adminsSnap = await getDoc(adminsRef)
console.log('Admins:', adminsSnap.data())
```

### Errores comunes

1. **"permission-denied"**
   - El documento `/site/admins` no existe
   - Tu UID no está en el array `uids`
   - No estás autenticado

2. **"ERR_BLOCKED_BY_CLIENT"**
   - Bloqueador de anuncios o extensión del navegador
   - Ya configurado con `experimentalForceLongPolling: true`

3. **"Missing or insufficient permissions"**
   - Revisa las reglas de Firestore
   - Verifica que el documento `/site/admins` existe

## 📝 Notas

- El documento `/site/admins` es privado (solo los admins pueden leerlo según las reglas)
- Si cambias tu UID de admin, actualiza el documento `/site/admins`
- Las reglas están configuradas para que solo los admins puedan escribir en `/site/config`
