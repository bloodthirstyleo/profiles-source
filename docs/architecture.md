# Kiến trúc Dự án (Architecture)

Tài liệu này mô tả cấu trúc thư mục, luồng hoạt động, cách quản lý trạng thái (State Management) và cơ chế routing trong dự án Personal Portfolio Next.js.

---

## 1. Cấu trúc Thư mục (Directory Structure)

Dự án tuân theo cấu trúc Next.js App Router với các thành phần chính như sau:

*   **`app/`**: Chứa các route và layout của Next.js (App Router).
    *   `layout.tsx`: Layout gốc (Root Layout) định nghĩa thẻ `<html>`, `<body>`, nạp CSS toàn cục, và bọc ứng dụng trong `TunisProvider`.
    *   `page.tsx`: Trang chủ, render `HeroSection` của portfolio.
    *   `about/page.tsx`, `contact/page.tsx`, `portfolio/page.tsx`: Các trang/route con tương ứng với từng phân đoạn nội dung.
    *   `globals.css`: Tệp CSS toàn cục định nghĩa font chữ, reset style và các class tiện ích tùy chỉnh.
*   **`components/`**: Các component giao diện dùng chung:
    *   `SectionTitle.tsx`: Render tiêu đề phân đoạn với hiệu ứng chữ nền mờ lớn phía sau.
    *   `Popup.tsx`: Hộp thoại modal hiển thị thông tin chi tiết của dự án hoặc bài viết blog.
    *   `SkinStylesheet.tsx`: Nạp động file CSS skin màu sắc dựa trên state của người dùng.
*   **`contexts/`**: Quản lý trạng thái toàn cục của ứng dụng.
    *   `TunisContext.tsx`: Cung cấp React Context và `useReducer` để quản lý giao diện, điều hướng và giao diện sáng/tối.
*   **`data/`**: Nơi lưu trữ và định nghĩa dữ liệu tĩnh của Portfolio.
    *   `portfolio.json`: File dữ liệu thô dạng JSON chứa toàn bộ thông tin cá nhân, học vấn, kinh nghiệm, kỹ năng và dự án. Đây là **Single Source of Truth** của dự án.
    *   `siteData.ts`: Adapter định dạng dữ liệu (TypeScript Interfaces) và xuất (export) các hằng số dữ liệu từ `portfolio.json` để các component sử dụng.
    *   `metadata.json`: Chứa metadata cho SEO (title, description, open graph, v.v.).
*   **`sections/`**: Các phân đoạn giao diện lớn (tương ứng với các trang):
    *   `HeroSection.tsx`, `AboutSection.tsx`, `PortfolioSection.tsx`, `BlogSection.tsx`, `ContactSection.tsx`.
*   **`public/`**: Các tài nguyên tĩnh được phân phối trực tiếp:
    *   `assets/css/skins/`: Chứa tệp CSS quy định màu sắc chủ đạo (skin) của giao diện (ví dụ: `blue.css`).
    *   `assets/img/`: Chứa các tệp hình ảnh cá nhân, ảnh dự án.

---

## 2. Quản lý Trạng thái (State Management)

Toàn bộ trạng thái hiển thị của Portfolio được quản lý tập trung thông qua `TunisContext.tsx` sử dụng cặp đôi `useContext` và `useReducer`.

### Trạng thái Giao diện (`TunisState`)

```typescript
interface TunisState {
  nav: string;        // Phân đoạn đang hiển thị (e.g. "home", "about", "portfolio", "contact")
  toggle: boolean;    // Trạng thái menu/navigation (đặc biệt hữu ích trên thiết bị di động)
  color: string;      // Màu sắc giao diện (skin) hiện tại (e.g. "blue")
  direction: string;  // Hướng hiệu ứng chuyển cảnh (e.g. "top", "bottom", "left", "right")
  popup: string | null; // ID của popup/modal đang được mở rộng (blog/portfolio)
  blogs: BlogPost[];  // Danh sách bài viết blog
  dark: boolean;      // Chế độ tối (true) hoặc chế độ sáng (false)
}
```

### Các Action hỗ trợ (`ACTIONS`)

*   `NAV`: Thay đổi phân đoạn hiện tại (e.g., bấm vào menu chuyển từ Home sang About).
*   `TOGGLE`: Bật/tắt trạng thái navigation drawer trên mobile.
*   `COLOR`: Cập nhật màu sắc chủ đạo của giao diện (skin color).
*   `DIRECTION`: Cập nhật hướng hiệu ứng động khi chuyển trang.
*   `POPUP`: Gán ID hoặc `null` để hiển thị/ẩn hộp thoại thông tin chi tiết.
*   `DARK`: Chuyển đổi qua lại giữa chế độ Light và Dark Mode.

### Các hàm callback chính

Các component có thể sử dụng `useTunisContext()` để lấy các state và các hàm điều khiển sau:
*   `changeNav(nav: string, toggle: boolean)`: Chuyển tab điều hướng.
*   `changeColor(color: string)`: Thay đổi màu skin động.
*   `changeDirection(direction: string)`: Đặt hướng animation chuyển trang.
*   `popupToggle(popup: string | null)`: Đóng hoặc mở một popup cụ thể.
*   `darkToggle(dark: boolean)`: Đổi chế độ sáng/tối.

---

## 3. Luồng Routing và Điều hướng (Routing & Navigation)

Ứng dụng được xây dựng theo kiến trúc **Next.js App Router**:
1. Người dùng truy cập trang web.
2. `app/layout.tsx` nạp `TunisProvider` bọc ngoài cùng.
3. Component `SkinStylesheet` lắng nghe sự thay đổi của state `color` từ Context, nạp động tệp CSS màu skin tương ứng từ thư mục `public/assets/css/skins/` (ví dụ: `blue.css`).
4. Khi người dùng bấm vào các mục điều hướng trên thanh menu, hàm `changeNav` sẽ thay đổi state `nav`. Giao diện sẽ áp dụng hiệu ứng chuyển cảnh động (`anim--effect-3`) dựa trên state `direction` để hiển thị trang tương ứng.
