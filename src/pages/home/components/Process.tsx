import { processSteps } from '@/mocks/content';
import { Link } from 'react-router-dom';

export default function Process() {
  return (
    <section id="process" className="relative w-full bg-[#0a0a0b] py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e0b36a] uppercase">Quy trình</p>
            <h2 className="font-display mt-3 text-3xl md:text-[42px] leading-tight font-bold text-white">
              Bốn bước, không rườm rà
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a29d95]">
              Mỗi bước đều có mốc thời gian rõ ràng để bạn biết mình đang ở đâu và chờ trong bao lâu.
            </p>
          </div>

          <div className="mt-11 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className="relative rounded-lg border border-white/8 bg-[#101013] p-5 md:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 flex items-center justify-center rounded-md bg-[#e0b36a]/12 text-[#e0b36a]">
                    <i className={`${step.icon} text-lg`} />
                  </span>
                  <span className="font-display text-2xl font-bold text-white/12">{step.step}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8f8a83]">{step.desc}</p>

                {index < processSteps.length - 1 && (
                  <span className="hidden lg:flex absolute top-1/2 -right-3.5 w-3 h-3 items-center justify-center text-[#e0b36a]/50">
                    <i className="ri-arrow-right-s-line text-base" />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/dang-ky"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#e0b36a] hover:bg-[#eec27f] text-[#0a0a0b] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-circle-line text-base" />
              </span>
              Bắt đầu bước đầu tiên
            </Link>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border border-white/15 hover:border-[#e0b36a]/60 text-[#e6e1d9] hover:text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-telegram-fill text-base" />
              </span>
              Nhắn Telegram trước
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}