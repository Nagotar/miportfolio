-- Script completo para arreglar tabla testimonials
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columnas nuevas si no existen
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS position TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 5;

-- 2. Hacer columnas antiguas NULLABLE (para permitir usar las nuevas)
ALTER TABLE testimonials 
ALTER COLUMN quote DROP NOT NULL;

ALTER TABLE testimonials 
ALTER COLUMN author DROP NOT NULL;

ALTER TABLE testimonials 
ALTER COLUMN role DROP NOT NULL;

-- 3. Migrar datos existentes de columnas antiguas a nuevas
UPDATE testimonials 
SET 
  content = COALESCE(content, quote),
  name = COALESCE(name, author),
  position = COALESCE(position, role)
WHERE content IS NULL OR name IS NULL OR position IS NULL;

-- 4. Verificar estructura final
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'testimonials'
ORDER BY ordinal_position;
