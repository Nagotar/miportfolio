-- Agregar campo thumbnail_url para imagen de portada de proyectos
-- Esto permite tener una imagen de portada separada del video

-- Agregar columna thumbnail_url
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'thumbnail_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN thumbnail_url TEXT;
    COMMENT ON COLUMN projects.thumbnail_url IS 'URL de la imagen de portada del proyecto (thumbnail)';
  END IF;
END $$;

-- Verificar que se creó correctamente
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'projects' 
  AND column_name = 'thumbnail_url';
