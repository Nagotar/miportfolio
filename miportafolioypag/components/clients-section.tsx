"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Building, Store, Briefcase, Heart, GraduationCap, Factory, Quote, Star, Code2 } from "lucide-react"

// Mapeo de nombres de iconos a componentes
const iconMap: Record<string, any> = {
  Building,
  Store,
  Briefcase,
  Heart,
  GraduationCap,
  Factory,
  Code2
}

export function ClientsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [clients, setClients] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        
        const clientsData = await contentService.getClients()
        setClients(clientsData.map(client => ({
          ...client,
          icon: iconMap[client.icon] || Building
        })))
        
        const testimonialsData = await contentService.getTestimonials()
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error("Error cargando clientes y testimonios:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  return (
    <section id="clientes" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/30" />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          x: [-50, 50, -50],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="text-center"
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
            Clientes Satisfechos
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Empresas que{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Confian
            </span>{" "}
            en Nosotros
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hemos tenido el privilegio de trabajar con empresas de diversos sectores.
          </p>
        </motion.div>

        {/* Clients Grid */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {isLoading && [...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border/50 animate-pulse">
              <div className="h-16 w-16 rounded-2xl bg-muted/60" />
              <div className="mt-4 h-3 w-20 bg-muted/60 rounded-full" />
              <div className="mt-2 h-2 w-14 bg-muted/40 rounded-full" />
            </div>
          ))}
          {!isLoading && clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group-hover:border-primary/50 transition-all duration-500">
                <motion.div 
                  className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center overflow-hidden"
                  whileHover={{ rotate: client.logo_url ? 0 : 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {client.logo_url ? (
                    <img 
                      src={client.logo_url} 
                      alt={client.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <client.icon className="h-8 w-8 text-primary" />
                  )}
                </motion.div>
                <h3 className="mt-4 text-sm font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                  {client.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{client.industry}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="mt-24 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {isLoading && [...Array(2)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-card/50 p-8 animate-pulse">
              <div className="h-10 w-10 rounded-lg bg-muted/60 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => <div key={s} className="h-4 w-4 rounded-full bg-muted/60" />)}
              </div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-muted/60 rounded-full w-full" />
                <div className="h-4 bg-muted/60 rounded-full w-5/6" />
                <div className="h-4 bg-muted/40 rounded-full w-3/4" />
              </div>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted/60" />
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-muted/60 rounded-full" />
                  <div className="h-3 w-32 bg-muted/40 rounded-full" />
                </div>
              </div>
            </div>
          ))}
          {!isLoading && testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 + i * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 group-hover:border-primary/30 transition-all duration-500">
                <Quote className="h-12 w-12 text-primary/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.2 + idx * 0.1 }}
                    >
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  ))}
                </div>

                <blockquote>
                  <p className="text-lg text-foreground leading-relaxed italic">
                    &ldquo;{testimonial.content || testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                
                <div className="mt-6 flex items-center gap-4">
                  {testimonial.image_url ? (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.name || testimonial.author}
                      className="h-12 w-12 rounded-full object-cover border-2 border-primary/30"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold">
                      {(testimonial.name || testimonial.author || "?").split(" ").map((n: string) => n[0]).join("")}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name || testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position || testimonial.role}{(testimonial.position || testimonial.role) && testimonial.company ? ", " : ""}{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
