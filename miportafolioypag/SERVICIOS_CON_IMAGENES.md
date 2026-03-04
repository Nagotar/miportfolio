# 🖼️ Servicios con Imágenes - Guía de Configuración

Esta guía te ayudará a configurar las imágenes para los servicios en tu portfolio.

---

## ✅ CAMBIOS IMPLEMENTADOS

### **1. Base de Datos (Supabase)**
- ✅ Agregado campo `image_url` a la tabla `services`
- ✅ Script SQL creado: `supabase/add-image-to-services.sql`

### **2. Dashboard de Administración**
- ✅ Widget de Cloudinary para subir imágenes de servicios
- ✅ Vista previa de imagen con botón para eliminar
- ✅ Características separadas por comas (ya funcionaba, mejorado)
- ✅ Visualización de imágenes en modo lectura

### **3. Landing Page**
- ✅ Servicios muestran imagen cuando está disponible
- ✅ Fallback a icono si no hay imagen
- ✅ Overlay con gradiente sobre la imagen
- ✅ Diseño responsive

---

## 🚀 PASOS PARA ACTIVAR

### **PASO 1: Ejecutar Script SQL en Supabase**

1. Ve a tu proyecto en Supabase:
   ```
   https://supabase.com/dashboard/project/cwedzvyzreayruexudpb/sql/new
   ```

2. Copia y pega el contenido de:
   ```
   supabase/add-image-to-services.sql
   ```

3. Click en **"Run"** para ejecutar el script

4. Verifica que se agregó la columna:
   ```sql
   SELECT * FROM services LIMIT 1;
   ```
   Deberías ver la columna `image_url`

---

### **PASO 2: Reiniciar Servidor de Desarrollo**

```bash
# Detener el servidor (Ctrl+C si está corriendo)
npm run dev
```

---

### **PASO 3: Agregar Imágenes a los Servicios**

1. Ve al dashboard de administración:
   ```
   http://localhost:3000/admin/dashboard
   ```

2. Click en **"Servicios"** en el menú lateral

3. Click en el botón **"Editar"** (arriba a la derecha)

4. Para cada servicio:
   - Click en **"Subir Imagen"**
   - Selecciona una imagen (máx. 2MB)
   - La imagen se subirá a Cloudinary automáticamente
   - Verás la vista previa de la imagen

5. Click en **"Guardar Cambios"**

---

## 📋 CARACTERÍSTICAS SEPARADAS POR COMAS

El sistema **ya funciona correctamente** con características separadas por comas:

### **Ejemplo:**
```
Aplicaciones Web, Apps Móviles, Software Empresarial, E-commerce
```

Se convertirá automáticamente en:
- Aplicaciones Web
- Apps Móviles
- Software Empresarial
- E-commerce

---

## 🎨 VISUALIZACIÓN EN LA LANDING PAGE

### **Con Imagen:**
```
┌─────────────────────────┐
│                         │
│    IMAGEN DEL SERVICIO  │
│    (con overlay)        │
│                         │
├─────────────────────────┤
│ Título del Servicio     │
│ Descripción...          │
│ • Característica 1      │
│ • Característica 2      │
└─────────────────────────┘
```

### **Sin Imagen (Fallback):**
```
┌─────────────────────────┐
│  ┌──┐                   │
│  │🔧│ Icono             │
│  └──┘                   │
│                         │
│ Título del Servicio     │
│ Descripción...          │
│ • Característica 1      │
│ • Característica 2      │
└─────────────────────────┘
```

---

## 📸 RECOMENDACIONES PARA IMÁGENES

### **Tamaño Recomendado:**
- **Ancho:** 800px - 1200px
- **Alto:** 600px - 800px
- **Ratio:** 4:3 o 16:9
- **Peso:** Máximo 2MB

### **Formato:**
- ✅ JPG (mejor para fotos)
- ✅ PNG (mejor para gráficos)
- ✅ WebP (mejor compresión)
- ✅ SVG (para iconos vectoriales)

### **Contenido:**
- Imágenes relacionadas con el servicio
- Alta calidad y profesionales
- Buena iluminación
- Sin texto superpuesto (el título ya se muestra)

---

## 🔧 ESTRUCTURA DE DATOS

### **Tabla `services` en Supabase:**
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] NOT NULL,
  gradient TEXT NOT NULL,
  order INTEGER NOT NULL,
  image_url TEXT,              -- ← NUEVO CAMPO
  created_at TIMESTAMP
);
```

### **Ejemplo de Servicio:**
```json
{
  "id": "uuid",
  "title": "Desarrollo de Software",
  "description": "Creamos soluciones a medida...",
  "icon": "Code2",
  "features": [
    "Aplicaciones Web",
    "Apps Móviles",
    "Software Empresarial"
  ],
  "gradient": "from-blue-600 to-cyan-500",
  "order": 1,
  "image_url": "https://res.cloudinary.com/dv6lvpeat/image/upload/..."
}
```

---

## 🎯 FLUJO DE USUARIO

### **Agregar Imagen:**
1. Dashboard → Servicios → Editar
2. Click "Subir Imagen"
3. Seleccionar archivo
4. Cloudinary procesa y optimiza
5. URL se guarda automáticamente
6. Vista previa aparece
7. Guardar cambios

### **Cambiar Imagen:**
1. Dashboard → Servicios → Editar
2. Click "Cambiar Imagen"
3. Seleccionar nuevo archivo
4. Guardar cambios

### **Eliminar Imagen:**
1. Dashboard → Servicios → Editar
2. Click en botón "X" sobre la imagen
3. Imagen se elimina (vuelve a icono)
4. Guardar cambios

---

## 🌐 CLOUDINARY

Las imágenes se suben automáticamente a Cloudinary:
- **Carpeta:** `nagotar-services/`
- **Optimización:** Automática
- **CDN:** Global
- **Transformaciones:** Disponibles

---

## ✨ BENEFICIOS

1. **Visualización Profesional:**
   - Servicios más atractivos visualmente
   - Mejor engagement del usuario
   - Diseño moderno

2. **Flexibilidad:**
   - Puedes usar imagen o icono
   - Fácil de actualizar
   - Sin límite de servicios

3. **Performance:**
   - Imágenes optimizadas por Cloudinary
   - CDN global
   - Carga rápida

4. **Gestión Fácil:**
   - Todo desde el dashboard
   - Sin código
   - Cambios en tiempo real

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### **La imagen no se muestra:**
1. Verifica que ejecutaste el script SQL
2. Reinicia el servidor de desarrollo
3. Limpia caché del navegador (Cmd+Shift+R)

### **Error al subir imagen:**
1. Verifica que la imagen sea menor a 2MB
2. Verifica formato (JPG, PNG, WebP, SVG)
3. Verifica conexión a Cloudinary

### **Características no se separan:**
1. Asegúrate de usar comas: `Item 1, Item 2, Item 3`
2. Evita espacios extra
3. Guarda los cambios

---

## 📝 EJEMPLO COMPLETO

### **Servicio: Desarrollo de Software**

**Campos:**
- **Título:** `Desarrollo de Software`
- **Descripción:** `Creamos soluciones tecnológicas a medida para tu empresa`
- **Icono:** `Code2`
- **Características:** `Aplicaciones Web, Apps Móviles, Software Empresarial, E-commerce`
- **Gradiente:** `from-blue-600 to-cyan-500`
- **Imagen:** `[Subir imagen de código/desarrollo]`

**Resultado en Landing Page:**
- Imagen de fondo con overlay azul
- Título con hover effect
- Descripción clara
- 4 características con bullets
- Línea de gradiente al hacer hover

---

## 🎉 ¡LISTO!

Tu sección de servicios ahora tiene:
- ✅ Imágenes profesionales
- ✅ Características separadas por comas
- ✅ Diseño responsive
- ✅ Fácil gestión desde el dashboard

**¡Disfruta de tu portfolio mejorado!** 🚀

---

**Última actualización:** Febrero 2026
