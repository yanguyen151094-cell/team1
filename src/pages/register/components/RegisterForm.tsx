import { useState } from 'react';
import type { FormEvent } from 'react';
import useFormSubmit from '@/hooks/useFormSubmit';
import { countries } from '@/mocks/content';

const SUBMIT_ADDR = 'https://readdy.ai/api/form/dbvetsddijqr49061nb0';

const fieldClass =
  'w-full box-border min-w-0 rounded-md bg-[#101013] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[#6f6b65] focus:outline-none focus:border-[#e0b36a]/70 focus:ring-2 focus:ring-[#e0b36a]/20 transition-colors';

const interests = [
  'Tư vấn chung',
  'Hợp tác nội dung',
  'Hỗ trợ kỹ thuật',
  'Hợp tác quảng cáo',
  'Việc khác',
];

export default function RegisterForm() {
  const { status, message, submit, reset } = useFormSubmit(SUBMIT_ADDR);
  const [country, setCountry] = useState('Việt Nam');
  const [interest, setInterest] = useState(interests[0]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit(event.currentTarget);
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-[#e0b36a]/30 bg-[#101013] p-8 text-center">
        <span className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-[#e0b36a] text-[#0a0a0b]">
          <i className="ri-check-double-line text-2xl" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-white">Đăng ký thành công</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-[#a29d95]">{message}</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#e0b36a] hover:bg-[#eec27f] text-[#0a0a0b] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-telegram-fill text-base" />
            </span>
            Nhắn Telegram ngay
          </a>
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-white/15 text-[#e6e1d9] hover:border-[#e0b36a]/60 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Gửi đăng ký khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="register-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="rounded-lg border border-white/10 bg-[#101013] p-5 md:p-7"
      noValidate
    >
      <h2 className="text-lg font-bold text-white">Thông tin đăng ký</h2>
      <p className="mt-1.5 text-[12px] text-[#8d8a83]">
        Điền đầy đủ để được xếp đúng người phụ trách. Mục có dấu sao là bắt buộc.
      </p>

      <div className="mt-5 flex flex-col gap-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="min-w-0">
            <label htmlFor="reg-name" className="block text-xs font-medium text-[#a29d95] mb-1.5">
              Họ và tên <span className="text-[#e0b36a]">*</span>
            </label>
            <input
              id="reg-name"
              name="full_name"
              type="text"
              required
              autoComplete="name"
              placeholder="Nguyễn Văn A"
              className={fieldClass}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="reg-phone" className="block text-xs font-medium text-[#a29d95] mb-1.5">
              Số điện thoại <span className="text-[#e0b36a]">*</span>
            </label>
            <input
              id="reg-phone"
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
            <label htmlFor="reg-telegram" className="block text-xs font-medium text-[#a29d95] mb-1.5">
              Tên Telegram <span className="text-[#e0b36a]">*</span>
            </label>
            <input
              id="reg-telegram"
              name="telegram"
              type="text"
              required
              autoComplete="off"
              placeholder="@tencuaban"
              className={fieldClass}
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="reg-country" className="block text-xs font-medium text-[#a29d95] mb-1.5">
              Quốc gia đang ở <span className="text-[#e0b36a]">*</span>
            </label>
            <select
              id="reg-country"
              name="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
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
          <label htmlFor="reg-interest" className="block text-xs font-medium text-[#a29d95] mb-1.5">
            Nội dung cần hỗ trợ
          </label>
          <select
            id="reg-interest"
            name="interest"
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className={`${fieldClass} appearance-none cursor-pointer`}
          >
            {interests.map((item) => (
              <option key={item} value={item} className="bg-[#101013] text-white">
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <label htmlFor="reg-note" className="block text-xs font-medium text-[#a29d95]">
              Ghi chú thêm
            </label>
            <span className="text-[10px] text-[#5f5b55]">Tối đa 500 ký tự</span>
          </div>
          <textarea
            id="reg-note"
            name="note"
            rows={4}
            maxLength={500}
            placeholder="Bạn muốn được hỗ trợ điều gì? Có khung giờ nào thuận tiện để liên hệ?"
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

        <label
          htmlFor="reg-consent"
          className="flex items-start gap-2.5 rounded-md border border-white/10 bg-[#0d0d10] px-3.5 py-3 cursor-pointer"
        >
          <input
            id="reg-consent"
            name="consent"
            type="checkbox"
            value="Đồng ý liên hệ lại"
            required
            className="mt-0.5 w-4 h-4 accent-[#e0b36a] cursor-pointer shrink-0"
          />
          <span className="text-[12px] leading-relaxed text-[#a29d95]">
            Tôi đồng ý được liên hệ lại qua số điện thoại hoặc Telegram đã cung cấp.
          </span>
        </label>

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
          className="mt-1 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#e0b36a] hover:bg-[#eec27f] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0a0b] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
        >
          {status === 'submitting' ? (
            <>
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-loader-4-line text-base animate-spin" />
              </span>
              Đang gửi đăng ký...
            </>
          ) : (
            <>
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-send-plane-line text-base" />
              </span>
              Hoàn tất đăng ký
            </>
          )}
        </button>

        <p className="text-[11px] leading-relaxed text-[#5f5b55]">
          Thông tin chỉ dùng để liên hệ và hỗ trợ. Chúng tôi không chia sẻ cho bên thứ ba.
        </p>
      </div>
    </form>
  );
}