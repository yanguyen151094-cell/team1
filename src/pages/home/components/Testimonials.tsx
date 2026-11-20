import { testimonials } from '@/mocks/content';

export default function Testimonials() {
  return (
    <section id="reviews" className="relative w-full bg-[#0d0d10] py-16 md:py-24 border-y border-white/10">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e0b36a] uppercase">
                Khách hàng nói gì
              </p>
              <h2 className="font-display mt-3 text-3xl md:text-[42px] leading-tight font-bold text-white">
                Được tin ở mười quốc gia
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 text-[#e0b36a]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <span key={star} className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-star-fill text-sm" />
                  </span>
                ))}
              </div>
              <p className="text-[13px] text-[#a29d95]">
                <span className="text-white font-semibold">4,9/5</span> · 1.284 đánh giá
              </p>
            </div>
          </div>

          <div className="mt-9 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="rounded-lg border border-white/10 bg-[#101013] p-5 md:p-6 flex flex-col h-full"
              >
                <div className="flex items-center gap-0.5 text-[#e0b36a]">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <span key={star} className="w-3.5 h-3.5 flex items-center justify-center">
                      <i className="ri-star-fill text-[11px]" />
                    </span>
                  ))}
                </div>
                <blockquote className="mt-3.5 text-[13px] leading-relaxed text-[#c2bdb5] flex-1">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                  <span className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e0b36a]/12 text-base shrink-0">
                    {item.flag}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-white truncate">{item.name}</span>
                    <span className="block text-[11px] text-[#7d7871] truncate">{item.place}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}