-- Script para crear tabla de invitaciones de testimonios
-- Ejecutar en Supabase SQL Editor

-- Crear tabla de invitaciones
CREATE TABLE IF NOT EXISTS testimonial_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  used_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  max_uses INTEGER DEFAULT 1,
  use_count INTEGER DEFAULT 0
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_testimonial_invitations_token ON testimonial_invitations(token);
CREATE INDEX IF NOT EXISTS idx_testimonial_invitations_active ON testimonial_invitations(is_active);

-- Comentarios
COMMENT ON TABLE testimonial_invitations IS 'Tokens únicos para invitaciones de testimonios';
COMMENT ON COLUMN testimonial_invitations.token IS 'Token único para el link compartible';
COMMENT ON COLUMN testimonial_invitations.client_name IS 'Nombre del cliente invitado';
COMMENT ON COLUMN testimonial_invitations.client_email IS 'Email del cliente (opcional)';
COMMENT ON COLUMN testimonial_invitations.expires_at IS 'Fecha de expiración del token (opcional)';
COMMENT ON COLUMN testimonial_invitations.used_at IS 'Fecha en que se usó el token';
COMMENT ON COLUMN testimonial_invitations.is_active IS 'Si el token está activo';
COMMENT ON COLUMN testimonial_invitations.max_uses IS 'Número máximo de usos permitidos';
COMMENT ON COLUMN testimonial_invitations.use_count IS 'Número de veces que se ha usado';

-- Verificar la estructura
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'testimonial_invitations'
ORDER BY ordinal_position;
