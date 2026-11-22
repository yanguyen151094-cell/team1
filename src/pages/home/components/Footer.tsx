import { Link } from 'react-router-dom';
import { countries } from '@/mocks/content';

const supportLinks = [
  { label: 'Trung tâm hỗ trợ', href: '#faq' },
  { label: 'Quy trình tiếp nhận', href: '#process' },
  { label: 'Chính sách bảo mật', href: '#faq' },
  { label: 'Điều khoản sử dụng', href: '#faq' },
];

const socials = [
  { icon: 'ri-telegram-fill', href: 'https://t.me/', label: 'Telegram' },
  { icon: 'ri-whatsapp-fill', href: 'https://zalo.me/', label: 'Zalo' },
  { icon: 'ri-messenger-fill', href: 'https://m.me/', label: 'Messenger' },
  { icon: 'ri-mail-line', href: 'https://t.me/', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0b] border-t border-white/10">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex flex-col leading-none">
                <span className="font-brand brand-logo block pl-1 text-[26px] leading-none tracking-[0.02em]">
                  YG88
                </span>
                <span className="mt-1 pl-1 text-[9px] tracking-[0.22em] text-[#8d8a83] uppercase">
                  Hỗ trợ đa quốc gia
                </span>
              </span>
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-[#7d7871] max-w-xs">
              Cổng tiếp nhận yêu cầu và hỗ trợ khách hàng tại 11 quốc gia. Rõ ràng, kín đáo, có người phụ trách
              theo từng khu vực.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-white/10 text-[#8d8a83] hover:text-[#e0b36a] hover:border-[#e0b36a]/50 transition-colors cursor-pointer"
                >
                  <i className={`${item.icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-white mb-4">
              <a href="#countries" className="hover:text-[#e0b36a] transition-colors cursor-pointer">
                Cổng quốc gia
              </a>
            </h4>
            <ul className="flex flex-col gap-2.5">
              {countries.slice(0, 6).map((country) => (
                <li key={country.code}>
                  <a
                    href="#countries"
                    className="flex items-center gap-2 text-[13px] text-[#7d7871] hover:text-[#cfcac2] transition-colors cursor-pointer"
                  >
                    <span aria-hidden="true">{country.flag}</span>
                    {country.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-white mb-4">
              <a href="#faq" className="hover:text-[#e0b36a] transition-colors cursor-pointer">
                Hỗ trợ
              </a>
            </h4>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[13px] text-[#7d7871] hover:text-[#cfcac2] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-white mb-4">
              <Link to="/dang-ky" className="hover:text-[#e0b36a] transition-colors cursor-pointer">
                Bắt đầu
              </Link>
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  to="/dang-ky"
                  className="text-[13px] text-[#7d7871] hover:text-[#cfcac2] transition-colors cursor-pointer"
                >
                  Đăng ký nhận hỗ trợ
                </Link>
              </li>
              <li>
                <a
                  href="#countries"
                  className="text-[13px] text-[#7d7871] hover:text-[#cfcac2] transition-colors cursor-pointer"
                >
                  Chọn cổng quốc gia
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#7d7871] hover:text-[#cfcac2] transition-colors cursor-pointer"
                >
                  Nhắn Telegram
                </a>
              </li>
              <li>
                <a
                  href="#countries"
                  className="text-[13px] text-[#7d7871] hover:text-[#cfcac2] transition-colors cursor-pointer"
                >
                  Yêu cầu gọi lại
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#5f5b55] text-center sm:text-left">
            © {new Date().getFullYear()} YG88. Trang cung cấp thông tin và tiếp nhận yêu cầu hỗ trợ.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[12px] text-[#5f5b55]">
              <span className="w-4 h-4 flex items-center justify-center text-[#7ed9a4]">
                <i className="ri-shield-check-line text-sm" />
              </span>
              Bảo mật thông tin
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-[#5f5b55]">
              <span className="w-4 h-4 flex items-center justify-center text-[#7ed9a4]">
                <i className="ri-time-line text-sm" />
              </span>
              Phản hồi dưới 5 phút
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}