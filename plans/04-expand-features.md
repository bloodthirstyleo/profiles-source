# Kế hoạch 04: Mở rộng Tính năng Website Portfolio

Kế hoạch này vạch ra các tính năng mở rộng cần được tích hợp thêm nhằm mang lại giá trị gia tăng, tính tương tác cao và sự chuyên nghiệp tuyệt đối cho trang web cá nhân.

---

## 🚀 Các tính năng mới đề xuất

### 1. Hỗ trợ Đa ngôn ngữ (Tiếng Việt & Tiếng Anh)
*   **Mục tiêu**: Người xem có thể chuyển đổi ngôn ngữ hiển thị dễ dàng giữa Tiếng Anh và Tiếng Việt qua một nút gạt nhỏ gọn trên Navbar.
*   **Giải pháp**: Xây dựng cơ chế dịch dựa trên React Context đơn giản (vì dự án là static export, không cần thư viện phức tạp như `next-intl` vốn đòi hỏi cấu hình server). Chúng ta sẽ tách riêng tài nguyên ngôn ngữ: `data/locale.en.json` và `data/locale.vi.json`.

### 2. Hộp thoại thông tin chi tiết dự án (Interactive Project Modal)
*   **Mục tiêu**: Thay vì chỉ có nút xem link trực tiếp, khi click vào một dự án, hệ thống sẽ mở ra một cửa sổ popup (Modal) đẹp mắt hiển thị:
    *   Tên dự án, ảnh chụp màn hình dạng Carousel.
    *   Vai trò chi tiết, quy mô đội ngũ (Team size).
    *   Danh sách tính năng đã làm.
    *   Công nghệ sử dụng (dưới dạng các nhãn tag bắt mắt).
    *   Nút liên kết tới mã nguồn GitHub hoặc trang Demo.

### 3. Tích hợp gửi thư liên hệ tự động (Contact Form Integration)
*   **Mục tiêu**: Khi khách truy cập điền biểu mẫu liên hệ, tin nhắn sẽ được gửi trực tiếp về email cá nhân của Võ Mạnh Khánh.
*   **Giải pháp**: Kết nối biểu mẫu hiện tại với dịch vụ miễn phí như **Web3Forms** hoặc **Formspree** qua phương thức POST API. Thêm hiệu ứng loading khi đang gửi và popup thông báo gửi thành công rực rỡ.

### 4. Bổ sung chế độ Sáng/Tối (Light & Dark Mode)
*   **Mục tiêu**: Cho phép chuyển đổi linh hoạt chủ đề toàn giao diện từ nền đen sang nền trắng sang trọng (với thiết kế tối giản).
*   **Giải pháp**: Tích hợp chế độ `dark` và `light` của Tailwind CSS thông qua biến trạng thái trong `TunisContext`.

---

## 🛠️ Các bước thực hiện

#### Bước 1: Thiết kế cấu trúc ngôn ngữ và Context dịch thuật
- Thêm trạng thái `locale` (en/vi) vào `TunisContext`.
- Tạo tệp tin tài nguyên ngôn ngữ và cập nhật dữ liệu.

#### Bước 2: Tạo Component Popup chi tiết dự án [components/Popup.tsx](file:///c:/CongViec/profiles-source/components/Popup.tsx)
- Viết component Modal hỗ trợ cuộn và hiển thị ảnh, thông tin dự án dạng bento nhỏ gọn.

#### Bước 3: Cấu hình gửi mail cho Contact Section
- Đăng ký API Key tại Web3Forms (hoàn toàn miễn phí).
- Cập nhật logic submit form trong `ContactSection.tsx` để thực hiện gửi dữ liệu API.

---

## 🧪 Kế hoạch xác nhận (Verification)
1. Thử nghiệm chuyển đổi ngôn ngữ trên Navbar và kiểm tra xem toàn bộ các mục (About, Experience, Projects) có tự động dịch tương ứng không.
2. Click vào từng dự án trong Portfolio, kiểm tra Modal hiển thị đầy đủ và không bị tràn khung trên điện thoại.
3. Gửi thử một tin nhắn liên hệ mẫu và xác nhận email thông báo được gửi thành công về hòm thư `bloodthirstyleo@gmail.com`.
4. Bật chế độ Light mode và kiểm tra độ tương phản văn bản đạt chuẩn WCAG.
