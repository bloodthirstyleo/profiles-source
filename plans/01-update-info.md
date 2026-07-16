# Kế hoạch 01: Cập nhật thông tin cá nhân & Dự án từ CV

Kế hoạch này tập trung vào việc cập nhật toàn bộ cơ sở dữ liệu tĩnh của website tại tệp `data/portfolio.json` để đồng bộ thông tin với hồ sơ năng lực thực tế của Võ Mạnh Khánh.

---

## 📋 Nội dung cần cập nhật

### 1. Thông tin liên hệ & Giới thiệu chung (`home` và `personalInfo`)
*   **Họ tên**: Võ Mạnh Khánh (Vo Manh Khanh)
*   **Số điện thoại**: `0337116862` (Sửa từ số `0337116462` hiện tại)
*   **Địa chỉ**: An Nhơn, Tp. Hồ Chí Minh (Đã khớp)
*   **Học vấn**: Công nghệ thông tin / Công nghệ hóa học - Đại học Công nghiệp TP.HCM (2015-nay)
*   **Footer**: Cập nhật thông tin bản quyền và liên hệ từ tên cũ ("Phat Nguyen Tan") sang "Võ Mạnh Khánh".

### 2. Danh sách dự án trong Portfolio (`portfolio`)
Mở rộng danh sách dự án từ 3 dự án hiện tại lên đầy đủ **9 dự án** có trong CV:

1.  **AI Travel Assistant & Smart Tour Recommendation Platform (2025 - Nay)**
    *   *Vai trò*: Full stack developer
    *   *Mô tả*: Nền tảng trợ lý du lịch AI gợi ý điểm đến, lịch trình và đặt tour tại Quy Nhơn & Gia Lai.
    *   *Công nghệ*: Next.js, NestJS, TailwindCSS, MySQL, AI (DeepSeek, OpenAI)
2.  **Mama's Pizza – Food Ordering & Admin Management (2025 - 2026)**
    *   *Vai trò*: Full stack developer
    *   *Công nghệ*: Next.js, NestJS, TailwindCSS, MySQL
3.  **Thích Tour Management System (2024 - 2026)**
    *   *Vai trò*: Full stack developer
    *   *Công nghệ*: Angular 18, AntDesign, .NET 8, MariaDB
4.  **Vidata – E-commerce Platform (Zalo Mini App) (2024 - 2024)**
    *   *Vai trò*: Front-end developer
    *   *Công nghệ*: React.js, Recoil, Zalo Mini App SDK, WooCommerce, WordPress
5.  **Online Learning Management System for English Center (2023 - 2024)**
    *   *Vai trò*: Front-end developer
    *   *Công nghệ*: Angular 16, SSR, .NET 7
6.  **Thích Tour Booking Website (2023 - 2023)**
    *   *Vai trò*: Front-end developer
    *   *Công nghệ*: WordPress, JS
7.  **Houzi Real Estate Platform (2022 - 2023)**
    *   *Vai trò*: Front-end developer & Mobile App
    *   *Công nghệ*: WordPress, Flutter, .NET 6
8.  **Bahnar Dictionary Website (2022 - 2022)**
    *   *Vai trò*: Front-end developer
    *   *Công nghệ*: Angular 14, .NET 6
9.  **Kindergarten Management System (2021 - 2022)**
    *   *Vai trò*: Front-end developer
    *   *Công nghệ*: Angular 14, .NET 6

### 3. Thông tin người giới thiệu (`references`)
Thêm mục thông tin người giới thiệu vào website:
*   **Nguyễn Tấn Phát** (Senior Back-end Developer)
*   *Email*: nguyentanphatuit@gmail.com
*   *Sđt*: 0869164648

---

## 🛠️ Các bước thực hiện

#### Bước 1: Sửa đổi [portfolio.json](file:///c:/CongViec/profiles-source/data/portfolio.json)
- Sửa số điện thoại trong mục `personalInfo`.
- Cập nhật thông tin `footer` về đúng tên Võ Mạnh Khánh.
- Khai báo thêm 6 dự án còn thiếu vào mảng `"portfolio"`.
- Bổ sung cấu trúc dữ liệu người giới thiệu (`references`) dưới dạng mảng mới:
  ```json
  "references": [
    {
      "name": "Nguyen Tan Phat",
      "role": "Senior Back-end Developer",
      "email": "nguyentanphatuit@gmail.com",
      "phone": "0869164648"
    }
  ]
  ```

#### Bước 2: Cập nhật [siteData.ts](file:///c:/CongViec/profiles-source/data/siteData.ts)
- Xuất thêm (export) thông tin `references` từ `portfolio.json` để các Component có thể sử dụng.
- Đảm bảo các hàm map dữ liệu dự án tự động lấy đúng các trường mới.

#### Bước 3: Tạo giao diện hiển thị người giới thiệu trong `AboutSection`
- Bổ sung một ô Bento Grid nhỏ hiển thị thông tin "Người giới thiệu" (References) dưới dạng thông tin liên hệ thẻ Card sang trọng.

---

## 🧪 Phương án xác nhận (Verification)
1. Khởi chạy dev server: `npm run dev`.
2. Kiểm tra phần thông tin liên hệ và footer hiển thị đúng tên "Võ Mạnh Khánh" và số điện thoại mới.
3. Chuyển đến tab **Portfolio** và xác nhận đủ 9 dự án hiển thị với đúng tên, công nghệ và hình ảnh mô tả.
4. Kiểm tra tab **About** hiển thị thêm khung thông tin người giới thiệu Nguyễn Tấn Phát.
