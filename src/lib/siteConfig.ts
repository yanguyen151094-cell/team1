/**
 * ============================================================
 *  CẤU HÌNH LINK TOÀN SITE — CHỈ CẦN SỬA Ở ĐÂY
 * ============================================================
 *  Muốn đổi link đích (nơi nút Đăng Nhập / Vào Cổng trỏ tới)
 *  hoặc link nút Đăng Ký → sửa đúng các dòng bên dưới.
 *
 *  Lưu ý: sau khi đổi SITE_URL, nhớ vào 2 file sau đổi theo:
 *    - public/sitemap.xml
 *    - public/robots.txt
 *  (2 file này là file tĩnh, không đọc được biến ở đây)
 * ============================================================
 */

/** Tên miền chính thức của website (dùng cho canonical / SEO / chia sẻ mạng xã hội). */
export const SITE_URL = 'https://www.iy88.xyz';

/** Link đích: nơi người dùng được đưa tới sau khi đăng nhập / đăng ký. */
export const GATE_REDIRECT_URL = 'https://www.ola3yg88.sbs/register?affiliateCode=ygol01dqc01gg';

/**
 * Link của nút "Đăng Ký".
 * - Để đường dẫn nội bộ (bắt đầu bằng dấu /) → mở trang đăng ký trong website.
 * - Để link đầy đủ (bắt đầu bằng https://) → mở thẳng ra ngoài ở tab mới.
 */
export const REGISTER_URL = '/dang-ky';

/** Link liên hệ Telegram (dùng cho các nút "Nhắn Telegram"). */
export const TELEGRAM_URL = 'https://t.me/';

/** Địa chỉ tiếp nhận form đăng ký / để lại thông tin. */
export const FORM_SUBMIT_ADDR = 'https://readdy.ai/api/form/dbvetsddijqr49061nbg';