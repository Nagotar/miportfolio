#!/bin/bash

# Script para ejecutar migraciones en Supabase desde la terminal
# Ejecutar con: bash scripts/db-push.sh

echo "🚀 Ejecutando migraciones en Supabase..."
echo ""

# Cargar variables de entorno
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Verificar que las variables estén configuradas
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "❌ Error: NEXT_PUBLIC_SUPABASE_URL no está configurada"
    exit 1
fi

# Extraer el project ref de la URL
PROJECT_REF=$(echo $NEXT_PUBLIC_SUPABASE_URL | sed 's/https:\/\///' | sed 's/.supabase.co//')

echo "📋 Proyecto: $PROJECT_REF"
echo "📄 Ejecutando: supabase/schema.sql"
echo ""

# Ejecutar el SQL usando psql directamente
# Necesitarás la contraseña de la base de datos
echo "⚠️  Necesitas la contraseña de tu base de datos PostgreSQL"
echo "   Encuéntrala en: https://supabase.com/dashboard/project/$PROJECT_REF/settings/database"
echo ""

# Ejecutar el archivo SQL
PGPASSWORD="" psql -h db.$PROJECT_REF.supabase.co -U postgres -d postgres -f supabase/schema.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Migraciones ejecutadas exitosamente!"
    echo ""
    echo "📝 Próximos pasos:"
    echo "1. Inicia tu servidor: npm run dev"
    echo "2. Haz triple clic en el logo de Nagotar"
    echo "3. Inicia sesión con: admin@nagotar.com / admin123"
else
    echo ""
    echo "❌ Error al ejecutar migraciones"
    echo ""
    echo "💡 Alternativa: Usa el script Node.js"
    echo "   node scripts/create-admin.js"
fi
