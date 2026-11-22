import { useEffect, useState } from 'react';
import GatewayCarousel from '@/pages/home/components/GatewayCarousel';
import HeroBackground from '@/pages/home/components/HeroBackground';
import QuickSignupModal from '@/components/feature/QuickSignupModal';
import { GATE_REDIRECT_URL } from '@/lib/siteConfig';
import { gatewayRuntime } from '@/mocks/content';

export default function Hero() {
  const [now, setNow] = useState<Date | null>(null);
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const clockLabel = now
    ? now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false })
    : '--:--:--';

  return (
    <section id="home" className="relative overflow-hidden bg-[#04060b]">
      <HeroBackground />

      <div className="relative z-10 w-full px-4 md:px-8 pt-20 md:pt-28 pb-12 md:pb-20">
        <div className="w-full max-w-6xl mx-auto text-center">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#35e0c0]/30 bg-[#35e0c0]/8 px-3 py-1.5 sm:mb-5 sm:px-3.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80] block pulse-dot" />
            <span className="whitespace-nowrap text-[9px] font-semibold tracking-[0.13em] text-[#7ef3e0] uppercase sm:text-[10.5px] sm:tracking-[0.2em]">
              Hệ thống hoạt động · 11 cổng quốc gia
            </span>
          </div>

          <div className="billboard-frame mx-auto w-full max-w-[760px] px-4 py-5 sm:px-8 sm:py-7">
            <span className="billboard-corner billboard-corner-tl" aria-hidden="true" />
            <span className="billboard-corner billboard-corner-tr" aria-hidden="true" />
            <span className="billboard-corner billboard-corner-bl" aria-hidden="true" />
            <span className="billboard-corner billboard-corner-br" aria-hidden="true" />

            <p className="relative text-[8.5px] font-semibold tracking-[0.3em] text-[#8fd8cc] uppercase sm:text-[10px]">
              Kênh kết nối chính thức
            </p>

            <h1 className="billboard-text font-brand-straight relative mt-2 text-[27px] leading-[1.22] sm:text-[42px] sm:leading-[1.2] md:text-[56px]">
              Cổng Quốc Tế
            </h1>

            <p className="billboard-text font-brand-straight relative mt-1.5 pb-1 text-[12.5px] leading-[1.4] sm:mt-2 sm:text-[18px] md:text-[22px]">
              Link kết nối cổng quốc tế
            </p>

            <div className="relative mt-5 grid w-full grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSignupOpen(true)}
                className="w-full min-w-0 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#e8f52a] hover:bg-[#f2ff5c] text-[13px] font-bold text-[#0a0a0b] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-user-add-line text-base" />
                </span>
                Đăng Ký Ngay
              </button>

              <a
                href={GATE_REDIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-w-0 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-[#e8f52a]/50 text-[#e8f52a] hover:bg-[#e8f52a]/12 text-[13px] font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-login-box-line text-base" />
                </span>
                Đăng Nhập
              </a>
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <GatewayCarousel />
          </div>

          <div className="mt-8 md:mt-10 w-full max-w-4xl mx-auto rounded-lg border border-[#35e0c0]/22 bg-[#061016]/85 px-4 py-3.5 md:px-6 md:py-4 grid grid-cols-2 lg:grid-cols-4 gap-y-3.5 gap-x-4 text-left">
            <div>
              <p className="text-[9.5px] tracking-[0.14em] text-[#75838f] uppercase">Giờ hệ thống</p>
              <p className="mt-1 text-[12.5px] md:text-[13px] font-semibold text-[#35e0c0] whitespace-nowrap">
                {clockLabel} <span className="text-[10px] text-[#75838f]">UTC+7</span>
              </p>
            </div>
            <div>
              <p className="text-[9.5px] tracking-[0.14em] text-[#75838f] uppercase">IP hiện tại</p>
              <p className="mt-1 text-[12.5px] md:text-[13px] font-semibold text-[#e8f52a] whitespace-nowrap">
                {gatewayRuntime.ip}
              </p>
            </div>
            <div>
              <p className="text-[9.5px] tracking-[0.14em] text-[#75838f] uppercase">IP fake</p>
              <p className="mt-1 text-[12.5px] md:text-[13px] font-semibold text-[#35e0c0] whitespace-nowrap">
                {gatewayRuntime.fakeIp}
              </p>
            </div>
            <div>
              <p className="text-[9.5px] tracking-[0.14em] text-[#75838f] uppercase">Mức độ rủi ro</p>
              <p className="mt-1 text-[12.5px] md:text-[13px] font-semibold text-[#4ade80] whitespace-nowrap">
                {gatewayRuntime.risk}
              </p>
            </div>
          </div>
        </div>
      </div>

      <QuickSignupModal
        open={signupOpen}
        source="hero"
        onClose={() => setSignupOpen(false)}
      />
    </section>
  );
}