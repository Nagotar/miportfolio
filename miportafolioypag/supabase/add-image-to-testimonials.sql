-- Script para agregar campo de imagen a la tabla testimonials
-- Ejecutar en Supabase SQL Editor

-- Agregar columna image_url a testimonials
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Comentario para documentar el campo
COMMENT ON COLUMN testimonials.image_url IS 'URL de la imagen del cliente desde Cloudinary (opcional)';

-- Verificar la estructura actualizada
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'testimonials'
ORDER BY ordinal_position;
