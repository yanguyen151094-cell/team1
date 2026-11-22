/**
 * NỘI DUNG BOT NHẮN TRONG PHÒNG CỘNG ĐỒNG
 *
 * Mỗi dòng trong dấu nháy đơn là MỘT tin nhắn, bot sẽ nhắn lần lượt từ trên xuống.
 * Hết dòng cuối thì nghỉ một chút rồi quay lại dòng đầu, lặp mãi.
 *
 * Cách sửa:
 * - Thêm tin: thêm một dòng mới, nhớ có dấu phẩy ở cuối dòng.
 * - Xoá tin: xoá cả dòng đó.
 * - Đổi thứ tự: cắt dòng dán sang vị trí khác.
 * - Dòng để trống sẽ được bỏ qua, không hiện tin rỗng.
 *
 * Tên người nói: tự luân phiên theo danh sách thành viên (xem chatMembers trong
 * tệp communityChat.ts). Giờ hiển thị tự tăng dần, bắt đầu từ 19:42.
 *
 * Lưu ý: trong câu chữ không dùng dấu nháy đơn '. Nếu cần, viết thành dấu nháy kép ".
 *
 * Bản cập nhật: 2026-11-20
 */

export const chatConversation: string[] = [
  'Chào cả nhà, phòng hôm nay đông quá. Ai mới vào thì cứ nhắn thoải mái nhé, ở đây toàn người cùng nước hoặc cùng múi giờ thôi.',
  'Em chào chị Hà, em mới vào phòng ạ. Em đang ở Hà Nội, không biết giờ này cổng Đức còn trực không chị?',
  'Berlin đang 14h42, cổng bên chị trực tới 22h giờ địa phương nên vẫn còn thoải mái em ạ.',
  'Bên Thuỵ Sĩ mình cũng vậy, lệch có một tiếng. Mình ngồi đây từ sáng, thấy phòng sôi động hẳn từ lúc mấy bạn châu Á vào.',
  'Tokyo giờ là 21h45 rồi, mình canh đúng khung giờ để hỏi cho tiện. Có ai cần mình gửi giờ trực từng cổng không?',
  'Toronto mới 10h46 sáng, mình vừa ăn sáng xong. Cả nhà ai rảnh thì kể chuyện nước mình đang ở cho vui đi, nhiều nước mình chưa từng tới.',
  'Seoul 23h47, mình vừa tan ca. Vào phòng thấy mọi người nói chuyện tiếng Việt nhiều quá, mình đọc hiểu được khoảng nửa.',
  'Amsterdam thì mưa cả ngày, chẳng đi đâu được nên mình ngồi lì trong phòng luôn. Mọi người thường hỏi gì ở đây vậy?',
  'Mọi người hỏi giờ trực với độ trễ trước, sau đó mới để lại liên hệ. Cứ thoải mái tám trước cũng được, phòng này không ai giục đâu.',
  'London đang 12h50 trưa, nắng đẹp. Mình thấy vui vì phòng có người cùng múi giờ, nói chuyện không bị lệch nhịp.',
  'Lisbon 12h51, mình mới vào phòng được hai hôm mà thấy như quen lâu rồi. Chào mọi người nhé.',
  'Cảm ơn cả nhà, mình nắm được khung giờ rồi. Ai cần gì thì cứ bấm nút để lại liên hệ ở dưới, đội ngũ phản hồi nhanh lắm.',
];