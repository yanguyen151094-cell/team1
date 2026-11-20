import { useCallback, useEffect, useState } from 'react';
import FlagGlobe from '@/components/feature/FlagGlobe';
import QuickSignupModal from '@/components/feature/QuickSignupModal';
import { countries } from '@/mocks/content';

const AUTOPLAY_MS = 4600;

function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const calc = () => {
      const width = window.innerWidth;
      if (width < 768) setPerView(1);
      else if (width < 1180) setPerView(2);
      else setPerView(3);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return perView;
}

function InfoRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-[10.5px] font-bold tracking-[0.05em] text-[#c6d4d0] uppercase whitespace-nowrap">{label}</dt>
      <dd className={`text-[11.5px] font-bold whitespace-nowrap ${valueClass}`}>{value}</dd>
    </div>
  );
}

interface GatewayCardProps {
  country: (typeof countries)[number];
  index: number;
  onEnter: () => void;
}

function GatewayCard({ country, index, onEnter }: GatewayCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-xl border border-[#35e0c0]/25 bg-[linear-gradient(180deg,#08161d_0%,#05101a_55%,#040b13_100%)] p-4 md:p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#35e0c0]/55">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35e0c0]/70 to-transparent" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[#35e0c0]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="pointer-events-none absolute right-3 top-2 font-tech text-[34px] leading-none font-extrabold text-white/5 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.16em] text-[#4ade80] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] block pulse-dot" />
          Online
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]/80 block" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]/80 block" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/90 block" />
        </span>
      </div>

      <div className="relative mt-5 flex justify-center">
        <FlagGlobe flagUrl={country.flagUrl} name={country.name} duration={8 + (index % 4) * 1.6} />
      </div>

      <h3 className="relative mt-4 text-center text-[15px] font-extrabold tracking-[0.08em] text-white uppercase">
        {country.name}
      </h3>
      <p className="relative mt-1 text-center text-[10px] tracking-[0.14em] text-[#35e0c0]/80 uppercase">
        {country.region}
      </p>

      <dl className="relative mt-4 space-y-2.5 rounded-lg border border-white/10 bg-[#020712]/85 p-3">
        <InfoRow label="Độ trễ (ping)" value={country.ping} valueClass="text-[#35e0c0]" />
        <InfoRow label="Mã hóa" value="AES-256" valueClass="text-[#a8e6dd]" />
        <InfoRow label="Tải máy chủ" value={country.load} valueClass="text-[#f27ac8]" />
        <InfoRow label="Trạng thái" value="HOẠT ĐỘNG" valueClass="text-[#4ade80]" />
      </dl>

      <button
        type="button"
        onClick={onEnter}
        className="relative mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-[#35e0c0]/60 bg-[#04121a] text-[#d9fff7] text-[12.5px] font-bold tracking-[0.1em] transition-colors duration-300 hover:bg-[#35e0c0] hover:text-[#04120f] cursor-pointer whitespace-nowrap"
      >
        VÀO CỔNG
        <span className="w-3.5 h-3.5 flex items-center justify-center">
          <i className="ri-arrow-right-line text-[12px]" />
        </span>
      </button>
    </article>
  );
}

export default function GatewayCarousel() {
  const perView = usePerView();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const maxIndex = Math.max(0, countries.length - perView);

  useEffect(() => {
    setActive((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, maxIndex]);

  const goPrev = useCallback(() => {
    setActive((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Cổng trước"
          className="shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-white/15 text-[#9aa8b3] transition-colors duration-300 hover:text-[#35e0c0] hover:border-[#35e0c0]/60 cursor-pointer"
        >
          <i className="ri-arrow-left-s-line text-lg" />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="flex items-stretch transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.68,0.32,1)]"
            style={{ transform: `translateX(-${(active * 100) / perView}%)` }}
          >
            {countries.map((country, index) => (
              <div
                key={country.code}
                className="shrink-0 px-1.5 md:px-2"
                style={{ width: `${100 / perView}%` }}
              >
                <GatewayCard
                  country={country}
                  index={index}
                  onEnter={() => setSelected(country.name)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Cổng tiếp theo"
          className="shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-white/15 text-[#9aa8b3] transition-colors duration-300 hover:text-[#35e0c0] hover:border-[#35e0c0]/60 cursor-pointer"
        >
          <i className="ri-arrow-right-s-line text-lg" />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="relative h-[3px] w-40 md:w-56 overflow-hidden rounded-full bg-white/10">
          <div
            key={`${active}-${paused}-${perView}`}
            className="gate-progress h-full w-full rounded-full bg-[#35e0c0]"
            style={{
              animationDuration: `${AUTOPLAY_MS}ms`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Nhóm cổng ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === active ? 'w-6 bg-[#35e0c0]' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      <QuickSignupModal
        open={selected !== null}
        country={selected ?? undefined}
        source="gateway-carousel"
        onClose={() => setSelected(null)}
      />
    </div>
  );
}