import { useState } from 'react';
import QuickSignupModal from '@/components/feature/QuickSignupModal';
import { countries } from '@/mocks/content';

export default function Countries() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="countries" className="relative w-full overflow-hidden bg-[#04060b] py-16 md:py-24 border-y border-white/8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(53,224,192,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(246,211,107,0.05),transparent_55%)]" />

      <div className="relative w-full px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[10.5px] font-semibold tracking-[0.24em] text-[#7ef3e0] uppercase">
              Toàn bộ cổng quốc gia
            </p>
            <h2 className="font-tech mt-3 text-[26px] md:text-[34px] leading-tight font-bold text-white uppercase">
              Chọn cổng của bạn
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[#98a5b0]">
              Mười cổng, mười đội ngũ phụ trách riêng. Bấm <strong className="font-semibold text-[#dbe6ec]">VÀO CỔNG</strong> ở
              quốc gia bạn đang ở, để lại số điện thoại và Telegram — người phụ trách sẽ chủ động liên hệ lại.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#35e0c0]/25 bg-[#35e0c0]/8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] block pulse-dot" />
              <span className="text-[11px] text-[#9fc9c3] whitespace-nowrap">
                10/10 cổng đang hoạt động · bảo mật AES-256
              </span>
            </div>
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 md:gap-4">
            {countries.map((country, index) => (
              <article
                key={country.code}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#071016]/85 p-4 transition-all duration-400 hover:-translate-y-1 hover:border-[#35e0c0]/50 hover:bg-[#08161d] duration-300"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35e0c0]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-3 top-1.5 font-tech text-[26px] leading-none font-extrabold text-white/5 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.16em] text-[#4ade80] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] block" />
                    Online
                  </span>
                  <span className="text-[10px] text-[#75838f] uppercase tracking-[0.12em]">
                    {country.code}
                  </span>
                </div>

                <div className="relative mt-4 flex items-center gap-3">
                  <div className="relative shrink-0 w-11 h-11 rounded-full flex items-center justify-center border border-[#35e0c0]/25 bg-[#050c12]">
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(53,224,192,0.28),transparent_65%)]" />
                    <img
                      src={country.flagUrl}
                      alt={`Cờ ${country.name}`}
                      className="relative w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-bold text-white uppercase tracking-[0.06em] truncate">
                      {country.name}
                    </h3>
                    <p className="mt-0.5 text-[10px] tracking-[0.1em] text-[#35e0c0]/80 uppercase truncate">
                      {country.region}
                    </p>
                  </div>
                </div>

                <dl className="relative mt-4 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-[#75838f] uppercase tracking-wide">Ping</dt>
                    <dd className="font-semibold text-[#35e0c0] whitespace-nowrap">{country.ping}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-[#75838f] uppercase tracking-wide">Mã hóa</dt>
                    <dd className="font-semibold text-[#d5dee4] whitespace-nowrap">AES-256</dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-[#75838f] uppercase tracking-wide">Tải</dt>
                    <dd className="font-semibold text-[#fbbf24] whitespace-nowrap">{country.load}</dd>
                  </div>
                </dl>

                <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#35e0c0] to-[#4ade80]"
                    style={{ width: country.load }}
                  />
                </div>

                <p className="relative mt-3 flex-1 text-[11.5px] leading-relaxed text-[#75838f] line-clamp-2">
                  {country.desc}
                </p>

                <button
                  type="button"
                  onClick={() => setSelected(country.name)}
                  className="relative mt-4 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-[#35e0c0]/35 text-[#35e0c0] text-[11.5px] font-bold tracking-[0.08em] transition-colors duration-300 hover:bg-[#35e0c0] hover:text-[#04120f] cursor-pointer whitespace-nowrap"
                >
                  <span className="w-3.5 h-3.5 flex items-center justify-center">
                    <i className="ri-login-box-line text-[13px]" />
                  </span>
                  VÀO CỔNG
                </button>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-[12px] leading-relaxed text-[#66737d]">
            Không thấy quốc gia của bạn? Để lại thông tin ở cổng Việt Nam hoặc dùng khung chat ở góc màn hình,
            đội ngũ sẽ chuyển đúng người phụ trách.
          </p>
        </div>
      </div>

      <QuickSignupModal
        open={selected !== null}
        country={selected ?? undefined}
        source="country-list"
        onClose={() => setSelected(null)}
      />
    </section>
  );
}