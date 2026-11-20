import { Link } from 'react-router-dom';
import SiteHeader from '@/components/feature/SiteHeader';
import RegisterForm from '@/pages/register/components/RegisterForm';
import Footer from '@/pages/home/components/Footer';

const benefits = [
  {
    icon: 'ri-user-follow-line',
    title: 'Đúng người phụ trách',
    desc: 'Dựa vào quốc gia và nội dung bạn chọn, yêu cầu được chuyển thẳng tới người phụ trách khu vực.',
  },
  {
    icon: 'ri-time-line',
    title: 'Phản hồi trong vài phút',
    desc: 'Trong khung giờ hỗ trợ, thời gian phản hồi trung bình dưới 5 phút.',
  },
  {
    icon: 'ri-shield-keyhole-line',
    title: 'Chỉ liên hệ đúng một lần',
    desc: 'Bạn không bị gọi lại nhiều lần bởi nhiều người khác nhau. Một đầu mối duy nhất.',
  },
  {
    icon: 'ri-file-shield-2-line',
    title: 'Không chia sẻ dữ liệu',
    desc: 'Số điện thoại và Telegram không được cung cấp cho bất kỳ bên thứ ba nào.',
  },
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] font-body">
      <SiteHeader />

      <main className="pt-16 md:pt-[72px]">
        <div className="relative w-full border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(224,179,106,0.14),transparent_55%)]" />
          <div className="relative w-full px-4 md:px-8 py-10 md:py-14">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-2 text-[12px] text-[#6f6b65] mb-4">
                <Link to="/" className="hover:text-[#e0b36a] transition-colors cursor-pointer">
                  Trang chủ
                </Link>
                <span className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-xs" />
                </span>
                <span className="text-[#a29d95]">Đăng ký</span>
              </nav>

              <h1 className="font-display text-3xl md:text-[44px] leading-tight font-bold text-white max-w-2xl">
                Đăng ký để được <span className="text-[#e0b36a]">hỗ trợ đúng người</span>
              </h1>
              <p className="mt-4 max-w-xl text-[14px] md:text-[15px] leading-relaxed text-[#a29d95]">
                Điền thông tin bên dưới, mất khoảng một phút. Đội ngũ phụ trách sẽ liên hệ lại qua Telegram hoặc
                số điện thoại bạn để lại.
              </p>
            </div>
          </div>
        </div>

        <section className="w-full px-4 md:px-8 py-10 md:py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
            <div className="order-2 lg:order-1 flex flex-col gap-3">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3.5 rounded-lg border border-white/10 bg-[#0d0d10] p-4 md:p-5"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-md bg-[#e0b36a]/12 text-[#e0b36a] shrink-0">
                    <i className={`${item.icon} text-lg`} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#8f8a83]">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="mt-2 rounded-lg border border-[#e0b36a]/25 bg-[#101013] p-4 md:p-5">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 flex items-center justify-center text-[#e0b36a]">
                    <i className="ri-customer-service-2-line text-base" />
                  </span>
                  <h3 className="text-[13px] font-semibold text-white">Không muốn điền form?</h3>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-[#8f8a83]">
                  Bạn có thể nhắn Telegram trực tiếp, hoặc bấm bong bóng chat ở góc phải màn hình để trò chuyện
                  với người phụ trách.
                </p>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/15 hover:border-[#e0b36a]/60 text-[12.5px] font-semibold text-[#e6e1d9] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-telegram-fill text-sm" />
                  </span>
                  Nhắn Telegram
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <RegisterForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}