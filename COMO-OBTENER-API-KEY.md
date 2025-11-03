# Guía: Cómo Obtener la API Key de Google Places para las Reseñas

Esta guía te explicará paso a paso cómo obtener la API Key necesaria para mostrar las reseñas de Google en tu sitio web.

## 📋 Pasos a Seguir

### Paso 1: Acceder a Google Cloud Console

1. Ve a: **https://console.cloud.google.com/**
2. Inicia sesión con tu cuenta de Google

### Paso 2: Crear un Proyecto

1. En la parte superior, haz clic en el selector de proyectos
2. Haz clic en **"NUEVO PROYECTO"**
3. Asigna un nombre al proyecto (ej: "Cerrajero Torrevieja Website")
4. Haz clic en **"CREAR"**
5. Espera unos segundos a que se cree el proyecto

### Paso 3: Seleccionar el Proyecto

1. Una vez creado, selecciona tu proyecto desde el selector de proyectos en la parte superior

### Paso 4: Habilitar la API de Google Places

1. En el menú lateral, busca **"APIs y servicios"** > **"Biblioteca"**
2. En el buscador, escribe: **"Places API"**
3. Selecciona **"Places API"** (debería aparecer el nombre completo: "Places API (New)")
4. Haz clic en **"HABILITAR"**
5. Espera a que se habilite (puede tardar unos segundos)

**IMPORTANTE:** También necesitas habilitar:
- **"Places API (New)"** - Para obtener las reseñas
- **"Maps JavaScript API"** - Para el mapa (si lo usas)

### Paso 5: Crear la Clave de API

1. En el menú lateral, ve a **"APIs y servicios"** > **"Credenciales"**
2. Haz clic en **"+ CREAR CREDENCIALES"** en la parte superior
3. Selecciona **"Clave de API"**
4. Se creará automáticamente una API Key

### Paso 6: Configurar Restricciones (Recomendado)

**Para mayor seguridad**, es recomendable restringir la API Key:

1. Haz clic en la API Key que acabas de crear para editarla
2. En **"Restricciones de aplicación"**, selecciona:
   - **"Direcciones IP de sitios web"** (para Maps API)
   - O **"Ninguna"** si estás en desarrollo
3. En **"Restricciones de API"**, selecciona:
   - **"Limitar claves"**
   - Marca solo: **"Places API (New)"** y **"Maps JavaScript API"**
4. Haz clic en **"GUARDAR"**

### Paso 7: Configurar Facturación

⚠️ **IMPORTANTE:** Google ofrece un crédito gratuito mensual, pero necesitas habilitar facturación:

1. Ve a **"Facturación"** en el menú lateral
2. Si no tienes una cuenta de facturación, haz clic en **"CREAR CUENTA DE FACTURACIÓN"**
3. Completa el proceso (Google ofrece $200 USD de crédito gratuito mensual)
4. Asocia tu proyecto a la cuenta de facturación

### Paso 8: Copiar la API Key

1. Ve a **"Credenciales"**
2. En la lista de claves, encontrarás tu API Key
3. Haz clic en el ícono de **copiar** 📋
4. **¡GUÁRDALA EN UN LUGAR SEGURO!**

## 🔧 Configurar en tu Proyecto

Una vez que tengas tu API Key:

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza `tu_api_key_aqui` con tu API Key real:

```env
GOOGLE_PLACES_API_KEY=TU_API_KEY_AQUI
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI
```

3. Guarda el archivo
4. **Reinicia el servidor de desarrollo** (detén y vuelve a ejecutar `npm run dev`)

## 📊 Límites y Costos

- **Crédito gratuito:** $200 USD al mes
- **Places API (New):** 
  - $17 por cada 1,000 solicitudes (después del crédito)
- **Límite de reseñas:** Google Places API devuelve máximo **5 reseñas** por lugar

## 🆘 Solución de Problemas

### "No API key" en la consola
- Verifica que el archivo `.env.local` existe
- Asegúrate de haber reiniciado el servidor después de agregar la API Key
- Verifica que no haya espacios extras en el archivo `.env.local`

### Las reseñas no aparecen
- Verifica que hayas habilitado "Places API (New)"
- Confirma que tu negocio tenga reseñas públicas en Google Maps
- Revisa la consola del servidor para ver errores

### "API key not valid"
- Verifica que la API Key esté correctamente copiada
- Asegúrate de haber habilitado la facturación
- Verifica que las APIs estén habilitadas en tu proyecto

## 🔗 Enlaces Útiles

- [Google Cloud Console](https://console.cloud.google.com/)
- [Documentación Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Precios de Google Maps Platform](https://cloud.google.com/maps-platform/pricing)

---

**Nota:** El archivo `.env.local` no se sube a Git (está en `.gitignore`), así que tus API Keys están seguras.

