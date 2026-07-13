# Hướng dẫn Component & Dữ liệu (Components & Data Guide)

Tài liệu này hướng dẫn chi tiết về cấu trúc các component giao diện lớn (sections), các component dùng chung và cách cập nhật dữ liệu của trang Portfolio.

---

## 1. Phân đoạn Giao diện chính (Sections)

Mỗi mục nội dung chính trên trang Portfolio được định nghĩa là một Section nằm trong thư mục `sections/`:

### 1.1 Hero Section (`HeroSection.tsx`)
*   **Mô tả**: Trang đáp chính khi truy cập trang web, chứa ảnh đại diện lớn (desktop hiển thị bên trái, mobile hiển thị dạng tròn ở trên đầu), tên và vai trò công việc.
*   **Hành động**: Chứa nút "More About Me" để chuyển điều hướng sang tab About (`changeNav("about")`).

### 1.2 About Section (`AboutSection.tsx`)
*   **Mô tả**: Hiển thị thông tin giới thiệu chi tiết về cá nhân.
*   **Thành phần**:
    *   *Personal Info*: Bảng thông tin cá nhân (Tuổi, Quốc tịch, Địa chỉ, Số điện thoại, Email, Ngôn ngữ).
    *   *Stats*: Các hộp chỉ số thống kê nổi bật (Năm kinh nghiệm, Số dự án đã làm...).
    *   *Skills*: Danh sách kỹ năng chuyên môn được biểu diễn bằng các vòng tròn phần trăm tiến trình (sử dụng thư viện CSS `c100` thuần).
    *   *Experience & Education*: Dòng thời gian (Timeline) hiển thị quá trình làm việc và học tập.

### 1.3 Portfolio Section (`PortfolioSection.tsx`)
*   **Mô tả**: Trình bày danh sách các sản phẩm/dự án đã thực hiện.
*   **Thành phần**:
    *   *Filter Categories*: Bộ lọc dự án theo chủ đề (ví dụ: All, Logo, Video, Graphic Design).
    *   *Grid Items*: Lưới dự án với hiệu ứng hover hiển thị tiêu đề dự án. Khi nhấn vào một dự án, nó sẽ kích hoạt trạng thái `popup` để hiển thị chi tiết dự án đó qua component `Popup`.

### 1.4 Blog Section (`BlogSection.tsx`)
*   **Mô tả**: Hiển thị danh sách các bài viết cá nhân hoặc tin tức.
*   **Thành phần**:
    *   Lưới các thẻ bài viết blog (Blog Cards) chứa tiêu đề, ảnh xem trước, ngày đăng, tác giả và thẻ phân loại (tags). Bấm vào bài viết sẽ mở `Popup` hiển thị nội dung chi tiết.

### 1.5 Contact Section (`ContactSection.tsx`)
*   **Mô tả**: Phân đoạn hỗ trợ liên hệ và gửi tin nhắn.
*   **Thành phần**:
    *   Thông tin liên lạc trực tiếp (Email, Điện thoại, Địa chỉ).
    *   Liên kết mạng xã hội (Facebook, Twitter, LinkedIn, GitHub...).
    *   Biểu mẫu gửi tin nhắn (Contact Form): Hiện tại hoạt động client-side, hiển thị thông báo gửi thành công (Success Toast).

---

## 2. Component Dùng chung (Global Components)

Các component dùng chung đặt tại thư mục `components/`:

*   **`SectionTitle.tsx`**: Tiêu đề phân đoạn đặc trưng của template Tunis. Nhận vào `title` (chữ nhấn nhỏ phía trước) và `bgTitle` (chữ nền xám mờ lớn phía sau).
    ```tsx
    <SectionTitle title="About Me" bgTitle="Resume" />
    ```
*   **`Popup.tsx`**: Nhận ID của bài viết hoặc dự án qua Tunis Context (`popup`). Nó sẽ quét danh sách dữ liệu để render ra hộp thoại chi tiết tương ứng (ảnh lớn, mô tả dài, các liên kết xem trước).

---

## 3. Hướng dẫn Cập nhật Dữ liệu (Data Integration)

Để thay đổi thông tin hiển thị trên giao diện của Portfolio, lập trình viên không cần can thiệp sâu vào code của các component mà chỉ cần chỉnh sửa nội dung trong tệp **`data/portfolio.json`**:

### Định dạng cấu trúc của `portfolio.json`:

```json
{
  "home": {
    "name": "Tên Của Bạn",
    "role": "Vị trí / Chức danh công việc",
    "photo": "/assets/img/profile-image.png",
    "photoMobile": "/assets/img/profile-image-mobile.png"
  },
  "personalInfo": [
    {
      "id": 11,
      "data": [
        { "id": 1, "type": "First Name", "value": "Tên" },
        { "id": 2, "type": "Last Name", "value": "Họ" }
      ]
    }
  ],
  "stats": [
    { "id": 1, "title": "Năm kinh nghiệm", "value": "5+" }
  ],
  "techStack": [
    { "id": 1, "title": "Angular, ReactJS, Next.js", "value": "Frontend" }
  ],
  "experience": [
    {
      "id": 1,
      "date": "2020 - Present",
      "title": "Vị trí",
      "company": "Tên công ty",
      "projectName": "Tên dự án nổi bật",
      "desc": "Mô tả chi tiết công việc đã làm"
    }
  ],
  "education": [
    {
      "id": 1,
      "date": "2015 - 2019",
      "title": "Chuyên ngành",
      "unv": "Tên trường Đại học",
      "desc": "Mô tả khóa học hoặc thành tích"
    }
  ],
  "skills": [
    { "id": 1, "name": "HTML", "value": "95" }
  ],
  "portfolio": [
    {
      "id": 1,
      "img": "/assets/img/projects/project-1.jpg",
      "type": "Web Application",
      "title": "Tên dự án",
      "previewLink": "https://example.com"
    }
  ]
}
```

*Lưu ý:* Sau khi sửa đổi `portfolio.json`, Adapter `data/siteData.ts` sẽ tự động chuyển đổi định dạng và phân phối dữ liệu mới cho toàn bộ các Section và Component.
