"use client"

import { useState } from "react"
import Image from "next/image"
import { Coffee, EggFried, ShoppingCart, Plus, Minus, X, MessageCircle } from "lucide-react"

function DonutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
import { WHATSAPP_LINK, CAFE_INFO } from "@/lib/cafe-info"

type MenuItem = {
  name: string
  description: string
  price: number
  price2?: number
  price2Label?: string
  image?: string
}

type Category = {
  id: "donuts" | "drinks" | "breakfast"
  label: string
  icon: React.ComponentType<{ className?: string }>
  items: MenuItem[]
}

type CartItem = MenuItem & { qty: number; selectedPrice: number }

const categories: Category[] = [
  {
    id: "donuts",
    label: "Пончики",
    icon: DonutIcon,
    items: [
      { name: "Оригинальный ринг", description: "Классический пончик-ринг в нежной сахарной глазури", price: 90, image: "/donuts/original-ring.jpeg" },
      { name: "Синий", description: "Яркий синий гляссаж с сочными цветными посыпками", price: 120, image: "/donuts/siniy.jpeg" },
      { name: "Розовый", description: "Розовый гляссаж с яркими сахарными посыпками", price: 120, image: "/donuts/rozovy.jpeg" },
      { name: "Арахисовый", description: "Карамельная глазурь с арахисовым кремом и хрустящими орешками", price: 140, image: "/donuts/arahisovyy.jpeg" },
      { name: "Банановый", description: "Сочный банановый крем в золотистой глазури с шоколадными чипсами", price: 140, image: "/donuts/bananovyy.jpeg" },
      { name: "Вишня-малина", description: "Ягодная глазурь с терпкой вишней и малиной, с цветными посыпками", price: 140, image: "/donuts/vishnya-malina.jpeg" },
      { name: "Ореховый", description: "Белоснежный крем с карамельной сеточкой и дроблёным грецким орехом", price: 150, image: "/donuts/orehovy.jpeg" },
      { name: "Василенко", description: "Воздушный пончик с нежным кремом и изысканным ягодным декором", price: 150, image: "/donuts/vasilenko.jpeg" },
      { name: "Рафаэлло", description: "Белый шоколад с кокосовой стружкой — нежность в каждом укусе", price: 160, image: "/donuts/rafaello.jpeg" },
      { name: "Шоколадный ринг", description: "Классический ринг в насыщенном тёмном шоколаде с ореховой крошкой", price: 160, image: "/donuts/shokoladny-ring.jpeg" },
      { name: "Нутелла", description: "Щедрый слой крема Нутелла с дроблёными орехами", price: 180, image: "/donuts/nutella.jpeg" },
      { name: "Карамель-криспи", description: "Золотистая карамель с хрустящей крошкой и тягучей начинкой", price: 180, image: "/donuts/karamel-krispi.jpeg" },
      { name: "Катаифи", description: "Фисташковый пончик в хрустящих нитях теста катаифи с кокосом", price: 180, image: "/donuts/katayfi.jpeg" },
      { name: "Кешью-урбеч", description: "Насыщенный урбеч из кешью с нежной глазурью и ореховым ароматом", price: 180, image: "/donuts/keshu-urbech.jpeg" },
      { name: "Финиковый", description: "Пончик с насыщенным финиковым кремом и хрустящим ореховым декором", price: 180, image: "/donuts/finikovyy.jpeg" },
      { name: "Фисташковый", description: "Яркая фисташковая глазурь с дроблёным орехом пистачьо", price: 180, image: "/donuts/fistashkovy.jpeg" },
      { name: "Мини со сгущёнкой / нутеллой", description: "Маленькие пончики с начинкой на выбор — сгущёнка или Нутелла", price: 180, image: "/donuts/mini-sgushenka.jpeg" },
      { name: "Буэно", description: "Шоколадный пончик с кремом Буэно и хрустящим вафельным печеньем", price: 200, image: "/donuts/bueno.jpeg" },
      { name: "Орео", description: "Белый крем-чиз с хрустящими крошками легендарного печенья Орео", price: 200, image: "/donuts/oreo.jpeg" },
      { name: "Лотус", description: "Крем Lotus Biscoff с хрустящей крошкой любимого карамельного печенья", price: 200, image: "/donuts/lotus.jpeg" },
    ],
  },
  {
    id: "drinks",
    label: "Напитки",
    icon: Coffee,
    items: [
      { name: "Бамбл / Апельсин / Ананас / Яблоко", description: "Освежающий фруктовый напиток со льдом", price: 400, image: "/drinks/bumbl.jpeg" },
      { name: "Латте 0.3", description: "Нежный кофе с молоком и бархатистой пенкой", price: 280, image: "/drinks/latte.jpeg" },
      { name: "Манго-маракуйя", description: "Тропический освежающий лимонад", price: 280, image: "/drinks/mango-marakuya.jpeg" },
      { name: "Раф классический / Урбеч / Сникерс", description: "Сливочный раф на выбор", price: 300, image: "/drinks/raf.jpeg" },
      { name: "Зелёная миля / Яблочный", description: "Матча-напиток или яблочный вариант", price: 350, image: "/drinks/zelenaya-milya.jpeg" },
      { name: "Капучино 0.2 / 0.3", description: "Эспрессо с нежной молочной пенкой", price: 280, image: "/drinks/kapuchino.jpeg" },
      { name: "Флэт-Уайт", description: "Двойной эспрессо с молоком", price: 220, image: "/drinks/flat-uayt.jpeg" },
      { name: "Фраппучино", description: "Холодный кофейный коктейль со сливками", price: 320, image: "/drinks/frappuchino.jpeg" },
      { name: "Малина-маракуйя / Ягодный", description: "Ягодный лимонад со льдом и мятой", price: 280, image: "/drinks/malina-marakuya.jpeg" },
      { name: "Гранатовый тоник", description: "Освежающий гранатовый напиток с тоником", price: 280, image: "/drinks/granatovy.jpeg" },
      { name: "Американо / Лунго", description: "Классический чёрный кофе", price: 180, image: "/drinks/americano.jpeg" },
      { name: "Эспрессо", description: "Классический бодрящий двойной шот", price: 180, image: "/drinks/espresso.jpeg" },
      { name: "Айс-латте", description: "Холодный латте со льдом", price: 280, image: "/drinks/ais-latte.jpeg" },
      { name: "Колд-брю", description: "Кофе холодного заваривания, бутылка", price: 350, image: "/drinks/cold-brew.jpeg" },
      { name: "Цитрусовый / Апельсин-лайм", description: "Яркий цитрусовый напиток со льдом", price: 280, image: "/drinks/citrusovy.jpeg" },
      { name: "Милкшейк", description: "Шоколадный / банановый / черничный / клубничный", price: 300, image: "/drinks/milkshake.jpeg" },
      { name: "Глинтвейн / Чай облепиховый", description: "Гранатовый / облепиховый / малина-имбирь", price: 180, image: "/drinks/glintveyn.jpeg" },
      { name: "Какао с маршмеллоу", description: "Горячий шоколад с зефирками", price: 250, image: "/drinks/kakao.jpeg" },
      { name: "Айс-Дубай / Урбеч", description: "Фирменный напиток с кофе и мороженым", price: 350, image: "/drinks/ais-dubai.jpeg" },
      { name: "Бабл-Ти", description: "ОРЕО / манго-маракуйя / мятное яблоко / персиковая жвачка", price: 300, image: "/drinks/babl-ti.jpeg" },
      { name: "Горячий шоколад", description: "Насыщенный горячий шоколад со сливками", price: 230, image: "/drinks/goryachy-shokolad.jpeg" },
      { name: "Фреш", description: "Яблоко / апельсин / ананас / морковь / микс", price: 350, image: "/drinks/fresh.jpeg" },
    ],
  },
  {
    id: "breakfast",
    label: "Завтраки",
    icon: EggFried,
    items: [
      {
        name: "Шакшука",
        description: "Яйца в томатно-перечном соусе с гренками",
        price: 350,
        image: "/breakfast/shakshuka.jpg",
      },
      {
        name: "Английский завтрак",
        description: "Яичница, колбаски, грибы, томаты черри, гренки",
        price: 350,
        image: "/breakfast/english.jpg",
      },
      {
        name: "Локъмаш с т1о-берам и аджикой",
        description: "Жареное тесто с аджикой и соусом",
        price: 400,
        image: "/breakfast/lokmash.jpg",
      },
      {
        name: "Французский омлет",
        description: "Воздушный омлет с сыром, томаты черри, гренки",
        price: 350,
        image: "/breakfast/omlet.jpg",
      },
      {
        name: "Ахьар тоьпаш с т1о-берам",
        description: "Жареные палочки с нежным сливочным соусом",
        price: 380,
        image: "/breakfast/ahyar-topash.jpg",
      },
      {
        name: "Сэндвич с курицей/индейкой",
        description: "Горячий сэндвич с мясом, сыром и зеленью",
        price: 350,
        image: "/breakfast/sandwich.jpg",
      },
      {
        name: "Континентальный завтрак",
        description: "Яйца, колбаса, сыры, свежие овощи, масло, сметана",
        price: 400,
        image: "/breakfast/continental.jpg",
      },
      {
        name: "Ахьар хьолт1амиш с к1алд-даьтта",
        description: "Жареные лепёшки с творогом",
        price: 380,
        image: "/breakfast/ahyar-holt.jpg",
      },
      {
        name: "Фетучини с курицей и грибами",
        description: "Паста в сливочном соусе с курицей и грибами",
        price: 400,
        price2: 450,
        price2Label: "с креветками",
        image: "/breakfast/fettucini.jpg",
      },
    ],
  },
]

export function Menu() {
  const [active, setActive] = useState<Category["id"]>("donuts")
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const current = categories.find((c) => c.id === active) ?? categories[0]

  const totalQty = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.selectedPrice * i.qty, 0)

  function addToCart(item: MenuItem, price?: number) {
    const selectedPrice = price ?? item.price
    setCart((prev) => {
      const key = item.name + selectedPrice
      const existing = prev.find((i) => i.name + i.selectedPrice === key)
      if (existing) {
        return prev.map((i) =>
          i.name + i.selectedPrice === key ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...item, selectedPrice, qty: 1 }]
    })
  }

  function changeQty(name: string, selectedPrice: number, delta: number) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name + i.selectedPrice === name + selectedPrice
            ? { ...i, qty: i.qty + delta }
            : i
        )
        .filter((i) => i.qty > 0)
    )
  }

  function buildWhatsAppOrder() {
    const lines = cart.map(
      (i) =>
        `• ${i.name}${i.price2 && i.selectedPrice === i.price2 ? " (с креветками)" : ""} x${i.qty} — ${i.selectedPrice * i.qty} ₽`
    )
    const text = `Здравствуйте! Хочу сделать заказ в АБУ ДУБАЙ:\n\n${lines.join("\n")}\n\nИтого: ${totalPrice} ₽`
    return `https://wa.me/${CAFE_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="menu" className="relative py-16 sm:py-24 bg-[#241509] scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#d4a017] font-semibold tracking-widest uppercase mb-3">
            Меню
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-balance">
            <span className="gold-gradient-text">Что попробовать</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#b8a78c] text-base sm:text-lg leading-relaxed text-pretty">
            Свежая выпечка каждый день, ароматный кофе и сытные завтраки.
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Категории меню"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = cat.id === active
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${cat.id}`}
                id={`tab-${cat.id}`}
                type="button"
                onClick={() => setActive(cat.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold transition-all active:scale-95 ${
                  isActive
                    ? "bg-[#d4a017] text-[#1a0f08] shadow-lg shadow-[#d4a017]/30"
                    : "bg-[#1a0f08] text-[#f5e6d3] border border-[#d4a017]/30 hover:border-[#d4a017]/70 hover:bg-[#2d1a0d]"
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Menu items grid */}
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {current.items.map((item) => (
            <article
              key={item.name}
              className="group rounded-2xl border border-[#d4a017]/20 bg-[#1a0f08] overflow-hidden transition-all hover:border-[#d4a017]/60 hover:-translate-y-0.5"
            >
              {/* Photo */}
              {item.image && (
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08]/60 to-transparent" />
                </div>
              )}

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#f5e6d3] leading-tight">
                    {item.name}
                  </h3>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className="rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 px-3 py-1 text-sm font-bold text-[#d4a017] whitespace-nowrap">
                      {item.price} ₽
                    </span>
                    {item.price2 && (
                      <span className="rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 px-3 py-1 text-xs font-bold text-[#d4a017]/80 whitespace-nowrap">
                        {item.price2} ₽ {item.price2Label}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[#b8a78c] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Add to cart */}
                {item.price2 ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => { addToCart(item, item.price); setCartOpen(true) }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 px-3 py-2 text-xs font-bold text-[#d4a017] hover:bg-[#d4a017]/25 transition-colors active:scale-95"
                    >
                      <Plus className="h-3 w-3" /> {item.price} ₽
                    </button>
                    <button
                      type="button"
                      onClick={() => { addToCart(item, item.price2!); setCartOpen(true) }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 px-3 py-2 text-xs font-bold text-[#d4a017] hover:bg-[#d4a017]/25 transition-colors active:scale-95"
                    >
                      <Plus className="h-3 w-3" /> {item.price2} ₽
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => { addToCart(item); setCartOpen(true) }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 px-4 py-2.5 text-sm font-bold text-[#d4a017] hover:bg-[#d4a017]/25 transition-colors active:scale-95"
                  >
                    <Plus className="h-4 w-4" /> В корзину
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Order CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <p className="text-[#b8a78c] mb-4 text-sm sm:text-base">
            Хотите заказать? Напишите нам в WhatsApp
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-[#22c55e] hover:shadow-xl active:scale-95"
          >
            Заказать в WhatsApp
          </a>
        </div>
      </div>

      {/* Floating cart button */}
      {totalQty > 0 && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 rounded-full bg-[#d4a017] px-4 py-3 text-[#1a0f08] font-bold shadow-xl shadow-[#d4a017]/40 hover:bg-[#e0ab1c] active:scale-95 transition-all"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{totalQty}</span>
          <span className="hidden sm:inline">· {totalPrice} ₽</span>
        </button>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-sm bg-[#1a0f08] border-l border-[#d4a017]/20 flex flex-col h-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#d4a017]/20">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-[#d4a017]" />
                <h2 className="font-serif text-xl font-bold text-[#f5e6d3]">Корзина</h2>
                {totalQty > 0 && (
                  <span className="rounded-full bg-[#d4a017] text-[#1a0f08] text-xs font-bold px-2 py-0.5">
                    {totalQty}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-[#b8a78c] hover:text-[#f5e6d3] hover:bg-[#2d1a0d] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-[#b8a78c]">
                  <ShoppingCart className="h-12 w-12 opacity-30" />
                  <p className="text-sm">Корзина пуста</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.name + item.selectedPrice}
                    className="flex items-center gap-3 rounded-xl bg-[#241509] border border-[#d4a017]/15 p-3"
                  >
                    {item.image && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#f5e6d3] leading-tight truncate">
                        {item.name}
                        {item.price2 && item.selectedPrice === item.price2 && (
                          <span className="text-[#b8a78c] font-normal"> (с креветками)</span>
                        )}
                      </p>
                      <p className="text-xs text-[#d4a017] font-bold mt-0.5">
                        {item.selectedPrice * item.qty} ₽
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => changeQty(item.name, item.selectedPrice, -1)}
                        className="rounded-full w-7 h-7 flex items-center justify-center bg-[#d4a017]/15 border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#d4a017]/30 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-[#f5e6d3]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeQty(item.name, item.selectedPrice, 1)}
                        className="rounded-full w-7 h-7 flex items-center justify-center bg-[#d4a017]/15 border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#d4a017]/30 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-[#d4a017]/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#b8a78c] text-sm">Итого:</span>
                  <span className="text-[#d4a017] font-bold text-xl">{totalPrice} ₽</span>
                </div>
                <a
                  href={buildWhatsAppOrder()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#22c55e] active:scale-95 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  Заказать в WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setCart([])}
                  className="w-full text-xs text-[#b8a78c] hover:text-[#f5e6d3] transition-colors py-1"
                >
                  Очистить корзину
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
