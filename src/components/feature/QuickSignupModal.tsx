import { useEffect } from 'react';
import QuickSignupForm from '@/components/feature/QuickSignupForm';

interface QuickSignupModalProps {
  open: boolean;
  country?: string;
  source?: string;
  onClose: () => void;
}

export default function QuickSignupModal({ open, country, source, onClose }: QuickSignupModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center px-0 sm:px-4">
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
      />

      <div className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-lg border border-[#35e0c0]/20 bg-[#050d12] p-5 sm:p-6 animate-rise">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35e0c0]/60 to-transparent" />

        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9.5px] font-semibold tracking-[0.2em] text-[#7ef3e0] uppercase">
              Đăng ký nhận link cổng
            </p>
            <h3 className="mt-2 text-[17px] font-bold leading-snug text-white">
              {country ? `Cổng ${country}` : 'Để lại thông tin liên hệ'}
            </h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#8fa0aa]">
              Điền số điện thoại hoặc Telegram, bấm Đăng ký là hệ thống mở link cổng cho bạn.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng biểu mẫu"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-md border border-white/12 text-[#9aa8b3] hover:border-white/30 hover:text-white transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <QuickSignupForm country={country} source={source} onDone={onClose} />
      </div>
    </div>
  );
}