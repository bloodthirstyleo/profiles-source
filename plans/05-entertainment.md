# Kế hoạch 05: Xây dựng chuyên mục Giải trí (Entertainment Hub)

Kế hoạch này hướng tới việc tạo ra một không gian tương tác vui vẻ ngay trên trang web cá nhân, chia sẻ những góc nhìn hài hước, sở thích cá nhân về cuộc sống, thể thao, điện ảnh để tạo thiện cảm và sự khác biệt cho website.

---

## 🎭 Cấu trúc Phân hệ Giải trí

Chúng ta sẽ tạo một trang mới hoặc một Section lớn có tên là **"Giải trí" (Fun Zone)** bao gồm 3 khu vực chính:

### 1. Góc cuộc sống & Danh ngôn hài hước (Funny Life Quotes)
*   **Mô tả**: Hiển thị ngẫu nhiên các câu nói đùa vui nhộn về lập trình, cuộc sống freelancer, hoặc triết lý sống hài hước.
*   **Tính năng tương tác**: Nút "Lấy câu nói ngẫu nhiên" (Generate Random Joke) với hiệu ứng quay số/đổi chữ đẹp mắt.

### 2. Góc Thể thao (Sports Trivia)
*   **Mô tả**: Chia sẻ các thông tin thú vị, câu đố (trivia) về bóng đá, boxing (môn thể thao yêu thích của Võ Mạnh Khánh) hoặc các kỷ lục thể thao hài hước.
*   **Tính năng tương tác**: Một mini quiz gồm 5 câu hỏi trắc nghiệm thể thao nhanh, chấm điểm ngay lập tức với âm thanh vui vẻ.

### 3. Đề xuất Phim ảnh (Movie Recommendations)
*   **Mô tả**: Một danh sách các bộ phim điện ảnh yêu thích được trình bày dưới dạng thẻ Netflix-style với các bình luận ngắn gọn hài hước (ví dụ: "Phim hack não cho lập trình viên giải trí cuối tuần").
*   **Tính năng tương tác**: Hệ thống lọc phim theo tâm trạng (như "Muốn cười", "Muốn động não", "Muốn xả stress").

---

## 🛠️ Các bước thực hiện

#### Bước 1: Thiết kế Cơ sở dữ liệu giải trí [data/entertainment.json](file:///c:/CongViec/profiles-source/data/entertainment.json)
- Khai báo danh sách các câu đùa (Jokes), câu hỏi đố (Quizzes) và danh sách phim (Movies) kèm đánh giá hài hước.

#### Bước 2: Tạo trang Giải trí mới [app/fun/page.tsx](file:///c:/CongViec/profiles-source/app/fun/page.tsx)
- Viết trang chính để làm bộ khung chứa các Component con:
  - `JokeCard`: Hộp thoại hiển thị danh ngôn vui.
  - `QuizWidget`: Bộ câu đố trắc nghiệm thể thao.
  - `MovieGrid`: Lưới hiển thị các bộ phim gợi ý kèm bộ lọc tâm trạng.

#### Bước 3: Đăng ký liên kết trên Navbar [components/Navbar.tsx](file:///c:/CongViec/profiles-source/components/Navbar.tsx)
- Thêm icon hình mặt cười hoặc tay cầm game 🎮 vào danh sách điều hướng chính để người dùng dễ dàng chuyển tới trang Fun Zone.

---

## 🧪 Kế hoạch xác nhận (Verification)
1. Truy cập vào đường dẫn `/fun/` và kiểm tra giao diện hiển thị đồng nhất với phong cách tối giản/kính mờ của trang portfolio chính.
2. Kiểm tra tính năng bấm nút đổi câu nói đùa xem có mượt mà và không gây giật màn hình không.
3. Chơi thử bộ quiz thể thao và kiểm tra logic hiển thị kết quả (đúng/sai, tổng điểm).
4. Sử dụng bộ lọc phim ảnh để xác nhận các phim hiển thị chính xác theo tâm trạng đã chọn.
