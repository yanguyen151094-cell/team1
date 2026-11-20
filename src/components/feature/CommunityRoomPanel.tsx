import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { chatMemberTotal, chatMembers, chatQuickReplies, chatRoomTopic } from '@/mocks/communityChat';
import { useCommunityChat } from '@/components/feature/useCommunityChat';

interface CommunityRoomPanelProps {
  onMinimize: () => void;
  onOpenLead: () => void;
}

const AVATAR_TONES = [
  'bg-[#35e0c0]/15 text-[#7ef3e0]',
  'bg-[#f6d36b]/15 text-[#f6d36b]',
  'bg-[#f2a7c3]/15 text-[#f7c1d5]',
  'bg-[#c6f26b]/15 text-[#dcf7a1]',
  'bg-[#f2a76b]/15 text-[#f7c39a]',
  'bg-[#9ee0f2]/15 text-[#c2eefa]',
  'bg-[#e0b36a]/15 text-[#f0cd95]',
  'bg-[#a7f2c0]/15 text-[#c4f7d5]',
];

const toneFor = (key: string) => {
  const sum = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_TONES[sum % AVATAR_TONES.length];
};

const initialOf = (name: string) => (name.trim().charAt(0) || 'K').toUpperCase();

export default function CommunityRoomPanel({ onMinimize, onOpenLead }: CommunityRoomPanelProps) {
  const {
    nickname,
    messages,
    liked,
    typing,
    typingMemberId,
    typingName,
    join,
    send,
    toggleLike,
  } = useCommunityChat();
  const [draft, setDraft] = useState('');
  const [nameDraft, setNameDraft] = useState('');
  const [nameError, setNameError] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const memberTotalLabel = chatMemberTotal.toLocaleString('vi-VN');

  const memberById = useMemo(
    () => Object.fromEntries(chatMembers.map((member) => [member.id, member])),
    [],
  );

  /** Mỗi khi có tin mới / khung chat vừa mở: kéo thẳng xuống tin cuối */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const jump = () => {
      el.scrollTop = el.scrollHeight;
    };

    jump();
    const frame = window.requestAnimationFrame(jump);
    const timer = window.setTimeout(jump, 240);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [messages.length, nickname, showMembers, typing]);

  /** Nội dung cao lên (bong bóng hiện xong, xuống dòng...) thì bám tiếp xuống cuối */
  useEffect(() => {
    const el = scrollRef.current;
    const content = contentRef.current;
    if (!el || !content || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(() => {
      el.scrollTop = el.scrollHeight;
    });
    observer.observe(content);

    return () => observer.disconnect();
  }, []);

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = join(nameDraft);
    if (!ok) {
      setNameError('Biệt danh cần từ 2 ký tự trở lên ạ.');
      return;
    }
    setNameError('');
    setNameDraft('');
  };

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(draft);
    setDraft('');
  };

  return (
    <div className="chat-pop relative flex h-[min(76vh,600px)] w-full max-w-[382px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0b1218] shadow-2xl shadow-black/60">
      {/* Đầu phòng */}
      <div className="relative shrink-0 border-b border-white/10 bg-[linear-gradient(125deg,rgba(53,224,192,0.2),rgba(11,18,24,0.72))] px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex shrink-0 -space-x-2">
            {chatMembers.slice(0, 3).map((member, index) => (
              <span
                key={member.id}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#0b1218] text-[12px] ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
                aria-hidden="true"
              >
                {member.flag}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-white">
              Phòng cộng đồng cổng quốc gia
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-[10.5px] text-[#9fc9c3]">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#4ade80] pulse-dot" />
              {memberTotalLabel} thành viên · {chatRoomTopic}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowMembers((prev) => !prev)}
            aria-label="Danh sách thành viên"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#8d9aa3] transition-colors hover:text-white cursor-pointer"
          >
            <i className={`text-base ${showMembers ? 'ri-close-line' : 'ri-group-line'}`} />
          </button>
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Thu nhỏ phòng trò chuyện"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#8d9aa3] transition-colors hover:text-white cursor-pointer"
          >
            <i className="ri-subtract-line text-base" />
          </button>
        </div>
      </div>

      {/* Nội dung phòng */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3.5 [overflow-anchor:none]"
        >
          <div ref={contentRef} className="flex flex-col gap-3">
            <p className="mx-auto rounded-full bg-white/5 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.14em] text-[#6f7d87]">
              Hôm nay
            </p>

            {messages.map((message) => {
              const member = memberById[message.memberId];
              const displayName = message.self
                ? `${nickname || 'Bạn'} (bạn)`
                : member?.name ?? message.authorName ?? 'Khách';
              const isLiked = liked.includes(message.id);
              const likes = message.likes + (isLiked ? 1 : 0);

              return (
                <div
                  key={message.id}
                  className={`chat-bubble-in flex items-start gap-2 ${message.self ? 'flex-row-reverse' : ''}`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      message.self ? 'bg-[#f6d36b]/20 text-[#f6d36b]' : toneFor(message.memberId)
                    }`}
                  >
                    {initialOf(displayName)}
                  </span>

                  <div className={`min-w-0 max-w-[78%] ${message.self ? 'text-right' : ''}`}>
                    <div
                      className={`flex flex-wrap items-center gap-1.5 text-[10px] ${
                        message.self ? 'justify-end' : ''
                      }`}
                    >
                      {!message.self && member?.flag && (
                        <span className="text-[11px] leading-none">{member.flag}</span>
                      )}
                      <span className="font-medium text-[#c9d4db]">{displayName}</span>
                      {!message.self && member?.role === 'Điều hành' && (
                        <span className="rounded-full bg-[#35e0c0]/15 px-1.5 py-[1px] text-[8.5px] font-semibold uppercase tracking-wider text-[#7ef3e0]">
                          Điều hành
                        </span>
                      )}
                      <span className="text-[9px] text-[#5d6a73]">{message.time}</span>
                    </div>

                    <p
                      className={`mt-1 whitespace-pre-line rounded-lg px-3 py-2 text-left text-[12px] leading-relaxed ${
                        message.self
                          ? 'rounded-tr-sm bg-[#f6d36b] text-[#0a0a0b]'
                          : 'rounded-tl-sm border border-white/8 bg-white/6 text-[#dde7ec]'
                      }`}
                    >
                      {message.text}
                    </p>

                    <div className={`mt-1 flex items-center gap-1 ${message.self ? 'justify-end' : ''}`}>
                      <button
                        type="button"
                        onClick={() => toggleLike(message.id)}
                        aria-label={isLiked ? 'Bỏ thả tim' : 'Thả tim tin nhắn'}
                        aria-pressed={isLiked}
                        className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9.5px] transition-colors cursor-pointer ${
                          isLiked ? 'text-[#f6d36b]' : 'text-[#5d6a73] hover:text-[#9fc9c3]'
                        }`}
                      >
                        <i className={`text-[11px] ${isLiked ? 'ri-heart-3-fill' : 'ri-heart-3-line'}`} />
                        {likes}
                      </button>
                      {!message.self && member?.country && (
                        <span className="text-[9.5px] text-[#4f5a62]">{member.country}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {typing && (typingName || typingMemberId) && (
              <div className="chat-bubble-in flex items-start gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${toneFor(typingMemberId)}`}
                >
                  {initialOf(typingName ?? 'Khách')}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                    {memberById[typingMemberId]?.flag && (
                      <span className="text-[11px] leading-none">
                        {memberById[typingMemberId]?.flag}
                      </span>
                    )}
                    <span className="font-medium text-[#c9d4db]">
                      {typingName ?? 'Khách'}
                    </span>
                    <span className="text-[9px] text-[#5d6a73]">đang nhập...</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 rounded-lg rounded-tl-sm border border-white/8 bg-white/6 px-3 py-2.5">
                    <span
                      className="typing-dot block h-1.5 w-1.5 rounded-full bg-[#9fc9c3]"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="typing-dot block h-1.5 w-1.5 rounded-full bg-[#9fc9c3]"
                      style={{ animationDelay: '160ms' }}
                    />
                    <span
                      className="typing-dot block h-1.5 w-1.5 rounded-full bg-[#9fc9c3]"
                      style={{ animationDelay: '320ms' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ô soạn tin */}
        <div className="shrink-0 border-t border-white/8 bg-[#0a1116] px-3 pb-3 pt-2.5">
          {!nickname ? (
            <form onSubmit={handleJoin} className="flex flex-col gap-2">
              <p className="text-[11px] leading-relaxed text-[#9fc9c3]">
                Đặt biệt danh để vào phòng. Ai cũng thấy tên này khi bạn nhắn.
              </p>
              <div className="flex items-center gap-2">
                <input
                  value={nameDraft}
                  onChange={(event) => {
                    setNameDraft(event.target.value);
                    setNameError('');
                  }}
                  maxLength={24}
                  placeholder="Ví dụ: Minh Quân"
                  aria-label="Biệt danh của bạn"
                  className="min-w-0 flex-1 rounded-md border border-white/10 bg-[#070d12] px-3 py-2.5 text-[12px] text-white outline-none placeholder:text-[#5d6a73] focus:border-[#35e0c0]/50"
                />
                <button
                  type="submit"
                  className="flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-[#35e0c0] px-3 text-[11.5px] font-semibold text-[#04120f] transition-colors hover:bg-[#5ff0d2] cursor-pointer"
                >
                  Vào phòng
                </button>
              </div>
              {nameError && <p className="text-[10.5px] text-[#f2a76b]">{nameError}</p>}
              <p className="text-[9.5px] text-[#4f5a62]">
                Biệt danh chỉ lưu trên thiết bị này, không cần tài khoản.
              </p>
            </form>
          ) : (
            <>
              <div className="no-scrollbar mb-2 flex gap-1.5 overflow-x-auto pb-1">
                {chatQuickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => setDraft(reply)}
                    className="whitespace-nowrap rounded-full border border-white/12 px-2.5 py-1 text-[10.5px] text-[#9fc9c3] transition-colors hover:border-[#35e0c0]/50 hover:text-[#7ef3e0] cursor-pointer"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  maxLength={400}
                  placeholder={`Nhắn gì đó, ${nickname || 'bạn'}...`}
                  aria-label="Nội dung tin nhắn"
                  className="min-w-0 flex-1 rounded-md border border-white/10 bg-[#070d12] px-3 py-2.5 text-[12px] text-white outline-none placeholder:text-[#5d6a73] focus:border-[#35e0c0]/50"
                />
                <button
                  type="submit"
                  aria-label="Gửi tin nhắn"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#35e0c0] text-[#04120f] transition-colors hover:bg-[#5ff0d2] cursor-pointer"
                >
                  <i className="ri-send-plane-fill text-base" />
                </button>
              </form>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <p className="truncate text-[9.5px] text-[#4f5a62]">
                  Tin nhắn của bạn chỉ lưu trên thiết bị này.
                </p>
                <button
                  type="button"
                  onClick={onOpenLead}
                  className="shrink-0 whitespace-nowrap text-[9.5px] font-semibold text-[#f6d36b] cursor-pointer hover:underline"
                >
                  Để lại SĐT
                </button>
              </div>
            </>
          )}
        </div>

        {/* Danh sách thành viên */}
        {showMembers && (
          <div className="absolute inset-0 z-10 flex flex-col bg-[#0b1218]">
            <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold text-white">
                  Thành viên đang trực tuyến ({memberTotalLabel})
                </p>
                <p className="mt-0.5 text-[9.5px] text-[#6f7d87]">
                  Đang hiển thị {chatMembers.length} người nổi bật
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMembers(false)}
                aria-label="Đóng danh sách thành viên"
                className="flex h-6 w-6 items-center justify-center rounded-md text-[#8d9aa3] hover:text-white cursor-pointer"
              >
                <i className="ri-close-line text-sm" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
              {chatMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2.5 border-b border-white/5 py-2 last:border-b-0"
                >
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${toneFor(member.id)}`}
                  >
                    {initialOf(member.name)}
                    <span className="absolute -bottom-0.5 -right-0.5 block h-2 w-2 rounded-full border-2 border-[#0b1218] bg-[#4ade80]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 truncate text-[11.5px] font-medium text-[#dde7ec]">
                      <span className="text-[11px] leading-none">{member.flag}</span>
                      {member.name}
                      {member.role === 'Điều hành' && (
                        <span className="rounded-full bg-[#35e0c0]/15 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-wider text-[#7ef3e0]">
                          Điều hành
                        </span>
                      )}
                    </p>
                    <p className="truncate text-[9.5px] text-[#5d6a73]">{member.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setShowMembers(false);
                onOpenLead();
              }}
              className="m-3 flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-[#f6d36b] text-[11.5px] font-semibold text-[#0a0a0b] transition-colors hover:bg-[#ffe68f] cursor-pointer"
            >
              <i className="ri-phone-line text-sm" />
              Để lại SĐT &amp; Telegram
            </button>
          </div>
        )}
      </div>
    </div>
  );
}