"use client"

import { useEffect, useState } from "react"
import { Download, Share, X } from "lucide-react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showIosHint, setShowIosHint] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    // Detect iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)
    const standalone = (window.navigator as any).standalone === true
    setIsIos(ios)
    if (standalone) setInstalled(true)

    // Android/Chrome install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener("beforeinstallprompt", handler)

    window.addEventListener("appinstalled", () => {
      setInstalled(true)
      setDeferredPrompt(null)
    })

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (isIos) {
      setShowIosHint((v) => !v)
      return
    }
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") setInstalled(true)
      setDeferredPrompt(null)
    } else {
      // Fallback — show iOS-style hint
      setShowIosHint((v) => !v)
    }
  }

  const showButton = !installed

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#1a0f08]/95 backdrop-blur-md border-b border-[#d4a017]/20 shadow-lg shadow-black/30"
          : "bg-[#1a0f08]/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 min-w-0">
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-serif text-lg sm:text-xl font-bold gold-gradient-text tracking-wide truncate">
                АБУ ДУБАЙ
              </span>
              <span className="text-[10px] sm:text-xs text-[#b8a78c] truncate">
                39 donuts
              </span>
            </div>
          </a>

          {/* Install button */}
          {showButton && (
            <div className="relative">
              <button
                onClick={handleInstall}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#d4a017]/50 bg-[#1a0f08]/70 px-4 py-2 text-sm font-semibold text-[#d4a017] transition-all hover:border-[#d4a017] hover:bg-[#2d1a0d] active:scale-95"
              >
                {isIos ? (
                  <Share className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Download className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="hidden xs:inline">На экран</span>
              </button>

              {/* iOS hint tooltip */}
              {showIosHint && (
                <div className="absolute top-12 right-0 w-64 rounded-2xl border border-[#d4a017]/40 bg-[#1a0f08] p-4 shadow-2xl shadow-black/60 z-50">
                  <button
                    onClick={() => setShowIosHint(false)}
                    className="absolute top-3 right-3 text-[#b8a78c] hover:text-[#f5e6d3]"
                    aria-label="Закрыть"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-sm font-bold text-[#f5e6d3] mb-2">
                    Добавить на экран
                  </p>
                  <ol className="text-xs text-[#b8a78c] space-y-1.5">
                    <li>
                      <span className="text-[#d4a017]">1.</span> Нажмите{" "}
                      <span className="inline-flex items-center gap-1 font-semibold text-[#f5e6d3]">
                        <Share className="h-3 w-3" /> Поделиться
                      </span>{" "}
                      внизу Safari
                    </li>
                    <li>
                      <span className="text-[#d4a017]">2.</span> Выберите{" "}
                      <span className="font-semibold text-[#f5e6d3]">
                        «На экран Домой»
                      </span>
                    </li>
                    <li>
                      <span className="text-[#d4a017]">3.</span> Нажмите{" "}
                      <span className="font-semibold text-[#f5e6d3]">«Добавить»</span>
                    </li>
                  </ol>
                  {/* Arrow pointing up */}
                  <div className="absolute -top-2 right-5 h-4 w-4 rotate-45 border-l border-t border-[#d4a017]/40 bg-[#1a0f08]" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
