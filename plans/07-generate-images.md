# Kế hoạch 07: Quy trình tạo và tối ưu hóa hình ảnh cho Website

Kế hoạch này chi tiết hóa quy trình sử dụng các mô hình tạo ảnh AI (như Imagen/Gemini) để thiết kế các tài nguyên hình ảnh chất lượng cao, đồng bộ về phong cách nghệ thuật (Art Style) cho toàn bộ trang web cá nhân.

---

## 🖼️ Các vị trí cần hình ảnh & Phong cách nghệ thuật (Art Style)

Để đảm bảo trang web trông sang trọng, đẳng cấp (Premium) và đồng bộ, chúng ta sẽ áp dụng phong cách thiết kế **Abstract Tech 3D / Glassmorphism Illustration** (Minh họa công nghệ 3D trừu tượng kết hợp hiệu ứng kính mờ) làm chủ đạo.

### 1. Ảnh đại diện cá nhân (Avatar / Profile Image)
*   **Vị trí**: Trang chủ (Desktop) và phần Giới thiệu (Mobile).
*   **Tệp tin**: `/public/assets/img/profile-image.png` và `profile-image-mobile.png`.
*   **Ý tưởng**: Một ảnh chân dung lập trình viên nam chuyên nghiệp, góc chụp nghiêng hiện đại, hậu cảnh là các vệt sáng công nghệ mờ ảo (Neon lights) đồng điệu với skin của trang web.

### 2. Ảnh minh họa dự án (Portfolio Projects - 9 ảnh)
Thay thế toàn bộ các ảnh chụp màn hình dự án trùng lặp (`project-2.PNG`, `project-3.PNG`) bằng các ảnh minh họa 3D riêng biệt, thể hiện đúng lĩnh vực của từng dự án:

1.  **AI Travel Assistant**: Minh họa chatbot AI 3D lơ lửng trên bản đồ Quy Nhơn/Gia Lai với hiệu ứng neon vàng và xanh dương.
2.  **Mama's Pizza**: Minh họa hộp pizza 3D phong cách claymorphism kết hợp giao diện đặt hàng mobile hiện đại.
3.  **Thích Tour Management**: Minh họa dashboard quản lý dạng lưới tinh tế, các biểu đồ doanh thu và lịch trình bay 3D.
4.  **Vidata (Zalo Mini App)**: Minh họa điện thoại hiển thị app thương mại điện tử nông sản sạch, tươi sáng.
5.  **English Center LMS**: Minh họa sách vở học tập 3D, mũ tốt nghiệp và giao diện lớp học trực tuyến.
6.  **Thích Tour Booking**: Minh họa giao diện web đặt tour du lịch với hình ảnh bãi biển, vali 3D.
7.  **Houzi Real Estate**: Minh họa mô hình ngôi nhà 3D nằm trên màn hình điện thoại/máy tính bảng.
8.  **Bahnar Dictionary**: Minh họa cuốn từ điển mở ra phát sáng các ký tự ngôn ngữ cổ, có biểu tượng sóng âm thanh dịch thuật.
9.  **Kindergarten Management**: Minh họa các hình khối đồ chơi trẻ em 3D sặc sỡ bên cạnh bảng thống kê tài chính.

### 3. Ảnh bài viết Blog (Blog Thumbnails - 6 ảnh)
Tạo ảnh bìa blog hấp dẫn cho các chủ đề:
*   *Xây dựng Email List*: Minh họa hộp thư đến phát sáng phong cách 3D.
*   *Deep Learning*: Minh họa mạng lưới thần kinh AI dạng chấm phát sáng.
*   *Web Accessibility*: Minh họa biểu tượng tiếp cận toàn cầu dạng kính mờ.

### 4. Ảnh minh họa Minigames & Giải trí (Game & Fun Zone - 3 ảnh)
*   *Snake Game*: Chú rắn 3D phong cách retro neon sắc sảo.
*   *Tetris Game*: Các khối gạch xếp hình phát sáng đa sắc màu.
*   *Góc Phim ảnh/Thể thao*: Biểu tượng cuộn phim và găng tay boxing 3D đan chéo cực ngầu.

---

## 🛠️ Quy trình tạo ảnh bằng AI

Chúng ta sẽ sử dụng công cụ tạo ảnh AI có sẵn để sinh ảnh trực tiếp vào thư mục mã nguồn:

#### Bước 1: Chuẩn bị tham số Prompt chuẩn
Mỗi prompt sẽ có cấu trúc nền:
`"Premium 3D illustration of [chủ đề dự án], dark mode background, neon glowing accents, glassmorphic design elements, render in blender, isometric view, high resolution, clean paths --aspect 16:9"`

#### Bước 2: Kích hoạt tạo ảnh tự động
Chạy lệnh tạo ảnh thông qua mô hình tạo ảnh AI tích hợp và lưu trực tiếp vào thư mục `/public/assets/img/projects/` và `/public/assets/img/blog/`.

#### Bước 3: Nén và tối ưu định dạng
- Sử dụng định dạng **WebP** hoặc **PNG tối ưu** để giảm dung lượng file xuống dưới **100KB** mỗi ảnh, đảm bảo trang web load cực nhanh trên mobile nhưng vẫn sắc nét.

---

## 🧪 Kế hoạch xác nhận (Verification)
1. Xác nhận toàn bộ 9 ảnh dự án, 6 ảnh blog, 2 ảnh avatar, và các ảnh game đã tồn tại trong thư mục `public/assets/img/`.
2. Kiểm tra giao diện Portfolio xem ảnh hiển thị đúng tỷ lệ khung hình (Aspect Ratio `16:9` hoặc `video`) và không bị méo.
3. Đảm bảo tốc độ tải trang đạt điểm tối ưu trên Google PageSpeed Insights sau khi đã nén ảnh.
