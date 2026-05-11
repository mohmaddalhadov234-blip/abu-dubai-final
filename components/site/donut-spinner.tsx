"use client"

import { useState } from "react"
import Image from "next/image"

const DONUTS = [
  { name: "Оригинальный ринг",    image: "/donuts/original-ring.jpeg" },
  { name: "Синий",                image: "/donuts/siniy.jpeg" },
  { name: "Розовый",              image: "/donuts/rozovy.jpeg" },
  { name: "Арахисовый",           image: "/donuts/arahisovyy.jpeg" },
  { name: "Банановый",            image: "/donuts/bananovyy.jpeg" },
  { name: "Вишня-малина",         image: "/donuts/vishnya-malina.jpeg" },
  { name: "Ореховый",             image: "/donuts/orehovy.jpeg" },
  { name: "Василенко",            image: "/donuts/vasilenko.jpeg" },
  { name: "Рафаэлло",             image: "/donuts/rafaello.jpeg" },
  { name: "Шоколадный ринг",      image: "/donuts/shokoladny-ring.jpeg" },
  { name: "Нутелла",              image: "/donuts/nutella.jpeg" },
  { name: "Карамель-криспи",      image: "/donuts/karamel-krispi.jpeg" },
  { name: "Катаифи",              image: "/donuts/katayfi.jpeg" },
  { name: "Кешью-урбеч",          image: "/donuts/keshu-urbech.jpeg" },
  { name: "Финиковый",            image: "/donuts/finikovyy.jpeg" },
  { name: "Фисташковый",          image: "/donuts/fistashkovy.jpeg" },
  { name: "Мини со сгущёнкой",    image: "/donuts/mini-sgushenka.jpeg" },
  { name: "Буэно",                image: "/donuts/bueno.jpeg" },
  { name: "Орео",                 image: "/donuts/oreo.jpeg" },
  { name: "Лотус",                image: "/donuts/lotus.jpeg" },
]

const ITEM_H = 140   // px — height of each reel item
const N = DONUTS.length
const REPS = 20      // how many times we duplicate the list in the strip
const STRIP = Array.from({ length: REPS }, () => DONUTS).flat()

export function DonutSpinner() {
  // centerIdx = which strip item sits in the CENTER (middle) slot
  const [centerIdx, setCenterIdx] = useState(2 * N)
  const [spinning, setSpinning]   = useState(false)
  const [winner, setWinner]       = useState<(typeof DONUTS)[0] | null>(null)
  const [transitionMs, setTransitionMs] = useState(0)
  const [glowing, setGlowing]     = useState(false)

  // translateY formula: place STRIP[centerIdx] in the center of the 3-slot window
  // Window top = 0, center-slot top = ITEM_H, center-slot bottom = 2*ITEM_H
  // STRIP[i] top in strip = i * ITEM_H
  // To put it at ITEM_H offset in window: translateY = ITEM_H - centerIdx * ITEM_H
  const translateY = ITEM_H - centerIdx * ITEM_H

  function spin() {
    if (spinning) return

    const winnerDonut = Math.floor(Math.random() * N)
    const currentRemainder = centerIdx % N
    const stepsToWinner    = (winnerDonut - currentRemainder + N) % N
    // Always go at least 5 full loops + steps to winner (minimum 1 step beyond full loops)
    const totalSteps       = 5 * N + (stepsToWinner === 0 ? N : stepsToWinner)
    const newCenterIdx     = centerIdx + totalSteps

    setWinner(null)
    setGlowing(false)
    setSpinning(true)
    setTransitionMs(3000)
    setCenterIdx(newCenterIdx)

    // Settle: show winner, reset strip position (no flicker)
    setTimeout(() => {
      setSpinning(false)
      setWinner(DONUTS[winnerDonut])
      setGlowing(true)
      // Snap back to an equivalent position near start of strip (transition: none)
      setTransitionMs(0)
      setCenterIdx(2 * N + winnerDonut)
    }, 3100)
  }

  return (
    <section className="relative py-14 sm:py-20 bg-[#1a0f08] overflow-hidden">
      {/* Subtle texture rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,160,23,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#d4a017] font-semibold tracking-widest uppercase mb-3">
            Удача дня
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold">
            <span className="gold-gradient-text">Пончик дня</span>
          </h2>
          <p className="mt-3 text-[#b8a78c] text-base sm:text-lg max-w-md mx-auto">
            Не знаешь что выбрать? Доверься барабану 🍩
          </p>
        </div>

        {/* Layout: drum + info side by side */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

          {/* ── DRUM ── */}
          <div className="relative flex-shrink-0">
            {/* Gold chrome frame */}
            <div
              className="p-[3px] rounded-3xl shadow-2xl"
              style={{
                background: "linear-gradient(160deg, #f5d76e, #d4a017 40%, #7a5c00 80%, #d4a017)",
                boxShadow: glowing
                  ? "0 0 40px 8px rgba(212,160,23,0.55)"
                  : "0 0 24px 4px rgba(212,160,23,0.25)",
                transition: "box-shadow 0.5s ease",
              }}
            >
              <div
                className="relative rounded-[22px] overflow-hidden"
                style={{ width: 200, height: 3 * ITEM_H, background: "#0d0705" }}
              >
                {/* ── SCROLLING STRIP ── */}
                <div
                  style={{
                    transform: `translateY(${translateY}px)`,
                    transition:
                      transitionMs > 0
                        ? `transform ${transitionMs}ms cubic-bezier(0.12, 1, 0.28, 1)`
                        : "none",
                    willChange: "transform",
                  }}
                >
                  {STRIP.map((donut, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden"
                      style={{ height: ITEM_H, width: 200 }}
                    >
                      <Image
                        src={donut.image}
                        alt={donut.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                        priority={i < 9}
                      />
                    </div>
                  ))}
                </div>

                {/* ── CENTRE SELECTION HIGHLIGHT ── */}
                <div
                  className="absolute pointer-events-none z-20"
                  style={{
                    top: ITEM_H,
                    left: 0,
                    right: 0,
                    height: ITEM_H,
                    border: "2px solid #d4a017",
                    boxShadow: "inset 0 0 20px rgba(212,160,23,0.25)",
                  }}
                />

                {/* ── TOP FADE ── */}
                <div
                  className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                  style={{
                    height: ITEM_H,
                    background:
                      "linear-gradient(to bottom, #0d0705 25%, transparent)",
                  }}
                />
                {/* ── BOTTOM FADE ── */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
                  style={{
                    height: ITEM_H,
                    background: "linear-gradient(to top, #0d0705 25%, transparent)",
                  }}
                />
              </div>
            </div>

            {/* Spin glow pulse */}
            {spinning && (
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse"
                style={{ boxShadow: "0 0 50px 6px rgba(212,160,23,0.4)" }}
              />
            )}
          </div>

          {/* ── INFO PANEL ── */}
          <div className="flex flex-col items-center md:items-start gap-5 max-w-xs text-center md:text-left">
            {winner ? (
              <>
                <div className="space-y-1">
                  <p className="text-[#b8a78c] text-xs font-semibold tracking-widest uppercase">
                    Сегодня твой пончик:
                  </p>
                  <p
                    className="gold-gradient-text font-serif text-2xl sm:text-3xl font-bold leading-tight"
                    style={{ animation: "fadeInUp 0.4s ease both" }}
                  >
                    {winner.name}
                  </p>
                </div>

                {/* Winner thumbnail */}
                <div
                  className="relative rounded-2xl overflow-hidden border-2 border-[#d4a017]/60 shadow-lg"
                  style={{
                    width: 120,
                    height: 120,
                    boxShadow: "0 0 24px rgba(212,160,23,0.35)",
                    animation: "fadeInUp 0.4s 0.1s ease both",
                  }}
                >
                  <Image
                    src={winner.image}
                    alt={winner.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>

                <button
                  type="button"
                  onClick={spin}
                  className="rounded-full bg-[#d4a017] px-8 py-3 text-base font-bold text-[#1a0f08] shadow-lg shadow-[#d4a017]/30 hover:bg-[#e0ab1c] active:scale-95 transition-all"
                >
                  Крутить ещё!
                </button>
              </>
            ) : (
              <>
                <p className="text-[#b8a78c] text-base leading-relaxed">
                  {spinning
                    ? "Барабан решает…"
                    : "Нажми кнопку и узнай свой пончик дня!"}
                </p>

                <button
                  type="button"
                  onClick={spin}
                  disabled={spinning}
                  className="rounded-full px-10 py-4 text-xl font-black text-[#1a0f08] tracking-wide shadow-xl active:scale-95 transition-all disabled:cursor-not-allowed"
                  style={{
                    background: spinning
                      ? "#a07c10"
                      : "linear-gradient(135deg, #f5d76e 0%, #d4a017 60%, #b8860b 100%)",
                    boxShadow: spinning
                      ? "none"
                      : "0 4px 32px rgba(212,160,23,0.45)",
                    opacity: spinning ? 0.7 : 1,
                  }}
                >
                  {spinning ? "⏳ Крутится…" : "🎰 КРУТИ"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* fadeInUp animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
