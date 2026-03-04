# 🎬 Imágenes y Videos en Proyectos con Cloudinary

## 📋 Resumen

Los proyectos ahora soportan imágenes y videos almacenados en Cloudinary, permitiendo mostrar contenido multimedia profesional en tu portafolio.

---

## ✨ Características Implementadas

### **1. Soporte de Medios:**
- 🖼️ **Imágenes**: PNG, JPG, JPEG, WEBP, SVG (máx 2MB)
- 🎬 **Videos**: MP4, MOV, AVI, WEBM (máx 50MB)
- 🔄 **Detección automática** del tipo de medio
- 📱 **Responsive** en todos los dispositivos

### **2. Dashboard de Administración:**
- ✅ Widget de Cloudinary integrado
- ✅ Preview en tiempo real
- ✅ Botones para cambiar o eliminar medios
- ✅ Indicador del tipo de medio (imagen/video)
- ✅ Información de tamaño máximo

### **3. Landing Page:**
- ✅ Imágenes con efecto zoom al hover
- ✅ Videos que se reproducen al pasar el mouse
- ✅ Overlay con gradiente para mejor legibilidad
- ✅ Fallback a icono si no hay medio

---

## 🗄️ Estructura de Base de Datos

### **Campos Agregados a `projects`:**

```sql
-- image_url: URL del medio en Cloudinary
image_url TEXT

-- media_type: Tipo de medio ('image' o 'video')
media_type TEXT DEFAULT 'image'
```

---

## 📋 Pasos de Configuración

### **PASO 1: Ejecutar Script SQL en Supabase**

Ve a: **https://supabase.com/dashboard/project/cwedzvyzreayruexudpb/sql/new**

Ejecuta este SQL:

```sql
-- Agregar columna image_url si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN image_url TEXT;
  END IF;
END $$;

-- Agregar columna media_type
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'media_type'
  ) THEN
    ALTER TABLE projects ADD COLUMN media_type TEXT DEFAULT 'image';
  END IF;
END $$;
```

### **PASO 2: Verificar Cloudinary**

Asegúrate de que Cloudinary esté configurado:

```env
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dv6lvpeat
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=nagotar
```

### **PASO 3: Reiniciar Servidor**

```bash
npm run dev
```

---

## 🎯 Cómo Usar en el Dashboard

### **Agregar Proyecto con Medio:**

1. Ve a: **http://localhost:3000/admin/dashboard**
2. Haz clic en **"Proyectos"**
3. Haz clic en **"Editar"**
4. Selecciona un proyecto o crea uno nuevo
5. En la sección **"Imagen o Video del Proyecto"**:
   - Haz clic en **"Subir Imagen/Video"**
   - Selecciona tu archivo (imagen o video)
   - El widget detectará automáticamente el tipo
   - Para videos: puedes recortar o ajustar
   - Para imágenes: puedes recortar en formato cuadrado
6. Haz clic en **"Guardar"**

### **Cambiar Medio:**

1. Haz clic en **"Cambiar Medio"**
2. Selecciona nuevo archivo
3. Guarda los cambios

### **Eliminar Medio:**

1. Haz clic en **"Eliminar"**
2. El proyecto volverá a mostrar el icono por defecto

---

## 🎨 Visualización en Landing Page

### **Con Imagen:**
- Imagen se muestra en tamaño completo
- Efecto zoom suave al pasar el mouse
- Overlay con gradiente oscuro en la parte inferior

### **Con Video:**
- Video en pausa por defecto
- Se reproduce automáticamente al pasar el mouse
- Se pausa y reinicia al quitar el mouse
- Sin sonido (muted) para mejor UX

### **Sin Medio (Fallback):**
- Muestra icono con gradiente de color
- Animación de rotación al hover
- Partículas flotantes animadas

---

## 📁 Archivos Modificados

### **Backend:**
- ✅ `/supabase/add-media-to-projects.sql` - Script SQL

### **Componentes:**
- ✅ `/components/cloudinary-upload-widget.tsx` - Soporte de videos
- ✅ `/components/projects-section.tsx` - Visualización de medios
- ✅ `/app/admin/dashboard/page.tsx` - Widget integrado

---

## 🎬 Tipos de Medios Soportados

### **Imágenes:**
- PNG
- JPG / JPEG
- WEBP
- SVG
- **Tamaño máximo:** 2MB
- **Recorte:** Opcional

### **Videos:**
- MP4 (recomendado)
- MOV
- AVI
- WEBM
- **Tamaño máximo:** Sin límite (Cloudinary se encarga)
- **Duración:** Sin límite
- **Duración recomendada:** 30 segundos - 5 minutos
- **Resolución recomendada:** 1920x1080 o menor

### **Optimización Automática:**
✅ Cloudinary optimiza y comprime automáticamente
✅ Streaming adaptativo según conexión del usuario
✅ CDN global para carga rápida
✅ Transformaciones en tiempo real

💡 **Tip:** Aunque no hay límite, videos más cortos (1-3 min) ofrecen mejor experiencia de usuario.

---

## 💡 Recomendaciones

### **Para Imágenes:**
- ✅ Usa imágenes de alta calidad
- ✅ Formato 16:9 o cuadrado
- ✅ Optimiza antes de subir (comprime si es necesario)
- ✅ PNG para logos, JPG para fotos

### **Para Videos:**
- ✅ Sin límite de tamaño o duración
- ✅ Duración ideal: 30 segundos - 3 minutos
- ✅ Audio opcional (recomendado para videos largos)
- ✅ Formato MP4 para mejor compatibilidad
- ✅ Cloudinary optimiza automáticamente
- ✅ Muestra lo más importante al inicio
- ✅ Usa transiciones suaves entre escenas
- ✅ Divide en secciones si es muy largo (intro, demo, conclusión)
- ✅ Considera la experiencia del usuario (videos muy largos pueden no verse completos)

### **Organización en Cloudinary:**
- 📁 Carpeta: `nagotar-projects`
- 🏷️ Nombres descriptivos
- 🗂️ Mantén organizado por proyecto

---

## 🔧 Personalización

### **Cambiar Tamaño de Preview:**

Edita `/components/projects-section.tsx`:

```tsx
// Cambiar altura del contenedor
<div className="relative h-48 overflow-hidden bg-muted">
// A:
<div className="relative h-64 overflow-hidden bg-muted">
```

### **Desactivar Autoplay de Videos:**

```tsx
// Remover estos eventos:
onMouseEnter={(e) => e.currentTarget.play()}
onMouseLeave={(e) => {
  e.currentTarget.pause()
  e.currentTarget.currentTime = 0
}}
```

### **Cambiar Overlay:**

```tsx
// Ajustar gradiente
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
// A:
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
```

---

## 🎯 Ejemplos de Uso

### **Proyecto de Desarrollo Web:**
- 🖼️ Screenshot del sitio web
- 🎬 Video mostrando navegación

### **Proyecto de App Móvil:**
- 🖼️ Screenshots de la interfaz
- 🎬 Video demo de la app en uso

### **Proyecto de E-commerce:**
- 🖼️ Captura del diseño
- 🎬 Video del proceso de compra

### **Proyecto de Dashboard:**
- 🖼️ Vista del dashboard completo
- 🎬 Video mostrando funcionalidades

---

## 📊 Ventajas de Usar Cloudinary

✅ **CDN Global** - Carga rápida en todo el mundo
✅ **Optimización automática** - Compresión y formato óptimo
✅ **Transformaciones** - Redimensionar, recortar, etc.
✅ **Caché inteligente** - Mejor performance
✅ **Backup automático** - Tus medios están seguros
✅ **Sin límite de ancho de banda** en plan gratuito

---

## 🔍 Solución de Problemas

### **El video no se reproduce:**
- Verifica que el formato sea MP4
- Comprueba que el tamaño sea menor a 50MB
- Asegúrate de que el navegador soporte el formato

### **La imagen no se muestra:**
- Verifica la URL en Cloudinary
- Comprueba que el formato sea soportado
- Revisa la consola del navegador para errores

### **El widget no se abre:**
- Verifica las credenciales de Cloudinary
- Reinicia el servidor
- Revisa que el preset sea "Unsigned"

---

## ✅ Checklist de Implementación

- [x] Script SQL ejecutado en Supabase
- [x] Cloudinary configurado
- [x] Widget de subida implementado
- [x] Preview en dashboard funcionando
- [x] Visualización en landing page actualizada
- [ ] Subir primer proyecto con imagen
- [ ] Subir primer proyecto con video
- [ ] Verificar en diferentes navegadores
- [ ] Probar en móviles

---

## 🎉 ¡Listo para Usar!

Tu sistema de proyectos ahora soporta imágenes y videos profesionales desde Cloudinary.

**Para probarlo:**
1. Ve al dashboard
2. Edita un proyecto
3. Sube una imagen o video
4. Guarda y ve la landing page
5. Pasa el mouse sobre el proyecto

**Los proyectos con medios se verán mucho más profesionales y atractivos.** 🚀
