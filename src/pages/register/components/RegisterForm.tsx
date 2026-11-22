import QuickSignupForm from '@/components/feature/QuickSignupForm';

export default function RegisterForm() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#101013] p-5 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-white">Thông tin đăng ký</h2>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#8d8a83]">
            Chỉ cần <strong className="font-semibold text-[#e6e1d9]">số điện thoại</strong> hoặc{' '}
            <strong className="font-semibold text-[#e6e1d9]">tên Telegram</strong>. Gửi xong, hệ thống mở ngay link
            cổng đích cho bạn.
          </p>
        </div>
        <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-[#e8f52a]/12 text-[#e8f52a]">
          <i className="ri-shield-keyhole-line text-lg" />
        </span>
      </div>

      <div className="mt-5">
        <QuickSignupForm source="register-page" />
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-md border border-white/10 bg-[#0d0d10] px-3.5 py-3">
        <span className="mt-0.5 w-4 h-4 flex items-center justify-center shrink-0 text-[#7ed9a4]">
          <i className="ri-lock-2-line text-sm" />
        </span>
        <p className="text-[11.5px] leading-relaxed text-[#8f8a83]">
          Thông tin chỉ dùng để liên hệ và hỗ trợ. Chúng tôi không chia sẻ cho bên thứ ba.
        </p>
      </div>
    </div>
  );
}