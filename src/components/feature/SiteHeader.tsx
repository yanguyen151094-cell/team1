import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GATE_REDIRECT_URL } from '@/components/feature/QuickSignupForm';

const navItems = [
  { label: 'Trang Chủ', hash: '#home' },
  { label: 'Cổng Quốc Tế', hash: '#countries' },
  { label: 'Quy Trình', hash: '#process' },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const goToSection = (hash: string) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(`/${hash}`);
  };

  const goToRegister = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    navigate('/dang-ky');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0b]/92 backdrop-blur-xl border-b border-white/8'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-4 md:px-8 flex items-center justify-between h-16 md:h-[72px]">
        <Link to="/" aria-label="YG88 - Hỗ trợ đa quốc gia" className="flex items-center gap-2.5 cursor-pointer group">
          <span className="flex flex-col leading-none">
            <span className="font-brand brand-logo block pl-1 text-[24px] leading-none tracking-[0.02em] md:text-[28px]">
              YG88
            </span>
            <span className="mt-1 pl-1 text-[8.5px] tracking-[0.2em] text-[#8d8a83] uppercase md:text-[9.5px] md:tracking-[0.24em]">
              Hỗ trợ đa quốc gia
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <button
              key={item.hash}
              onClick={() => goToSection(item.hash)}
              className="px-3.5 py-2 rounded-md text-[13px] font-medium text-[#b6b1a9] hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={GATE_REDIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#e8f52a]/45 text-[#e8f52a] hover:bg-[#e8f52a]/12 text-[13px] font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-login-box-line text-base" />
            </span>
            Đăng Nhập
          </a>

          <a
            href="/dang-ky"
            onClick={goToRegister}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#e8f52a] hover:bg-[#f2ff5c] text-[#0a0a0b] text-[13px] font-bold transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-user-add-line text-base" />
            </span>
            Đăng Ký
          </a>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Mở menu"
            aria-expanded={menuOpen}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md border border-white/12 text-white cursor-pointer"
          >
            <i className={`text-lg ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0a0a0b]/97 backdrop-blur-xl border-t border-white/8 px-4 pb-5 pt-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.hash}
              onClick={() => goToSection(item.hash)}
              className="text-left px-3 py-3 rounded-md text-sm font-medium text-[#cfcac2] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <a
            href={GATE_REDIRECT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="relative z-10 mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-[#e8f52a]/45 text-[#e8f52a] text-sm font-bold cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-login-box-line text-base" />
            </span>
            Đăng Nhập
          </a>

          <a
            href="/dang-ky"
            onClick={goToRegister}
            className="relative z-10 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#e8f52a] text-[#0a0a0b] text-sm font-bold cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-user-add-line text-base" />
            </span>
            Đăng Ký Ngay
          </a>
        </div>
      )}
    </header>
  );
}