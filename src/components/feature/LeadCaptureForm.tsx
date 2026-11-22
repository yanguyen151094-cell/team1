import { useState } from 'react';
import type { FormEvent } from 'react';
import useFormSubmit from '@/hooks/useFormSubmit';
import { sendLeadToSheet } from '@/lib/sheetSink';
import { countries } from '@/mocks/content';
import { FORM_SUBMIT_ADDR } from '@/lib/siteConfig';

const SUBMIT_ADDR = FORM_SUBMIT_ADDR;

const fieldClass =
  'w-full box-border min-w-0 rounded-md bg-[#101013] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[#6f6b65] focus:outline-none focus:border-[#e0b36a]/70 focus:ring-2 focus:ring-[#e0b36a]/20 transition-colors';

interface LeadCaptureFormProps {
  country?: string;
  notePlaceholder?: string;
  submitLabel?: string;
}

export default function LeadCaptureForm({
  country,
  notePlaceholder = 'Bạn muốn được hỗ trợ điều gì?',
  submitLabel = 'Gửi thông tin',
}: LeadCaptureFormProps) {
  const { status, message, submit, reset } = useFormSubmit(SUBMIT_ADDR);
  const [selectedCountry, setSelectedCountry] = useState<string>(country ?? 'Việt Nam');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get('full_name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const telegram = String(formData.get('telegram') ?? '').trim();
    const note = String(formData.get('note') ?? '').trim();

    const ok = await submit(form);

    if (ok) {
      sendLeadToSheet({
        name: fullName,
        phone,
        telegram,
        note,
        country: selectedCountry,
        source: 'chat-lead',
      });
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-[#e0b36a]/30 bg-[#e0b36a]/8 p-6 text-center">
        <span className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-[#e0b36a] text-[#0a0a0b]">
          <i className="ri-check-line text-2xl" />
        </span>
        <h4 className="mt-4 text-base font-semibold text-white">Đã nhận được thông tin</h4>
        <p className="mt-2 text-sm leading-relaxed text-[#b6b1a9]">{message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 text-[13px] font-medium text-[#e6e1d9] hover:border-[#e0b36a]/60 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-refresh-line text-sm" />
          </span>
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form
      id="country-lead-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-3.5"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="min-w-0">
          <label htmlFor="lead-name" className="block text-xs font-medium text-[#a29d95] mb-1.5">
            Họ và tên
          </label>
          <input
            id="lead-name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            className={fieldClass}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="lead-phone" className="block text-xs font-medium text-[#a29d95] mb-1.5">
            Số điện thoại
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+84 9xx xxx xxx"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="min-w-0">
          <label htmlFor="lead-telegram" className="block text-xs font-medium text-[#a29d95] mb-1.5">
            Tên Telegram
          </label>
          <input
            id="lead-telegram"
            name="telegram"
            type="text"
            required
            autoComplete="off"
            placeholder="@tencuaban"
            className={fieldClass}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="lead-country" className="block text-xs font-medium text-[#a29d95] mb-1.5">
            Quốc gia
          </label>
          <select
            id="lead-country"
            name="country"
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            {countries.map((item) => (
              <option key={item.code} value={item.name} className="bg-[#101013] text-white">
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="min-w-0">
        <label htmlFor="lead-note" className="block text-xs font-medium text-[#a29d95] mb-1.5">
          Ghi chú <span className="text-[#6f6b65]">(không bắt buộc)</span>
        </label>
        <textarea
          id="lead-note"
          name="note"
          rows={3}
          maxLength={500}
          placeholder={notePlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <input
        type="text"
        name="website_alt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        readOnly
        className="contact-extra-field"
      />

      {status === 'error' && (
        <p className="flex items-start gap-2 text-xs leading-relaxed text-[#f2a3a3]">
          <span className="w-4 h-4 flex items-center justify-center mt-0.5 shrink-0">
            <i className="ri-error-warning-line text-sm" />
          </span>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#e0b36a] hover:bg-[#eec27f] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0a0b] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
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
              <i className="ri-send-plane-line text-base" />
            </span>
            {submitLabel}
          </>
        )}
      </button>

      <p className="text-[11px] leading-relaxed text-[#6f6b65]">
        Thông tin chỉ được dùng để liên hệ lại và hỗ trợ bạn. Không chia sẻ cho bên thứ ba.
      </p>
    </form>
  );
}