# 🚀 Guía de Deployment en Vercel

Esta guía te ayudará a desplegar tu proyecto Nagotar Technologies en Vercel paso a paso.

---

## 📋 PRE-REQUISITOS

Antes de desplegar, asegúrate de tener:

- ✅ Cuenta en [Vercel](https://vercel.com)
- ✅ Cuenta en [GitHub](https://github.com) (recomendado)
- ✅ Proyecto de Supabase configurado
- ✅ Cuenta de Cloudinary configurada
- ✅ API Key de Resend (opcional, para emails)

---

## 🔧 PASO 1: PREPARAR EL PROYECTO

### 1.1 Verificar que el build funciona localmente

```bash
npm run build
```

Si hay errores, corrígelos antes de continuar.

### 1.2 Verificar variables de entorno

Asegúrate de que tu archivo `.env.local` tiene todas las variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_preset
RESEND_API_KEY=tu_resend_key
```

---

## 📦 PASO 2: SUBIR A GITHUB

### 2.1 Inicializar Git (si no lo has hecho)

```bash
git init
```

### 2.2 Agregar archivos

```bash
git add .
```

### 2.3 Hacer commit

```bash
git commit -m "Preparar proyecto para deployment en Vercel"
```

### 2.4 Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com/new)
2. Crea un nuevo repositorio (ej: `nagotar-portfolio`)
3. **NO** inicialices con README, .gitignore o licencia

### 2.5 Conectar y subir

```bash
git branch -M main
git remote add origin https://github.com/tu-usuario/nagotar-portfolio.git
git push -u origin main
```

---

## 🌐 PASO 3: DESPLEGAR EN VERCEL

### Opción A: Desde el Dashboard de Vercel (Recomendado)

#### 3.1 Importar Proyecto

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Click en **"Import Git Repository"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Selecciona el repositorio `nagotar-portfolio`
5. Click en **"Import"**

#### 3.2 Configurar Proyecto

Vercel detectará automáticamente Next.js. Verifica:

- **Framework Preset:** Next.js
- **Root Directory:** `./` (raíz)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

#### 3.3 Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega:

```
NEXT_PUBLIC_SUPABASE_URL = https://cwedzvyzreayruexudpb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = tu_anon_key_completo
SUPABASE_SERVICE_ROLE_KEY = tu_service_role_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dv6lvpeat
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = nagotar
RESEND_API_KEY = tu_resend_api_key
```

**IMPORTANTE:** 
- Copia las claves completas desde tu `.env.local`
- Asegúrate de que no haya espacios extra
- Las variables con `NEXT_PUBLIC_` son accesibles en el cliente

#### 3.4 Deploy

1. Click en **"Deploy"**
2. Espera 2-5 minutos mientras Vercel construye tu proyecto
3. ¡Listo! Tu sitio estará en `https://tu-proyecto.vercel.app`

---

### Opción B: Desde la Terminal con Vercel CLI

#### 3.1 Instalar Vercel CLI

```bash
npm install -g vercel
```

#### 3.2 Login

```bash
vercel login
```

Sigue las instrucciones en tu navegador.

#### 3.3 Deploy

```bash
vercel
```

Responde las preguntas:
- **Set up and deploy?** → Yes
- **Which scope?** → Tu cuenta personal
- **Link to existing project?** → No
- **Project name?** → nagotar-portfolio
- **Directory?** → `./`
- **Override settings?** → No

#### 3.4 Configurar Variables de Entorno

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
vercel env add NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
vercel env add RESEND_API_KEY
```

Para cada comando, pega el valor correspondiente.

#### 3.5 Deploy a Producción

```bash
vercel --prod
```

---

## ⚙️ PASO 4: CONFIGURACIÓN POST-DEPLOYMENT

### 4.1 Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Agrega tu dominio personalizado (ej: `nagotar.com`)
3. Configura los DNS según las instrucciones de Vercel

### 4.2 Verificar Supabase

1. Ve a tu proyecto en Supabase
2. Settings → API
3. Agrega tu dominio de Vercel a **"Site URL"**:
   ```
   https://tu-proyecto.vercel.app
   ```

### 4.3 Verificar Cloudinary

1. Ve a Cloudinary Dashboard
2. Settings → Security
3. Agrega tu dominio de Vercel a **"Allowed domains"**

### 4.4 Configurar CORS en Supabase (si es necesario)

En Supabase SQL Editor, ejecuta:

```sql
-- Permitir CORS desde tu dominio de Vercel
ALTER DATABASE postgres SET "app.settings.cors_allowed_origins" TO 'https://tu-proyecto.vercel.app';
```

---

## 🔄 PASO 5: ACTUALIZACIONES AUTOMÁTICAS

### 5.1 Configurar Auto-Deploy

Vercel desplegará automáticamente cuando hagas push a GitHub:

```bash
# Hacer cambios en tu código
git add .
git commit -m "Actualización del proyecto"
git push origin main
```

Vercel detectará el push y desplegará automáticamente.

### 5.2 Preview Deployments

Cada rama que crees tendrá su propia URL de preview:

```bash
git checkout -b feature/nueva-funcionalidad
git push origin feature/nueva-funcionalidad
```

Vercel creará una URL temporal para probar.

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: Build Failed

**Problema:** El build falla en Vercel

**Solución:**
1. Verifica que `npm run build` funcione localmente
2. Revisa los logs en Vercel Dashboard
3. Asegúrate de que todas las dependencias estén en `package.json`

### Error: Environment Variables

**Problema:** Variables de entorno no funcionan

**Solución:**
1. Verifica que las variables tengan `NEXT_PUBLIC_` si se usan en el cliente
2. Redeploy después de agregar variables:
   ```bash
   vercel --prod
   ```

### Error: Supabase Connection

**Problema:** No se conecta a Supabase

**Solución:**
1. Verifica las URLs en Vercel Environment Variables
2. Asegúrate de que el dominio de Vercel esté en Supabase → Settings → API → Site URL
3. Verifica que las claves sean correctas

### Error: Cloudinary Upload

**Problema:** No se pueden subir archivos a Cloudinary

**Solución:**
1. Verifica que el upload preset sea "Unsigned"
2. Agrega el dominio de Vercel a Cloudinary allowed domains
3. Verifica las credenciales en Environment Variables

### Error: 404 en Rutas

**Problema:** Algunas páginas dan 404

**Solución:**
1. Verifica que uses App Router correctamente
2. Asegúrate de que los archivos estén en `app/` y no en `pages/`
3. Verifica que los nombres de archivo sean correctos (`page.tsx`, `layout.tsx`)

---

## 📊 MONITOREO

### Vercel Analytics

Ya tienes Vercel Analytics instalado. Para ver estadísticas:

1. Ve a Vercel Dashboard
2. Selecciona tu proyecto
3. Click en "Analytics"

Verás:
- Visitas
- Páginas más vistas
- Rendimiento
- Web Vitals

### Logs

Para ver logs en tiempo real:

```bash
vercel logs
```

O en Vercel Dashboard → Deployments → [tu deployment] → Logs

---

## 🔒 SEGURIDAD

### Checklist de Seguridad:

- ✅ `.env.local` está en `.gitignore`
- ✅ No hay API keys en el código
- ✅ Variables sensibles solo en Vercel Environment Variables
- ✅ CORS configurado correctamente
- ✅ Supabase RLS (Row Level Security) activado
- ✅ Cloudinary upload preset configurado correctamente

---

## 🚀 OPTIMIZACIONES

### Performance

Vercel optimiza automáticamente:
- ✅ Compresión Gzip/Brotli
- ✅ CDN global
- ✅ Image Optimization
- ✅ Edge Functions
- ✅ Caching inteligente

### SEO

Asegúrate de tener:
- ✅ Metadata en `app/layout.tsx`
- ✅ Open Graph tags
- ✅ Sitemap (opcional)
- ✅ robots.txt (opcional)

---

## 📞 SOPORTE

Si tienes problemas:

1. **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
2. **Vercel Support:** [vercel.com/support](https://vercel.com/support)
3. **Community:** [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

---

## ✅ CHECKLIST FINAL

Antes de considerar el deployment completo:

- [ ] Build exitoso localmente
- [ ] Todas las variables de entorno configuradas en Vercel
- [ ] Dominio de Vercel agregado en Supabase
- [ ] Dominio de Vercel agregado en Cloudinary
- [ ] Dashboard admin funciona correctamente
- [ ] Upload de imágenes/videos funciona
- [ ] Formulario de contacto funciona
- [ ] Responsive en móvil
- [ ] Analytics funcionando
- [ ] Sin errores en consola

---

## 🎉 ¡FELICIDADES!

Tu proyecto está desplegado en Vercel. Ahora puedes:

1. Compartir tu URL: `https://tu-proyecto.vercel.app`
2. Configurar un dominio personalizado
3. Monitorear el tráfico con Analytics
4. Hacer actualizaciones automáticas con Git

**¡Tu portfolio está en vivo!** 🚀

---

**Última actualización:** Febrero 2026
