-- Script para crear SOLO las tablas clients y testimonials
-- Este script NO afecta las tablas existentes

-- Crear tabla para clientes (solo si no existe)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Building',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para testimonios (solo si no existe)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar clientes iniciales
INSERT INTO clients (name, industry, icon, "order")
VALUES 
  ('TechCorp Solutions', 'Tecnología', 'Building', 1),
  ('MediSalud Clínica', 'Salud', 'Heart', 2),
  ('EduPlus Academy', 'Educación', 'GraduationCap', 3),
  ('RetailMax', 'Comercio', 'Store', 4),
  ('IndustriaPro', 'Manufactura', 'Factory', 5),
  ('ConsultGroup', 'Consultoría', 'Briefcase', 6)
ON CONFLICT DO NOTHING;

-- Insertar testimonios iniciales
INSERT INTO testimonials (quote, author, role, company, rating, "order")
VALUES 
  ('Nagotar Technologies transformó completamente nuestra operación con un sistema a medida. Su profesionalismo y compromiso superaron nuestras expectativas.', 'Carlos Mendoza', 'Director General', 'TechCorp Solutions', 5, 1),
  ('La aplicación móvil que desarrollaron para nosotros ha revolucionado la forma en que interactuamos con nuestros pacientes. El equipo de Pablo es excepcional.', 'Dra. María García', 'Directora Médica', 'MediSalud Clínica', 5, 2)
ON CONFLICT DO NOTHING;

-- Habilitar Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir lectura pública
DROP POLICY IF EXISTS "Allow public read access on clients" ON clients;
CREATE POLICY "Allow public read access on clients" ON clients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on testimonials" ON testimonials;
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);

-- Políticas para permitir escritura solo a usuarios autenticados
DROP POLICY IF EXISTS "Allow authenticated users to insert clients" ON clients;
CREATE POLICY "Allow authenticated users to insert clients" ON clients FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update clients" ON clients;
CREATE POLICY "Allow authenticated users to update clients" ON clients FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to delete clients" ON clients;
CREATE POLICY "Allow authenticated users to delete clients" ON clients FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to insert testimonials" ON testimonials;
CREATE POLICY "Allow authenticated users to insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to update testimonials" ON testimonials;
CREATE POLICY "Allow authenticated users to update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated users to delete testimonials" ON testimonials;
CREATE POLICY "Allow authenticated users to delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');
