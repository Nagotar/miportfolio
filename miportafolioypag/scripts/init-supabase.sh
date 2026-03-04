#!/bin/bash

# Script para inicializar Supabase localmente y ejecutar migraciones
# Ejecutar con: bash scripts/init-supabase.sh

echo "🚀 Inicializando proyecto Supabase..."
echo ""

# Verificar que el CLI esté instalado
if ! command -v supabase &> /dev/null; then
    echo "❌ Error: Supabase CLI no está instalado"
    echo "Instálalo con: brew install supabase/tap/supabase"
    exit 1
fi

echo "✅ Supabase CLI instalado"
echo ""

# Vincular con el proyecto remoto
echo "🔗 Vinculando con proyecto remoto de Supabase..."
supabase link --project-ref cwedzvyzreayruexudpb

echo ""
echo "📊 Ejecutando migraciones..."
echo ""

# Ejecutar el script SQL directamente
supabase db push --db-url "postgresql://postgres:[YOUR-PASSWORD]@db.cwedzvyzreayruexudpb.supabase.co:5432/postgres"

echo ""
echo "✅ ¡Migraciones completadas!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Inicia tu servidor: npm run dev"
echo "2. Haz triple clic en el logo de Nagotar"
echo "3. Inicia sesión con: admin@nagotar.com / admin123"
