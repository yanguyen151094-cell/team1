export interface ChatMember {
  id: string;
  name: string;
  flag: string;
  country: string;
  role: 'Điều hành' | 'Thành viên' | 'Khách mời';
  note: string;
}

export const chatRoomTopic = 'Trò chuyện thoải mái';

export const chatMembers: ChatMember[] = [
  {
    id: 'minh-quan',
    name: 'Minh Quân',
    flag: '🇻🇳',
    country: 'Việt Nam',
    role: 'Thành viên',
    note: 'Hà Nội · tham gia 3 tháng trước',
  },
  {
    id: 'thu-ha',
    name: 'Thu Hà',
    flag: '🇩🇪',
    country: 'Đức',
    role: 'Điều hành',
    note: 'Berlin · phụ trách cổng châu Âu',
  },
  {
    id: 'daniel',
    name: 'Daniel Weber',
    flag: '🇨🇭',
    country: 'Thụy Sĩ',
    role: 'Thành viên',
    note: 'Zürich · tham gia 5 tháng trước',
  },
  {
    id: 'hoang-nam',
    name: 'Hoàng Nam',
    flag: '🇯🇵',
    country: 'Nhật Bản',
    role: 'Thành viên',
    note: 'Tokyo · tham gia 2 tháng trước',
  },
  {
    id: 'ngoc-anh',
    name: 'Ngọc Anh',
    flag: '🇨🇦',
    country: 'Canada',
    role: 'Thành viên',
    note: 'Toronto · tham gia 8 tháng trước',
  },
  {
    id: 'ji-hoon',
    name: 'Kim Ji-hoon',
    flag: '🇰🇷',
    country: 'Hàn Quốc',
    role: 'Khách mời',
    note: 'Seoul · mới vào phòng hôm nay',
  },
  {
    id: 'trong-nghia',
    name: 'Trọng Nghĩa',
    flag: '🇳🇱',
    country: 'Hà Lan',
    role: 'Thành viên',
    note: 'Amsterdam · tham gia 1 tháng trước',
  },
  {
    id: 'mai-linh',
    name: 'Mai Linh',
    flag: '🇦🇪',
    country: 'UAE',
    role: 'Điều hành',
    note: 'Dubai · phụ trách khu vực Trung Đông',
  },
  {
    id: 'bao-khang',
    name: 'Bảo Khang',
    flag: '🇬🇧',
    country: 'Anh',
    role: 'Thành viên',
    note: 'London · tham gia 6 tháng trước',
  },
  {
    id: 'thi-thanh',
    name: 'Thị Thanh',
    flag: '🇵🇹',
    country: 'Bồ Đào Nha',
    role: 'Khách mời',
    note: 'Lisbon · mới vào phòng tuần này',
  },
];

export const chatQuickReplies: string[] = [
  'Chào cả nhà, mình mới vào phòng',
  'Có ai đang ở Đức không?',
  'Cổng Nhật mấy giờ trực nhỉ?',
  'Phòng hôm nay đông thật',
];