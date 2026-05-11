import Image from "next/image"
import { MapPin, MessageCircle } from "lucide-react"
import { WHATSAPP_LINK } from "@/lib/cafe-info"

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/cafe/facade-abu-dubai.jpg"
          alt="Фасад кафе АБУ ДУБАЙ в Шали"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f08]/70 via-[#1a0f08]/60 to-[#1a0f08]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Address badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1a0f08]/70 backdrop-blur-md border border-[#d4a017]/40 px-4 py-2">
            <MapPin className="h-4 w-4 text-[#d4a017]" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#f5e6d3] uppercase">
              Шали · ул. Кадырова 75
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif font-bold tracking-tight text-balance">
            <span className="block text-5xl sm:text-7xl md:text-8xl gold-gradient-text leading-none">
              АБУ
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl gold-gradient-text leading-none mt-1">
              ДУБАЙ
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg md:text-xl text-[#f5e6d3]/90 leading-relaxed text-pretty">
            Пончики, завтраки и кофе в Шали. Уютная атмосфера и любимые
            десерты от{" "}
            <span className="text-[#d4a017] font-semibold">39 donuts</span>.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
            <a
              href="#menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a017] px-8 py-3.5 text-base font-bold text-[#1a0f08] shadow-lg shadow-[#d4a017]/20 transition-all hover:bg-[#e0ad28] hover:shadow-xl hover:shadow-[#d4a017]/30 active:scale-95"
            >
              Смотреть меню
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#d4a017]/60 bg-[#1a0f08]/50 backdrop-blur-sm px-8 py-3.5 text-base font-bold text-[#f5e6d3] transition-all hover:border-[#d4a017] hover:bg-[#1a0f08]/70 active:scale-95"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
