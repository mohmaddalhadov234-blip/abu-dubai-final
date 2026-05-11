import Image from "next/image"

const photos = [
  {
    src: "/cafe/facade-39donuts.jpg",
    alt: "Фасад кафе с неоновой вывеской 39 donuts",
    className: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
  },
  {
    src: "/cafe/counter.jpg",
    alt: "Барная стойка с витриной и кофемашиной",
    className: "aspect-square",
  },
  {
    src: "/cafe/interior-table.jpg",
    alt: "Уютный круглый стол с кожаным креслом",
    className: "aspect-square",
  },
  {
    src: "/cafe/interior-arches.jpg",
    alt: "Зал с арками и логотипом 39 donuts на стене",
    className: "aspect-square",
  },
  {
    src: "/cafe/interior-mirror.jpg",
    alt: "Арочное зеркало с подсветкой",
    className: "aspect-square",
  },
  {
    src: "/cafe/interior-hall.jpg",
    alt: "Общий вид зала кафе",
    className: "md:col-span-2 aspect-[16/9] md:aspect-[2/1]",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="relative py-16 sm:py-24 bg-[#1a0f08]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#d4a017] font-semibold tracking-widest uppercase mb-3">
            Атмосфера
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-balance">
            <span className="gold-gradient-text">Наше кафе</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#b8a78c] text-base sm:text-lg leading-relaxed text-pretty">
            Тёплый свет, дерево, мягкие диваны и аромат свежей выпечки —
            место, куда хочется возвращаться.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-2xl border border-[#d4a017]/20 bg-[#241509] group ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
