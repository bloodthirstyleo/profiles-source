# Kế hoạch 02: Tinh chỉnh Style & Layout Website

Kế hoạch này hướng tới việc tối ưu hóa giao diện (UI) và trải nghiệm người dùng (UX), đưa phong cách thiết kế của trang web lên mức cao cấp (Premium) theo đúng bộ tiêu chí thiết kế web hiện đại.

---

## 🎨 Ý tưởng thiết kế & Cải tiến Layout

### 1. Tối ưu Bento Grid Layout (Trang About & Home)
*   Tăng độ bo góc (`rounded-2xl` hoặc `rounded-3xl`) cho các hộp thông tin dạng Bento.
*   Cải tiến hiệu ứng hover: thêm bóng đổ phát sáng (box-shadow glow) đồng màu với skin chủ đạo đang chọn (ví dụ: viền xanh dương mờ khi hover ở skin xanh dương).
*   Thêm viền mờ dạng kính (glassmorphism border) sử dụng backdrop-filter mạnh mẽ hơn.

### 2. Hiệu ứng Aurora Background chuyển động
*   Nâng cấp các bóng sáng Aurora ở nền: tăng kích thước và làm chậm chu kỳ chuyển động để tạo cảm giác trang web "đang thở" và có chiều sâu.
*   Sử dụng CSS custom animation thay vì tailwind mặc định để kiểm soát mượt mà hiệu năng GPU.

### 3. Tối ưu hiển thị Responsive trên thiết bị di động
*   Điều chỉnh khoảng cách (paddings/margins) của các Section trên màn hình nhỏ (giảm padding từ `pt-28` xuống `pt-20` trên mobile để tránh khoảng trống thừa).
*   Sửa lỗi căn giữa các nút bấm (như nút "Download CV" hay "More About Me") để chúng vừa vặn trên màn hình thiết bị có chiều ngang hẹp.

### 4. Nâng cấp bộ chọn màu giao diện (Skin Switcher)
*   Thiết kế lại Panel chọn màu skin (hiện tại có thể đang ẩn hoặc hiển thị đơn giản).
*   Thêm hiệu ứng xoay tròn và trượt mượt mà (slide-in) khi người dùng mở bảng chọn màu.
*   Hiển thị preview màu sắc trực quan bằng các nút tròn gradient đầy sắc màu.

---

## 🛠️ Các bước thực hiện

#### Bước 1: Cập nhật cấu hình Tailwind [tailwind.config.ts](file:///c:/CongViec/profiles-source/tailwind.config.ts)
- Định nghĩa thêm các animation cho hiệu ứng Aurora và các giá trị blur lớn hơn.
- Thêm các biến CSS tùy biến cho phép thay đổi màu shadow dựa trên CSS skin hiện tại.

#### Bước 2: Tinh chỉnh CSS toàn cục [globals.css](file:///c:/CongViec/profiles-source/app/globals.css)
- Khai báo các lớp tiện ích kính mờ (`glass-panel`) với hiệu ứng blur nâng cấp:
  ```css
  .glass-panel {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  ```

#### Bước 3: Nâng cấp linh hồn chuyển động (Micro-interactions)
- Bổ sung hiệu ứng dịch chuyển nhẹ (transform translate-y) và tăng kích thước nhẹ cho các thẻ bài viết blog, thẻ dự án portfolio khi người dùng rê chuột qua.

---

## 🧪 Phương án xác nhận (Verification)
1. Dùng công cụ Lighthouse hoặc Chrome DevTools để kiểm định chỉ số CLS (Cumulative Layout Shift - không bị dịch chuyển giao diện khi tải trang).
2. Kiểm tra giao diện trên nhiều độ phân giải giả lập (Mobile XS, Tablet, Laptop, Desktop).
3. Đảm bảo hiệu ứng nền Aurora chạy ổn định mà không gây giật lag (kiểm tra CPU/GPU usage của trình duyệt).
