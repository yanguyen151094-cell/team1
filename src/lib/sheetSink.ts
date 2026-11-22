export const GOOGLE_SHEET_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbwbXpZQUxCH20A-IvfPXAUm1ZqGocfGHX4V03RnELbxlJafmh4Qqy-otkZx3H9oxwNCZQ/exec';

export interface SheetLeadPayload {
  name?: string;
  phone?: string;
  telegram?: string;
  country?: string;
  source?: string;
  note?: string;
}

const trim = (value?: string) => (typeof value === 'string' ? value.trim() : '');

export function isSheetSinkReady(): boolean {
  return GOOGLE_SHEET_WEBAPP_URL.trim().length > 0;
}

function buildBody(payload: SheetLeadPayload): string {
  return JSON.stringify({
    name: trim(payload.name),
    phone: trim(payload.phone),
    telegram: trim(payload.telegram),
    country: trim(payload.country),
    source: trim(payload.source) || 'website',
    note: trim(payload.note),
    sentAt: new Date().toISOString(),
  });
}

/**
 * Gửi thông tin khách để lại về Google Apps Script (Google Sheets).
 * Thử fetch trước; nếu trình duyệt chặn thì dùng sendBeacon để không mất dữ liệu.
 */
export async function sendLeadToSheet(payload: SheetLeadPayload): Promise<boolean> {
  const endpoint = GOOGLE_SHEET_WEBAPP_URL.trim();
  if (!endpoint) return false;

  const body = buildBody(payload);

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      keepalive: true,
    });
    return true;
  } catch {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
        return navigator.sendBeacon(endpoint, blob);
      }
    } catch {
      // Bỏ qua: đã thử mọi cách gửi, không chặn trải nghiệm người dùng.
    }
    return false;
  }
}