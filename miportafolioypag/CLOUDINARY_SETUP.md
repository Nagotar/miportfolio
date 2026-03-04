# 🖼️ Configuración de Cloudinary para Logos de Clientes

## 📋 Pasos para Configurar Cloudinary

### 1. Crear Cuenta en Cloudinary

1. Ve a: **https://cloudinary.com/users/register_free**
2. Regístrate con tu email o cuenta de Google
3. Completa el formulario de registro

### 2. Obtener Credenciales

Una vez dentro del dashboard de Cloudinary:

1. Ve a **Dashboard** (página principal)
2. Encontrarás tus credenciales:
   - **Cloud Name** (ejemplo: `dxyz123abc`)
   - **API Key**
   - **API Secret**

### 3. Crear Upload Preset

1. Ve a **Settings** (⚙️) → **Upload**
2. Scroll hasta **Upload presets**
3. Haz clic en **Add upload preset**
4. Configura:
   - **Preset name**: `nagotar-clients` (o el nombre que prefieras)
   - **Signing Mode**: **Unsigned** (importante para subir desde el navegador)
   - **Folder**: `nagotar-clients`
   - **Allowed formats**: `png, jpg, jpeg, webp, svg`
   - **Transformation**: (opcional) puedes agregar transformaciones automáticas
5. Haz clic en **Save**

### 4. Configurar Variables de Entorno

Abre el archivo `.env.local` y actualiza:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=nagotar-clients
```

**Ejemplo:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123abc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=nagotar-clients
```

### 5. Actualizar Base de Datos

Ejecuta el siguiente SQL en **Supabase SQL Editor**:

```sql
-- Agregar columna logo_url a la tabla clients
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS logo_url TEXT;
```

### 6. Instalar Dependencias

```bash
npm install cloudinary next-cloudinary
```

### 7. Reiniciar Servidor de Desarrollo

```bash
# Detener el servidor (Ctrl+C)
npm run dev
```

## ✅ Verificar Configuración

1. Ve al dashboard: **http://localhost:3000/admin/dashboard**
2. Haz clic en **Clientes**
3. Haz clic en **Editar**
4. Selecciona un cliente
5. Haz clic en **"Subir Logo"**
6. Debería abrirse el widget de Cloudinary
7. Sube una imagen de prueba
8. La imagen debería aparecer en el preview

## 🎯 Uso del Sistema

### En el Dashboard:

1. **Agregar Cliente:**
   - Haz clic en "Editar"
   - Haz clic en "+ Agregar Cliente"
   - Completa nombre, industria e icono
   - Haz clic en "Subir Logo"
   - Selecciona una imagen
   - Recorta si es necesario (se recomienda formato cuadrado)
   - Haz clic en "Guardar"

2. **Cambiar Logo:**
   - Haz clic en "Cambiar Logo"
   - Selecciona nueva imagen
   - Haz clic en "Guardar"

3. **Eliminar Logo:**
   - Haz clic en "Eliminar Logo"
   - El cliente volverá a mostrar el icono por defecto

### En la Landing Page:

- Los clientes con logo mostrarán su imagen desde Cloudinary
- Los clientes sin logo mostrarán el icono de Lucide
- Los logos se cargan automáticamente desde Cloudinary (CDN rápido)

## 🔧 Características Implementadas

✅ **Widget de Cloudinary integrado**
- Subida directa desde el navegador
- Recorte de imagen (formato cuadrado recomendado)
- Límite de 2MB por imagen
- Formatos soportados: PNG, JPG, JPEG, WEBP, SVG

✅ **Preview en tiempo real**
- Vista previa de 128x128px en el dashboard
- Botón para cambiar o eliminar logo

✅ **Fallback inteligente**
- Si no hay logo, muestra icono de Lucide
- Transición suave entre logo e icono

✅ **Optimización automática**
- Cloudinary optimiza las imágenes automáticamente
- CDN global para carga rápida
- Caché automático

## 📝 Notas Importantes

- **Cloud Name**: Es público, no es sensible
- **Upload Preset**: Debe ser "Unsigned" para subir desde el navegador
- **Folder**: Organiza tus imágenes en carpetas (recomendado: `nagotar-clients`)
- **Límite de tamaño**: 2MB por imagen (configurable en el componente)
- **Formatos recomendados**: PNG con fondo transparente para logos

## 🚀 Próximos Pasos

Una vez configurado Cloudinary:
1. Sube logos de tus clientes reales
2. Los logos aparecerán automáticamente en la landing page
3. Puedes actualizar logos en cualquier momento desde el dashboard

## ❓ Solución de Problemas

**Error: "Cloudinary no está configurado"**
- Verifica que las variables de entorno estén correctas en `.env.local`
- Reinicia el servidor de desarrollo

**Error: "Upload preset not found"**
- Verifica que el upload preset exista en Cloudinary
- Verifica que el preset sea "Unsigned"
- Verifica que el nombre coincida exactamente

**El widget no se abre:**
- Abre la consola del navegador (F12)
- Busca errores relacionados con Cloudinary
- Verifica que el script de Cloudinary se haya cargado
