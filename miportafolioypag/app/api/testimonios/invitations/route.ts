import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { randomBytes } from "crypto"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Generar token único
function generateToken(): string {
  return randomBytes(32).toString('hex')
}

// POST - Crear nueva invitación
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { client_name, client_email, expires_in_days, max_uses } = body

    if (!client_name) {
      return NextResponse.json(
        { error: "El nombre del cliente es obligatorio" },
        { status: 400 }
      )
    }

    const token = generateToken()
    
    // Calcular fecha de expiración si se especifica
    let expires_at = null
    if (expires_in_days && expires_in_days > 0) {
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + expires_in_days)
      expires_at = expirationDate.toISOString()
    }

    const { data, error } = await supabase
      .from("testimonial_invitations")
      .insert([
        {
          token,
          client_name,
          client_email: client_email || null,
          expires_at,
          max_uses: max_uses || 1,
          is_active: true,
          use_count: 0
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creando invitación:", error)
      return NextResponse.json(
        { error: "Error al crear la invitación" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        data,
        link: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/testimonios/nuevo?token=${token}`
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error en POST /api/testimonios/invitations:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

// GET - Listar invitaciones
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("testimonial_invitations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error obteniendo invitaciones:", error)
      return NextResponse.json(
        { error: "Error al obtener invitaciones" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error en GET /api/testimonios/invitations:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

// DELETE - Desactivar invitación
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID de invitación requerido" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("testimonial_invitations")
      .update({ is_active: false })
      .eq("id", id)

    if (error) {
      console.error("Error desactivando invitación:", error)
      return NextResponse.json(
        { error: "Error al desactivar invitación" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en DELETE /api/testimonios/invitations:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
