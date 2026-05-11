import { MessageCircle } from "lucide-react"
import { WHATSAPP_LINK } from "@/lib/cafe-info"

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className="whatsapp-pulse fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/40 transition-transform hover:scale-110 active:scale-95"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
    </a>
  )
}
