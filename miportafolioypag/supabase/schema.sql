-- Crear tabla para contenido de la sección Hero
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  stat_1_value INTEGER NOT NULL DEFAULT 50,
  stat_1_label TEXT NOT NULL DEFAULT 'Proyectos',
  stat_2_value INTEGER NOT NULL DEFAULT 30,
  stat_2_label TEXT NOT NULL DEFAULT 'Clientes',
  stat_3_value INTEGER NOT NULL DEFAULT 5,
  stat_3_label TEXT NOT NULL DEFAULT 'Años',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para servicios
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  gradient TEXT DEFAULT 'from-blue-600 to-cyan-500',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para proyectos
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Software',
  image_url TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  icon TEXT DEFAULT 'Code2',
  gradient TEXT DEFAULT 'from-blue-600 to-cyan-500',
  link TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para contenido de About
CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_name TEXT NOT NULL,
  founder_title TEXT NOT NULL,
  founder_description TEXT NOT NULL,
  company_description TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para información de contacto
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para clientes
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Building',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla para testimonios
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

-- Insertar datos iniciales para hero_content
INSERT INTO hero_content (title, subtitle, stat_1_value, stat_1_label, stat_2_value, stat_2_label, stat_3_value, stat_3_label)
VALUES (
  'Transformamos ideas en soluciones digitales',
  'Soluciones informáticas integrales: desarrollo de software, redes, mantenimiento de hardware y software. Tu socio tecnológico de confianza.',
  50,
  'Proyectos',
  30,
  'Clientes',
  5,
  'Años'
) ON CONFLICT DO NOTHING;

-- Insertar servicios iniciales
INSERT INTO services (title, description, icon, features, gradient, "order")
VALUES 
  ('Desarrollo de Software', 'Creamos aplicaciones web, móviles y de escritorio personalizadas que se adaptan perfectamente a las necesidades de tu negocio.', 'Code2', ARRAY['Aplicaciones Web', 'Apps Móviles', 'Software Empresarial', 'APIs y Backend'], 'from-blue-600 to-cyan-500', 1),
  ('Redes e Infraestructura', 'Diseñamos, implementamos y administramos infraestructuras de red seguras y eficientes para tu empresa.', 'Network', ARRAY['Diseño de Redes', 'Cableado Estructurado', 'Configuración de Routers', 'VPN y Seguridad'], 'from-cyan-500 to-blue-600', 2),
  ('Mantenimiento de Hardware', 'Servicio técnico especializado para equipos informáticos, desde diagnóstico hasta reparación y actualización.', 'Wrench', ARRAY['Reparación de PCs', 'Actualización de Equipos', 'Diagnóstico Técnico', 'Limpieza y Optimización'], 'from-blue-500 to-cyan-400', 3),
  ('Mantenimiento de Software', 'Mantenemos tus sistemas operativos y aplicaciones funcionando de manera óptima con actualizaciones y soporte continuo.', 'Settings', ARRAY['Instalación de SO', 'Actualizaciones', 'Eliminación de Virus', 'Optimización'], 'from-cyan-400 to-blue-500', 4),
  ('Servidores y Cloud', 'Configuración y administración de servidores locales y en la nube para tu infraestructura empresarial.', 'Server', ARRAY['Servidores Windows/Linux', 'Cloud Computing', 'Backup y Recuperación', 'Virtualización'], 'from-blue-600 to-cyan-400', 5),
  ('Seguridad Informática', 'Protegemos tu información y sistemas con soluciones de seguridad avanzadas y monitoreo constante.', 'Shield', ARRAY['Antivirus Empresarial', 'Firewall', 'Auditoría de Seguridad', 'Protección de Datos'], 'from-cyan-500 to-blue-500', 6)
ON CONFLICT DO NOTHING;

-- Insertar contenido inicial de About
INSERT INTO about_content (founder_name, founder_title, founder_description, company_description)
VALUES (
  'Pablo Thomas Landeros Mena',
  'Fundador & Desarrollador de Software',
  'Apasionado por la tecnología con amplia experiencia en desarrollo de software, redes e infraestructura TI. Lidero Nagotar Technologies con la visión de ofrecer soluciones informáticas completas y de calidad a cada cliente.',
  'Nagotar Technologies es una empresa dedicada a proporcionar soluciones tecnológicas integrales para empresas y emprendedores.'
) ON CONFLICT DO NOTHING;

-- Insertar información de contacto inicial
INSERT INTO contact_info (email, phone, address)
VALUES (
  'contacto@nagotar.com',
  '+56 9 1234 5678',
  'Santiago, Chile'
) ON CONFLICT DO NOTHING;

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
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir lectura pública
CREATE POLICY "Allow public read access on hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access on clients" ON clients FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);

-- Políticas para permitir escritura solo a usuarios autenticados
CREATE POLICY "Allow authenticated users to update hero_content" ON hero_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert services" ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update services" ON services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete services" ON services FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update about_content" ON about_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update contact_info" ON contact_info FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert clients" ON clients FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update clients" ON clients FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete clients" ON clients FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Crear usuario administrador
-- Nota: Ejecuta esto en el SQL Editor de Supabase después de crear las tablas
-- Cambia el email y password por los que desees

DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Insertar usuario en auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@nagotar.com', -- Cambia este email
    crypt('admin123', gen_salt('bf')), -- Cambia esta contraseña
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO user_id;

  -- Insertar identidad en auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    user_id,
    format('{"sub":"%s","email":"admin@nagotar.com"}', user_id)::jsonb,
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  RAISE NOTICE 'Usuario administrador creado exitosamente: admin@nagotar.com';
END $$;
