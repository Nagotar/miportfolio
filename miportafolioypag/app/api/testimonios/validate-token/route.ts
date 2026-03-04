import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token no proporcionado" },
        { status: 400 }
      )
    }

    // Buscar el token en la base de datos
    const { data: invitation, error } = await supabase
      .from("testimonial_invitations")
      .select("*")
      .eq("token", token)
      .single()

    if (error || !invitation) {
      return NextResponse.json(
        { valid: false, error: "Token inválido" },
        { status: 404 }
      )
    }

    // Verificar si está activo
    if (!invitation.is_active) {
      return NextResponse.json(
        { valid: false, error: "Este link ha sido desactivado" },
        { status: 403 }
      )
    }

    // Verificar si ha expirado
    if (invitation.expires_at) {
      const expirationDate = new Date(invitation.expires_at)
      if (expirationDate < new Date()) {
        return NextResponse.json(
          { valid: false, error: "Este link ha expirado" },
          { status: 403 }
        )
      }
    }

    // Verificar número de usos
    if (invitation.use_count >= invitation.max_uses) {
      return NextResponse.json(
        { valid: false, error: "Este link ya ha sido utilizado" },
        { status: 403 }
      )
    }

    return NextResponse.json({
      valid: true,
      client_name: invitation.client_name,
      client_email: invitation.client_email
    })
  } catch (error) {
    console.error("Error validando token:", error)
    return NextResponse.json(
      { valid: false, error: "Error al validar el token" },
      { status: 500 }
    )
  }
}
