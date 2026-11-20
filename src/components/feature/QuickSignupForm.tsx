import { useState } from 'react';
import type { FormEvent } from 'react';
import useFormSubmit from '@/hooks/useFormSubmit';
import { sendLeadToSheet } from '@/lib/sheetSink';

export const GATE_REDIRECT_URL = 'https://www.ola3yg88.sbs/register?affiliateCode=ygol01dqc01gg';

const SUBMIT_ADDR = 'https://readdy.ai/api/form/dbvetsddijqr49061nbg';

const fieldClass =
  'w-full box-border min-w-0 rounded-md bg-[#0c1418] border border-white/12 px-4 py-3 text-sm text-white placeholder:text-[#6f7c85] focus:outline-none focus:border-[#35e0c0]/70 focus:ring-2 focus:ring-[#35e0c0]/18 transition-colors';

interface QuickSignupFormProps {
  country?: string;
  source?: string;
  onDone?: () => void;
}

export default function QuickSignupForm({ country, source = 'hero', onDone }: QuickSignupFormProps) {
  const { status, message, submit, reset } = useFormSubmit(SUBMIT_ADDR);
  const [localError, setLocalError] = useState<string>('');
  const [linkOpened, setLinkOpened] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get('phone') ?? '').trim();
    const telegram = String(formData.get('telegram') ?? '').trim();

    if (!phone && !telegram) {
      setLocalError('Vui lòng nhập số điện thoại hoặc tên Telegram để được cấp link cổng.');
      return;
    }

    setLocalError('');
    const ok = await submit(form);

    if (ok) {
      sendLeadToSheet({ phone, telegram, country, source });
      const opened = window.open(GATE_REDIRECT_URL, '_blank', 'noopener,noreferrer');
      setLinkOpened(Boolean(opened));
    }
  };

  const handleAgain = () => {
    setLinkOpened(false);
    setLocalError('');
    reset();
    onDone?.();
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-[#35e0c0]/30 bg-[#35e0c0]/8 p-5 sm:p-6 text-center">
        <span className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#35e0c0] text-[#04120f]">
          <i className="ri-check-line text-2xl" />
        </span>
        <h4 className="mt-3.5 text-base font-bold text-white">Đã ghi nhận thông tin</h4>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#a8b6bf]">
          {linkOpened
            ? 'Cổng đã mở ở tab mới. Nếu chưa thấy, bấm nút bên dưới để mở lại.'
            : 'Bấm nút bên dưới để vào cổng ngay.'}
        </p>

        <a
          href={GATE_REDIRECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#f6d36b] hover:bg-[#ffdf8c] text-[#0a0a0b] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-external-link-line text-base" />
          </span>
          Vào cổng ngay
        </a>

        <button
          type="button"
          onClick={handleAgain}
          className="mt-2.5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-white/15 text-[12.5px] font-medium text-[#c3ced6] hover:border-[#35e0c0]/50 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-refresh-line text-sm" />
          </span>
          Đăng ký thông tin khác
        </button>

        <p className="mt-3 text-[11px] leading-relaxed text-[#6f7c85]">{message}</p>
      </div>
    );
  }

  return (
    <form
      id="quick-signup-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-3.5"
      noValidate
    >
      {country && (
        <div className="flex items-center gap-2 rounded-md border border-[#35e0c0]/25 bg-[#35e0c0]/8 px-3 py-2">
          <span className="w-3.5 h-3.5 flex items-center justify-center text-[#35e0c0]">
            <i className="ri-global-line text-[13px]" />
          </span>
          <span className="text-[11.5px] text-[#9fc9c3]">
            Cổng đang chọn: <strong className="font-semibold text-[#d8f6f0]">{country}</strong>
          </span>
        </div>
      )}

      <div className="min-w-0">
        <label htmlFor="quick-phone" className="mb-1.5 block text-xs font-medium text-[#93a2ac]">
          Số điện thoại
        </label>
        <input
          id="quick-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+84 9xx xxx xxx"
          className={fieldClass}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] font-semibold tracking-[0.16em] text-[#61707a] uppercase">hoặc</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="min-w-0">
        <label htmlFor="quick-telegram" className="mb-1.5 block text-xs font-medium text-[#93a2ac]">
          Tên Telegram
        </label>
        <input
          id="quick-telegram"
          name="telegram"
          type="text"
          autoComplete="off"
          placeholder="@tencuaban"
          className={fieldClass}
        />
      </div>

      {country && <input type="hidden" name="country" value={country} />}
      <input type="hidden" name="source" value={source} />

      <input
        type="text"
        name="website_alt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        readOnly
        className="contact-extra-field"
      />

      {(localError || status === 'error') && (
        <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#f2a3a3]">
          <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0">
            <i className="ri-error-warning-line text-sm" />
          </span>
          {localError || message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-0.5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#f6d36b] hover:bg-[#ffdf8c] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0a0b] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
      >
        {status === 'submitting' ? (
          <>
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-loader-4-line text-base animate-spin" />
            </span>
            Đang gửi...
          </>
        ) : (
          <>
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-user-add-line text-base" />
            </span>
            Đăng ký
          </>
        )}
      </button>

      <p className="text-center text-[10.5px] leading-relaxed text-[#61707a]">
        Chỉ cần một trong hai thông tin. Sau khi đăng ký, hệ thống mở link cổng cho bạn.
      </p>
    </form>
  );
}