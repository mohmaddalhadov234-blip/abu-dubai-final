import { CAFE_INFO, PHONE_LINK, WHATSAPP_LINK } from "@/lib/cafe-info"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0f0500] border-t border-[#d4a017]/20 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div>
            <p className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
              АБУ ДУБАЙ
            </p>
            <p className="text-sm text-[#b8a78c] mt-1">39 donuts · {CAFE_INFO.city}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#b8a78c]">
            <a href={PHONE_LINK} className="hover:text-[#d4a017] transition">
              {CAFE_INFO.phone}
            </a>
            <span className="text-[#d4a017]/40" aria-hidden="true">·</span>
            <span>{CAFE_INFO.hoursShort}</span>
            <span className="text-[#d4a017]/40" aria-hidden="true">·</span>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4a017] transition"
            >
              WhatsApp
            </a>
          </div>

          <p className="text-xs text-[#b8a78c]/70 mt-2">
            © {year} АБУ ДУБАЙ. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
