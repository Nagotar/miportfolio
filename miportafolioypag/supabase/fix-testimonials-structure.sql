-- Script para ajustar la estructura de la tabla testimonials
-- Ejecutar en Supabase SQL Editor

-- Verificar estructura actual
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'testimonials'
ORDER BY ordinal_position;

-- Agregar columnas faltantes si no existen
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS content TEXT;

ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS name TEXT;

ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS position TEXT;

ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS company TEXT;

ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Si la tabla tiene columnas antiguas (quote, author, role), copiar datos
-- Solo ejecutar si existen las columnas antiguas
DO $$
BEGIN
    -- Copiar quote a content si existe
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'quote') THEN
        UPDATE testimonials SET content = quote WHERE content IS NULL;
    END IF;
    
    -- Copiar author a name si existe
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'author') THEN
        UPDATE testimonials SET name = author WHERE name IS NULL;
    END IF;
    
    -- Copiar role a position si existe
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'role') THEN
        UPDATE testimonials SET position = role WHERE position IS NULL;
    END IF;
END $$;

-- Comentarios para documentar
COMMENT ON COLUMN testimonials.content IS 'Contenido del testimonio';
COMMENT ON COLUMN testimonials.name IS 'Nombre completo del cliente';
COMMENT ON COLUMN testimonials.position IS 'Cargo del cliente';
COMMENT ON COLUMN testimonials.company IS 'Empresa del cliente';
COMMENT ON COLUMN testimonials.image_url IS 'URL de la imagen del cliente (opcional)';

-- Verificar estructura final
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'testimonials'
ORDER BY ordinal_position;
