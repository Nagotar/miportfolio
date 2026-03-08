import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
import { Chatbot } from '@/components/chatbot'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nagotar.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nagotar Technologies - Soluciones Informáticas y Software',
    template: '%s | Nagotar Technologies',
  },
  description: 'Nagotar Technologies ofrece soluciones informáticas integrales: desarrollo de software a medida, redes, mantenimiento de hardware y software. Tu socio tecnológico de confianza en Latinoamérica.',
  keywords: [
    'desarrollo de software',
    'soluciones informáticas',
    'redes y conectividad',
    'mantenimiento de hardware',
    'software a medida',
    'aplicaciones web',
    'aplicaciones móviles',
    'soporte técnico',
    'Nagotar Technologies',
    'tecnología',
    'Latinoamérica',
  ],
  authors: [{ name: 'Nagotar Technologies', url: siteUrl }],
  creator: 'Nagotar Technologies',
  publisher: 'Nagotar Technologies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: siteUrl,
    siteName: 'Nagotar Technologies',
    title: 'Nagotar Technologies - Soluciones Informáticas y Software',
    description: 'Soluciones informáticas integrales: desarrollo de software, redes, mantenimiento y soporte técnico. Tu socio tecnológico de confianza.',
    images: [
      {
        url: '/images/nagotar-logo.png',
        width: 1200,
        height: 630,
        alt: 'Nagotar Technologies - Soluciones Informáticas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nagotar Technologies - Soluciones Informáticas y Software',
    description: 'Soluciones informáticas integrales: desarrollo de software, redes, mantenimiento y soporte técnico.',
    images: ['/images/nagotar-logo.png'],
    creator: '@nagotar',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/images/nagotar-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/nagotar-logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/images/nagotar-logo.png',
    shortcut: '/images/nagotar-logo.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nagotar Technologies',
  url: siteUrl,
  logo: `${siteUrl}/images/nagotar-logo.png`,
  description: 'Soluciones informáticas integrales: desarrollo de software, redes, mantenimiento y soporte técnico.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CL',
    addressRegion: 'Latinoamérica',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
  sameAs: [],
  offers: {
    '@type': 'AggregateOffer',
    description: 'Servicios de desarrollo de software, redes, mantenimiento y soporte técnico.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Chatbot />
        {/* <Analytics /> */}
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
