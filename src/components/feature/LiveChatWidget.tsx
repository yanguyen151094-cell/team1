import { useEffect, useState } from 'react';
import LeadModal from '@/components/feature/LeadModal';
import CommunityRoomPanel from '@/components/feature/CommunityRoomPanel';
import { chatMemberTotal } from '@/mocks/communityChat';

const memberTotalLabel =
  chatMemberTotal >= 1000 ? `${Math.floor(chatMemberTotal / 1000)}k` : String(chatMemberTotal);

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setNudge(true), 9000);
    return () => window.clearTimeout(showTimer);
  }, []);

  return (
    <>
      <div className="fixed bottom-4 left-4 right-3 z-[70] flex flex-col items-start gap-3 sm:bottom-6 sm:left-6 sm:right-auto">
        {open && (
          <CommunityRoomPanel
            onMinimize={() => setOpen(false)}
            onOpenLead={() => setModalOpen(true)}
          />
        )}

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setOpen((prev) => !prev);
              setNudge(false);
            }}
            aria-label={open ? 'Đóng phòng trò chuyện' : 'Mở phòng trò chuyện cộng đồng'}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#35e0c0] text-[#04120f] transition-transform duration-200 hover:scale-105 cursor-pointer"
          >
            <i className={`text-2xl ${open ? 'ri-close-line' : 'ri-chat-smile-2-fill'}`} />
            {!open && (
              <>
                <span className="absolute inset-0 rounded-full ring-2 ring-[#35e0c0]/30 animate-ping" />
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#0a0a0b] bg-[#f6d36b] px-1.5 text-[9.5px] font-bold text-[#0a0a0b]">
                  {memberTotalLabel}
                </span>
              </>
            )}
          </button>

          {!open && nudge && (
            <div className="hidden max-w-[238px] items-center gap-2 rounded-full border border-white/10 bg-[#0b1218]/95 py-2 pl-3 pr-1.5 sm:flex">
              <span className="block h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80] pulse-dot" />
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  setNudge(false);
                }}
                className="truncate text-[11.5px] text-[#c9d4db] cursor-pointer"
              >
                Phòng cộng đồng đang trò chuyện, vào chung cho vui
              </button>
              <button
                type="button"
                onClick={() => setNudge(false)}
                aria-label="Bỏ gợi ý"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[#6f7d87] hover:text-white cursor-pointer"
              >
                <i className="ri-close-line text-xs" />
              </button>
            </div>
          )}
        </div>
      </div>

      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Để lại thông tin liên hệ"
        subtitle="Điền số điện thoại và Telegram, người phụ trách khu vực sẽ liên hệ lại trong vài phút."
      />
    </>
  );
}