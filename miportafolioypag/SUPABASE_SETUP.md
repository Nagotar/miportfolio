# Configuración de Supabase para Nagotar Technologies

## Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa los datos:
   - **Name**: nagotar-portfolio (o el nombre que prefieras)
   - **Database Password**: Guarda esta contraseña en un lugar seguro
   - **Region**: Selecciona la más cercana a tu ubicación
5. Haz clic en "Create new project" y espera unos minutos

## Paso 2: Obtener las Credenciales

1. Una vez creado el proyecto, ve a **Settings** (⚙️) en el menú lateral
2. Selecciona **API**
3. Copia los siguientes valores:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public** key (una clave larga que empieza con `eyJ...`)

## Paso 3: Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza los valores con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_aqui
```

## Paso 4: Crear las Tablas en Supabase

1. En tu proyecto de Supabase, ve a **SQL Editor** en el menú lateral
2. Haz clic en "New Query"
3. Copia y pega todo el contenido del archivo `supabase/schema.sql`
4. Haz clic en "Run" para ejecutar el script
5. Verifica que las tablas se crearon correctamente en **Table Editor**

## Paso 5: Crear Usuario Administrador

1. En Supabase, ve a **Authentication** > **Users**
2. Haz clic en "Add user" > "Create new user"
3. Completa los datos:
   - **Email**: admin@nagotar.com (o el email que prefieras)
   - **Password**: Crea una contraseña segura
   - **Auto Confirm User**: Activa esta opción
4. Haz clic en "Create user"

## Paso 6: Verificar la Configuración

Las tablas creadas son:
- ✅ `hero_content` - Contenido de la sección principal
- ✅ `services` - Lista de servicios
- ✅ `projects` - Portafolio de proyectos
- ✅ `about_content` - Información del fundador y empresa
- ✅ `contact_info` - Datos de contacto

## Paso 7: Probar la Aplicación

1. Reinicia el servidor de desarrollo si está corriendo:
   ```bash
   npm run dev
   ```

2. Accede al login:
   - Haz **triple clic** en el logo de Nagotar en la página principal
   - O ve directamente a: `http://localhost:3000/admin/login`

3. Inicia sesión con las credenciales que creaste en el Paso 5

## Seguridad Implementada

- ✅ **Row Level Security (RLS)** activado en todas las tablas
- ✅ **Lectura pública**: Cualquiera puede ver el contenido
- ✅ **Escritura protegida**: Solo usuarios autenticados pueden modificar
- ✅ **Políticas de acceso**: Configuradas para cada tabla

## Estructura de la Base de Datos

### hero_content
- Título principal
- Subtítulo
- 3 estadísticas (valor + etiqueta)

### services
- Título del servicio
- Descripción
- Icono (nombre del componente Lucide)
- Orden de visualización

### projects
- Título del proyecto
- Descripción
- URL de imagen
- Tecnologías utilizadas (array)
- Link opcional
- Orden de visualización

### about_content
- Nombre del fundador
- Título del fundador
- Descripción del fundador
- Descripción de la empresa

### contact_info
- Email
- Teléfono
- Dirección

## Solución de Problemas

### Error: "Invalid API key"
- Verifica que copiaste correctamente las credenciales
- Asegúrate de que no haya espacios extra en `.env.local`
- Reinicia el servidor de desarrollo

### Error: "relation does not exist"
- Ejecuta el script SQL completo en el SQL Editor
- Verifica que todas las tablas se crearon en Table Editor

### No puedo iniciar sesión
- Verifica que el usuario esté creado en Authentication > Users
- Asegúrate de que "Auto Confirm User" esté activado
- Verifica el email y contraseña

## Próximos Pasos

Una vez configurado Supabase:
1. ✅ El login funcionará con autenticación real
2. ✅ Los cambios en el panel de admin se guardarán en la base de datos
3. ✅ El contenido se cargará dinámicamente desde Supabase
4. ✅ Podrás editar todo el contenido de la página web desde el panel

## Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Autenticación](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
