import { useEffect, useState } from 'react';
import GatewayCarousel from '@/pages/home/components/GatewayCarousel';
import QuickSignupModal from '@/components/feature/QuickSignupModal';
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

  const scrollToCountries = () => {
    const el = document.querySelector('#countries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#04060b]">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=deep%20space%20dark%20navy%20starfield%20background%20with%20tiny%20scattered%20stars%20and%20faint%20teal%20and%20gold%20nebula%20glow%2C%20minimal%20abstract%20cosmic%20art%2C%20very%20dark%20center%20area%2C%20cinematic%20wide%20composition&width=1920&height=1080&seq=gateway-hero-2026-11&orientation=landscape"
          alt="Nền không gian tối với các vì sao"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04060b]/85 via-[#04060b]/78 to-[#04060b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(53,224,192,0.14),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(246,211,107,0.08),transparent_60%)]" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="w-full max-w-6xl mx-auto text-center">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#35e0c0]/30 bg-[#35e0c0]/8 px-3 py-1.5 sm:mb-6 sm:px-3.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80] block pulse-dot" />
            <span className="whitespace-nowrap text-[9px] font-semibold tracking-[0.13em] text-[#7ef3e0] uppercase sm:text-[10.5px] sm:tracking-[0.2em]">
              Hệ thống hoạt động · 10 cổng
            </span>
          </div>

          <h1 className="font-brand-straight hero-color-cycle text-balance text-[40px] leading-[1.06] sm:text-[62px] md:text-[84px]">
            Cổng Quốc Tế
          </h1>

          <p className="font-brand-straight hero-color-cycle mx-auto mt-2 w-full text-balance text-[20px] leading-[1.2] sm:mt-3 sm:text-[32px] md:text-[46px]">
            Link kết nối cổng quốc tế
          </p>

          <div className="mt-7 md:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setSignupOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-[#f6d36b] hover:bg-[#ffdf8c] text-[#0a0a0b] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-user-add-line text-base" />
              </span>
              Đăng Ký Ngay
            </button>
            <button
              type="button"
              onClick={scrollToCountries}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border border-[#35e0c0]/45 text-[#7ef3e0] hover:bg-[#35e0c0]/12 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-global-line text-base" />
              </span>
              Xem tất cả cổng quốc gia
            </button>
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
              <p className="mt-1 text-[12.5px] md:text-[13px] font-semibold text-[#f6d36b] whitespace-nowrap">
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