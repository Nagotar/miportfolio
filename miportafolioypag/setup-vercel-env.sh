#!/bin/bash

# Script para configurar variables de entorno en Vercel
# Ejecutar: bash setup-vercel-env.sh

echo "🔐 Configurando variables de entorno en Vercel..."
echo ""

# Función para agregar variable de entorno a todos los ambientes
add_env() {
    local name=$1
    local value=$2
    echo "📝 Agregando $name..."
    
    # Agregar a production
    echo "$value" | vercel env add "$name" production
    
    # Agregar a preview
    echo "$value" | vercel env add "$name" preview
    
    # Agregar a development
    echo "$value" | vercel env add "$name" development
    
    echo "   ✓ $name agregado a todos los ambientes"
}

# Agregar todas las variables
add_env "NEXT_PUBLIC_SUPABASE_URL" "https://cwedzvyzreayruexudpb.supabase.co"

add_env "NEXT_PUBLIC_SUPABASE_ANON_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3ZWR6dnl6cmVheXJ1ZXh1ZHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMzE2MjcsImV4cCI6MjA4NTgwNzYyN30.tAw25PGi0lzkAnq_rInwQPc2o59NzmWH-VW27dkpz3s"

add_env "SUPABASE_SERVICE_ROLE_KEY" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3ZWR6dnl6cmVheXJ1ZXh1ZHBiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDIzMTYyNywiZXhwIjoyMDg1ODA3NjI3fQ.CL6TjaeWGXo4vwrdeo4fEDVw_RKh9mWmsCT7zH6FK1U"

add_env "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME" "dv6lvpeat"

add_env "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET" "nagotar"

add_env "RESEND_API_KEY" "re_geDHFrnt_Usmaq5R8YEA8zLcUsQoeNiJJ"

echo ""
echo "✅ Variables de entorno configuradas exitosamente"
echo ""
echo "📋 Verificar variables:"
echo "vercel env ls"
echo ""
echo "🚀 Siguiente paso: Deploy"
echo "vercel --prod"
