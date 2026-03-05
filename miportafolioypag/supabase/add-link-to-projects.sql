-- Script para agregar campo de link a proyectos
-- Ejecutar en Supabase SQL Editor

-- Agregar columna de link si no existe
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS link TEXT;

-- Comentario
COMMENT ON COLUMN projects.link IS 'URL externa del proyecto (opcional)';

-- Verificar la estructura
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;
