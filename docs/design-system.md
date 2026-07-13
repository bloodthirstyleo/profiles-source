# Hệ thống Thiết kế (Design System)

Tài liệu này chi tiết hóa hệ thống thiết kế (Design System) của dự án, bao gồm cấu hình Tailwind CSS, cơ chế quản lý màu sắc giao diện (theme skins) và hệ thống Typography.

---

## 1. Cấu hình Màu sắc (Colors)

Dự án mở rộng bảng màu mặc định của Tailwind để phù hợp với giao diện tối (dark theme) của template gốc:

| Tên Class | Mã Màu Hex | Vai trò / Sử dụng |
| :--- | :--- | :--- |
| `accent` | `#ffb400` | Màu nhấn mạnh chủ đạo (mặc định là màu vàng/cam). |
| `black-3` | `#252525` | Màu nền phụ cho các khối thẻ, popup hoặc sidebar. |
| `black-4` | `#333333` | Màu đường viền hoặc các chi tiết phân tách nhỏ. |
| `black-5` | `#555555` | Màu văn bản phụ có độ tương phản thấp. |
| `black-6` | `#666666` | Màu icon mờ hoặc văn bản gợi ý (placeholder). |
| `light-grey` | `#aaaaaa` | Màu chữ phụ, mô tả ngắn. |
| `grey` | `#dddddd` | Màu viền nhạt hoặc nền phụ. |

---

## 2. Hệ thống Skin màu chủ đạo (Theme Skins CSS)

Để thay đổi linh hoạt màu sắc nhấn mạnh (`accent`) trên toàn trang, dự án sử dụng các tệp CSS skin tĩnh được nạp động:
*   Đường dẫn lưu trữ: `public/assets/css/skins/`
*   Hiện tại, dự án có tệp màu **xanh dương**: `public/assets/css/skins/blue.css`
*   Cách nạp: Component `SkinStylesheet.tsx` lấy state `color` từ Context để render thẻ `<link rel="stylesheet">` trỏ tới tệp CSS tương ứng.

Ví dụ định nghĩa màu trong `blue.css`:
```css
/* Ghi đè màu accent hoặc các class liên quan đến màu nhấn của chủ đề màu xanh */
.accent-color {
  color: #007bff;
}
.accent-bg {
  background-color: #007bff;
}
```

---

## 3. Typography (Hệ thống Chữ viết)

Dự án sử dụng hai bộ font chính từ Google Fonts:
*   **Poppins**: Font chữ chính cho tiêu đề, các nút hành động, và các thành phần giao diện chính.
*   **Open Sans**: Font chữ cho nội dung văn bản (body text), mô tả, và danh sách bài viết.

### Cấu hình Lớp Chữ viết (Font Sizes & Line Heights)

Các lớp kích thước chữ tùy chỉnh được định nghĩa trong `tailwind.config.ts`:

*   **Font Sizes**:
    *   `fs-12` (12px), `fs-13` (13px), `fs-14` (14px), `fs-15` (15px), `fs-16` (16px) - Kích thước chữ thông thường, mô tả, nội dung thẻ.
    *   `fs-18` (18px), `fs-19` (19px), `fs-21` (21px) - Tiêu đề phụ, tiêu đề thẻ nhỏ.
    *   `fs-26` (26px), `fs-33` (33px) - Tiêu đề phần, tiêu đề popup.
    *   `fs-40` (40px), `fs-50` (50px), `fs-60` (60px) - Tiêu đề lớn ở trang Hero hoặc tiêu đề nền mờ phía sau.
*   **Line Heights**:
    *   `lh-1.2` (1.2), `lh-1.4` (1.4), `lh-1.6` (1.6)
    *   `lh-30` (30px), `lh-40` (40px)

---

## 4. Bố cục & Khoảng cách (Spacing & Layout)

Dự án thiết lập kích thước chiều rộng tối đa (max-width) tùy biến để hiển thị responsive tối ưu:
*   `max-w-540`: 540px
*   `max-w-720`: 720px
*   `max-w-960`: 960px
*   `max-w-1140`: 1140px (Kích thước container chuẩn của trang)
*   `max-w-700`: 700px
*   `max-w-40prcent`: 40% (Thường dùng cho ảnh nền hoặc cột thông tin cụ thể)

Hệ thống Spacing mở rộng từ `1px` đến `230px` (e.g., `h-85`, `w-230`, `p-20`) giúp căn chỉnh chính xác bố cục theo template gốc của Tunis.
