import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Log para verificar que la API Key se está leyendo
    console.log('RESEND_API_KEY configurada:', process.env.RESEND_API_KEY ? 'Sí (oculta por seguridad)' : 'NO')
    
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Nagotar Technologies <onboarding@resend.dev>', // Email verificado en Resend
      to: ['nagotartechnologies@gmail.com'],
      replyTo: email, // Para que puedas responder directamente
      subject: `Nuevo contacto: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #3b82f6; margin-bottom: 5px; }
              .value { background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #3b82f6; }
              .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📧 Nuevo Mensaje de Contacto</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Nagotar Technologies</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nombre:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">📋 Asunto:</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Mensaje:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
                <p>Puedes responder directamente a este email para contactar a ${name}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando email:', error)
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Por favor intenta nuevamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado exitosamente',
        id: data?.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
