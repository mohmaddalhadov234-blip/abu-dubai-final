"use client"

import { useState, useEffect, type FormEvent } from "react"
import { Star, CheckCircle2, Loader2 } from "lucide-react"

type Review = {
  id: string
  name: string
  rating: number
  text: string
  created_at: string
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "сегодня"
  if (diffDays === 1) return "вчера"
  if (diffDays < 7) return `${diffDays} дня назад`
  if (diffDays < 14) return "неделю назад"
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} недели назад`
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
}

export function Reviews() {
  const defaultReviews: Review[] = [
    {
      id: "default-1",
      name: "Магомед",
      rating: 5,
      text: "Завтракаем тут почти каждое утро. Сырники просто огонь, сэндвичи свежие. Ребята молодцы!",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "default-2",
      name: "Залина",
      rating: 5,
      text: "Пончик Лотус — это что-то нереальное! Хрустящее печенье, нежный крем. Беру каждый раз по несколько штук. Лучшее место в Шали однозначно!",
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "default-3",
      name: "Аслан",
      rating: 5,
      text: "Айс Дубай и пончик Фисташковый — идеальное сочетание. Атмосфера уютная, персонал дружелюбный. Рекомендую всем друзьям!",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setReviews(data)
        else setReviews(defaultReviews)
      })
      .catch(() => setReviews(defaultReviews))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    const trimmedText = text.trim()

    if (trimmedName.length < 2) {
      setError("Пожалуйста, введите имя (минимум 2 символа)")
      return
    }
    if (trimmedText.length < 5) {
      setError("Пожалуйста, напишите отзыв (минимум 5 символов)")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, rating, text: trimmedText }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Ошибка при отправке")
        return
      }

      setReviews((prev) => [data, ...prev])
      setName("")
      setText("")
      setRating(5)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3500)
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="reviews" className="relative py-16 sm:py-24 bg-[#1a0f08] scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#d4a017] font-semibold tracking-widest uppercase mb-3">
            Отзывы
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-balance">
            <span className="gold-gradient-text">Что говорят гости</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Reviews list */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 text-[#d4a017] animate-spin" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-2xl border border-[#d4a017]/20 bg-[#241509] p-8 text-center">
                <p className="text-[#b8a78c]">Пока нет отзывов. Будьте первым!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-[#d4a017]/20 bg-[#241509] p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="h-10 w-10 shrink-0 rounded-full bg-[#d4a017] flex items-center justify-center font-serif font-bold text-[#1a0f08]"
                        aria-hidden="true"
                      >
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#f5e6d3] truncate">{review.name}</p>
                        <p className="text-xs text-[#b8a78c]">{formatDate(review.created_at)}</p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-0.5"
                      aria-label={`Оценка ${review.rating} из 5`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-[#d4a017] text-[#d4a017]"
                              : "text-[#b8a78c]/30"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#f5e6d3]/90 leading-relaxed text-sm sm:text-base">
                    {review.text}
                  </p>
                </article>
              ))
            )}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-[#d4a017]/30 bg-[#241509] p-6 sm:p-8 lg:sticky lg:top-24 h-fit">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5e6d3] mb-2">
              Оставить отзыв
            </h3>
            <p className="text-sm text-[#b8a78c] mb-6">
              Поделитесь впечатлениями о посещении кафе
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="review-name" className="block text-sm font-semibold text-[#f5e6d3] mb-2">
                  Ваше имя
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например, Магомед"
                  maxLength={50}
                  className="w-full rounded-xl bg-[#1a0f08] border border-[#d4a017]/30 px-4 py-3 text-[#f5e6d3] placeholder:text-[#b8a78c]/60 outline-none transition focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/30"
                />
              </div>

              <div>
                <p className="block text-sm font-semibold text-[#f5e6d3] mb-2">Оценка</p>
                <div className="flex items-center gap-1" role="radiogroup" aria-label="Оценка">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const filled = (hover || rating) >= value
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating === value}
                        aria-label={`${value} из 5`}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(value)}
                        className="p-1 transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`h-7 w-7 sm:h-8 sm:w-8 transition-colors ${
                            filled ? "fill-[#d4a017] text-[#d4a017]" : "text-[#b8a78c]/40"
                          }`}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="review-text" className="block text-sm font-semibold text-[#f5e6d3] mb-2">
                  Ваш отзыв
                </label>
                <textarea
                  id="review-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Расскажите о своём опыте..."
                  rows={4}
                  maxLength={500}
                  className="w-full rounded-xl bg-[#1a0f08] border border-[#d4a017]/30 px-4 py-3 text-[#f5e6d3] placeholder:text-[#b8a78c]/60 outline-none transition focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/30 resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400" role="alert">{error}</p>
              )}

              {submitted && (
                <div
                  className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/40 px-4 py-3 text-green-400 text-sm"
                  role="status"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>Спасибо! Ваш отзыв опубликован.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[#d4a017] px-6 py-3.5 font-bold text-[#1a0f08] shadow-lg shadow-[#d4a017]/20 transition-all hover:bg-[#e0ad28] hover:shadow-xl active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Отправляем..." : "Отправить отзыв"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
