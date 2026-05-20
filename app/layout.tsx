import type { Metadata, Viewport } from "next"
import { Playfair_Display, Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
})

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
  display: "swap",
})

export const metadata: Metadata = {
  title: "АБУ ДУБАЙ · 39 donuts — Пончики, кофе и завтраки в Шали",
  description:
    "Кафе АБУ ДУБАЙ в Шали — авторские пончики, ароматный кофе и вкусные завтраки. Уютная атмосфера, доставка через WhatsApp.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "АБУ ДУБАЙ",
  },
  openGraph: {
    title: "АБУ ДУБАЙ · 39 donuts",
    description: "Пончики, кофе и завтраки в Шали",
    type: "website",
    locale: "ru_RU",
  },
  verification: {
    google: "google2633e6f8a6d3467e",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a0f08",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${playfair.variable} ${nunito.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="АБУ ДУБАЙ" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
