# 📧 Configuración del Formulario de Contacto

## 📋 Resumen

El formulario de contacto enviará emails a **nagotartechnologies@gmail.com** usando **Resend**, un servicio de email transaccional gratuito y fácil de configurar.

---

## 🚀 Pasos para Configurar Resend

### 1. Crear Cuenta en Resend

1. Ve a: **https://resend.com/signup**
2. Regístrate con tu email de GitHub o Google
3. Completa el registro (es gratis)

### 2. Obtener API Key

1. Una vez dentro del dashboard de Resend
2. Ve a **API Keys** en el menú lateral
3. Haz clic en **"Create API Key"**
4. Dale un nombre: `Nagotar Contact Form`
5. Selecciona permisos: **"Sending access"**
6. Haz clic en **"Create"**
7. **COPIA LA API KEY** (solo se muestra una vez)

### 3. Configurar Variables de Entorno

Abre el archivo `.env.local` y actualiza:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

**Ejemplo:**
```env
RESEND_API_KEY=re_123abc456def789ghi012jkl345mno678
```

### 4. Instalar Dependencia de Resend

```bash
npm install resend
```

### 5. Reiniciar Servidor de Desarrollo

```bash
# Detener el servidor (Ctrl+C)
npm run dev
```

---

## ✅ Verificar Configuración

### Prueba del Formulario:

1. Ve a: **http://localhost:3000**
2. Desplázate a la sección **"Contacto"**
3. Completa el formulario:
   - **Nombre**: Tu nombre
   - **Email**: tu@email.com
   - **Asunto**: Prueba de formulario
   - **Mensaje**: Este es un mensaje de prueba
4. Haz clic en **"Enviar Mensaje"**
5. Deberías ver un mensaje de éxito ✅
6. Revisa tu email **nagotartechnologies@gmail.com**

---

## 📧 Características del Email

### Email que Recibirás:

- **De**: `Nagotar Technologies <onboarding@resend.dev>`
- **Para**: `nagotartechnologies@gmail.com`
- **Reply-To**: Email del cliente (puedes responder directamente)
- **Asunto**: `Nuevo contacto: [Asunto del formulario]`

### Contenido del Email:

```
📧 Nuevo Mensaje de Contacto
Nagotar Technologies

👤 Nombre: [Nombre del cliente]
📧 Email: [Email del cliente]
📋 Asunto: [Asunto]
💬 Mensaje: [Mensaje completo]

Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
Puedes responder directamente a este email para contactar a [Nombre].
```

---

## 🎨 Características Implementadas

### Frontend (ContactSection):
✅ **Validación de campos** (todos requeridos)
✅ **Loading state** durante envío
✅ **Mensaje de éxito** con animación
✅ **Manejo de errores** con alertas
✅ **Reset automático** después de 3 segundos
✅ **Diseño moderno** con gradientes y animaciones

### Backend (API Route):
✅ **Validación de datos** (campos requeridos)
✅ **Validación de email** (formato correcto)
✅ **Email HTML profesional** con estilos
✅ **Reply-To automático** (responder al cliente)
✅ **Manejo de errores** completo
✅ **Logs en consola** para debugging

---

## 🔧 Solución de Problemas

### Error: "Cannot find module 'resend'"
**Solución:**
```bash
npm install resend
```

### Error: "RESEND_API_KEY is not defined"
**Solución:**
1. Verifica que `.env.local` tenga la variable `RESEND_API_KEY`
2. Reinicia el servidor de desarrollo
3. La API key debe empezar con `re_`

### Error: "Error al enviar el mensaje"
**Solución:**
1. Abre la consola del navegador (F12)
2. Busca el error específico
3. Verifica que la API key sea válida
4. Verifica que Resend esté funcionando: https://status.resend.com

### Los emails no llegan
**Solución:**
1. Revisa la carpeta de **Spam** en Gmail
2. Verifica que el email sea `nagotartechnologies@gmail.com`
3. Revisa los logs del servidor (terminal donde corre `npm run dev`)
4. Verifica el dashboard de Resend para ver los emails enviados

---

## 📝 Notas Importantes

### Plan Gratuito de Resend:
- ✅ **100 emails por día** (suficiente para formulario de contacto)
- ✅ **Sin tarjeta de crédito** requerida
- ✅ **Email verificado**: `onboarding@resend.dev`
- ⚠️ Para usar tu propio dominio (ej: `contacto@nagotar.com`), necesitas verificar el dominio

### Seguridad:
- ✅ **API Key en servidor**: No se expone al cliente
- ✅ **Validación de datos**: Previene spam básico
- ✅ **Rate limiting**: Resend tiene protección anti-spam
- 💡 **Recomendación**: Agregar reCAPTCHA en el futuro para mayor seguridad

### Personalización:
Si quieres cambiar el email de destino, edita:
```typescript
// app/api/contact/route.ts
to: ['nagotartechnologies@gmail.com'], // Cambia aquí
```

---

## 🎯 Próximos Pasos (Opcional)

### 1. Agregar reCAPTCHA:
- Prevenir spam automatizado
- Google reCAPTCHA v3 (invisible)

### 2. Guardar Mensajes en Supabase:
- Crear tabla `contact_messages`
- Guardar todos los mensajes recibidos
- Ver historial en el dashboard

### 3. Verificar Dominio Propio:
- Usar `contacto@nagotar.com` en lugar de `onboarding@resend.dev`
- Mejor imagen profesional
- Requiere acceso a DNS del dominio

### 4. Notificaciones en Tiempo Real:
- Webhook de Resend
- Notificación push cuando llega un mensaje
- Integración con Slack/Discord

---

## ✅ Checklist de Configuración

- [ ] Crear cuenta en Resend
- [ ] Obtener API Key
- [ ] Actualizar `.env.local` con `RESEND_API_KEY`
- [ ] Ejecutar `npm install resend`
- [ ] Reiniciar servidor (`npm run dev`)
- [ ] Probar formulario de contacto
- [ ] Verificar recepción de email en `nagotartechnologies@gmail.com`

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del servidor (terminal)
2. Revisa la consola del navegador (F12)
3. Verifica el dashboard de Resend: https://resend.com/emails
4. Consulta la documentación: https://resend.com/docs

---

**¡Listo! Tu formulario de contacto está configurado para recibir mensajes en nagotartechnologies@gmail.com** 🎉
