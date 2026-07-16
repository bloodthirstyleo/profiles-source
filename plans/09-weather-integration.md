# Kế hoạch 09: Tích hợp thông tin thời tiết thời gian thực từ Weather API

Kế hoạch này hướng tới việc kết nối với các API thời tiết công cộng miễn phí để hiển thị thông tin thời tiết thời gian thực tại địa điểm của nhà phát triển (Tp. Hồ Chí Minh) hoặc các điểm du lịch (Quy Nhơn, Gia Lai), mang lại cảm giác sống động và cá nhân hóa cho trang web.

---

## 🌤️ Ý tưởng tích hợp thời tiết hợp lý

Tránh việc lạm dụng chiếm diện tích lớn, thông tin thời tiết sẽ được hiển thị tinh tế tại 3 vị trí chiến lược:

### 1. Widget thời tiết tí hon trên Navbar (Weather Badge)
*   **Mô tả**: Một dòng chữ và icon thời tiết nhỏ gọn góc trên Navbar bên cạnh Logo hoặc nút chuyển ngôn ngữ.
*   **Nội dung hiển thị**: Nhiệt độ hiện tại và biểu tượng thời tiết (nắng ☀️, mưa 🌧️, mây ☁️) kèm dòng chữ: `"Ho Chi Minh City: 28°C"` hoặc `"Saigon: 🌦️ 29°C"`.
*   **Ý nghĩa**: Giúp người xem biết được thời tiết hiện tại nơi Võ Mạnh Khánh đang sống và làm việc.

### 2. Thẻ thông tin cá nhân động ở phần About (Bento Weather Card)
*   **Mô tả**: Một ô Bento Grid trong trang About hiển thị trạng thái thời tiết chi tiết hơn (Độ ẩm, sức gió, giờ bình minh/hoàng hôn).
*   **Trạng thái lập trình viên theo thời tiết (Developer Mood)**: Hiển thị lời nhắn vui nhộn thay đổi theo thời tiết:
    *   *Trời mưa 🌧️*: "Sài Gòn đang mưa lớn, thời điểm lý tưởng để thưởng thức cà phê nóng và fix bug ☕."
    *   *Trời nắng nóng ☀️*: "Trời nắng nóng 35°C, máy tính đang chạy hết công suất! 💻🔥."
    *   *Ban đêm 🌙*: "Đêm muộn tĩnh lặng, cú đêm đang hoạt động 🦉."

### 3. Widget thời tiết cho Trợ lý du lịch AI (Travel Assistant Section)
*   **Mô tả**: Tích hợp một bảng thời tiết nhỏ hiển thị thời tiết hiện tại ở **Quy Nhơn** và **Gia Lai** ngay bên cạnh khung chat bot AI du lịch.
*   **Ý nghĩa**: Giúp khách du lịch truy cập web có ngay thông tin thời tiết thực tế để lên kế hoạch đặt tour chính xác.

---

## 🌐 Lựa chọn API công cộng (Public APIs)

Để tránh việc để lộ API Key (vì trang web deploy tĩnh public lên GitHub Pages), chúng ta sẽ ưu tiên sử dụng các dịch vụ thời tiết **không yêu cầu API Key**:

1.  **Open-Meteo (Khuyên dùng)**: 
    *   *Ưu điểm*: Hoàn toàn miễn phí, mã nguồn mở, không cần API Key, giới hạn lượt gọi cực lớn (10.000 requests/ngày).
    *   *API Endpoint*: `https://api.open-meteo.com/v1/forecast?latitude=10.823&longitude=106.6296&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m`
2.  **wttr.in**:
    *   *Ưu điểm*: Trả về dữ liệu JSON đơn giản bằng cách thêm query `?format=j1`. Không cần API Key.
    *   *API Endpoint*: `https://wttr.in/Ho_Chi_Minh_City?format=j1`

---

## 🛠️ Các bước thực hiện

#### Bước 1: Tạo tệp gọi API thời tiết [lib/weather.ts](file:///c:/CongViec/profiles-source/lib/weather.ts)
- Viết hàm fetch dữ liệu thời tiết sử dụng `fetch` API từ Open-Meteo dựa trên tọa độ vĩ độ/kinh độ của TP.HCM, Quy Nhơn và Gia Lai.
- Viết hàm map từ `weather_code` của Open-Meteo sang icon emoji hoặc font-awesome icons tương ứng.

#### Bước 2: Tạo Component hiển thị [components/WeatherWidget.tsx](file:///c:/CongViec/profiles-source/components/WeatherWidget.tsx)
- Thiết kế component widget nhỏ gọn sử dụng React `useEffect` để tự động gọi API khi tải trang.
- Lưu dữ liệu thời tiết vào `sessionStorage` để tránh việc gọi lại API mỗi lần chuyển đổi trang trong cùng một phiên làm việc (giảm tải cho API).

#### Bước 3: Thiết kế Bento Weather Card trong `AboutSection`
- Tạo card Bento hiển thị thời gian địa phương (Local Time) chạy giây động cùng thông tin thời tiết và trạng thái Developer Mood tương ứng.

---

## 🧪 Kế hoạch xác nhận (Verification)
1. Kiểm tra Network Tab trong Chrome DevTools để xác nhận dữ liệu thời tiết được tải về chính xác cấu hình JSON.
2. Kiểm tra bộ nhớ đệm `sessionStorage` để đảm bảo API thời tiết chỉ bị gọi 1 lần khi load trang đầu tiên và tái sử dụng khi chuyển trang.
3. Thay đổi giả lập tọa độ hoặc dữ liệu thời tiết giả (mock data) để kiểm tra xem các câu chào Developer Mood (trời mưa, trời nắng, ban đêm) có thay đổi chính xác như thiết kế không.
