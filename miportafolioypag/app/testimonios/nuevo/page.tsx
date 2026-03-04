"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Star, Send, Upload, X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CloudinaryUploadWidget } from "@/components/cloudinary-upload-widget"

function TestimonioForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    content: "",
    rating: 5,
    image_url: ""
  })
  const [loading, setLoading] = useState(false)
  const [validatingToken, setValidatingToken] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [tokenError, setTokenError] = useState("")

  // Validar token al cargar la página
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenError("Link inválido. Por favor solicita un nuevo link de invitación.")
        setValidatingToken(false)
        return
      }

      try {
        const response = await fetch(`/api/testimonios/validate-token?token=${token}`)
        const data = await response.json()

        if (data.valid) {
          setTokenValid(true)
          // Pre-llenar nombre y email si están disponibles
          if (data.client_name) {
            setFormData(prev => ({ ...prev, name: data.client_name }))
          }
        } else {
          setTokenError(data.error || "Link inválido o expirado")
        }
      } catch (err) {
        setTokenError("Error al validar el link")
      } finally {
        setValidatingToken(false)
      }
    }

    validateToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/testimonios/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, token }),
      })

      if (!response.ok) {
        throw new Error("Error al enviar testimonio")
      }

      setSuccess(true)
      setFormData({
        name: "",
        position: "",
        company: "",
        content: "",
        rating: 5,
        image_url: ""
      })
    } catch (err) {
      setError("Hubo un error al enviar tu testimonio. Por favor intenta nuevamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Loading mientras valida token
  if (validatingToken) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Validando invitación...</p>
        </motion.div>
      </div>
    )
  }

  // Error de token inválido
  if (tokenError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card/50 backdrop-blur-sm rounded-2xl border border-destructive/50 p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center"
          >
            <AlertCircle className="h-10 w-10 text-destructive" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Link Inválido
          </h1>
          <p className="text-muted-foreground mb-8">
            {tokenError}
          </p>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Volver al Inicio
          </Button>
        </motion.div>
      </div>
    )
  }

  // Éxito
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            ¡Gracias por tu testimonio!
          </h1>
          <p className="text-muted-foreground mb-8">
            Tu opinión es muy valiosa para nosotros. Será revisada y publicada pronto en nuestro sitio web.
          </p>
          
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90"
          >
            Volver al Inicio
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center">
            <Star className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comparte tu{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Experiencia
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tu opinión nos ayuda a mejorar y ayuda a otros a conocer nuestro trabajo.
            Comparte tu experiencia trabajando con Nagotar Technologies.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <Label htmlFor="name">Nombre Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Juan Pérez"
                required
                className="mt-2"
              />
            </div>

            {/* Cargo */}
            <div>
              <Label htmlFor="position">Cargo *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Director de Tecnología"
                required
                className="mt-2"
              />
            </div>

            {/* Empresa */}
            <div>
              <Label htmlFor="company">Empresa *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Mi Empresa S.A."
                required
                className="mt-2"
              />
            </div>

            {/* Calificación */}
            <div>
              <Label>Calificación *</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {formData.rating === 5 && "¡Excelente!"}
                {formData.rating === 4 && "Muy bueno"}
                {formData.rating === 3 && "Bueno"}
                {formData.rating === 2 && "Regular"}
                {formData.rating === 1 && "Necesita mejorar"}
              </p>
            </div>

            {/* Testimonio */}
            <div>
              <Label htmlFor="content">Tu Testimonio *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Cuéntanos sobre tu experiencia trabajando con nosotros..."
                required
                rows={6}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Mínimo 50 caracteres ({formData.content.length}/50)
              </p>
            </div>

            {/* Imagen (Opcional) */}
            <div>
              <Label>Foto de Perfil (Opcional)</Label>
              <div className="mt-2 space-y-3">
                <CloudinaryUploadWidget
                  onUploadSuccess={(url) => {
                    setFormData({ ...formData, image_url: url })
                  }}
                  folder="nagotar-testimonials"
                  buttonText={formData.image_url ? "Cambiar Foto" : "Subir Foto"}
                />
                
                {formData.image_url && (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                    <img
                      src={formData.image_url}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                      onClick={() => setFormData({ ...formData, image_url: "" })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground">
                  Sube una foto de perfil profesional (opcional, máx. 2MB)
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || formData.content.length < 50}
              className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg shadow-primary/25 border-0 h-12 text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Testimonio
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Al enviar este formulario, aceptas que tu testimonio sea publicado en nuestro sitio web.
            </p>
          </form>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            ¿Tienes alguna pregunta?{" "}
            <a href="/#contacto" className="text-primary hover:underline">
              Contáctanos
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function NuevoTestimonioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-background via-secondary/20 to-background flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    }>
      <TestimonioForm />
    </Suspense>
  )
}
