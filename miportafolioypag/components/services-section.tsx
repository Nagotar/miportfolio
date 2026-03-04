"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Code2, 
  Network, 
  Wrench, 
  Server, 
  Shield, 
  Smartphone,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Settings,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mapeo de nombres de iconos a componentes
const iconMap: Record<string, any> = {
  Code2,
  Network,
  Wrench,
  Server,
  Shield,
  Smartphone,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Settings
}

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getServices()
        setServices(data.map(service => ({
          ...service,
          icon: iconMap[service.icon] || Code2
        })))
      } catch (error) {
        console.error("Error cargando servicios:", error)
      }
    }
    
    loadServices()
  }, [])

  return (
    <section id="servicios" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <motion.div 
        className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Nuestros Servicios
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Soluciones{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Informaticas Integrales
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios tecnologicos para cubrir todas las 
            necesidades de tu empresa, desde desarrollo de software hasta mantenimiento de equipos.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              <motion.div
                className="relative h-full bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden"
                whileHover={{ y: -10, borderColor: "rgba(59,130,246,0.5)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
                
                {/* Image or Icon */}
                {service.image_url ? (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-20`} />
                  </div>
                ) : (
                  <div className="p-8 pb-0">
                    <motion.div 
                      className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                )}

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-6 space-y-2">
                    {service.features && service.features.map((feature: string, idx: number) => (
                      <motion.li 
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 + idx * 0.05 }}
                      >
                        <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Bottom line */}
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            ¿Necesitas una solucion personalizada para tu empresa?
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg shadow-primary/25 border-0 px-8">
              Solicitar Cotizacion
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
