# Kế hoạch 06: Tích hợp Trò chơi tương tác (Minigames)

Kế hoạch này hướng tới việc lập trình và tích hợp các trò chơi cổ điển (Minigames) trực tiếp lên trang web bằng công nghệ React & HTML5 Canvas, gia tăng tối đa thời gian lưu lại trang (dwell time) và tạo điểm nhấn độc đáo cho website.

---

## 🎮 Các Minigames đề xuất

### 1. Trò chơi Rắn săn mồi (Snake Game)
*   **Cách chơi**: Người chơi sử dụng các phím mũi tên hoặc phím `WASD` (hoặc các nút điều hướng trên màn hình cảm ứng điện thoại) để điều khiển chú rắn ăn thức ăn, tích lũy điểm và tránh đâm vào tường hoặc đuôi của chính mình.
*   **Điểm nhấn đặc biệt**: 
    *   Màu sắc của chú rắn và thức ăn sẽ tự động đổi màu đồng điệu với skin CSS đang được chọn (ví dụ: Rắn màu xanh dương ở skin Blue, màu xanh lá ở skin Green).
    *   Lưu kỷ lục điểm cao nhất (High Score) vào `localStorage` của trình duyệt.

### 2. Trò chơi Xếp hình (Tetris)
*   **Cách chơi**: Xếp các khối gạch rơi xuống sao cho tạo thành các hàng ngang hoàn chỉnh để ghi điểm và xóa hàng đó. Trò chơi kết thúc khi các khối gạch chạm đỉnh màn hình.
*   **Điểm nhấn đặc biệt**:
    *   Giao diện bảng gạch thiết kế dạng kính mờ (semi-transparent glass) đẹp mắt.
    *   Có âm thanh khi xóa hàng gạch (sound effect) và nhạc nền 8-bit vui nhộn (người dùng có thể bật/tắt âm thanh tùy ý).

---

## 🛠️ Các bước thực hiện

#### Bước 1: Tạo cấu trúc thư mục game mới
- Tạo thư mục chứa game: `components/games/`
- Viết component [SnakeGame.tsx](file:///c:/CongViec/profiles-source/components/games/SnakeGame.tsx) sử dụng cơ chế vòng lặp game loop trong React.
- Viết component [TetrisGame.tsx](file:///c:/CongViec/profiles-source/components/games/TetrisGame.tsx) sử dụng HTML5 Canvas hoặc Grid Tailwind để vẽ các khối gạch.

#### Bước 2: Tạo trang quản lý danh sách trò chơi [app/fun/games/page.tsx](file:///c:/CongViec/profiles-source/app/fun/games/page.tsx)
- Xây dựng một sảnh trò chơi (Game Lobby) hiển thị các thẻ giới thiệu game kèm ảnh minh họa vector động.
- Cho phép người chơi click vào để mở cửa sổ chơi game ngay tại chỗ (dưới dạng Modal hoặc nhúng trực tiếp trong khung trang).

#### Bước 3: Tối ưu hóa điều khiển trên thiết bị di động
- Bổ sung bộ phím ảo D-pad điều hướng (Lên, Xuống, Trái, Phải, Xoay gạch) trên màn hình cảm ứng để người dùng điện thoại di động có thể chơi bình thường.

---

## 🧪 Kế hoạch xác nhận (Verification)
1. Thử nghiệm chơi trò chơi Rắn săn mồi:
   - Xác nhận cơ chế va chạm hoạt động chính xác (chết khi đập vào tường/thân).
   - Tốc độ di chuyển tăng dần mỗi khi rắn ăn được 5 miếng mồi để tạo độ thử thách.
2. Thử nghiệm chơi trò chơi Xếp hình:
   - Kiểm tra xem các phím xoay gạch (phím Space hoặc mũi tên lên) có xoay khối gạch đúng trục không.
   - Xác nhận điểm số được cộng chính xác khi xóa 1, 2, 3 hoặc 4 hàng cùng lúc.
3. Đảm bảo phím mũi tên điều khiển game không gây cuộn trang web lên xuống (sử dụng `e.preventDefault()` để chặn hành vi mặc định của trình duyệt).
