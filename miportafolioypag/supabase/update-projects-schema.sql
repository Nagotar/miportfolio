-- Script para actualizar la tabla projects con los campos faltantes
-- Este script agrega category y media_type de forma segura

-- Agregar columna category
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'category'
  ) THEN
    ALTER TABLE projects ADD COLUMN category TEXT DEFAULT 'Software';
    COMMENT ON COLUMN projects.category IS 'Categoría del proyecto: Software, Redes, Mantenimiento, etc.';
  END IF;
END $$;

-- Agregar columna media_type
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'media_type'
  ) THEN
    ALTER TABLE projects ADD COLUMN media_type TEXT DEFAULT 'image';
    COMMENT ON COLUMN projects.media_type IS 'Tipo de medio: image o video';
  END IF;
END $$;

-- Verificar que las columnas se crearon correctamente
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'projects' 
  AND column_name IN ('category', 'media_type')
ORDER BY column_name;
