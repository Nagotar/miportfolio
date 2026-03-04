"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Smartphone, Globe, Database, ShoppingCart, Building2, Calendar, ArrowUpRight, Network, Wrench, Server, Shield, Code2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mapeo de nombres de iconos a componentes
const iconMap: Record<string, any> = {
  Building2,
  Network,
  Globe,
  Wrench,
  Server,
  Smartphone,
  Shield,
  Database,
  Code2,
  ShoppingCart,
  Calendar
}

const categories = ["Todos", "Software", "Redes", "Mantenimiento"]

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getProjects()
        setProjects(data.map(project => ({
          ...project,
          icon: iconMap[project.icon] || Code2,
          technologies: project.technologies || []
        })))
      } catch (error) {
        console.error("Error cargando proyectos:", error)
      }
    }
    
    loadProjects()
  }, [])

  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter((p: any) => p.category === activeCategory)

  return (
    <section id="proyectos" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Nuestro Trabajo
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Proyectos{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Destacados
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora algunas de las aplicaciones y soluciones que hemos desarrollado para nuestros clientes.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="mt-12 flex justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex p-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category 
                    ? "text-white" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <motion.div
                  className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden"
                  whileHover={{ y: -10, borderColor: "rgba(59,130,246,0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Header - Imagen de Portada */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    {project.thumbnail_url ? (
                      <>
                        <motion.img
                          src={project.thumbnail_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        {/* Overlay gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                        {/* Indicador de video */}
                        {project.media_type === 'video' && project.image_url && (
                          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                            Video
                          </div>
                        )}
                      </>
                    ) : (
                      // Fallback al diseño original con icono
                      <div className={`relative h-full bg-gradient-to-br ${project.gradient} p-6 flex items-center justify-center`}>
                        <motion.div
                          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
                          animate={hoveredProject === project.id ? { scale: [1, 1.5] } : { scale: 1 }}
                          transition={{ duration: 1, repeat: hoveredProject === project.id ? Infinity : 0 }}
                        />
                        <motion.div
                          animate={hoveredProject === project.id ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <project.icon className="h-24 w-24 text-white/90" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        {project.category}
                      </Badge>
                      <motion.button 
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-sm"
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          setSelectedProject(project)
                          setIsModalOpen(true)
                        }}
                      >
                        Ver mas
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.button>
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies && project.technologies.map((tech: string, idx: number) => (
                        <motion.span 
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground border border-border/50"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          whileHover={{ 
                            backgroundColor: "rgba(59,130,246,0.1)",
                            color: "rgb(59,130,246)",
                            borderColor: "rgba(59,130,246,0.3)"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal de Detalles del Proyecto - Diseño Elegante */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/50">
          {selectedProject && (
            <div className="flex flex-col">
              {/* Video o Imagen - Full Width */}
              {(selectedProject.image_url || selectedProject.thumbnail_url) && (
                <div className="relative w-full aspect-video bg-black">
                  {selectedProject.media_type === 'video' && selectedProject.image_url ? (
                    <video 
                      src={selectedProject.image_url}
                      className="w-full h-full object-contain"
                      controls
                      preload="metadata"
                      playsInline
                      autoPlay
                    >
                      Tu navegador no soporta el elemento de video.
                    </video>
                  ) : (
                    <img
                      src={selectedProject.thumbnail_url || selectedProject.image_url}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              )}

              {/* Contenido Elegante */}
              <div className="p-8 md:p-10 space-y-6">
                {/* Título con Gradiente */}
                <div className="space-y-3">
                  <DialogTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
                    {selectedProject.title}
                  </DialogTitle>
                  <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/40 rounded-full" />
                </div>

                {/* Descripción Elegante */}
                <div className="space-y-3">
                  <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-light">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Categoría Badge */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium text-primary">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
