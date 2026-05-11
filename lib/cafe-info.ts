export const CAFE_INFO = {
  name: "АБУ ДУБАЙ",
  brand: "39 donuts",
  city: "Шали",
  address: "г. Шали, ул. Кадырова 75",
  phone: "+7 (989) 911-39-39",
  phoneRaw: "+79899113939",
  whatsappRaw: "79899113939",
  hours: "Ежедневно с 08:00 до 23:00",
  hoursShort: "08:00 — 23:00",
} as const

export const WHATSAPP_LINK = `https://wa.me/${CAFE_INFO.whatsappRaw}?text=${encodeURIComponent(
  "Здравствуйте! Хочу сделать заказ в АБУ ДУБАЙ",
)}`

export const PHONE_LINK = `tel:${CAFE_INFO.phoneRaw}`
