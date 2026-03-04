import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Cliente de Supabase con service role para operaciones públicas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, position, company, content, rating, image_url, token } = body

    // Validar token
    if (!token) {
      return NextResponse.json(
        { error: "Token de invitación requerido" },
        { status: 401 }
      )
    }

    // Verificar token en la base de datos
    const { data: invitation, error: tokenError } = await supabase
      .from("testimonial_invitations")
      .select("*")
      .eq("token", token)
      .single()

    if (tokenError || !invitation) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 403 }
      )
    }

    // Verificar si está activo
    if (!invitation.is_active) {
      return NextResponse.json(
        { error: "Este link ha sido desactivado" },
        { status: 403 }
      )
    }

    // Verificar si ha expirado
    if (invitation.expires_at) {
      const expirationDate = new Date(invitation.expires_at)
      if (expirationDate < new Date()) {
        return NextResponse.json(
          { error: "Este link ha expirado" },
          { status: 403 }
        )
      }
    }

    // Verificar número de usos
    if (invitation.use_count >= invitation.max_uses) {
      return NextResponse.json(
        { error: "Este link ya ha sido utilizado" },
        { status: 403 }
      )
    }

    // Validaciones de campos
    if (!name || !position || !company || !content || !rating) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben ser completados" },
        { status: 400 }
      )
    }

    if (content.length < 50) {
      return NextResponse.json(
        { error: "El testimonio debe tener al menos 50 caracteres" },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "La calificación debe estar entre 1 y 5" },
        { status: 400 }
      )
    }

    // Insertar testimonio en Supabase
    const { data, error } = await supabase
      .from("testimonials")
      .insert([
        {
          name,
          position,
          company,
          content,
          rating,
          image_url: image_url || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error insertando testimonio:", error)
      return NextResponse.json(
        { error: "Error al guardar el testimonio" },
        { status: 500 }
      )
    }

    // Actualizar contador de usos del token
    await supabase
      .from("testimonial_invitations")
      .update({
        use_count: invitation.use_count + 1,
        used_at: new Date().toISOString()
      })
      .eq("id", invitation.id)

    return NextResponse.json(
      { 
        success: true, 
        message: "Testimonio enviado exitosamente",
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error en POST /api/testimonios/public:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
