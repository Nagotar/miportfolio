-- Script para agregar campo logo_url a la tabla clients
-- Este script NO afecta los datos existentes

-- Agregar columna logo_url a la tabla clients
ALTER TABLE clients 
ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Actualizar comentario de la columna
COMMENT ON COLUMN clients.logo_url IS 'URL del logo de la empresa almacenado en Cloudinary';
