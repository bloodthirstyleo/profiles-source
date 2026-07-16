# Kế hoạch 08: Tích hợp hiệu ứng 3D tương tác bằng Three.js

Kế hoạch này hướng tới việc nâng tầm giao diện trang web lên chuẩn công nghệ cao cấp bằng cách nhúng các thực thể và hiệu ứng 3D tương tác trực tiếp bằng thư viện Three.js (hoặc React Three Fiber).

---

## 🌌 Các ý tưởng hiệu ứng 3D đề xuất

Để không làm ảnh hưởng đến hiệu năng tải trang và trải nghiệm đọc thông tin chính, các hiệu ứng 3D sẽ được tối ưu hóa ở mức tối giản (Low-poly) và đậm chất nghệ thuật công nghệ (Tech-art):

### 1. Nền hạt bụi 3D tương tác (Interactive 3D Particle Field)
*   **Mô tả**: Thay thế hoặc bổ sung cho bóng đèn Aurora tĩnh bằng một trường hạt 3D (Particle System) gồm hàng ngàn điểm sáng lơ lửng.
*   **Tính năng tương tác**: Các hạt bụi sẽ tự động chuyển động gợn sóng mượt mà (chuyển động sóng sin) và sẽ bị đẩy ra xa hoặc hút lại gần theo tọa độ chuột của người dùng khi di chuyển trên màn hình.

### 2. Khối Rubik/Vật thể công nghệ 3D xoay chiều tại Hero Section
*   **Mô tả**: Tại màn hình chào mừng (Hero Section), bên cạnh ảnh đại diện, tích hợp một Canvas 3D hiển thị một khối đa diện (hoặc mô hình 3D trừu tượng) dạng bán trong suốt (glassmorphic material) phát sáng neon mờ.
*   **Tính năng tương tác**: Vật thể tự động quay tròn chậm rãi và sẽ nghiêng xoay (3D tilting) theo góc nhìn chuột của người dùng (tạo hiệu ứng Parallax 3D chiều sâu).

### 3. Quả cầu Công nghệ 3D (Interactive Tech Stack Globe)
*   **Vị trí**: Nằm ở phần Kỹ năng (Skills) của trang About.
*   **Mô tả**: Một quả cầu 3D dạng lưới (Wireframe Globe) xoay tròn, trên đó đính các nhãn tên công nghệ (React, Angular, .NET,...).
*   **Tính năng tương tác**: Khi rê chuột vào quả cầu sẽ xoay theo lực vuốt, rê chuột vào nhãn tên nào thì nhãn đó sẽ phát sáng và hiển thị thông số chi tiết của kỹ năng đó.

---

## 🛠️ Quy trình thực hiện

#### Bước 1: Cài đặt thư viện cần thiết
Cài đặt các gói thư viện 3D cốt lõi cho React:
```bash
npm install three @types/three @react-three/fiber @react-three/drei
```
*(Sử dụng React Three Fiber giúp việc viết code Three.js dưới dạng các component React vô cùng tự nhiên và dễ quản lý).*

#### Bước 2: Lập trình Component nền hạt bụi [components/ThreeBackground.tsx](file:///c:/CongViec/profiles-source/components/ThreeBackground.tsx)
*   Khởi tạo `Scene`, `PerspectiveCamera` và `WebGLRenderer`.
*   Tạo danh sách tọa độ ngẫu nhiên cho các hạt bằng `BufferGeometry`.
*   Sử dụng `PointsMaterial` với màu sắc đồng điệu với skin CSS hiện tại (lắng nghe state màu từ `TunisContext`).
*   Viết vòng lặp render (`requestAnimationFrame`) để cập nhật vị trí hạt theo thời gian và vị trí chuột.

#### Bước 3: Tối ưu hóa hiệu năng & Rác bộ nhớ (Memory Cleanup)
*   Đảm bảo giải phóng đầy đủ tài nguyên (`geometry.dispose()`, `material.dispose()`) khi Component bị unmount (chuyển đổi trang) để tránh tràn bộ nhớ RAM (Memory Leak).
*   Giới hạn chỉ số FPS tối đa là 60 và tự động tạm dừng render khi tab trình duyệt bị ẩn (Page Visibility API).

---

## 🧪 Kế hoạch xác nhận (Verification)
1. Kiểm tra tốc độ khung hình (Frame Rate) đảm bảo đạt mức ổn định **60 FPS** trên cả máy tính lẫn thiết bị di động (sử dụng tiện ích đo chỉ số FPS của Chrome DevTools).
2. Di chuột khắp màn hình để xác nhận hiệu ứng hạt bụi phản hồi theo hướng chuột mượt mà.
3. Chuyển đổi qua lại giữa các trang (Home, About, Portfolio) nhiều lần và dùng thẻ Memory trong Chrome DevTools để kiểm tra xem dung lượng RAM có bị tăng dần không (xác nhận việc giải phóng bộ nhớ Three.js hoạt động đúng).
4. Thay đổi màu sắc skin giao diện và kiểm tra xem màu của hạt bụi 3D có tự động đổi màu theo không.
