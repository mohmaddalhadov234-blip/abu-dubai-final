import { MapPin, Phone, Clock, MessageCircle } from "lucide-react"
import { CAFE_INFO, PHONE_LINK, WHATSAPP_LINK } from "@/lib/cafe-info"

const items = [
  {
    icon: MapPin,
    title: "Адрес",
    value: CAFE_INFO.address,
    href: "https://yandex.ru/maps/?text=Шали+ул+Кадырова+75",
    cta: "Открыть в картах",
  },
  {
    icon: Phone,
    title: "Телефон",
    value: CAFE_INFO.phone,
    href: PHONE_LINK,
    cta: "Позвонить",
  },
  {
    icon: Clock,
    title: "Часы работы",
    value: CAFE_INFO.hours,
    href: null,
    cta: null,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Напишите нам прямо сейчас",
    href: WHATSAPP_LINK,
    cta: "Открыть WhatsApp",
  },
]

export function Contacts() {
  return (
    <section id="contacts" className="relative py-16 sm:py-24 bg-[#241509] scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#d4a017] font-semibold tracking-widest uppercase mb-3">
            Контакты
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-balance">
            <span className="gold-gradient-text">Как нас найти</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {items.map((item) => {
            const Icon = item.icon
            const content = (
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-[#d4a017]" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-[#b8a78c] mb-1">
                    {item.title}
                  </p>
                  <p className="font-serif text-lg sm:text-xl font-bold text-[#f5e6d3] leading-snug break-words">
                    {item.value}
                  </p>
                  {item.cta && (
                    <p className="mt-2 text-sm text-[#d4a017] font-semibold">
                      {item.cta} →
                    </p>
                  )}
                </div>
              </div>
            )

            const className =
              "block rounded-2xl border border-[#d4a017]/20 bg-[#1a0f08] p-5 sm:p-6 transition-all hover:border-[#d4a017]/60 hover:-translate-y-0.5"

            if (item.href) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  {content}
                </a>
              )
            }

            return (
              <div key={item.title} className={className}>
                {content}
              </div>
            )
          })}
        </div>

        {/* Map */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#d4a017]/20 bg-[#1a0f08]">
          <iframe
            title="Карта расположения кафе АБУ ДУБАЙ в Шали"
            src="https://yandex.ru/map-widget/v1/?text=Шали%20улица%20Кадырова%2075&z=16"
            width="100%"
            height="360"
            loading="lazy"
            className="w-full h-[300px] sm:h-[400px] block"
            style={{ border: 0, filter: "grayscale(0.2) brightness(0.95)" }}
          />
        </div>
      </div>
    </section>
  )
}
