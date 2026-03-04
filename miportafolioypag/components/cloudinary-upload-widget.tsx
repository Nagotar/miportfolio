"use client"

import { useEffect, useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string, mediaType?: string) => void
  buttonText?: string
  folder?: string
  allowVideo?: boolean
}

declare global {
  interface Window {
    cloudinary: any
  }
}

export function CloudinaryUploadWidget({ 
  onUploadSuccess, 
  buttonText = "Subir Imagen",
  folder = "nagotar-clients",
  allowVideo = false
}: CloudinaryUploadWidgetProps) {
  const cloudinaryRef = useRef<any>(null)
  const widgetRef = useRef<any>(null)

  useEffect(() => {
    // Cargar el script de Cloudinary
    if (!window.cloudinary) {
      const script = document.createElement('script')
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.async = true
      document.body.appendChild(script)
      
      script.onload = () => {
        cloudinaryRef.current = window.cloudinary
      }
    } else {
      cloudinaryRef.current = window.cloudinary
    }
  }, [])

  const openWidget = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      alert("⚠️ Cloudinary no está configurado. Por favor configura las variables de entorno.")
      return
    }

    if (!cloudinaryRef.current) {
      alert("⚠️ Cloudinary aún no se ha cargado. Intenta nuevamente.")
      return
    }

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        folder: folder,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: allowVideo 
          ? ['png', 'jpg', 'jpeg', 'webp', 'svg', 'mp4', 'mov', 'avi', 'webm']
          : ['png', 'jpg', 'jpeg', 'webp', 'svg'],
        maxFileSize: allowVideo ? 500000000 : 2000000, // 500MB para videos, 2MB para imágenes
        cropping: !allowVideo, // Solo recortar imágenes, no videos
        croppingAspectRatio: allowVideo ? undefined : 1,
        showSkipCropButton: allowVideo,
        croppingShowDimensions: !allowVideo,
        styles: {
          palette: {
            window: "#1a1a1a",
            windowBorder: "#3b82f6",
            tabIcon: "#3b82f6",
            menuIcons: "#ffffff",
            textDark: "#000000",
            textLight: "#ffffff",
            link: "#3b82f6",
            action: "#3b82f6",
            inactiveTabIcon: "#555555",
            error: "#ef4444",
            inProgress: "#3b82f6",
            complete: "#10b981",
            sourceBg: "#1a1a1a"
          }
        }
      },
      (error: any, result: any) => {
        console.log("Cloudinary callback - error:", error)
        console.log("Cloudinary callback - result:", result)
        
        if (!error && result && result.event === "success") {
          const mediaUrl = result.info.secure_url
          const resourceType = result.info.resource_type // 'image' o 'video'
          const mediaType = resourceType === 'video' ? 'video' : 'image'
          console.log("Upload exitoso:", { mediaUrl, mediaType })
          onUploadSuccess(mediaUrl, mediaType)
        }
        if (error) {
          console.error("Error uploading to Cloudinary:", error)
          console.error("Error stringified:", JSON.stringify(error, null, 2))
          console.error("Error keys:", Object.keys(error))
          console.error("Error type:", typeof error)
          alert(`❌ Error al subir el archivo: ${error.message || error.statusText || 'Error desconocido'}`)
        }
      }
    )

    widgetRef.current.open()
  }

  return (
    <Button
      type="button"
      onClick={openWidget}
      variant="outline"
      className="gap-2"
    >
      <Upload className="h-4 w-4" />
      {buttonText}
    </Button>
  )
}
