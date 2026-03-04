"use client"

import React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [contactData, setContactData] = useState({
    email: "contacto@nagotar.com",
    phone: "+56 9 1234 5678",
    address: "Santiago, Chile"
  })
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getContactInfo()
        if (data) {
          setContactData(data)
        }
      } catch (error) {
        console.error("Error cargando información de contacto:", error)
      }
    }
    
    loadContactInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje')
      }

      setIsSubmitted(true)
      
      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    } catch (error) {
      console.error('Error enviando formulario:', error)
      alert('❌ Error al enviar el mensaje. Por favor intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para formatear número de teléfono para WhatsApp (solo números)
  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/\D/g, '') // Elimina todo excepto números
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: contactData.email, href: `mailto:${contactData.email}` },
    { icon: Phone, label: "Telefono", value: contactData.phone, href: `https://wa.me/${formatPhoneForWhatsApp(contactData.phone)}` },
    { icon: MapPin, label: "Ubicacion", value: contactData.address, href: "#" },
  ]

  return (
    <section id="contacto" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
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
            Contactanos
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Proyecto
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tienes una idea en mente? Contactanos y hagamosla realidad juntos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            className="space-y-10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Informacion de Contacto
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Estamos listos para escucharte. Contactanos por cualquiera de estos medios 
                y te responderemos a la brevedad.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="group flex items-center gap-5 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/25"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div 
              className="pt-8 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-muted-foreground mb-4">Siguenos en redes sociales</p>
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Github, label: "GitHub" },
                  { icon: Twitter, label: "Twitter" }
                ].map((social, idx) => (
                  <motion.button
                    key={idx}
                    className="group h-12 w-12 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="text-sm font-medium text-foreground mb-2 block">Nombre</label>
                      <Input
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors h-12"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.55 }}
                    >
                      <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors h-12"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="text-sm font-medium text-foreground mb-2 block">Asunto</label>
                    <Input
                      placeholder="En que podemos ayudarte?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors h-12"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.65 }}
                  >
                    <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                    <Textarea
                      placeholder="Cuentanos sobre tu proyecto..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors resize-none"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white font-semibold shadow-lg shadow-primary/25 border-0 text-base"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="mr-2 h-5 w-5" />
                          Mensaje Enviado!
                        </>
                      ) : (
                        <>
                          Enviar Mensaje
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
