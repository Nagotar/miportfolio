# 🔐 Sistema de Testimonios Protegidos - Guía Completa

Sistema completo de invitaciones protegidas con tokens únicos para que solo clientes autorizados puedan dejar testimonios.

---

## ✅ CARACTERÍSTICAS IMPLEMENTADAS

### **1. Sistema de Tokens Únicos ✅**
- Token criptográfico de 64 caracteres
- Un solo uso por defecto
- Fecha de expiración configurable
- Activación/desactivación manual

### **2. Base de Datos ✅**
- Tabla `testimonial_invitations`
- Tracking completo de uso
- Validaciones automáticas

### **3. API Endpoints ✅**
- `/api/testimonios/invitations` - CRUD de invitaciones
- `/api/testimonios/validate-token` - Validación de tokens
- `/api/testimonios/public` - Envío con validación

### **4. Página de Gestión ✅**
- Dashboard completo de invitaciones
- Crear, copiar y desactivar links
- Vista de estado en tiempo real

### **5. Validaciones Automáticas ✅**
- Token válido y activo
- No expirado
- No excede usos máximos
- Actualización automática de contador

---

## 🚀 PASOS PARA ACTIVAR

### **PASO 1: Ejecutar Scripts SQL en Supabase**

1. Ve a: [Supabase SQL Editor](https://supabase.com/dashboard/project/cwedzvyzreayruexudpb/sql/new)

2. **Primero** ejecuta:
   ```
   supabase/add-image-to-testimonials.sql
   ```

3. **Luego** ejecuta:
   ```
   supabase/create-testimonial-invitations.sql
   ```

4. Verifica las tablas:
   ```sql
   SELECT * FROM testimonial_invitations LIMIT 1;
   SELECT * FROM testimonials LIMIT 1;
   ```

---

### **PASO 2: Reiniciar Servidor**

```bash
npm run dev
```

---

### **PASO 3: Crear Primera Invitación**

1. Ve al dashboard: `http://localhost:3000/admin/dashboard`
2. Click en **"Testimonios"**
3. Click en **"Gestionar Invitaciones"**
4. Click en **"Nueva Invitación"**
5. Completa el formulario:
   - Nombre del cliente
   - Email (opcional)
   - Días hasta expiración (default: 30)
6. Click en **"Crear Invitación"**
7. El link se copia automáticamente al portapapeles

---

## 🔗 ESTRUCTURA DE LINKS

### **Link Protegido:**
```
https://tu-dominio.com/testimonios/nuevo?token=a1b2c3d4e5f6...
```

### **Desarrollo Local:**
```
http://localhost:3000/testimonios/nuevo?token=a1b2c3d4e5f6...
```

### **Producción (Vercel):**
```
https://miportafolioypag.vercel.app/testimonios/nuevo?token=a1b2c3d4e5f6...
```

---

## 📋 FLUJO COMPLETO

```
1. Dashboard → Testimonios → Gestionar Invitaciones
   ↓
2. Nueva Invitación
   - Nombre: Juan Pérez
   - Email: juan@empresa.com
   - Expira en: 30 días
   ↓
3. Sistema genera token único
   ↓
4. Link se copia automáticamente
   ↓
5. Compartir link con cliente
   ↓
6. Cliente abre link
   ↓
7. Sistema valida token:
   ✅ Token existe
   ✅ Está activo
   ✅ No ha expirado
   ✅ No se ha usado
   ↓
8. Cliente completa formulario
   ↓
9. Sistema valida y guarda testimonio
   ↓
10. Token marcado como usado
    ↓
11. Link ya no funciona (protección)
```

---

## 🛡️ SEGURIDAD

### **Validaciones Implementadas:**

#### **1. Al Abrir el Link:**
```typescript
✅ Token existe en base de datos
✅ Token está activo (is_active = true)
✅ Token no ha expirado (expires_at > now)
✅ Token no excede usos máximos (use_count < max_uses)
```

#### **2. Al Enviar Testimonio:**
```typescript
✅ Token válido (re-validación)
✅ Campos obligatorios completos
✅ Testimonio mínimo 50 caracteres
✅ Calificación entre 1-5
✅ Actualización de contador de usos
```

#### **3. Protecciones Adicionales:**
- Token criptográfico de 64 caracteres (imposible adivinar)
- Un solo uso por defecto
- Expiración automática
- Desactivación manual disponible

---

## 📊 TABLA DE INVITACIONES

### **Estructura:**
```sql
CREATE TABLE testimonial_invitations (
  id UUID PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,           -- Token único
  client_name TEXT NOT NULL,            -- Nombre del cliente
  client_email TEXT,                    -- Email (opcional)
  created_at TIMESTAMP,                 -- Fecha de creación
  expires_at TIMESTAMP,                 -- Fecha de expiración
  used_at TIMESTAMP,                    -- Fecha de uso
  is_active BOOLEAN DEFAULT true,       -- Activo/Inactivo
  max_uses INTEGER DEFAULT 1,           -- Usos máximos
  use_count INTEGER DEFAULT 0           -- Contador de usos
);
```

### **Estados Posibles:**
- **Activa:** ✅ Verde - Puede usarse
- **Usada:** 🟡 Amarillo - Ya se usó
- **Expirada:** 🔴 Rojo - Fecha pasada
- **Desactivada:** ⚫ Gris - Desactivada manualmente

---

## 🎨 DASHBOARD DE INVITACIONES

### **Características:**
- ✅ **Lista completa** de invitaciones
- ✅ **Crear nueva** invitación
- ✅ **Copiar link** con un click
- ✅ **Ver estado** en tiempo real
- ✅ **Desactivar** invitación
- ✅ **Filtros** por estado
- ✅ **Búsqueda** por cliente

### **Información Mostrada:**
```
┌─────────────────────────────────────────┐
│ 👤 Juan Pérez                           │
│ 📧 juan@empresa.com                     │
│                                         │
│ 📅 Creada: 08/02/2026                  │
│ 📅 Expira: 10/03/2026                  │
│ ✅ Estado: Activa                       │
│                                         │
│ 🔗 https://...?token=abc123...         │
│                                         │
│ [Copiar Link] [Desactivar]             │
└─────────────────────────────────────────┘
```

---

## 💡 CASOS DE USO

### **1. Cliente Nuevo:**
```
1. Terminas proyecto con cliente
2. Creas invitación con su nombre
3. Compartes link por email/WhatsApp
4. Cliente deja testimonio
5. Link se marca como usado
6. Testimonio aparece en dashboard
```

### **2. Campaña de Testimonios:**
```
1. Creas 10 invitaciones para clientes antiguos
2. Envías email masivo con links únicos
3. Cada cliente usa su link personal
4. Trackeas quién ya respondió
5. Envías recordatorio a los que faltan
```

### **3. Link Expirado:**
```
1. Cliente recibe link hace 2 meses
2. Intenta usarlo después de expiración
3. Sistema muestra: "Este link ha expirado"
4. Creas nueva invitación
5. Envías nuevo link
```

---

## 🔧 CONFIGURACIÓN AVANZADA

### **Múltiples Usos:**
```typescript
// Permitir que un cliente deje varios testimonios
{
  client_name: "Empresa XYZ",
  max_uses: 5,  // Hasta 5 testimonios
  expires_in_days: 90
}
```

### **Sin Expiración:**
```typescript
// Link permanente (no recomendado)
{
  client_name: "Cliente VIP",
  expires_in_days: 0,  // Sin expiración
  max_uses: 1
}
```

### **Expiración Corta:**
```typescript
// Para testimonios urgentes
{
  client_name: "Cliente Urgente",
  expires_in_days: 7,  // 1 semana
  max_uses: 1
}
```

---

## 📧 TEMPLATES DE EMAIL

### **Template 1: Formal**
```
Asunto: Invitación para dejar tu testimonio

Estimado/a [Nombre],

Esperamos que estés satisfecho/a con nuestro trabajo en [Proyecto].

Nos encantaría que compartieras tu experiencia en nuestro sitio web:

👉 [LINK ÚNICO]

Este link es personal y expira el [FECHA].
Solo te tomará 2-3 minutos.

¡Muchas gracias!

Equipo Nagotar Technologies
```

### **Template 2: Casual**
```
Hola [Nombre]! 👋

¿Cómo estuvo tu experiencia con nosotros?

Déjanos un testimonio aquí:
👉 [LINK ÚNICO]

Es rápido y nos ayuda mucho 🙏

¡Gracias!
```

### **Template 3: WhatsApp**
```
Hola [Nombre]! 

Nos encantaría conocer tu opinión sobre el proyecto que hicimos juntos 😊

Link para dejar testimonio:
[LINK ÚNICO]

Expira en 30 días, así que no lo dejes para después 😉

¡Gracias! 🙌
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### **Error: "Link inválido"**

**Causas posibles:**
1. Token no existe en base de datos
2. Link copiado incorrectamente
3. Token fue eliminado

**Solución:**
1. Verificar que el link esté completo
2. Crear nueva invitación
3. Copiar link desde dashboard

---

### **Error: "Link expirado"**

**Causa:** Fecha de expiración pasada

**Solución:**
1. Ir a dashboard de invitaciones
2. Crear nueva invitación para el mismo cliente
3. Enviar nuevo link

---

### **Error: "Link ya utilizado"**

**Causa:** El cliente ya usó el link

**Soluciones:**
1. Si necesita corregir: Crear nueva invitación
2. Si ya dejó testimonio: Verificar en dashboard

---

### **Error: "Link desactivado"**

**Causa:** Invitación desactivada manualmente

**Solución:**
1. Crear nueva invitación
2. No se puede reactivar una desactivada

---

## 📊 ESTADÍSTICAS SUGERIDAS

Puedes trackear:
- **Tasa de conversión:** Links enviados vs testimonios recibidos
- **Tiempo promedio:** Desde envío hasta respuesta
- **Links expirados:** Cuántos expiran sin uso
- **Clientes más rápidos:** Quién responde primero
- **Testimonios por mes:** Tendencia temporal

---

## 🎯 MEJORES PRÁCTICAS

### **1. Timing:**
- ✅ Envía invitación 1-2 días después de terminar proyecto
- ✅ Envía recordatorio a los 7 días
- ✅ Último recordatorio a los 14 días

### **2. Personalización:**
- ✅ Usa el nombre del cliente
- ✅ Menciona el proyecto específico
- ✅ Agradece su tiempo

### **3. Incentivos:**
- ✅ Ofrece descuento en próximo proyecto
- ✅ Sorteo entre quienes dejen testimonio
- ✅ Reconocimiento público (con permiso)

### **4. Seguimiento:**
- ✅ Revisa dashboard diariamente
- ✅ Responde a testimonios recibidos
- ✅ Publica los mejores rápidamente

---

## 🔒 SEGURIDAD Y PRIVACIDAD

### **Datos Protegidos:**
- ✅ Tokens imposibles de adivinar (64 caracteres)
- ✅ Un solo uso por defecto
- ✅ Expiración automática
- ✅ HTTPS obligatorio en producción

### **GDPR Compliance:**
- ✅ Email opcional
- ✅ Datos mínimos requeridos
- ✅ Posibilidad de eliminar invitaciones
- ✅ Consentimiento explícito en formulario

---

## 📁 ARCHIVOS CREADOS

### **Base de Datos:**
1. `supabase/create-testimonial-invitations.sql`
2. `supabase/add-image-to-testimonials.sql`

### **API Endpoints:**
1. `/app/api/testimonios/invitations/route.ts`
2. `/app/api/testimonios/validate-token/route.ts`
3. `/app/api/testimonios/public/route.ts` (actualizado)

### **Frontend:**
1. `/app/testimonios/nuevo/page.tsx` (actualizado)
2. `/app/admin/testimonios/invitaciones/page.tsx`
3. `/app/admin/dashboard/page.tsx` (actualizado)

---

## 🎉 BENEFICIOS

### **Para tu Negocio:**
- ✅ **Control total:** Solo clientes autorizados
- ✅ **Sin spam:** Tokens únicos de un solo uso
- ✅ **Tracking completo:** Sabes quién respondió
- ✅ **Profesional:** Sistema robusto y seguro
- ✅ **Escalable:** Crea miles de invitaciones

### **Para tus Clientes:**
- ✅ **Seguro:** Link personal y privado
- ✅ **Simple:** Un click y listo
- ✅ **Rápido:** Formulario optimizado
- ✅ **Confiable:** Sistema profesional

---

## 🚀 PRÓXIMOS PASOS

1. **Ejecuta los 2 scripts SQL en Supabase**
2. **Reinicia el servidor**
3. **Crea tu primera invitación**
4. **Prueba el flujo completo**
5. **Comparte con un cliente real**

---

## 📞 EJEMPLO COMPLETO

### **Escenario:**
Terminaste un proyecto web para "Empresa ABC"

### **Pasos:**
1. Dashboard → Testimonios → Gestionar Invitaciones
2. Nueva Invitación:
   - Nombre: "María García - Empresa ABC"
   - Email: maria@empresaabc.com
   - Expira en: 30 días
3. Click "Crear Invitación"
4. Link copiado automáticamente
5. Envías email a María con el link
6. María abre el link
7. Sistema valida: ✅ Token válido
8. María completa formulario (2 minutos)
9. Sistema guarda testimonio
10. Token marcado como usado
11. Recibes notificación
12. Revisas y publicas testimonio

---

**¡Tu sistema de testimonios protegidos está listo!** 🔐

**Dashboard:** `/admin/testimonios/invitaciones`

**Seguridad:** Tokens únicos, un solo uso, expiración automática
