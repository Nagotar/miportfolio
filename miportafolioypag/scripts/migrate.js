// Script para ejecutar migraciones en Supabase desde la terminal
// Ejecutar con: node scripts/migrate.js

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function runMigrations() {
  console.log('🚀 Iniciando migraciones de Supabase...\n')

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Faltan credenciales de Supabase en .env.local')
    process.exit(1)
  }

  // Crear cliente con service role key
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, '..', 'supabase', 'schema.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')

    console.log('📄 Leyendo archivo de migración: supabase/schema.sql')
    console.log('📊 Ejecutando SQL en Supabase...\n')

    // Dividir el SQL en statements individuales para mejor manejo de errores
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'
      
      // Saltar comentarios y líneas vacías
      if (statement.trim().startsWith('--') || statement.trim() === ';') {
        continue
      }

      try {
        const { error } = await supabase.rpc('exec_sql', { 
          sql_query: statement 
        })

        if (error) {
          // Algunos errores son esperados (como "ya existe")
          if (error.message.includes('already exists') || 
              error.message.includes('duplicate key')) {
            console.log(`⚠️  Ya existe: ${statement.substring(0, 50)}...`)
          } else {
            console.error(`❌ Error en statement ${i + 1}:`, error.message)
            errorCount++
          }
        } else {
          successCount++
          if (statement.includes('CREATE TABLE')) {
            const tableName = statement.match(/CREATE TABLE.*?(\w+)/)?.[1]
            console.log(`✅ Tabla creada: ${tableName}`)
          } else if (statement.includes('INSERT INTO')) {
            const tableName = statement.match(/INSERT INTO\s+(\w+)/)?.[1]
            console.log(`✅ Datos insertados en: ${tableName}`)
          } else if (statement.includes('CREATE POLICY')) {
            console.log(`✅ Política de seguridad creada`)
          }
        }
      } catch (err) {
        console.error(`❌ Error ejecutando SQL:`, err.message)
        errorCount++
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log(`✅ Statements exitosos: ${successCount}`)
    if (errorCount > 0) {
      console.log(`⚠️  Statements con errores: ${errorCount}`)
    }
    console.log('='.repeat(50))

    // Verificar que las tablas se crearon
    console.log('\n🔍 Verificando tablas creadas...')
    
    const tables = ['hero_content', 'services', 'projects', 'about_content', 'contact_info']
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      if (error) {
        console.log(`❌ Tabla ${table}: No encontrada`)
      } else {
        console.log(`✅ Tabla ${table}: OK`)
      }
    }

    console.log('\n🎉 ¡Migración completada!')
    console.log('\n📝 Próximos pasos:')
    console.log('1. Inicia tu servidor: npm run dev')
    console.log('2. Haz triple clic en el logo de Nagotar')
    console.log('3. Inicia sesión con: admin@nagotar.com / admin123')

  } catch (error) {
    console.error('❌ Error durante la migración:', error.message)
    process.exit(1)
  }
}

// Ejecutar
runMigrations()
