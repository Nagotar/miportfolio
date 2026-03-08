"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Smartphone, Globe, Sparkles, Network, Wrench, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [target])
  
  return <span>{count}{suffix}</span>
}

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [heroData, setHeroData] = useState({
    title: "Transformamos ideas en soluciones digitales",
    subtitle: "Soluciones informáticas integrales: desarrollo de software, redes, mantenimiento de hardware y software. Tu socio tecnológico de confianza.",
    stat_1_value: 50,
    stat_1_label: "Proyectos",
    stat_2_value: 30,
    stat_2_label: "Clientes",
    stat_3_value: 5,
    stat_3_label: "Años"
  })

  useEffect(() => {
    setIsMounted(true)
    
    // Cargar datos desde Supabase
    const loadHeroData = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getHeroContent()
        if (data) {
          setHeroData(data)
        }
      } catch (error) {
        console.error("Error cargando datos del Hero:", error)
      }
    }
    
    loadHeroData()
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-background to-background" />
      
      {/* Animated particles - solo renderizar en cliente */}
      {isMounted && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Glowing orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.5)" }}
            >
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">Nagotar Technologies - Soluciones Informaticas</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-balance">{heroData.title}</span>
            </motion.h1>
            
            <motion.p 
              className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {heroData.subtitle}
            </motion.p>

            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg shadow-primary/25 border-0 px-8">
                  Ver Proyectos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 backdrop-blur-sm bg-transparent px-8">
                  Contactar
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: heroData.stat_1_value, suffix: "+", label: heroData.stat_1_label },
                { value: heroData.stat_2_value, suffix: "+", label: heroData.stat_2_label },
                { value: heroData.stat_3_value, suffix: "+", label: heroData.stat_3_label }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="relative"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl" />
                  <div className="relative p-3 md:p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Logo/Image */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="relative"
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-cyan-500/40 blur-3xl rounded-full scale-110" />
              
              {/* Rotating ring */}
              <motion.div 
                className="absolute inset-[-20px] border-2 border-dashed border-primary/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Second rotating ring */}
              <motion.div 
                className="absolute inset-[-40px] border border-cyan-500/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/images/nagotar-logo.png"
                  alt="Nagotar Technologies Logo"
                  width={450}
                  height={450}
                  className="relative rounded-full shadow-2xl shadow-primary/30 border-2 border-primary/20 object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Services preview */}
        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { icon: Code2, title: "Desarrollo de Software", desc: "Aplicaciones web, moviles y software a medida" },
            { icon: Network, title: "Redes e Infraestructura", desc: "Diseno, instalacion y mantenimiento de redes" },
            { icon: Wrench, title: "Mantenimiento TI", desc: "Soporte tecnico de hardware y software" },
          ].map((service, i) => (
            <motion.div 
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 rounded-xl bg-card/30 backdrop-blur-md border border-border/50 group-hover:border-primary/50 transition-all duration-500">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-500 rounded-b-xl"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2 },
          y: { duration: 2, repeat: Infinity }
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
