#!/bin/bash

# Script para ejecutar migraciones en Supabase desde la terminal
# Uso: bash scripts/migrate.sh

echo "🚀 Ejecutando migraciones en Supabase..."
echo ""

# Project ref
PROJECT_REF="cwedzvyzreayruexudpb"

echo "📋 Proyecto: $PROJECT_REF"
echo "📄 Archivo: supabase/migration-clean.sql"
echo ""
echo "⚠️  Necesitas la contraseña de tu base de datos PostgreSQL"
echo "   Encuéntrala en: Supabase Dashboard > Settings > Database"
echo ""

# Pedir contraseña
read -sp "Ingresa la contraseña de la base de datos: " DB_PASSWORD
echo ""
echo ""
echo "Ejecutando migración..."
echo ""

# Ejecutar el archivo SQL
PGPASSWORD="$DB_PASSWORD" psql \
  -h "aws-0-us-east-1.pooler.supabase.com" \
  -p 6543 \
  -U "postgres.${PROJECT_REF}" \
  -d postgres \
  -f supabase/migration-clean.sql

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
    echo "💡 Verifica:"
    echo "   - La contraseña es correcta"
    echo "   - Tienes acceso a internet"
    echo "   - El proyecto de Supabase está activo"
fi
