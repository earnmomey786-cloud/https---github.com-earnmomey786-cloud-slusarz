# 🔧 Configurar Variables de Entorno en EasyPanel

## 🎯 Problema
Las reseñas no aparecen en producción porque las variables de entorno no están configuradas en EasyPanel.

## ✅ Solución: Agregar Variables de Entorno

### Paso 1: Acceder a EasyPanel
1. Inicia sesión en tu panel de EasyPanel
2. Selecciona tu aplicación/proyecto del cerrajero

### Paso 2: Encontrar la Sección de Variables de Entorno
Busca una de estas opciones en el menú:
- **"Environment Variables"** (Variables de Entorno)
- **"Config"** o **"Configuration"**
- **"Settings"** → **"Environment"**
- **"Variables"** o **"Env Vars"**

Dependiendo de la versión de EasyPanel, puede estar en:
- Menú lateral izquierdo
- Pestaña dentro de la configuración de la app
- Botón "Settings" o "Config" en la barra superior

### Paso 3: Agregar las Variables
Haz clic en **"Add Variable"** o **"Nueva Variable"** y agrega estas **2 variables**:

#### Variable 1:
- **Key (Nombre):** `GOOGLE_PLACES_API_KEY`
- **Value (Valor):** `AIzaSyAgvCAwx9fjpmHVQXPA7C43rp3oHF5MP1w`
- **Tipo:** Normal (no marcar como "Secret" a menos que la plataforma lo requiera)

#### Variable 2:
- **Key (Nombre):** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- **Value (Valor):** `AIzaSyAgvCAwx9fjpmHVQXPA7C43rp3oHF5MP1w`
- **Tipo:** Normal (el prefijo `NEXT_PUBLIC_` es importante para Next.js)

⚠️ **IMPORTANTE:** 
- El prefijo `NEXT_PUBLIC_` en la segunda variable es necesario para que Next.js la exponga al cliente (navegador)
- No agregues espacios antes o después del valor
- Asegúrate de que los nombres estén exactamente como se muestran arriba

### Paso 4: Guardar y Reiniciar
1. Haz clic en **"Save"** o **"Guardar"**
2. **Reinicia/Redespliega** tu aplicación:
   - Busca un botón **"Restart"**, **"Redeploy"**, o **"Deploy"**
   - O detén e inicia nuevamente la aplicación

### Paso 5: Verificar
1. Espera a que la aplicación termine de redesplegarse
2. Visita tu sitio web
3. Ve a la sección de testimonios
4. Deberías ver las reseñas (de Google si funcionan, o las estáticas como mínimo)

## 🔍 Solución de Problemas

### Las reseñas aún no aparecen
1. **Verifica los logs:**
   - En EasyPanel, busca la sección "Logs" o "Console"
   - Busca mensajes como "No API key" o errores de Google

2. **Verifica que las variables se guardaron:**
   - Vuelve a la sección de variables de entorno
   - Confirma que ambas variables estén allí y con los valores correctos

3. **Verifica que la app se reinició:**
   - Las variables de entorno solo se cargan al iniciar la aplicación
   - Asegúrate de haber reiniciado después de agregar las variables

4. **Prueba en modo local:**
   - Asegúrate de que funciona localmente con `.env.local`
   - Si funciona localmente pero no en producción, el problema es la configuración de EasyPanel

### Error: "No API key"
- Significa que `GOOGLE_PLACES_API_KEY` no está configurada
- Vuelve al Paso 3 y verifica que la variable esté agregada correctamente

### Las reseñas de Google no aparecen pero sí las estáticas
- Esto significa que el fallback funciona correctamente
- El problema puede ser:
  - La API key no es válida
  - Google Places API no está habilitada en tu proyecto de Google Cloud
  - Tu negocio no tiene reseñas públicas en Google Maps
  - Hay un error en la búsqueda del lugar

## 📸 Ubicación Aproximada en EasyPanel

La interfaz de EasyPanel puede variar, pero generalmente las variables de entorno están en:

```
Tu App → Settings/Configuración → Environment Variables
```

O en algunos casos:

```
Dashboard → Tu Proyecto → Config → Environment
```

## 💡 Consejo Adicional

Si EasyPanel tiene un archivo de configuración (como `docker-compose.yml` o similar), también puedes agregar las variables allí:

```yaml
environment:
  - GOOGLE_PLACES_API_KEY=AIzaSyAgvCAwx9fjpmHVQXPA7C43rp3oHF5MP1w
  - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyAgvCAwx9fjpmHVQXPA7C43rp3oHF5MP1w
```

## ✅ Checklist

- [ ] Encontré la sección de Variables de Entorno en EasyPanel
- [ ] Agregué `GOOGLE_PLACES_API_KEY` con el valor correcto
- [ ] Agregué `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` con el valor correcto
- [ ] Guardé los cambios
- [ ] Reinicié/Redesplegué la aplicación
- [ ] Verifiqué que las reseñas aparecen en el sitio web

---

**Nota:** Si después de seguir estos pasos aún no funciona, comparte capturas de pantalla de la sección de variables de entorno en EasyPanel y los logs de la aplicación para ayudarte mejor.

