import { useEffect } from 'react';
import LeadCaptureForm from '@/components/feature/LeadCaptureForm';

interface LeadModalProps {
  open: boolean;
  country?: string;
  title?: string;
  subtitle?: string;
  onClose: () => void;
}

export default function LeadModal({
  open,
  country,
  title,
  subtitle,
  onClose,
}: LeadModalProps) {
  useEffect(() => {
    if (!open) return;
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
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center px-0 sm:px-4">
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
      />

      <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-lg border border-white/10 bg-[#0d0d10] p-5 sm:p-7 animate-rise">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-bold text-white">
              {title ?? 'Để lại thông tin liên hệ'}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#a29d95]">
              {subtitle ?? 'Điền số điện thoại và Telegram, đội ngũ sẽ liên hệ lại trong vài phút.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng biểu mẫu"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-md border border-white/12 text-[#b6b1a9] hover:text-white hover:border-white/30 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <LeadCaptureForm country={country} />
      </div>
    </div>
  );
}