"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Target, Eye, Lightbulb, Award, Users, Rocket, Linkedin, Github, Twitter } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="nosotros" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <motion.div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
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
            Sobre Nosotros
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Conoce a{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Nagotar Technologies
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tu socio tecnologico integral: desarrollo, redes, mantenimiento y soporte.
          </p>
        </motion.div>

        {/* Founder Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-cyan-500/30 blur-3xl rounded-full scale-90" />
            <motion.div 
              className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 overflow-hidden"
              whileHover={{ borderColor: "rgba(59,130,246,0.5)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative flex flex-col sm:flex-row items-center gap-8">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Rotating ring */}
                  <motion.div 
                    className="absolute inset-[-8px] border-2 border-dashed border-primary/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-500 rounded-full blur-xl opacity-50" />
                  <Image
                    src="/images/founder.jpeg"
                    alt="Pablo Thomas Landeros Mena - Fundador de Nagotar Technologies"
                    width={380}
                    height={380}
                    className="relative rounded-full object-cover border-4 border-primary/30 shadow-xl shadow-primary/20"
                  />
                </motion.div>
                
                <div className="text-center sm:text-left">
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan-500/20 text-primary text-sm mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <Award className="h-4 w-4" />
                    Fundador & CEO
                  </motion.div>
                  <h3 className="text-3xl font-bold text-foreground">Pablo Thomas Landeros Mena</h3>
                  <p className="text-primary font-medium mt-1">Fundador & Desarrollador de Software</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Apasionado por la tecnologia con amplia experiencia en desarrollo de software, 
                    redes e infraestructura TI. Lidero Nagotar Technologies con la vision de 
                    ofrecer soluciones informaticas completas y de calidad a cada cliente.
                  </p>
                  
                  {/* Social Links */}
                  <div className="mt-6 flex justify-center sm:justify-start gap-3">
                    {[Linkedin, Github, Twitter].map((Icon, idx) => (
                      <motion.button
                        key={idx}
                        className="h-10 w-10 rounded-full bg-secondary/50 hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border/50 hover:border-primary/30"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Mission */}
            <motion.div 
              className="group relative"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group-hover:border-primary/50 transition-all duration-500">
                <div className="flex items-start gap-5">
                  <motion.div 
                    className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Target className="h-7 w-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Nuestra Mision</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      Brindar soluciones informaticas integrales de excelencia, desde desarrollo de software 
                      hasta mantenimiento de redes y equipos, impulsando la transformacion digital de nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div 
              className="group relative"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group-hover:border-cyan-500/50 transition-all duration-500">
                <div className="flex items-start gap-5">
                  <motion.div 
                    className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-500 to-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Eye className="h-7 w-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">Nuestra Vision</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      Ser la empresa lider en soluciones informaticas de la region, reconocida por 
                      nuestra excelencia tecnica, innovacion y compromiso con el exito de cada cliente.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            {
              icon: Lightbulb,
              title: "Innovacion",
              description: "Buscamos constantemente nuevas tecnologias y metodologias para ofrecer soluciones de vanguardia.",
              gradient: "from-yellow-500 to-orange-500"
            },
            {
              icon: Users,
              title: "Compromiso",
              description: "Nos comprometemos con el exito de cada proyecto, trabajando en estrecha colaboracion con nuestros clientes.",
              gradient: "from-primary to-cyan-500"
            },
            {
              icon: Rocket,
              title: "Excelencia",
              description: "Mantenemos los mas altos estandares de calidad en cada linea de codigo y cada entregable.",
              gradient: "from-cyan-500 to-blue-600"
            }
          ].map((value, i) => (
            <motion.div 
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 group-hover:border-primary/30 text-center transition-all duration-500 h-full">
                <motion.div 
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="mt-6 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
