"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Plus, 
  Copy, 
  Check, 
  Trash2,
  Calendar,
  User,
  Mail,
  Link as LinkIcon,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Invitation {
  id: string
  token: string
  client_name: string
  client_email: string | null
  created_at: string
  expires_at: string | null
  used_at: string | null
  is_active: boolean
  max_uses: number
  use_count: number
}

export default function InvitacionesPage() {
  const router = useRouter()
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    expires_in_days: 30
  })

  // Función helper para copiar al portapapeles con fallback
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      // Método moderno (requiere HTTPS)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
      
      // Fallback para navegadores antiguos o contextos no seguros
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      
      return successful
    } catch (err) {
      console.error('Error al copiar:', err)
      return false
    }
  }

  useEffect(() => {
    loadInvitations()
  }, [])

  const loadInvitations = async () => {
    try {
      const response = await fetch("/api/testimonios/invitations")
      const data = await response.json()
      if (data.success) {
        setInvitations(data.data)
      }
    } catch (error) {
      console.error("Error cargando invitaciones:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const response = await fetch("/api/testimonios/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (data.success) {
        await loadInvitations()
        setShowForm(false)
        setFormData({ client_name: "", client_email: "", expires_in_days: 30 })
        
        // Copiar link automáticamente
        if (data.link) {
          const copied = await copyToClipboard(data.link)
          if (copied) {
            setCopiedId(data.data.id)
            setTimeout(() => setCopiedId(null), 3000)
          } else {
            alert(`Link creado (copia manualmente):\n${data.link}`)
          }
        }
      }
    } catch (error) {
      console.error("Error creando invitación:", error)
      alert("Error al crear invitación. Verifica la consola para más detalles.")
    } finally {
      setCreating(false)
    }
  }

  const handleCopyLink = async (token: string, id: string) => {
    const link = `${window.location.origin}/testimonios/nuevo?token=${token}`
    const copied = await copyToClipboard(link)
    
    if (copied) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 3000)
    } else {
      alert(`No se pudo copiar automáticamente. Copia este link:\n${link}`)
    }
  }

  const handleDeleteInvitation = async (id: string) => {
    if (!confirm("¿Desactivar esta invitación?")) return

    try {
      const response = await fetch(`/api/testimonios/invitations?id=${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        await loadInvitations()
      }
    } catch (error) {
      console.error("Error eliminando invitación:", error)
      alert("Error al eliminar invitación")
    }
  }

  const getStatusColor = (invitation: Invitation) => {
    if (!invitation.is_active) return "text-muted-foreground"
    if (invitation.use_count >= invitation.max_uses) return "text-yellow-500"
    if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) return "text-destructive"
    return "text-green-500"
  }

  const getStatusText = (invitation: Invitation) => {
    if (!invitation.is_active) return "Desactivada"
    if (invitation.use_count >= invitation.max_uses) return "Usada"
    if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) return "Expirada"
    return "Activa"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/admin/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Invitaciones de Testimonios</h1>
                <p className="text-sm text-muted-foreground">Gestiona links protegidos para clientes</p>
              </div>
            </div>
            
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Invitación
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Formulario de Nueva Invitación */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-lg bg-card border border-border"
          >
            <h2 className="text-lg font-semibold mb-4">Crear Nueva Invitación</h2>
            <form onSubmit={handleCreateInvitation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Nombre del Cliente *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="Juan Pérez"
                    required
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="client_email">Email (Opcional)</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    placeholder="cliente@empresa.com"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="expires_in_days">Días hasta expiración</Label>
                <Input
                  id="expires_in_days"
                  type="number"
                  min="1"
                  max="365"
                  value={formData.expires_in_days}
                  onChange={(e) => {
                    const value = parseInt(e.target.value)
                    setFormData({ ...formData, expires_in_days: isNaN(value) ? 30 : value })
                  }}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  El link expirará en {formData.expires_in_days} días
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={creating}>
                  {creating ? "Creando..." : "Crear Invitación"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Lista de Invitaciones */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : invitations.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No hay invitaciones creadas</p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4"
            >
              Crear Primera Invitación
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {invitations.map((invitation) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg bg-card border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{invitation.client_name}</h3>
                        {invitation.client_email && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {invitation.client_email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Creada: {new Date(invitation.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {invitation.expires_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Expira: {new Date(invitation.expires_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      <div className={`font-semibold ${getStatusColor(invitation)}`}>
                        {getStatusText(invitation)}
                      </div>

                      {invitation.used_at && (
                        <div className="text-muted-foreground">
                          Usado: {new Date(invitation.used_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <code className="text-xs bg-secondary/50 px-3 py-2 rounded block break-all">
                      {window.location.origin}/testimonios/nuevo?token={invitation.token}
                    </code>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleCopyLink(invitation.token, invitation.id)}
                      className={copiedId === invitation.id ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {copiedId === invitation.id ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copiar
                        </>
                      )}
                    </Button>

                    {invitation.is_active && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteInvitation(invitation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
