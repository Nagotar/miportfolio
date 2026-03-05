"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { contentService } = await import("@/lib/supabase/content")
        const data = await contentService.getTestimonials()
        setTestimonials(data)
      } catch (error) {
        console.error("Error cargando testimonios:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  if (!isLoading && testimonials.length === 0) return null

  return (
    <section id="testimonios" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            Testimonios
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Lo que dicen{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa.
          </p>
        </motion.div>

        {/* Skeletons */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
          </div>
        )}

        {/* Desktop Grid (3+ testimonios) */}
        {!isLoading && testimonials.length >= 3 && (
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id || i} testimonial={t} index={i} isInView={isInView} />
            ))}
          </motion.div>
        )}

        {/* Carrusel (1-2 testimonios) */}
        {!isLoading && testimonials.length > 0 && testimonials.length < 3 && (
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <TestimonialCard testimonial={testimonials[current]} index={0} isInView={isInView} featured />
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-6 mt-8">
                <button
                  onClick={prev}
                  className="p-2 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="p-2 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  index,
  isInView,
  featured = false,
}: {
  testimonial: any
  index: number
  isInView: boolean
  featured?: boolean
}) {
  const displayName = testimonial.name || testimonial.author || "Cliente"
  const displayRole = testimonial.position || testimonial.role || ""
  const displayContent = testimonial.content || testimonial.quote || ""
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className={`relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 group-hover:border-primary/30 transition-all duration-500 h-full flex flex-col ${
          featured ? "shadow-2xl shadow-primary/10" : ""
        }`}
      >
        <Quote className="h-10 w-10 text-primary/25 mb-4 shrink-0" />

        {/* Estrellas */}
        <div className="flex gap-1 mb-5">
          {[...Array(testimonial.rating || 5)].map((_, idx) => (
            <Star key={idx} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>

        {/* Texto */}
        <blockquote className="flex-1">
          <p className="text-base text-foreground leading-relaxed italic">
            &ldquo;{displayContent}&rdquo;
          </p>
        </blockquote>

        {/* Autor */}
        <div className="mt-6 pt-6 border-t border-border/40 flex items-center gap-4">
          {testimonial.image_url ? (
            <img
              src={testimonial.image_url}
              alt={displayName}
              className="h-12 w-12 rounded-full object-cover border-2 border-primary/30 shrink-0"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">{displayName}</p>
            <p className="text-sm text-muted-foreground truncate">
              {displayRole}{displayRole && testimonial.company ? " · " : ""}{testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
