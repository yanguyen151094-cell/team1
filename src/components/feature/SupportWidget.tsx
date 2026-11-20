import { useEffect, useRef, useState } from 'react';
import LeadModal from '@/components/feature/LeadModal';
import { supportChannels } from '@/mocks/content';

export default function SupportWidget() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setHintVisible(true), 2600);
    const hideTimer = window.setTimeout(() => setHintVisible(false), 12000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [panelOpen]);

  return (
    <>
      <div ref={wrapRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] flex flex-col items-end gap-3">
        {panelOpen && (
          <div className="w-[calc(100vw-2rem)] max-w-[340px] rounded-lg border border-white/10 bg-[#0d0d10] shadow-2xl shadow-black/60 overflow-hidden animate-rise">
            <div className="flex items-start justify-between gap-3 px-4 py-3.5 bg-[#e0b36a]/10 border-b border-white/8">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e0b36a] text-[#0a0a0b] shrink-0">
                  <i className="ri-customer-service-2-line text-lg" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-white">Hỗ trợ trực tuyến</p>
                  <p className="text-[11px] text-[#a29d95] flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7ed9a4] block" />
                    Đang có người trực
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Đóng khung hỗ trợ"
                className="w-7 h-7 flex items-center justify-center rounded-md text-[#8d8a83] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <i className="ri-close-line text-base" />
              </button>
            </div>

            <div className="p-3 flex flex-col gap-1.5">
              {supportChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-2.5 py-2.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-md bg-white/6 text-[#e0b36a] shrink-0">
                    <i className={`${channel.icon} text-base`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-white">{channel.label}</span>
                    <span className="block text-[11px] text-[#8d8a83] truncate">{channel.hint}</span>
                  </span>
                  <span className="w-4 h-4 flex items-center justify-center text-[#6f6b65] group-hover:text-[#e0b36a] transition-colors shrink-0">
                    <i className="ri-arrow-right-up-line text-sm" />
                  </span>
                </a>
              ))}
            </div>

            <div className="px-3 pb-3">
              <button
                type="button"
                onClick={() => {
                  setPanelOpen(false);
                  setModalOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#e0b36a] hover:bg-[#eec27f] text-[#0a0a0b] text-[13px] font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line text-sm" />
                </span>
                Để lại SĐT &amp; Telegram
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          {hintVisible && !panelOpen && (
            <div className="hidden sm:flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-full bg-[#0d0d10] border border-white/10">
              <span className="text-[12px] text-[#cfcac2] whitespace-nowrap">Cần hỗ trợ? Bấm vào đây</span>
              <button
                type="button"
                onClick={() => setHintVisible(false)}
                aria-label="Bỏ gợi ý"
                className="w-5 h-5 flex items-center justify-center rounded-full text-[#6f6b65] hover:text-white cursor-pointer"
              >
                <i className="ri-close-line text-xs" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setPanelOpen((prev) => !prev);
              setHintVisible(false);
            }}
            aria-label="Mở khung hỗ trợ"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-[#e0b36a] text-[#0a0a0b] animate-halo cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <i className={`text-2xl ${panelOpen ? 'ri-close-line' : 'ri-customer-service-2-fill'}`} />
          </button>
        </div>
      </div>

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Để lại thông tin để được gọi lại"
        subtitle="Chúng tôi sẽ liên hệ qua Telegram hoặc số điện thoại bạn để lại, thường trong vòng 5 phút."
      />
    </>
  );
}