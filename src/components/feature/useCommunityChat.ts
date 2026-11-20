import { useCallback, useEffect, useMemo, useState } from 'react';
import { chatConversation } from '@/mocks/chatConversation';
import { chatMembers } from '@/mocks/communityChat';

export interface RoomMessage {
  id: string;
  memberId: string;
  authorName?: string;
  text: string;
  time: string;
  likes: number;
  self?: boolean;
}

interface StoredMessage {
  id: string;
  text: string;
  time: string;
  /** Số tin nhắn mẫu đang hiện tại lúc gửi, dùng để chèn tin của bạn đúng vị trí */
  anchor?: number;
}

const NICKNAME_KEY = 'cong-community-nickname';
const SENT_KEY = 'cong-community-sent-messages';
const LIKED_KEY = 'cong-community-liked-messages';

/** Số tin nhắn hiện sẵn khi mở phòng */
const AUTO_START_COUNT = 3;
/** Khoảng cách giữa hai tin nhắn tự hiện */
const REVEAL_GAP_MS = 4000;
/** Thời gian hiện chấm "đang nhập..." trước khi tin nhắn xuất hiện */
const TYPING_MS = 1200;
/** Nghỉ một chút trước khi quay lại vòng mới */
const RESTART_PAUSE_MS = 5000;

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Bộ nhớ trình duyệt bị chặn thì bỏ qua, phòng vẫn dùng được trong phiên hiện tại
  }
};

const currentTime = () =>
  new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

/**
 * Ghép các câu trong chatConversation.ts thành tin nhắn.
 * Tên người nói luân phiên theo danh sách thành viên, giờ tự tăng dần.
 */
const CONVERSATION_START_HOUR = 19;
const CONVERSATION_START_MINUTE = 42;

const seedMessages = chatConversation
  .filter((line) => line.trim().length > 0)
  .map((line, index) => {
    const member = chatMembers.length > 0 ? chatMembers[index % chatMembers.length] : undefined;
    const totalMinutes = CONVERSATION_START_MINUTE + index;
    const hour = (CONVERSATION_START_HOUR + Math.floor(totalMinutes / 60)) % 24;
    const minute = totalMinutes % 60;

    return {
      id: `seed-${index + 1}`,
      memberId: member?.id ?? '',
      authorName: member?.name ?? 'Khách',
      text: line.trim(),
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      likes: ((index * 7) % 12) + 3,
    };
  });

export function useCommunityChat() {
  const [nickname, setNickname] = useState('');
  const [sent, setSent] = useState<StoredMessage[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [seedCursor, setSeedCursor] = useState(Math.min(AUTO_START_COUNT, seedMessages.length));
  const [typing, setTyping] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);

  useEffect(() => {
    setNickname(readJson<string>(NICKNAME_KEY, ''));
    setSent(readJson<StoredMessage[]>(SENT_KEY, []));
    setLiked(readJson<string[]>(LIKED_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || autoPaused) {
      setTyping(false);
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setSeedCursor(seedMessages.length);
      return undefined;
    }

    if (seedCursor >= seedMessages.length) {
      setTyping(false);
      const restartTimer = window.setTimeout(() => {
        setSeedCursor(Math.min(AUTO_START_COUNT, seedMessages.length));
      }, RESTART_PAUSE_MS);
      return () => window.clearTimeout(restartTimer);
    }

    let typingTimer = 0;
    const gapTimer = window.setTimeout(() => {
      setTyping(true);
      typingTimer = window.setTimeout(() => {
        setTyping(false);
        setSeedCursor((prev) => prev + 1);
      }, TYPING_MS);
    }, Math.max(600, REVEAL_GAP_MS - TYPING_MS));

    return () => {
      window.clearTimeout(gapTimer);
      window.clearTimeout(typingTimer);
    };
  }, [seedCursor, autoPaused, hydrated]);

  const messages = useMemo<RoomMessage[]>(() => {
    const toOwnMessage = (item: StoredMessage): RoomMessage => ({
      id: item.id,
      memberId: 'self',
      text: item.text,
      time: item.time,
      likes: 0,
      self: true,
    });

    const ownByAnchor = new Map<number, StoredMessage[]>();
    const trailing: StoredMessage[] = [];

    sent.forEach((item) => {
      const anchor =
        typeof item.anchor === 'number' && Number.isFinite(item.anchor)
          ? item.anchor
          : Number.POSITIVE_INFINITY;

      if (anchor <= 0 || anchor > seedCursor) {
        trailing.push(item);
        return;
      }

      const bucket = ownByAnchor.get(anchor) ?? [];
      bucket.push(item);
      ownByAnchor.set(anchor, bucket);
    });

    const ordered: RoomMessage[] = [];

    for (let index = 0; index < seedCursor; index += 1) {
      const seed = seedMessages[index];
      if (!seed) break;
      ordered.push({
        id: seed.id,
        memberId: seed.memberId,
        authorName: seed.authorName,
        text: seed.text,
        time: seed.time,
        likes: seed.likes,
      });

      const own = ownByAnchor.get(index + 1);
      if (own) own.forEach((item) => ordered.push(toOwnMessage(item)));
    }

    trailing.forEach((item) => ordered.push(toOwnMessage(item)));

    return ordered;
  }, [seedCursor, sent]);

  const typingMemberId = typing ? seedMessages[seedCursor]?.memberId ?? null : null;
  const typingName = typing ? seedMessages[seedCursor]?.authorName ?? null : null;

  const join = useCallback((rawName: string) => {
    const name = rawName.trim().slice(0, 24);
    if (name.length < 2) return false;
    setNickname(name);
    writeJson(NICKNAME_KEY, name);
    return true;
  }, []);

  const send = useCallback(
    (rawText: string) => {
      const text = rawText.trim();
      if (!text) return;
      const next: StoredMessage = {
        id: `self-${Date.now()}`,
        text: text.slice(0, 400),
        time: currentTime(),
        anchor: seedCursor,
      };
      setSent((prev) => {
        const merged = [...prev, next];
        writeJson(SENT_KEY, merged);
        return merged;
      });
    },
    [seedCursor],
  );

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      writeJson(LIKED_KEY, next);
      return next;
    });
  }, []);

  return {
    nickname,
    hydrated,
    messages,
    liked,
    typing,
    typingMemberId,
    typingName,
    setAutoPaused,
    join,
    send,
    toggleLike,
  };
}