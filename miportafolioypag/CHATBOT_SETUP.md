# 🤖 Chatbot de Nagotar Technologies

## 📋 Resumen

Chatbot inteligente integrado en tu sitio web para responder preguntas frecuentes, proporcionar información sobre servicios y ayudar a los visitantes a contactarte.

---

## ✨ Características Implementadas

### **1. Interfaz Moderna**
- ✅ Botón flotante en la esquina inferior derecha
- ✅ Ventana de chat con diseño profesional
- ✅ Animaciones suaves con Framer Motion
- ✅ Modo oscuro integrado
- ✅ Responsive (funciona en móviles)

### **2. Funcionalidades**
- ✅ **Respuestas inteligentes** basadas en tu negocio
- ✅ **Preguntas rápidas** para iniciar conversación
- ✅ **Historial de mensajes** en la sesión
- ✅ **Indicador de escritura** (typing...)
- ✅ **Timestamps** en cada mensaje
- ✅ **Scroll automático** a nuevos mensajes

### **3. Base de Conocimiento**
El chatbot puede responder sobre:
- 📦 Servicios ofrecidos
- 💰 Precios y cotizaciones
- ⏱️ Tiempos de desarrollo
- 💻 Tecnologías utilizadas
- 📧 Información de contacto
- 🔧 Proceso de trabajo
- 📊 Experiencia y portafolio
- 🛠️ Mantenimiento y soporte

---

## 🎯 Preguntas que Puede Responder

### **Servicios:**
- "¿Qué servicios ofrecen?"
- "Desarrollo web"
- "Aplicaciones móviles"
- "E-commerce"

### **Precios:**
- "¿Cuánto cuesta?"
- "Precio"
- "Cotización"

### **Tiempo:**
- "¿Cuánto demora?"
- "Tiempo de desarrollo"
- "Plazo"

### **Contacto:**
- "Quiero contactarlos"
- "Email"
- "Teléfono"

### **Tecnologías:**
- "¿Qué tecnologías usan?"
- "Stack tecnológico"

### **Proceso:**
- "¿Cómo trabajan?"
- "Proceso de desarrollo"

---

## 🚀 Cómo Funciona

### **Frontend** (`/components/chatbot.tsx`)
1. Botón flotante siempre visible
2. Al hacer clic, se abre la ventana de chat
3. Usuario escribe mensaje
4. Se envía a la API `/api/chatbot`
5. Respuesta se muestra en el chat

### **Backend** (`/app/api/chatbot/route.ts`)
1. Recibe el mensaje del usuario
2. Analiza palabras clave
3. Busca en la base de conocimiento
4. Devuelve la respuesta más relevante

---

## 🎨 Personalización

### **Cambiar Colores:**
Edita `/components/chatbot.tsx`:
```tsx
// Botón flotante
className="bg-gradient-to-r from-primary to-cyan-500"

// Mensajes del bot
className="bg-muted text-foreground"

// Mensajes del usuario
className="bg-gradient-to-r from-primary to-cyan-500 text-white"
```

### **Agregar Nuevas Respuestas:**
Edita `/app/api/chatbot/route.ts`:
```typescript
const KNOWLEDGE_BASE: Record<string, string> = {
  "nueva_palabra_clave": `Tu respuesta aquí con formato:
  
  • Punto 1
  • Punto 2
  
  ¿Pregunta de seguimiento?`,
  
  // ... más respuestas
}
```

### **Cambiar Preguntas Rápidas:**
Edita `/components/chatbot.tsx`:
```typescript
const QUICK_QUESTIONS = [
  "¿Qué servicios ofrecen?",
  "¿Cuánto cuesta un proyecto?",
  "Tu nueva pregunta aquí",
  "Otra pregunta"
]
```

---

## 🔧 Mejoras Futuras (Opcional)

### **1. Integración con IA Real (OpenAI/Anthropic)**
```bash
npm install openai
```

Actualizar `/app/api/chatbot/route.ts`:
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// En la función POST:
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "Eres el asistente de Nagotar Technologies..."
    },
    {
      role: "user",
      content: message
    }
  ]
})

const response = completion.choices[0].message.content
```

### **2. Guardar Conversaciones en Supabase**
Crear tabla `chat_conversations`:
```sql
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  message TEXT NOT NULL,
  sender TEXT NOT NULL, -- 'user' o 'bot'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **3. Notificaciones en Tiempo Real**
- Webhook cuando un usuario inicia conversación
- Email al admin con resumen de conversaciones
- Integración con Slack/Discord

### **4. Analytics del Chatbot**
- Preguntas más frecuentes
- Tasa de respuesta exitosa
- Conversiones (usuarios que contactan)

### **5. Modo "Hablar con Humano"**
- Botón para solicitar contacto directo
- Envía email automático al equipo
- Guarda información del usuario

---

## 📊 Estadísticas y Métricas

Para ver el rendimiento del chatbot:

1. **Google Analytics**: Eventos personalizados
2. **Logs del servidor**: Ver mensajes en consola
3. **Supabase**: Guardar conversaciones para análisis

---

## 🎯 Mejores Prácticas

### **Respuestas Efectivas:**
- ✅ **Cortas y directas** (2-4 líneas)
- ✅ **Usar emojis** para mejor UX
- ✅ **Incluir preguntas de seguimiento**
- ✅ **Ofrecer múltiples opciones**
- ✅ **Siempre dar forma de contacto**

### **Tono de Comunicación:**
- 😊 **Amigable y profesional**
- 💬 **Conversacional, no robótico**
- 🎯 **Enfocado en ayudar**
- ⚡ **Respuestas rápidas**

---

## 🔍 Solución de Problemas

### **El chatbot no aparece:**
- Verifica que el servidor esté corriendo
- Revisa la consola del navegador (F12)
- Verifica que `<Chatbot />` esté en el layout

### **Las respuestas no funcionan:**
- Revisa los logs del servidor
- Verifica que la API `/api/chatbot` esté funcionando
- Prueba con: `curl -X POST http://localhost:3000/api/chatbot -H "Content-Type: application/json" -d '{"message":"hola"}'`

### **El chatbot se ve mal en móvil:**
- Verifica el ancho: `w-[380px]` en el componente
- Ajusta para móviles: `w-full max-w-[380px]`

---

## 📝 Mantenimiento

### **Actualizar Información:**
1. Edita `BUSINESS_CONTEXT` en `/app/api/chatbot/route.ts`
2. Actualiza precios, servicios, contacto
3. Reinicia el servidor

### **Agregar Nuevas Respuestas:**
1. Identifica palabras clave comunes
2. Agrega a `KNOWLEDGE_BASE`
3. Prueba con diferentes variaciones

### **Monitorear Uso:**
1. Revisa logs del servidor
2. Analiza preguntas frecuentes
3. Mejora respuestas basado en feedback

---

## ✅ Checklist de Implementación

- [x] Componente de chatbot creado
- [x] API de respuestas implementada
- [x] Integrado en el layout principal
- [x] Base de conocimiento configurada
- [x] Preguntas rápidas agregadas
- [x] Diseño responsive
- [x] Animaciones implementadas
- [ ] Probar en producción
- [ ] Recopilar feedback de usuarios
- [ ] Optimizar respuestas

---

## 🎉 ¡Listo para Usar!

El chatbot está completamente funcional y listo para ayudar a tus visitantes.

**Para probarlo:**
1. Ve a: http://localhost:3000
2. Haz clic en el botón flotante (💬)
3. Prueba las preguntas rápidas
4. Escribe tus propias preguntas

**El chatbot aparecerá en todas las páginas de tu sitio.**
