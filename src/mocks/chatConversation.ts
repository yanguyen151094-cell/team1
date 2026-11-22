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
  'Anh em nhận được KM chưa, mình vừa thấy cộng điểm rồi.',
  'Có anh em nào từ bên live chạy xuống đây giống mình không?',
  'Cổng này dạo này nhả đều không anh em, mới vào nên hơi rén.',
  'KM nạp đầu bên này cao không mọi người, định làm ít vốn trải nghiệm.',
  'Nhận được rồi nhé, vừa nhắn hỗ trợ cái là ting ting luôn.',
  'Anh em chơi thế nào rồi, hôm nay có bú được tay nào không?',
  'Mình mới từ live qua, công nhận bên này duyệt code nhanh thật.',
  'Cổng đang êm lắm anh em ơi, nãy giờ húp thông mấy tay liền.',
  'Nạp đầu bên này ưu đãi ngon phết, anh em nào mới vào thì húp lẹ kẻo lỡ.',
  'Có ai vừa nhận được KM tân thủ chưa, chỉ mình cách lấy với.',
  'Bên live đông quá trời, chạy xuống đây hóng kèo với anh em cho mát.',
  'Hôm nay cổng nhả căng đét, nãy giờ thấy mấy ông khoe lúa rồi.',
  'Mình vừa nhận được rồi, vốn ít mà được cộng thêm chơi thoải mái hẳn.',
  'Anh em nào đang trên live thì xuống đây điểm danh cái nào.',
  'Tình hình anh em hôm nay sao rồi, có bú đậm không?',
  'KM nạp đầu cao đấy bạn ơi, cứ mạnh dạn lên vốn mà chiến.',
  'Cổng này uy tín trước giờ rồi, nhả đều tay chứ không hút như chỗ khác.',
  'Vừa xem live xong phi xuống đây ngay, anh em nhận code hết chưa?',
  'Nhận được rồi anh em ơi, đang chuẩn bị vào việc đây.',
  'Có anh em nào đang kéo không, cho mình bám càng với.',
  'Nạp đầu xong nhớ nhắn CSKH nhận thêm KM nhé anh em, đừng bỏ phí.',
  'Hôm nay cuối tuần cổng nhả ác thật, vào phát ăn ngay.',
  'Anh em chơi sao rồi, nãy giờ mình bú được một mớ ấm người rồi.',
  'Từ bên live xuống đây thấy anh em xôm tụ quá.',
  'Mình cũng mới nhận được KM xong, đang phân vân chưa biết vào sảnh nào.',
  'Cổng đang vào dây đỏ đấy anh em, tranh thủ húp đi.',
  'KM bên này cao hơn hẳn mấy bên trước mình chơi, hỗ trợ lại nhiệt tình.',
  'Có ai chưa nhận được code không, nhắn trực tiếp cho hỗ trợ là có ngay.',
  'Mới xem live thấy giới thiệu qua đây, công nhận mượt thật.',
  'Anh em hôm nay bú nhiều chưa, chia sẻ ít kinh nghiệm cho người mới với.',
  'Nhận được rồi nhé cả nhà, chúc anh em hôm nay rực rỡ.',
  'Cổng này tầm giờ này hay nhả lắm, anh em canh đúng nhịp mà vào.',
  'Nạp đầu bên này được nhân đôi vốn luôn à anh em?',
  'Đúng rồi bạn ơi, KM nạp đầu cao ngất ngưởng, húp trọn đi.',
  'Anh em bên live xuống đây đông phết nhỉ, làm cái kèo giao lưu đi.',
  'Hôm nay mình bú nhẹ được vài củ rồi, nghỉ ngơi hóng chuyện anh em thôi.',
  'Cổng đang nhả đẹp, anh em nào đang xa bờ thì tranh thủ về bờ đi.',
  'Mình vừa nhận được KM xong, công nhận duyệt tự động nhanh gọn.',
  'Có anh em nào đang ngồi canh cầu không, nay đi cầu nào đẹp thế?',
  'Từ live qua đây nhận code mất chưa tới 2 phút, quá ưng.',
  'Anh em chơi từ từ giữ vốn nhé, cổng đang nhả cứ đều tay mà giã.',
  'Nhận được KM rồi anh em ạ, cảm ơn đội ngũ hỗ trợ nhiều nhé.',
  'Hôm nay anh em thế nào, có ai bú thông 5 tay không?',
  'Mới nạp đầu xong, nhận KM cái vào quay nổ luôn, hên thật sự.',
  'Bên live đang phát code ầm ầm kìa, anh em tranh thủ húp rồi xuống đây.',
  'Cổng này rút nạp cũng nhanh mà nhả cũng thoáng, chơi yên tâm hẳn.',
  'Anh em nào mới vào chưa rõ cách nhận KM nạp đầu thì cứ hỏi nhé.',
  'Nãy giờ mình bú cũng kha khá rồi, nhường lộc lại cho anh em vào sau đấy.',
  'Có ai từ live sang đây mà chưa nhận được quà không?',
  'Chúc anh em trong phòng hôm nay tay thơm, bú ngập mồm nhé.'
];