import type React from "react"
import type { Metadata } from "next"
import { Fredoka } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./AuthProvider"

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Kiwiz - AI Coloring & Tracing for Kids",
  description: "Fun AI-powered coloring pages and alphabet tracing activities for children",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en" className={`${fredoka.variable} antialiased`}>
        <body className="overflow-x-hidden">{children}</body>
      </html>
    </AuthProvider>
  )
}
