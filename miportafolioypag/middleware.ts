import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger todas las rutas /admin excepto /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Supabase guarda la sesión en cookies con este prefijo
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const projectRef = supabaseUrl.split("//")[1]?.split(".")[0] || ""

    // Buscar cookie de sesión de Supabase
    const authCookie =
      request.cookies.get(`sb-${projectRef}-auth-token`) ||
      request.cookies.get(`sb-access-token`) ||
      request.cookies.get("supabase-auth-token")

    // También verificar el token guardado como fallback
    const adminToken = request.cookies.get("adminToken")

    if (!authCookie && !adminToken) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
