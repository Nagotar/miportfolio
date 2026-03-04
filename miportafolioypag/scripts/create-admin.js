// Script para crear usuario administrador en Supabase
// Ejecutar con: node scripts/create-admin.js

const { createClient } = require('@supabase/supabase-js')

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Necesitarás esta clave

// Configuración del usuario admin
const ADMIN_EMAIL = 'admin@nagotar.com'
const ADMIN_PASSWORD = 'admin123'

async function createAdminUser() {
  console.log('🚀 Iniciando creación de usuario administrador...\n')

  if (!supabaseUrl) {
    console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL no está configurada en .env.local')
    process.exit(1)
  }

  if (!supabaseServiceKey) {
    console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY no está configurada en .env.local')
    console.log('\n📝 Para obtener la Service Role Key:')
    console.log('1. Ve a: https://supabase.com/dashboard/project/cwedzvyzreayruexudpb/settings/api')
    console.log('2. Copia la clave "service_role" (secret)')
    console.log('3. Agrégala a .env.local como: SUPABASE_SERVICE_ROLE_KEY=tu_clave_aqui\n')
    process.exit(1)
  }

  // Crear cliente con service role key (tiene permisos de admin)
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Crear usuario
    console.log(`📧 Creando usuario: ${ADMIN_EMAIL}`)
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true, // Auto-confirmar el email
      user_metadata: {
        role: 'admin',
        name: 'Administrador'
      }
    })

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('⚠️  El usuario ya existe en Supabase')
        console.log('\n✅ Puedes iniciar sesión con:')
        console.log(`   Email: ${ADMIN_EMAIL}`)
        console.log(`   Contraseña: ${ADMIN_PASSWORD}`)
      } else {
        throw error
      }
    } else {
      console.log('✅ Usuario creado exitosamente!')
      console.log('\n📋 Detalles del usuario:')
      console.log(`   ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
      console.log(`   Email confirmado: ${data.user.email_confirmed_at ? 'Sí' : 'No'}`)
      console.log('\n🔐 Credenciales de acceso:')
      console.log(`   Email: ${ADMIN_EMAIL}`)
      console.log(`   Contraseña: ${ADMIN_PASSWORD}`)
      console.log('\n🎉 ¡Listo! Ahora puedes iniciar sesión en el panel de administración')
    }

  } catch (error) {
    console.error('❌ Error al crear usuario:', error.message)
    process.exit(1)
  }
}

// Ejecutar
createAdminUser()
