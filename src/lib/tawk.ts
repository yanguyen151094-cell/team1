/**
 * Tawk.to live chat integration.
 *
 * Paste the "Direct Chat Link" from the Tawk.to dashboard below.
 * It looks like: https://tawk.to/chat/65f1a2b3c4d5e6f7a8b9c0d1/1hok1234
 * Leave it empty to keep the built-in support panel as a fallback.
 */
export const TAWK_DIRECT_CHAT_URL =
  'https://tawk.to/chat/6b00ac69df869c3c91429e99/1k7ta2v88?layout=modern';

type TawkApi = {
  onLoad?: () => void;
  onChatMaximized?: () => void;
  maximize?: () => void;
  minimize?: () => void;
  toggle?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  visitor?: { name?: string; email?: string };
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

let loadPromise: Promise<boolean> | null = null;

function parseIds(): { propertyId: string; widgetId: string } | null {
  const match = TAWK_DIRECT_CHAT_URL.match(/tawk\.to\/chat\/([^/?#]+)\/([^/?#]+)/i);
  if (!match) return null;
  return { propertyId: match[1], widgetId: match[2] };
}

export function isTawkConfigured(): boolean {
  return parseIds() !== null;
}

export function loadTawkWidget(): Promise<boolean> {
  if (!isTawkConfigured()) return Promise.resolve(false);
  if (loadPromise) return loadPromise;

  const ids = parseIds();
  if (!ids) return Promise.resolve(false);

  loadPromise = new Promise<boolean>((resolve) => {
    const api: TawkApi = window.Tawk_API || {};
    window.Tawk_API = api;
    window.Tawk_LoadStart = new Date();

    api.onLoad = () => {
      resolve(true);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${ids.propertyId}/${ids.widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return loadPromise;
}

export async function openTawkChat(): Promise<boolean> {
  const ready = await loadTawkWidget();
  if (!ready) return false;
  const api = window.Tawk_API;
  api?.showWidget?.();
  api?.maximize?.();
  return true;
}