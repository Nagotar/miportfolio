"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Home, 
  Briefcase, 
  Users, 
  Mail, 
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  Link,
  Copy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CloudinaryUploadWidget } from "@/components/cloudinary-upload-widget"

type Section = "hero" | "services" | "projects" | "clients" | "testimonials" | "about" | "contact"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>("hero")
  const [isEditing, setIsEditing] = useState(false)
  const [onSave, setOnSave] = useState<(() => Promise<void>) | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { authService } = await import("@/lib/supabase/auth")
        const isAuth = await authService.isAuthenticated()
        
        if (!isAuth) {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error)
        router.push("/admin/login")
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      const { authService } = await import("@/lib/supabase/auth")
      await authService.signOut()
      localStorage.removeItem("adminToken")
      document.cookie = "adminToken=; path=/; max-age=0"
      router.push("/admin/login")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
      localStorage.removeItem("adminToken")
      document.cookie = "adminToken=; path=/; max-age=0"
      router.push("/admin/login")
    }
  }

  const menuItems = [
    { id: "hero" as Section, label: "Sección Principal", icon: Home },
    { id: "services" as Section, label: "Servicios", icon: Briefcase },
    { id: "projects" as Section, label: "Proyectos", icon: Settings },
    { id: "clients" as Section, label: "Clientes", icon: Users },
    { id: "testimonials" as Section, label: "Testimonios", icon: Mail },
    { id: "about" as Section, label: "Acerca de", icon: Users },
    { id: "contact" as Section, label: "Contacto", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center text-white font-bold">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Panel de Administración</h1>
                <p className="text-sm text-muted-foreground">Nagotar Technologies</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 sticky top-24">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 px-2">
                SECCIONES
              </h2>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id)
                        setIsEditing(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      whileHover={{ x: isActive ? 0 : 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
                
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancelar
                    </Button>
                    <Button
                      onClick={async () => {
                        if (onSave) {
                          await onSave()
                          setIsEditing(false)
                        }
                      }}
                      className="gap-2 bg-gradient-to-r from-primary to-cyan-500"
                    >
                      <Save className="h-4 w-4" />
                      Guardar
                    </Button>
                  </div>
                )}
              </div>

              {/* Contenido según la sección */}
              {activeSection === "hero" && <HeroSection isEditing={isEditing} setOnSave={setOnSave} />}
              {activeSection === "services" && <ServicesSection isEditing={isEditing} setOnSave={setOnSave} />}
              {activeSection === "projects" && <ProjectsSection isEditing={isEditing} setOnSave={setOnSave} />}
              {activeSection === "clients" && <ClientsSection isEditing={isEditing} setOnSave={setOnSave} />}
              {activeSection === "testimonials" && <TestimonialsSection isEditing={isEditing} setOnSave={setOnSave} />}
              {activeSection === "about" && <AboutSection isEditing={isEditing} setOnSave={setOnSave} />}
              {activeSection === "contact" && <ContactSection isEditing={isEditing} setOnSave={setOnSave} />}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

// Componentes para cada sección
function HeroSection({ 
  isEditing, 
  setOnSave 
}: { 
  isEditing: boolean
  setOnSave: React.Dispatch<React.SetStateAction<(() => Promise<void>) | null>>
}) {
  const [data, setData] = useState({
    id: '',
    title: "Transformamos ideas en soluciones digitales",
    subtitle: "Soluciones informáticas integrales: desarrollo de software, redes, mantenimiento de hardware y software. Tu socio tecnológico de confianza.",
    stats: [
      { value: 50, label: "Proyectos" },
      { value: 30, label: "Clientes" },
      { value: 5, label: "Años" }
    ]
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Cargar datos desde Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const heroContent = await contentService.getHeroContent()
        
        if (heroContent) {
          setData({
            id: heroContent.id,
            title: heroContent.title,
            subtitle: heroContent.subtitle,
            stats: [
              { value: heroContent.stat_1_value, label: heroContent.stat_1_label },
              { value: heroContent.stat_2_value, label: heroContent.stat_2_label },
              { value: heroContent.stat_3_value, label: heroContent.stat_3_label }
            ]
          })
        }
      } catch (error) {
        console.error("Error cargando contenido Hero:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Función para guardar cambios
  const handleSave = async () => {
    setSaving(true)
    try {
      const { contentService } = await import("@/lib/supabase/content")
      
      await contentService.updateHeroContent({
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        stat_1_value: data.stats[0].value,
        stat_1_label: data.stats[0].label,
        stat_2_value: data.stats[1].value,
        stat_2_label: data.stats[1].label,
        stat_3_value: data.stats[2].value,
        stat_3_label: data.stats[2].label
      })
      
      alert("✅ Cambios guardados exitosamente")
    } catch (error) {
      console.error("Error guardando cambios:", error)
      alert("❌ Error al guardar cambios")
    } finally {
      setSaving(false)
    }
  }

  // Registrar la función handleSave con el componente padre
  useEffect(() => {
    setOnSave(() => handleSave)
    return () => setOnSave(null)
  }, [data, setOnSave])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Título Principal</h3>
          <p className="text-lg text-foreground">{data.title}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Subtítulo</h3>
          <p className="text-foreground">{data.subtitle}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Estadísticas</h3>
          <div className="grid grid-cols-3 gap-4">
            {data.stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-2xl font-bold text-primary">{stat.value}+</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="hero-title">Título Principal</Label>
        <Input
          id="hero-title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="hero-subtitle">Subtítulo</Label>
        <Textarea
          id="hero-subtitle"
          value={data.subtitle}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          className="mt-2"
          rows={3}
        />
      </div>
      <div>
        <Label>Estadísticas</Label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {data.stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <Input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...data.stats]
                  newStats[i].value = parseInt(e.target.value)
                  setData({ ...data, stats: newStats })
                }}
                placeholder="Valor"
              />
              <Input
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...data.stats]
                  newStats[i].label = e.target.value
                  setData({ ...data, stats: newStats })
                }}
                placeholder="Etiqueta"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServicesSection({ 
  isEditing,
  setOnSave
}: { 
  isEditing: boolean
  setOnSave: React.Dispatch<React.SetStateAction<(() => Promise<void>) | null>>
}) {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<any>(null)

  // Cargar servicios desde Supabase
  useEffect(() => {
    const loadServices = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getServices()
        setServices(data)
      } catch (error) {
        console.error("Error cargando servicios:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadServices()
  }, [])

  // Función para guardar cambios
  const handleSave = async () => {
    try {
      const { contentService } = await import("@/lib/supabase/content")
      
      // Actualizar servicios modificados
      for (const service of services) {
        if (service.id) {
          await contentService.updateService(service.id, service)
        }
      }
      
      alert("✅ Servicios guardados exitosamente")
    } catch (error) {
      console.error("Error guardando servicios:", error)
      alert("❌ Error al guardar servicios")
    }
  }

  // Registrar función de guardado
  useEffect(() => {
    setOnSave(() => handleSave)
    return () => setOnSave(null)
  }, [services, setOnSave])

  const handleAddService = () => {
    setServices([...services, {
      title: "Nuevo Servicio",
      description: "Descripción del servicio",
      icon: "Code2",
      features: [],
      gradient: "from-blue-600 to-cyan-500",
      order: services.length + 1
    }])
  }

  const handleDeleteService = async (index: number) => {
    const service = services[index]
    if (service.id && confirm("¿Eliminar este servicio?")) {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        await contentService.deleteService(service.id)
        setServices(services.filter((_, i) => i !== index))
        alert("✅ Servicio eliminado")
      } catch (error) {
        alert("❌ Error al eliminar servicio")
      }
    } else {
      setServices(services.filter((_, i) => i !== index))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        {services.map((service, i) => (
          <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-2">
            {service.image_url && (
              <div className="w-full h-48 rounded-lg overflow-hidden mb-3">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-semibold text-foreground">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Icono: {service.icon}</span>
              {service.gradient && (
                <span className="px-2 py-1 rounded bg-secondary">
                  {service.gradient}
                </span>
              )}
            </div>
            {service.features && service.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {service.features.map((feature: string, idx: number) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No hay servicios configurados</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {services.map((service, i) => (
        <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <Label>Servicio {i + 1}</Label>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteService(i)}
            >
              Eliminar
            </Button>
          </div>
          
          <div>
            <Label htmlFor={`service-title-${i}`}>Título</Label>
            <Input
              id={`service-title-${i}`}
              value={service.title}
              onChange={(e) => {
                const newServices = [...services]
                newServices[i].title = e.target.value
                setServices(newServices)
              }}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`service-desc-${i}`}>Descripción</Label>
            <Textarea
              id={`service-desc-${i}`}
              value={service.description}
              onChange={(e) => {
                const newServices = [...services]
                newServices[i].description = e.target.value
                setServices(newServices)
              }}
              className="mt-1"
              rows={2}
            />
          </div>
          
          <div>
            <Label>Imagen del Servicio</Label>
            <div className="mt-2 space-y-3">
              <CloudinaryUploadWidget
                onUploadSuccess={(url) => {
                  const newServices = [...services]
                  newServices[i].image_url = url
                  setServices(newServices)
                }}
                folder="nagotar-services"
                buttonText={service.image_url ? "Cambiar Imagen" : "Subir Imagen"}
              />
              {service.image_url && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      const newServices = [...services]
                      newServices[i].image_url = null
                      setServices(newServices)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Sube una imagen representativa del servicio (máx. 2MB)
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor={`service-icon-${i}`}>Icono (Lucide)</Label>
            <Input
              id={`service-icon-${i}`}
              value={service.icon}
              onChange={(e) => {
                const newServices = [...services]
                newServices[i].icon = e.target.value
                setServices(newServices)
              }}
              className="mt-1"
              placeholder="Code2, Network, Wrench, etc."
            />
          </div>
          
          <div>
            <Label htmlFor={`service-features-${i}`}>Características (separadas por coma)</Label>
            <Textarea
              id={`service-features-${i}`}
              value={
                Array.isArray(service.features) 
                  ? service.features.join(", ") 
                  : service.features || ""
              }
              onChange={(e) => {
                const newServices = [...services]
                const value = e.target.value
                // Separar por comas y limpiar espacios
                const featuresArray = value
                  .split(",")
                  .map((f: string) => f.trim())
                  .filter((f: string) => f.length > 0)
                newServices[i].features = featuresArray
                setServices(newServices)
              }}
              className="mt-1"
              rows={3}
              placeholder="Aplicaciones Web, Apps Móviles, Software Empresarial"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Separa cada característica con una coma. Ejemplo: Item 1, Item 2, Item 3
            </p>
            {service.features && Array.isArray(service.features) && service.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {service.features.map((feature: string, idx: number) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor={`service-gradient-${i}`}>Gradiente (Tailwind)</Label>
            <Input
              id={`service-gradient-${i}`}
              value={service.gradient || "from-blue-600 to-cyan-500"}
              onChange={(e) => {
                const newServices = [...services]
                newServices[i].gradient = e.target.value
                setServices(newServices)
              }}
              className="mt-1"
              placeholder="from-blue-600 to-cyan-500"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ejemplo: from-blue-600 to-cyan-500, from-cyan-500 to-blue-600
            </p>
          </div>
        </div>
      ))}
      
      <Button
        onClick={handleAddService}
        variant="outline"
        className="w-full"
      >
        + Agregar Servicio
      </Button>
    </div>
  )
}

function ProjectsSection({ 
  isEditing,
  setOnSave
}: { 
  isEditing: boolean
  setOnSave: React.Dispatch<React.SetStateAction<(() => Promise<void>) | null>>
}) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Error cargando proyectos:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProjects()
  }, [])

  const handleSave = async () => {
    try {
      const { contentService } = await import("@/lib/supabase/content")
      
      for (const project of projects) {
        if (project.id) {
          // Actualizar proyecto existente - excluir campos que no están en Supabase
          const { icon, gradient, ...projectData } = project
          await contentService.updateProject(project.id, projectData)
        } else {
          // Crear proyecto nuevo - excluir id, created_at, icon y gradient
          const { id, created_at, icon, gradient, ...projectData } = project
          await contentService.createProject({
            ...projectData,
            image_url: projectData.image_url || "",
            media_type: projectData.media_type || "image"
          })
        }
      }
      
      alert("✅ Proyectos guardados exitosamente")
    } catch (error) {
      console.error("Error guardando proyectos:", error)
      alert("❌ Error al guardar proyectos")
    }
  }

  useEffect(() => {
    setOnSave(() => handleSave)
    return () => setOnSave(null)
  }, [projects, setOnSave])

  const handleAddProject = () => {
    setProjects([...projects, {
      title: "Nuevo Proyecto",
      description: "Descripción del proyecto",
      category: "Software",
      image_url: "",
      media_type: "image",
      technologies: [],
      icon: "Code2",
      gradient: "from-blue-600 to-cyan-500",
      link: "",
      order: projects.length + 1
    }])
  }

  const handleDeleteProject = async (index: number) => {
    const project = projects[index]
    if (project.id && confirm("¿Eliminar este proyecto?")) {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        await contentService.deleteProject(project.id)
        setProjects(projects.filter((_, i) => i !== index))
        alert("✅ Proyecto eliminado")
      } catch (error) {
        alert("❌ Error al eliminar proyecto")
      }
    } else {
      setProjects(projects.filter((_, i) => i !== index))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        {projects.map((project, i) => (
          <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              {project.category && (
                <span className="text-xs px-2 py-1 rounded bg-secondary text-foreground">
                  {project.category}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Icono: {project.icon || "Code2"}</span>
              {project.gradient && (
                <span className="px-2 py-1 rounded bg-secondary">
                  {project.gradient}
                </span>
              )}
            </div>
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech: string, idx: number) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No hay proyectos configurados</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {projects.map((project, i) => (
        <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <Label>Proyecto {i + 1}</Label>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteProject(i)}
            >
              Eliminar
            </Button>
          </div>
          
          <div>
            <Label htmlFor={`project-title-${i}`}>Título</Label>
            <Input
              id={`project-title-${i}`}
              value={project.title}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[i].title = e.target.value
                setProjects(newProjects)
              }}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`project-desc-${i}`}>Descripción</Label>
            <Textarea
              id={`project-desc-${i}`}
              value={project.description}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[i].description = e.target.value
                setProjects(newProjects)
              }}
              className="mt-1"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor={`project-category-${i}`}>Categoría</Label>
            <Select
              value={project.category || "Software"}
              onValueChange={(value) => {
                const newProjects = [...projects]
                newProjects[i].category = value
                setProjects(newProjects)
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Redes">Redes</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Imagen de Portada */}
          <div>
            <Label>Imagen de Portada (Thumbnail)</Label>
            <div className="mt-2 space-y-3">
              {project.thumbnail_url && (
                <div className="relative w-full max-w-md rounded-lg border border-border overflow-hidden bg-card">
                  <img 
                    src={project.thumbnail_url} 
                    alt={`${project.title} - Portada`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <CloudinaryUploadWidget
                  onUploadSuccess={(url) => {
                    const newProjects = [...projects]
                    newProjects[i].thumbnail_url = url
                    setProjects(newProjects)
                  }}
                  buttonText={project.thumbnail_url ? "Cambiar Imagen" : "Subir Imagen"}
                  folder="nagotar-projects/thumbnails"
                  allowVideo={false}
                />
                {project.thumbnail_url && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newProjects = [...projects]
                      newProjects[i].thumbnail_url = ""
                      setProjects(newProjects)
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    Eliminar
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                🖼️ Imagen que se muestra en la landing page • Máx: 2MB
              </p>
            </div>
          </div>

          {/* Video del Proyecto */}
          <div>
            <Label>Video del Proyecto (Opcional)</Label>
            <div className="mt-2 space-y-3">
              {project.image_url && project.media_type === 'video' && (
                <div className="relative w-full max-w-md rounded-lg border border-border overflow-hidden bg-card">
                  <video 
                    src={project.image_url} 
                    controls
                    className="w-full h-auto"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <CloudinaryUploadWidget
                  onUploadSuccess={(url, mediaType) => {
                    const newProjects = [...projects]
                    newProjects[i].image_url = url
                    newProjects[i].media_type = 'video'
                    setProjects(newProjects)
                  }}
                  buttonText={project.image_url && project.media_type === 'video' ? "Cambiar Video" : "Subir Video"}
                  folder="nagotar-projects/videos"
                  allowVideo={true}
                />
                {project.image_url && project.media_type === 'video' && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newProjects = [...projects]
                      newProjects[i].image_url = ""
                      newProjects[i].media_type = "image"
                      setProjects(newProjects)
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    Eliminar
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                🎬 Video que se muestra en el modal • Sin límite de tamaño • Cloudinary optimiza automáticamente
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor={`project-tech-${i}`}>Tecnologías</Label>
            <div className="mt-2 space-y-2">
              {/* Tags actuales */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-border bg-muted/30">
                  {project.technologies.map((tech: string, techIdx: number) => (
                    <span
                      key={techIdx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => {
                          const newProjects = [...projects]
                          newProjects[i].technologies = newProjects[i].technologies.filter((_: string, idx: number) => idx !== techIdx)
                          setProjects(newProjects)
                        }}
                        className="ml-1 hover:text-destructive transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {/* Input para agregar */}
              <Input
                id={`project-tech-${i}`}
                placeholder="Escribe una tecnología y presiona Enter o coma"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault()
                    const input = e.currentTarget
                    const value = input.value.trim()
                    if (value) {
                      const newProjects = [...projects]
                      if (!newProjects[i].technologies) {
                        newProjects[i].technologies = []
                      }
                      if (!newProjects[i].technologies.includes(value)) {
                        newProjects[i].technologies = [...newProjects[i].technologies, value]
                        setProjects(newProjects)
                      }
                      input.value = ''
                    }
                  }
                }}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground">
                Presiona <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs">Enter</kbd> o <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-xs">,</kbd> para agregar
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor={`project-icon-${i}`}>Icono (Lucide)</Label>
            <Input
              id={`project-icon-${i}`}
              value={project.icon || "Code2"}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[i].icon = e.target.value
                setProjects(newProjects)
              }}
              className="mt-1"
              placeholder="Code2, Network, Globe, etc."
            />
          </div>
          
          <div>
            <Label htmlFor={`project-gradient-${i}`}>Gradiente (Tailwind)</Label>
            <Input
              id={`project-gradient-${i}`}
              value={project.gradient || "from-blue-600 to-cyan-500"}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[i].gradient = e.target.value
                setProjects(newProjects)
              }}
              className="mt-1"
              placeholder="from-blue-600 to-cyan-500"
            />
          </div>
          
          <div>
            <Label htmlFor={`project-link-${i}`}>Link (opcional)</Label>
            <Input
              id={`project-link-${i}`}
              value={project.link || ""}
              onChange={(e) => {
                const newProjects = [...projects]
                newProjects[i].link = e.target.value
                setProjects(newProjects)
              }}
              className="mt-1"
              placeholder="https://ejemplo.com"
            />
          </div>
        </div>
      ))}
      
      <Button
        onClick={handleAddProject}
        variant="outline"
        className="w-full"
      >
        + Agregar Proyecto
      </Button>
    </div>
  )
}

function AboutSection({ 
  isEditing,
  setOnSave
}: { 
  isEditing: boolean
  setOnSave: React.Dispatch<React.SetStateAction<(() => Promise<void>) | null>>
}) {
  const [data, setData] = useState({
    id: '',
    founder_name: "Pablo Thomas Landeros Mena",
    founder_title: "Fundador & Desarrollador de Software",
    founder_description: "Apasionado por la tecnología",
    company_description: "Nagotar Technologies es una empresa dedicada a proporcionar soluciones tecnológicas integrales."
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const aboutContent = await contentService.getAboutContent()
        
        if (aboutContent) {
          setData(aboutContent)
        }
      } catch (error) {
        console.error("Error cargando contenido About:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const handleSave = async () => {
    try {
      const { contentService } = await import("@/lib/supabase/content")
      await contentService.updateAboutContent(data)
      alert("✅ Información guardada exitosamente")
    } catch (error) {
      console.error("Error guardando información:", error)
      alert("❌ Error al guardar información")
    }
  }

  useEffect(() => {
    setOnSave(() => handleSave)
    return () => setOnSave(null)
  }, [data, setOnSave])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Fundador</h3>
          <p className="text-lg font-semibold text-foreground">{data.founder_name}</p>
          <p className="text-sm text-muted-foreground">{data.founder_title}</p>
          <p className="text-sm text-muted-foreground mt-2">{data.founder_description}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Descripción de la Empresa</h3>
          <p className="text-foreground">{data.company_description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="founder-name">Nombre del Fundador</Label>
        <Input
          id="founder-name"
          value={data.founder_name}
          onChange={(e) => setData({ ...data, founder_name: e.target.value })}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="founder-title">Título del Fundador</Label>
        <Input
          id="founder-title"
          value={data.founder_title}
          onChange={(e) => setData({ ...data, founder_title: e.target.value })}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="founder-desc">Descripción del Fundador</Label>
        <Textarea
          id="founder-desc"
          value={data.founder_description}
          onChange={(e) => setData({ ...data, founder_description: e.target.value })}
          className="mt-2"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="company-desc">Descripción de la Empresa</Label>
        <Textarea
          id="company-desc"
          value={data.company_description}
          onChange={(e) => setData({ ...data, company_description: e.target.value })}
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  )
}

function ContactSection({ 
  isEditing,
  setOnSave
}: { 
  isEditing: boolean
  setOnSave: React.Dispatch<React.SetStateAction<(() => Promise<void>) | null>>
}) {
  const [data, setData] = useState({
    id: '',
    email: "contacto@nagotar.com",
    phone: "+56 9 1234 5678",
    address: "Santiago, Chile"
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const contactInfo = await contentService.getContactInfo()
        
        if (contactInfo) {
          setData(contactInfo)
        }
      } catch (error) {
        console.error("Error cargando información de contacto:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const handleSave = async () => {
    try {
      const { contentService } = await import("@/lib/supabase/content")
      await contentService.updateContactInfo(data)
      alert("✅ Información de contacto guardada exitosamente")
    } catch (error) {
      console.error("Error guardando información de contacto:", error)
      alert("❌ Error al guardar información de contacto")
    }
  }

  useEffect(() => {
    setOnSave(() => handleSave)
    return () => setOnSave(null)
  }, [data, setOnSave])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Email</h3>
          <p className="text-foreground">{data.email}</p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Teléfono</h3>
          <p className="text-foreground">{data.phone}</p>
        </div>
        <div className="p-4 rounded-lg bg-card border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Dirección</h3>
          <p className="text-foreground">{data.address}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="contact-email">Email de Contacto</Label>
        <Input
          id="contact-email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="mt-2"
          placeholder="contacto@empresa.com"
        />
      </div>
      
      <div>
        <Label htmlFor="contact-phone">Teléfono</Label>
        <Input
          id="contact-phone"
          type="tel"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          className="mt-2"
          placeholder="+56 9 1234 5678"
        />
      </div>
      
      <div>
        <Label htmlFor="contact-address">Dirección</Label>
        <Input
          id="contact-address"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          className="mt-2"
          placeholder="Ciudad, País"
        />
      </div>
    </div>
  )
}

function ClientsSection({ 
  isEditing,
  setOnSave
}: { 
  isEditing: boolean
  setOnSave: React.Dispatch<React.SetStateAction<(() => Promise<void>) | null>>
}) {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadClients = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getClients()
        setClients(data)
      } catch (error) {
        console.error("Error cargando clientes:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadClients()
  }, [])

  const handleSave = async () => {
    try {
      const { contentService } = await import("@/lib/supabase/content")
      
      for (const client of clients) {
        if (client.id) {
          await contentService.updateClient(client.id, client)
        } else {
          const { id, created_at, ...clientData } = client
          await contentService.createClient(clientData)
        }
      }
      
      alert("✅ Clientes guardados exitosamente")
    } catch (error) {
      console.error("Error guardando clientes:", error)
      alert("❌ Error al guardar clientes")
    }
  }

  useEffect(() => {
    setOnSave(() => handleSave)
    return () => setOnSave(null)
  }, [clients, setOnSave])

  const handleAddClient = () => {
    setClients([...clients, {
      name: "Nueva Empresa",
      industry: "Tecnología",
      icon: "Building",
      logo_url: "",
      order: clients.length + 1
    }])
  }

  const handleDeleteClient = async (index: number) => {
    const client = clients[index]
    if (client.id && confirm("¿Eliminar este cliente?")) {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        await contentService.deleteClient(client.id)
        setClients(clients.filter((_, i) => i !== index))
        alert("✅ Cliente eliminado")
      } catch (error) {
        alert("❌ Error al eliminar cliente")
      }
    } else {
      setClients(clients.filter((_, i) => i !== index))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        {clients.map((client, i) => (
          <div key={i} className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground">{client.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{client.industry}</p>
            <p className="text-xs text-muted-foreground mt-2">Icono: {client.icon}</p>
          </div>
        ))}
        {clients.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No hay clientes configurados</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {clients.map((client, i) => (
        <div key={i} className="p-6 rounded-lg bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Cliente {i + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteClient(i)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <Label htmlFor={`client-name-${i}`}>Nombre de la Empresa</Label>
            <Input
              id={`client-name-${i}`}
              value={client.name}
              onChange={(e) => {
                const newClients = [...clients]
                newClients[i].name = e.target.value
                setClients(newClients)
              }}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`client-industry-${i}`}>Industria</Label>
            <Input
              id={`client-industry-${i}`}
              value={client.industry}
              onChange={(e) => {
                const newClients = [...clients]
                newClients[i].industry = e.target.value
                setClients(newClients)
              }}
              className="mt-1"
              placeholder="Tecnología, Salud, Educación, etc."
            />
          </div>
          
          <div>
            <Label htmlFor={`client-icon-${i}`}>Icono (Lucide)</Label>
            <Input
              id={`client-icon-${i}`}
              value={client.icon}
              onChange={(e) => {
                const newClients = [...clients]
                newClients[i].icon = e.target.value
                setClients(newClients)
              }}
              className="mt-1"
              placeholder="Building, Heart, GraduationCap, etc."
            />
          </div>
          
          <div>
            <Label>Logo de la Empresa</Label>
            <div className="mt-2 space-y-3">
              {client.logo_url && (
                <div className="relative w-32 h-32 rounded-lg border border-border overflow-hidden bg-card">
                  <img 
                    src={client.logo_url} 
                    alt={client.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              )}
              <CloudinaryUploadWidget
                onUploadSuccess={(url) => {
                  const newClients = [...clients]
                  newClients[i].logo_url = url
                  setClients(newClients)
                }}
                buttonText={client.logo_url ? "Cambiar Logo" : "Subir Logo"}
                folder="nagotar-clients"
              />
              {client.logo_url && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newClients = [...clients]
                    newClients[i].logo_url = ""
                    setClients(newClients)
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  Eliminar Logo
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <Button
        onClick={handleAddClient}
        variant="outline"
        className="w-full"
      >
        + Agregar Cliente
      </Button>
    </div>
  )
}

function TestimonialsSection({ 
  isEditing,
  setOnSave
}: { 
  isEditing: boolean
  setOnSave: React.Dispatch<React.SetStateAction<(() => Promise<void>) | null>>
}) {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getTestimonials()
        setTestimonials(data)
      } catch (error) {
        console.error("Error cargando testimonios:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadTestimonials()
  }, [])

  const handleSave = async () => {
    try {
      const { contentService } = await import("@/lib/supabase/content")
      
      for (const testimonial of testimonials) {
        if (testimonial.id) {
          await contentService.updateTestimonial(testimonial.id, testimonial)
        } else {
          const { id, created_at, ...testimonialData } = testimonial
          await contentService.createTestimonial(testimonialData)
        }
      }
      
      alert("✅ Testimonios guardados exitosamente")
    } catch (error) {
      console.error("Error guardando testimonios:", error)
      alert("❌ Error al guardar testimonios")
    }
  }

  useEffect(() => {
    setOnSave(() => handleSave)
    return () => setOnSave(null)
  }, [testimonials, setOnSave])

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, {
      quote: "Testimonio del cliente sobre nuestros servicios...",
      author: "Nombre del Cliente",
      role: "Cargo",
      company: "Empresa",
      rating: 5,
      order: testimonials.length + 1
    }])
  }

  const handleDeleteTestimonial = async (index: number) => {
    const testimonial = testimonials[index]
    if (testimonial.id && confirm("¿Eliminar este testimonio?")) {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        await contentService.deleteTestimonial(testimonial.id)
        setTestimonials(testimonials.filter((_, i) => i !== index))
        alert("✅ Testimonio eliminado")
      } catch (error) {
        alert("❌ Error al eliminar testimonio")
      }
    } else {
      setTestimonials(testimonials.filter((_, i) => i !== index))
    }
  }

  const handleCopyLink = async () => {
    const link = `${window.location.origin}/testimonios/nuevo`
    try {
      await navigator.clipboard.writeText(link)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 3000)
    } catch (error) {
      alert("Error al copiar el link")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        {/* Sistema de Invitaciones Protegidas */}
        <div className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-cyan-500/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Link className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Invitaciones Protegidas</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Genera links únicos y seguros para que tus clientes dejen testimonios. Cada link es de un solo uso y puede tener fecha de expiración.
          </p>
          <Button
            onClick={() => window.location.href = '/admin/testimonios/invitaciones'}
            className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg"
          >
            <Link className="h-4 w-4 mr-2" />
            Gestionar Invitaciones
          </Button>
        </div>

        {/* Lista de testimonios */}
        {testimonials.map((testimonial, i) => (
          <div key={i} className="p-4 rounded-lg bg-card border border-border space-y-2">
            <p className="text-sm text-foreground italic">"{testimonial.quote}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role} - {testimonial.company}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <span key={idx} className="text-yellow-500">★</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No hay testimonios configurados</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {testimonials.map((testimonial, i) => (
        <div key={i} className="p-6 rounded-lg bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Testimonio {i + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteTestimonial(i)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <Label htmlFor={`testimonial-quote-${i}`}>Testimonio</Label>
            <Textarea
              id={`testimonial-quote-${i}`}
              value={testimonial.quote}
              onChange={(e) => {
                const newTestimonials = [...testimonials]
                newTestimonials[i].quote = e.target.value
                setTestimonials(newTestimonials)
              }}
              className="mt-1"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`testimonial-author-${i}`}>Autor</Label>
              <Input
                id={`testimonial-author-${i}`}
                value={testimonial.author}
                onChange={(e) => {
                  const newTestimonials = [...testimonials]
                  newTestimonials[i].author = e.target.value
                  setTestimonials(newTestimonials)
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`testimonial-role-${i}`}>Cargo</Label>
              <Input
                id={`testimonial-role-${i}`}
                value={testimonial.role}
                onChange={(e) => {
                  const newTestimonials = [...testimonials]
                  newTestimonials[i].role = e.target.value
                  setTestimonials(newTestimonials)
                }}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`testimonial-company-${i}`}>Empresa</Label>
              <Input
                id={`testimonial-company-${i}`}
                value={testimonial.company}
                onChange={(e) => {
                  const newTestimonials = [...testimonials]
                  newTestimonials[i].company = e.target.value
                  setTestimonials(newTestimonials)
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`testimonial-rating-${i}`}>Rating (1-5)</Label>
              <Input
                id={`testimonial-rating-${i}`}
                type="number"
                min="1"
                max="5"
                value={testimonial.rating}
                onChange={(e) => {
                  const newTestimonials = [...testimonials]
                  newTestimonials[i].rating = parseInt(e.target.value)
                  setTestimonials(newTestimonials)
                }}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button
        onClick={handleAddTestimonial}
        variant="outline"
        className="w-full"
      >
        + Agregar Testimonio
      </Button>
    </div>
  )
}
