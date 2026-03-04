# Nagotar Technologies - Portfolio & Landing Page

Portfolio y página de aterrizaje moderna para Nagotar Technologies, construida con Next.js 16, React 19, TypeScript, Tailwind CSS y Supabase.

## 🚀 Tecnologías

- **Framework:** Next.js 16.0.10
- **React:** 19.2.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4.x
- **Base de Datos:** Supabase
- **Almacenamiento de Medios:** Cloudinary
- **UI Components:** shadcn/ui + Radix UI
- **Animaciones:** Framer Motion
- **Analytics:** Vercel Analytics
- **Emails:** Resend

## 📦 Características

- ✅ Diseño moderno y responsive
- ✅ Modo oscuro/claro
- ✅ Panel de administración completo
- ✅ Gestión de proyectos con imágenes y videos
- ✅ Integración con Cloudinary para medios
- ✅ Formulario de contacto funcional
- ✅ Animaciones suaves y efectos visuales
- ✅ SEO optimizado
- ✅ Notificaciones elegantes (react-hot-toast)
- ✅ Carruseles modernos (Embla Carousel)
- ✅ Efectos parallax
- ✅ Chatbot integrado

## 🛠️ Instalación

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd miportafolioypag
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**

Copia el archivo `.env.example` a `.env.local` y completa las variables:

```bash
cp .env.example .env.local
```

Variables requeridas:
- `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave anónima de Supabase
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Nombre de tu cloud de Cloudinary
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Preset de upload de Cloudinary
- `RESEND_API_KEY`: API key de Resend para emails

4. **Ejecutar migraciones de Supabase:**

Ejecuta los scripts SQL en tu proyecto de Supabase:
- `supabase/update-projects-schema.sql`
- `supabase/add-thumbnail-to-projects.sql`
- `supabase/add-clients-testimonials.sql`

5. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
miportafolioypag/
├── app/                      # App Router de Next.js
│   ├── admin/               # Panel de administración
│   │   └── dashboard/       # Dashboard principal
│   ├── api/                 # API Routes
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de inicio
├── components/              # Componentes React
│   ├── ui/                  # Componentes UI (shadcn)
│   ├── projects-section.tsx
│   ├── chatbot.tsx
│   └── ...
├── lib/                     # Utilidades y configuración
│   └── supabase/           # Cliente y servicios de Supabase
│       ├── client.ts
│       ├── content.ts
│       └── database.types.ts
├── supabase/               # Scripts SQL
├── public/                 # Archivos estáticos
└── styles/                 # Estilos globales
```

## 🗄️ Base de Datos (Supabase)

### Tablas Principales:

- **projects**: Proyectos del portfolio
  - `id`, `title`, `description`, `category`
  - `thumbnail_url`: Imagen de portada
  - `image_url`: Video del proyecto
  - `media_type`: Tipo de medio (image/video)
  - `technologies`: Array de tecnologías
  - `link`, `icon`, `gradient`, `order`

- **hero_content**: Contenido del hero section
- **services**: Servicios ofrecidos
- **about_content**: Contenido de la sección "Sobre Nosotros"
- **contact_info**: Información de contacto
- **clients**: Clientes
- **testimonials**: Testimonios

## 🎨 Componentes UI

El proyecto utiliza **shadcn/ui** con componentes de Radix UI:
- Button, Input, Label, Badge
- Dialog, Dropdown, Select
- Tabs, Accordion, Toast
- Y más...

## 🖼️ Gestión de Medios

### Cloudinary:
- **Imágenes de portada**: `nagotar-projects/thumbnails/`
- **Videos de proyectos**: `nagotar-projects/videos/`
- Límites: 2MB para imágenes, sin límite para videos
- Optimización automática

## 📧 Formulario de Contacto

Integrado con **Resend** para envío de emails.

## 🚀 Deployment en Vercel

### Opción 1: Deploy desde GitHub

1. **Sube tu código a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js

3. **Configura las variables de entorno:**
   - En Vercel Dashboard → Settings → Environment Variables
   - Agrega todas las variables de `.env.local`

4. **Deploy:**
   - Click en "Deploy"
   - Vercel construirá y desplegará automáticamente

### Opción 2: Deploy con Vercel CLI

1. **Instalar Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Deploy a producción:**
```bash
vercel --prod
```

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 📝 Variables de Entorno en Vercel

Asegúrate de configurar estas variables en Vercel:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
RESEND_API_KEY
```

## 🎯 Características del Dashboard

- Gestión de contenido del Hero
- CRUD de proyectos con upload de medios
- Gestión de servicios
- Edición de información de contacto
- Vista previa en tiempo real

## 📱 Responsive Design

- Mobile First
- Breakpoints: sm, md, lg, xl, 2xl
- Optimizado para todos los dispositivos

## 🔒 Seguridad

- Variables de entorno protegidas
- API Keys no expuestas en el cliente
- Validación de datos en servidor
- CORS configurado correctamente

## 📚 Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a Nagotar Technologies.

## 📞 Contacto

Nagotar Technologies - [Sitio Web](https://nagotar.com)

---

**Desarrollado con ❤️ por Nagotar Technologies**
