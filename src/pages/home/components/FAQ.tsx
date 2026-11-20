import { useState } from 'react';
import { faqs } from '@/mocks/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full bg-[#0a0a0b] py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e0b36a] uppercase">Hỏi đáp</p>
            <h2 className="font-display mt-3 text-3xl md:text-[40px] leading-tight font-bold text-white">
              Giải đáp nhanh
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[#a29d95]">
              Những câu hỏi thường gặp nhất trước khi để lại thông tin. Nếu vẫn chưa rõ, bạn dùng nút hỗ trợ
              ở góc màn hình.
            </p>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#e0b36a] hover:text-[#eec27f] transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-question-answer-line text-base" />
              </span>
              Hỏi trực tiếp trên Telegram
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.q}
                  className={`rounded-lg border transition-colors duration-300 ${
                    isOpen ? 'border-[#e0b36a]/40 bg-[#101013]' : 'border-white/10 bg-[#0d0d10]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-4 md:px-5 py-4 text-left cursor-pointer"
                  >
                    <span className={`text-[14px] font-medium ${isOpen ? 'text-white' : 'text-[#cfcac2]'}`}>
                      {item.q}
                    </span>
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#e0b36a] text-[#0a0a0b] rotate-45' : 'bg-white/5 text-[#8d8a83]'
                      }`}
                    >
                      <i className="ri-add-line text-sm" />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-4 md:px-5 pb-4 text-[13px] leading-relaxed text-[#8f8a83]">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}