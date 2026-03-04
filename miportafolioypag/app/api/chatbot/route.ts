import { NextRequest, NextResponse } from 'next/server'

// Contexto del negocio
const BUSINESS_CONTEXT = {
  name: "Nagotar Technologies",
  email: "nagotartechnologies@gmail.com",
  services: [
    "Desarrollo de Software a Medida",
    "Aplicaciones Web y Móviles",
    "Sistemas de Gestión Empresarial",
    "E-commerce y Tiendas Online",
    "Consultoría Tecnológica",
    "Mantenimiento de Software"
  ],
  technologies: ["React", "Next.js", "Node.js", "Python", "TypeScript", "Supabase", "PostgreSQL"],
  experience: "5+ años de experiencia",
  location: "Santiago, Chile"
}

// Base de conocimiento para respuestas
const KNOWLEDGE_BASE: Record<string, string> = {
  // Servicios
  "servicios": `Ofrecemos los siguientes servicios:

🔹 Desarrollo de Software a Medida
🔹 Aplicaciones Web y Móviles
🔹 Sistemas de Gestión Empresarial
🔹 E-commerce y Tiendas Online
🔹 Consultoría Tecnológica
🔹 Mantenimiento de Software

¿Te gustaría saber más sobre algún servicio en específico?`,

  "desarrollo web": `Desarrollamos aplicaciones web modernas usando tecnologías de vanguardia como React, Next.js y TypeScript.

✨ Características:
• Diseño responsive y moderno
• Alta performance y SEO optimizado
• Integración con bases de datos
• Sistemas de autenticación seguros
• Dashboards administrativos

¿Tienes un proyecto en mente?`,

  "aplicaciones móviles": `Creamos aplicaciones móviles nativas y multiplataforma para iOS y Android.

📱 Incluye:
• Diseño UX/UI profesional
• Integración con APIs
• Notificaciones push
• Pagos en línea
• Publicación en tiendas

¿Quieres desarrollar una app móvil?`,

  // Precios
  "precio": `Los costos varían según la complejidad del proyecto:

💰 Rangos aproximados:
• Landing Page: Desde $300.000 CLP
• Sitio Web Corporativo: $500.000 - $1.500.000 CLP
• E-commerce: $1.000.000 - $3.000.000 CLP
• Sistema a Medida: $2.000.000+ CLP

Para un presupuesto exacto, cuéntanos sobre tu proyecto. ¿Te gustaría agendar una reunión?`,

  "costo": `Los costos varían según la complejidad del proyecto:

💰 Rangos aproximados:
• Landing Page: Desde $300.000 CLP
• Sitio Web Corporativo: $500.000 - $1.500.000 CLP
• E-commerce: $1.000.000 - $3.000.000 CLP
• Sistema a Medida: $2.000.000+ CLP

Para un presupuesto exacto, cuéntanos sobre tu proyecto. ¿Te gustaría agendar una reunión?`,

  // Tiempo
  "tiempo": `Los tiempos de desarrollo dependen del alcance:

⏱️ Estimaciones:
• Landing Page: 1-2 semanas
• Sitio Web: 2-4 semanas
• E-commerce: 4-8 semanas
• Sistema Complejo: 2-6 meses

Trabajamos con metodología ágil para entregas incrementales. ¿Tienes un deadline específico?`,

  "plazo": `Los tiempos de desarrollo dependen del alcance:

⏱️ Estimaciones:
• Landing Page: 1-2 semanas
• Sitio Web: 2-4 semanas
• E-commerce: 4-8 semanas
• Sistema Complejo: 2-6 meses

Trabajamos con metodología ágil para entregas incrementales. ¿Tienes un deadline específico?`,

  // Contacto
  "contacto": `¡Perfecto! Puedes contactarnos de varias formas:

📧 Email: nagotartechnologies@gmail.com
📱 WhatsApp: Haz clic en el botón de teléfono en la sección de contacto
📍 Ubicación: Santiago, Chile

También puedes llenar el formulario de contacto en nuestra página y te responderemos en menos de 24 horas. ¿Prefieres que te contactemos nosotros?`,

  "email": `Puedes escribirnos a:
📧 nagotartechnologies@gmail.com

Respondemos todos los emails en menos de 24 horas. También puedes usar el formulario de contacto en nuestra página.`,

  // Tecnologías
  "tecnologias": `Trabajamos con tecnologías modernas y probadas:

💻 Frontend:
• React, Next.js, TypeScript
• Tailwind CSS, Framer Motion

⚙️ Backend:
• Node.js, Python
• Supabase, PostgreSQL
• APIs RESTful

☁️ Cloud:
• Vercel, AWS, Cloudinary

¿Tienes alguna tecnología específica en mente?`,

  // Proceso
  "proceso": `Nuestro proceso de trabajo es simple y transparente:

1️⃣ Reunión inicial (gratis)
   Entendemos tus necesidades

2️⃣ Propuesta y cotización
   Detallamos alcance y costos

3️⃣ Desarrollo iterativo
   Entregas semanales para feedback

4️⃣ Testing y ajustes
   Garantizamos calidad

5️⃣ Lanzamiento y soporte
   Te acompañamos después del launch

¿Quieres agendar una reunión inicial?`,

  // Experiencia
  "experiencia": `Tenemos más de 5 años de experiencia desarrollando soluciones tecnológicas para empresas de diversos rubros:

✅ Tecnología
✅ Salud
✅ Educación
✅ Retail
✅ Manufactura
✅ Consultoría

Hemos completado 50+ proyectos exitosos. ¿Quieres ver nuestro portafolio?`,

  // Mantenimiento
  "mantenimiento": `Ofrecemos planes de mantenimiento y soporte continuo:

🔧 Incluye:
• Actualizaciones de seguridad
• Corrección de bugs
• Mejoras de performance
• Nuevas funcionalidades
• Soporte técnico prioritario

Los planes se adaptan a tus necesidades. ¿Te interesa conocer más?`,

  // Default
  "default": `Gracias por tu mensaje. Puedo ayudarte con:

• Información sobre nuestros servicios
• Precios y cotizaciones
• Tiempos de desarrollo
• Tecnologías que usamos
• Proceso de trabajo
• Contacto directo

¿Sobre qué te gustaría saber más?`
}

function findBestMatch(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Buscar coincidencias exactas o parciales
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (key === "default") continue
    
    if (lowerMessage.includes(key)) {
      return response
    }
  }
  
  // Palabras clave adicionales
  if (lowerMessage.includes("cuánto") || lowerMessage.includes("cuanto")) {
    return KNOWLEDGE_BASE["precio"]
  }
  
  if (lowerMessage.includes("demora") || lowerMessage.includes("tarda")) {
    return KNOWLEDGE_BASE["tiempo"]
  }
  
  if (lowerMessage.includes("hola") || lowerMessage.includes("buenos") || lowerMessage.includes("buenas")) {
    return `¡Hola! 👋 Bienvenido a Nagotar Technologies. Somos expertos en desarrollo de software y soluciones tecnológicas.

¿En qué puedo ayudarte hoy?`
  }
  
  if (lowerMessage.includes("gracias")) {
    return `¡De nada! 😊 Estoy aquí para ayudarte.

Si tienes más preguntas, no dudes en escribirme. También puedes contactarnos directamente en nagotartechnologies@gmail.com`
  }
  
  if (lowerMessage.includes("adiós") || lowerMessage.includes("adios") || lowerMessage.includes("chao")) {
    return `¡Hasta pronto! 👋 

Si necesitas algo más, estaré aquí para ayudarte. ¡Que tengas un excelente día!`
  }
  
  // Respuesta por defecto
  return KNOWLEDGE_BASE["default"]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje inválido' },
        { status: 400 }
      )
    }

    // Buscar la mejor respuesta
    const response = findBestMatch(message)

    return NextResponse.json(
      { 
        response,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en chatbot:', error)
    return NextResponse.json(
      { 
        response: "Lo siento, hubo un error procesando tu mensaje. Por favor intenta nuevamente o contáctanos en nagotartechnologies@gmail.com",
        error: true
      },
      { status: 500 }
    )
  }
}
