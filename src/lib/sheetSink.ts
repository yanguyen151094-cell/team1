export const GOOGLE_SHEET_WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbxVirlOxTRPWXuPirGWsmJta91MjKEnr4COrDU9j6so9sGEl1pvM-7RYb98GNI70Og0rw/exec';

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

export function sendLeadToSheet(payload: SheetLeadPayload): void {
  const endpoint = GOOGLE_SHEET_WEBAPP_URL.trim();
  if (!endpoint) return;

  const body = JSON.stringify({
    name: trim(payload.name),
    phone: trim(payload.phone),
    telegram: trim(payload.telegram),
    country: trim(payload.country),
    source: trim(payload.source) || 'website',
    note: trim(payload.note),
    sentAt: new Date().toISOString(),
  });

  try {
    void fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body,
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // Google bỏ qua lỗi mạng ở đây; trang tính sẽ nhận dữ liệu khi đường truyền ổn định.
  }
}