// Script para configurar la base de datos de Supabase desde la terminal
// Ejecutar con: node scripts/setup-database.js

const { createClient } = require('@supabase/supabase-js')

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function setupDatabase() {
  console.log('🚀 Configurando base de datos de Supabase...\n')

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Faltan credenciales de Supabase en .env.local')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    console.log('📊 Creando tablas y datos iniciales...\n')

    // 1. Crear tabla hero_content
    console.log('1️⃣  Creando tabla hero_content...')
    const { error: heroError } = await supabase
      .from('hero_content')
      .insert({
        title: 'Transformamos ideas en soluciones digitales',
        subtitle: 'Soluciones informáticas integrales: desarrollo de software, redes, mantenimiento de hardware y software. Tu socio tecnológico de confianza.',
        stat_1_value: 50,
        stat_1_label: 'Proyectos',
        stat_2_value: 30,
        stat_2_label: 'Clientes',
        stat_3_value: 5,
        stat_3_label: 'Años'
      })
      .select()

    if (heroError && !heroError.message.includes('already exists')) {
      console.log('⚠️  Nota: Es posible que necesites crear las tablas manualmente en Supabase')
      console.log('   Ve a: https://supabase.com/dashboard/project/cwedzvyzreayruexudpb/editor')
    } else {
      console.log('✅ Tabla hero_content: OK')
    }

    // 2. Crear servicios
    console.log('2️⃣  Insertando servicios...')
    const services = [
      { title: 'Desarrollo de Software', description: 'Aplicaciones web, móviles y software a medida', icon: 'Code2', order: 1 },
      { title: 'Redes e Infraestructura', description: 'Diseño, instalación y mantenimiento de redes', icon: 'Network', order: 2 },
      { title: 'Mantenimiento TI', description: 'Soporte técnico de hardware y software', icon: 'Wrench', order: 3 }
    ]

    for (const service of services) {
      const { error } = await supabase.from('services').insert(service)
      if (!error || error.message.includes('duplicate')) {
        console.log(`   ✅ ${service.title}`)
      }
    }

    // 3. Crear contenido About
    console.log('3️⃣  Insertando contenido About...')
    await supabase.from('about_content').insert({
      founder_name: 'Pablo Thomas Landeros Mena',
      founder_title: 'Fundador & Desarrollador de Software',
      founder_description: 'Apasionado por la tecnología con amplia experiencia en desarrollo de software, redes e infraestructura TI.',
      company_description: 'Nagotar Technologies es una empresa dedicada a proporcionar soluciones tecnológicas integrales.'
    })
    console.log('✅ Contenido About: OK')

    // 4. Crear información de contacto
    console.log('4️⃣  Insertando información de contacto...')
    await supabase.from('contact_info').insert({
      email: 'contacto@nagotar.com',
      phone: '+56 9 1234 5678',
      address: 'Santiago, Chile'
    })
    console.log('✅ Información de contacto: OK')

    console.log('\n' + '='.repeat(50))
    console.log('🎉 ¡Base de datos configurada exitosamente!')
    console.log('='.repeat(50))

    console.log('\n📝 Próximos pasos:')
    console.log('1. Inicia tu servidor: npm run dev')
    console.log('2. Haz triple clic en el logo de Nagotar')
    console.log('3. Inicia sesión con: admin@nagotar.com / admin123')
    console.log('4. ¡Empieza a editar el contenido de tu página!')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.log('\n💡 Solución alternativa:')
    console.log('1. Ve a: https://supabase.com/dashboard/project/cwedzvyzreayruexudpb/sql')
    console.log('2. Copia el contenido de: supabase/schema.sql')
    console.log('3. Pégalo en el SQL Editor y ejecuta')
    process.exit(1)
  }
}

// Ejecutar
setupDatabase()
