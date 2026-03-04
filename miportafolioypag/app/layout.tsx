import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Chatbot } from '@/components/chatbot'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Nagotar Technologies - Soluciones Informáticas y Softwares',
  description: 'Nagotar Technologies ofrece soluciones informáticas completas: desarrollo de software, redes, mantenimiento de hardware y software. Tu socio tecnológico integral.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/nagotar-logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/nagotar-logo.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: '/images/nagotar-logo.png',
    shortcut: '/images/nagotar-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Chatbot />
        <Analytics />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #3b82f6',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
