# 🚀 Guía de Configuración - Nagotar Technologies

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta de Supabase
- Cuenta de Cloudinary
- Cuenta de Resend (para emails)

---

## ⚙️ Configuración Inicial

### 1. **Clonar e Instalar**

```bash
git clone <repository-url>
cd miportafolioypag
npm install
```

### 2. **Variables de Entorno**

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Completa las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu-upload-preset

# Resend (Emails)
RESEND_API_KEY=tu-resend-api-key

# Site URL (para producción)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

---

## 🗄️ Configuración de Supabase

### **Paso 1: Crear Proyecto en Supabase**

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia las credenciales (URL y keys)

### **Paso 2: Ejecutar Scripts SQL**

Ve al **SQL Editor** de Supabase y ejecuta los siguientes scripts **en orden**:

#### **1. Estructura básica:**
```sql
-- Ejecuta: supabase/add-clients-testimonials.sql
```

#### **2. Proyectos:**
```sql
-- Ejecuta: supabase/update-projects-schema.sql
-- Ejecuta: supabase/add-thumbnail-to-projects.sql
```

#### **3. Servicios con imágenes:**
```sql
-- Ejecuta: supabase/add-image-to-services.sql
```

#### **4. Sistema de Testimonios Protegidos:**
```sql
-- Ejecuta: supabase/fix-testimonials-structure.sql
-- Ejecuta: supabase/create-testimonial-invitations.sql
```

### **Paso 3: Verificar Tablas**

Ejecuta en SQL Editor:

```sql
-- Verificar que todas las tablas existan
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

Deberías ver:
- `about_content`
- `clients`
- `contact_info`
- `hero_content`
- `projects`
- `services`
- `testimonials`
- `testimonial_invitations` ✨ (nuevo)

---

## 🖼️ Configuración de Cloudinary

### **Paso 1: Crear Cuenta**
1. Ve a [cloudinary.com](https://cloudinary.com)
2. Crea una cuenta gratuita

### **Paso 2: Crear Upload Presets**

1. Ve a **Settings** → **Upload**
2. Crea los siguientes presets **unsigned**:

#### **Preset 1: nagotar-projects**
- Folder: `nagotar-projects`
- Signing Mode: **Unsigned**
- Allowed formats: image, video

#### **Preset 2: nagotar-services**
- Folder: `nagotar-services`
- Signing Mode: **Unsigned**
- Allowed formats: image

#### **Preset 3: nagotar-testimonials**
- Folder: `nagotar-testimonials`
- Signing Mode: **Unsigned**
- Allowed formats: image

### **Paso 3: Copiar Credenciales**
- Cloud Name: En el dashboard principal
- Upload Preset: El nombre que creaste (ej: `nagotar-projects`)

---

## 📧 Configuración de Resend

### **Paso 1: Crear Cuenta**
1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta

### **Paso 2: Obtener API Key**
1. Ve a **API Keys**
2. Crea una nueva key
3. Cópiala a `.env.local`

### **Paso 3: Verificar Dominio (Opcional)**
Para emails en producción, verifica tu dominio en Resend.

---

## 🚀 Iniciar Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🔐 Sistema de Testimonios Protegidos

### **Características:**
- ✅ Links únicos con tokens criptográficos
- ✅ Un solo uso por defecto
- ✅ Fecha de expiración configurable
- ✅ Subida opcional de imágenes
- ✅ Dashboard de gestión completo

### **Uso:**

1. **Accede al dashboard:**
   ```
   http://localhost:3000/admin/dashboard
   ```

2. **Ve a Testimonios → Gestionar Invitaciones:**
   ```
   http://localhost:3000/admin/testimonios/invitaciones
   ```

3. **Crea nueva invitación:**
   - Nombre del cliente
   - Email (opcional)
   - Días hasta expiración (default: 30)

4. **Comparte el link generado:**
   ```
   http://localhost:3000/testimonios/nuevo?token=abc123...
   ```

5. **El cliente:**
   - Abre el link
   - Completa el formulario
   - Sube imagen opcional
   - Envía testimonio

6. **El token se marca como usado automáticamente**

### **Documentación completa:**
- `TESTIMONIOS_PROTEGIDOS.md` - Guía detallada del sistema

---

## 📁 Estructura de Carpetas en Cloudinary

```
nagotar-projects/
├── thumbnails/     # Imágenes de portada de proyectos
└── videos/         # Videos de proyectos

nagotar-services/   # Imágenes de servicios

nagotar-testimonials/  # Fotos de clientes
```

---

## 🔧 Solución de Problemas

### **Error: "Could not find table"**
- Ejecuta los scripts SQL en Supabase
- Reinicia el servidor: `npm run dev`

### **Error: "Invalid Cloudinary credentials"**
- Verifica `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Verifica que el upload preset sea **unsigned**

### **Error: "Token inválido" en testimonios**
- Verifica que ejecutaste `create-testimonial-invitations.sql`
- Verifica que la tabla `testimonial_invitations` existe

### **Imágenes no se suben**
- Verifica que el preset de Cloudinary sea **unsigned**
- Verifica el tamaño (máx. 2MB para imágenes)

---

## 🚀 Deploy a Producción (Vercel)

### **Opción 1: Desde GitHub**

1. **Sube a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <tu-repo-url>
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Configura variables de entorno
   - Deploy

### **Opción 2: Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

### **Variables de Entorno en Vercel:**

Agrega todas las variables de `.env.local` en:
**Vercel Dashboard → Settings → Environment Variables**

---

## 📚 Documentación Adicional

- `README.md` - Información general del proyecto
- `TESTIMONIOS_PROTEGIDOS.md` - Sistema de testimonios
- `SERVICIOS_CON_IMAGENES.md` - Gestión de servicios
- `CARACTERISTICAS_GUIA.md` - Características separadas por comas

---

## ✅ Checklist de Configuración

- [ ] Node.js instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Variables de entorno configuradas (`.env.local`)
- [ ] Proyecto de Supabase creado
- [ ] Scripts SQL ejecutados en Supabase
- [ ] Cuenta de Cloudinary configurada
- [ ] Upload presets creados (unsigned)
- [ ] API Key de Resend obtenida
- [ ] Servidor de desarrollo funcionando
- [ ] Dashboard accesible
- [ ] Sistema de testimonios probado

---

**¡Listo para desarrollar!** 🎉
