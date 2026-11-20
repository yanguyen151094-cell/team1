# Cổng Thông Tin – Trang tiếp nhận yêu cầu hỗ trợ đa quốc gia

## 1. Mô tả Dự án
Website landing page giới thiệu kênh nội dung và tiếp nhận yêu cầu hỗ trợ khách hàng tại 10 quốc gia.
Khách chọn cổng quốc gia, để lại số điện thoại và Telegram; đội ngũ phụ trách khu vực liên hệ lại.
Không sử dụng thương hiệu, logo hay nội dung của bất kỳ nền tảng bên ngoài nào.

## 2. Cấu trúc Trang
- `/` – Trang chủ: Hero, Điểm nổi bật, 10 Cổng quốc gia, Quy trình 4 bước, Đánh giá, Hỏi đáp, Liên hệ, Footer
- `/dang-ky` – Trang đăng ký riêng với biểu mẫu đầy đủ

## 3. Tính năng Cốt lõi
- [x] Thanh điều hướng cố định, đổi nền khi cuộn, có menu cho điện thoại
- [x] Hero ảnh nền tối, tiêu đề lớn, hai nút hành động, dải số liệu
- [x] Khối 6 điểm nổi bật
- [x] 10 thẻ cổng quốc gia: cờ, khu vực, khung giờ, ngôn ngữ, mô tả
- [x] Bấm cổng quốc gia mở biểu mẫu để lại SĐT + Telegram (quốc gia tự điền sẵn)
- [x] Widget hỗ trợ nổi góc màn hình: Telegram / Zalo / Messenger + nút để lại SĐT
- [x] Quy trình 4 bước có mốc thời gian
- [x] Đánh giá khách hàng 6 quốc gia, điểm 4,9/5
- [x] Hỏi đáp dạng mở/đóng
- [x] Khối liên hệ + kêu gọi đăng ký
- [x] Trang `/dang-ky` với biểu mẫu đầy đủ (họ tên, SĐT, Telegram, quốc gia, nội dung, ghi chú, đồng ý liên hệ)
- [x] Trạng thái gửi: đang gửi / thành công / lỗi hiển thị ngay trên trang

## 4. Data Model Design
Không cần cơ sở dữ liệu. Dữ liệu khách để lại được lưu qua Readdy Form.

## 5. Tích hợp Backend / Bên thứ ba
- Form "Yêu Cầu Hỗ Trợ Theo Quốc Gia" – dùng cho biểu mẫu của các cổng quốc gia và widget hỗ trợ
- Form "Đăng Ký Nhận Thông Tin" – dùng cho trang `/dang-ky`
- Mọi biểu mẫu đều có trường chống spam ẩn và hiển thị phản hồi ngay trên trang

## 6. Kế hoạch Phát triển

### Phase 1: Trang chủ + trang đăng ký (hoàn thành)
- Mục tiêu: Có trang hoàn chỉnh để thu thập thông tin khách hàng
- Deliverable: Website chạy được, form hoạt động, dữ liệu về mục Form

### Phase 2 (gợi ý tiếp theo)
- Trang chính sách bảo mật và điều khoản sử dụng riêng
- Trang cảm ơn sau khi gửi biểu mẫu
- Bổ sung đa ngôn ngữ Anh – Việt