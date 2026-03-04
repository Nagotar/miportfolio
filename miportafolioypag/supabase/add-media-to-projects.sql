-- Script para agregar campos de medios a la tabla projects
-- Este script NO afecta los datos existentes

-- Verificar si la columna image_url ya existe, si no, agregarla
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN image_url TEXT;
  END IF;
END $$;

-- Agregar columna para tipo de medio (image o video)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'media_type'
  ) THEN
    ALTER TABLE projects ADD COLUMN media_type TEXT DEFAULT 'image';
  END IF;
END $$;

-- Agregar comentarios a las columnas
COMMENT ON COLUMN projects.image_url IS 'URL de la imagen o video del proyecto almacenado en Cloudinary';
COMMENT ON COLUMN projects.media_type IS 'Tipo de medio: image o video';
