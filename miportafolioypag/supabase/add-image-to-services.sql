-- Script para agregar campo de imagen a la tabla services
-- Ejecutar en Supabase SQL Editor

-- Agregar columna image_url a services
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Comentario para documentar el campo
COMMENT ON COLUMN services.image_url IS 'URL de la imagen del servicio desde Cloudinary';

-- Verificar la estructura actualizada
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'services'
ORDER BY ordinal_position;
