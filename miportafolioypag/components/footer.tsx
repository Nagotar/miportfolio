"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Linkedin, Github, Twitter, Heart } from "lucide-react"

const footerLinks = {
  servicios: [
    { name: "Desarrollo Web", href: "#proyectos" },
    { name: "Apps Moviles", href: "#proyectos" },
    { name: "Software a Medida", href: "#proyectos" },
    { name: "Consultoria", href: "#contacto" },
  ],
  empresa: [
    { name: "Nosotros", href: "#nosotros" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Clientes", href: "#clientes" },
    { name: "Contacto", href: "#contacto" },
  ],
  legal: [
    { name: "Privacidad", href: "#" },
    { name: "Terminos", href: "#" },
  ]
}

export function Footer() {
  return (
    <footer className="relative bg-card/50 backdrop-blur-sm border-t border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md" />
                <Image
                  src="/images/nagotar-logo.png"
                  alt="Nagotar Technologies Logo"
                  width={50}
                  height={50}
                  className="relative rounded-lg border border-primary/20"
                />
              </motion.div>
              <div>
                <p className="font-bold text-lg">
                  <span className="text-foreground">Nagotar</span>
                  <span className="text-primary"> Technologies</span>
                </p>
                <p className="text-xs text-muted-foreground">Soluciones Informaticas y Softwares</p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Transformamos ideas en soluciones digitales innovadoras para impulsar el crecimiento de tu negocio.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" }
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="h-10 w-10 rounded-lg bg-secondary/50 hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 border border-border/50 hover:border-primary/30"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-foreground mb-4">Comienza tu Proyecto</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tienes una idea? Hablemos y convirtamosla en realidad.
            </p>
            <motion.a
              href="#contacto"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Nagotar Technologies.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Hecho con <Heart className="h-4 w-4 text-red-500 fill-red-500" /> en Latinoamerica
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
