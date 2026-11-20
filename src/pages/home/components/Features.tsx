import { highlights } from '@/mocks/content';

export default function Features() {
  return (
    <section id="about" className="relative w-full bg-[#0a0a0b] py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e0b36a] uppercase">
              Vì sao chọn chúng tôi
            </p>
            <h2 className="font-display mt-3 text-3xl md:text-[42px] leading-tight font-bold text-white">
              Một nơi duy nhất cho mười quốc gia
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a29d95]">
              Thay vì nhắn tin rải rác nhiều nơi và chờ đợi, bạn chỉ cần chọn đúng cổng khu vực. Yêu cầu được
              chuyển thẳng tới người phụ trách, kèm đầy đủ ngữ cảnh bạn đã để lại.
            </p>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group rounded-lg border border-white/8 bg-[#101013] p-5 md:p-6 hover:border-[#e0b36a]/40 hover:bg-[#121216] transition-colors duration-300"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-md bg-[#e0b36a]/12 text-[#e0b36a] group-hover:bg-[#e0b36a] group-hover:text-[#0a0a0b] transition-colors duration-300">
                  <i className={`${item.icon} text-xl`} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8f8a83]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}