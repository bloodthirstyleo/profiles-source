# Kế hoạch 03: Refactor Mã nguồn & Tối ưu Cấu trúc Dự án

Kế hoạch này hướng tới việc cải thiện chất lượng mã nguồn (Code Quality), dọn dẹp các mã dư thừa, nâng cấp tính chặt chẽ của TypeScript và cải tổ lại luồng dữ liệu của dự án.

---

## ⚙️ Các vấn đề hiện tại & Giải pháp Refactor

### 1. Nâng cấp TypeScript Loại bỏ kiểu dữ liệu `any`
*   **Vấn đề**: Tệp `data/siteData.ts` hiện đang ép kiểu dữ liệu đọc từ JSON thành `any` (`const data: any = portfolio;`). Điều này làm mất đi tính năng kiểm tra lỗi tĩnh của TypeScript.
*   **Giải pháp**: Xây dựng interface chi tiết cho toàn bộ cấu trúc tệp `portfolio.json` và khai báo ép kiểu an toàn.

### 2. Tách biệt Logic khỏi UI (Custom Hooks)
*   **Vấn đề**: Một số component chứa logic quản lý trạng thái (như bộ lọc portfolio, phân trang blog) đang được viết chung trong mã JSX/TSX.
*   **Giải pháp**: Tách logic này thành các custom React hook độc lập (ví dụ: `usePortfolioFilter`, `useBlogPagination`) giúp code dễ đọc, dễ viết test và tái sử dụng.

### 3. Tối ưu hóa tải tài nguyên tĩnh (Static Asset Prefixes)
*   **Vấn đề**: Hiện tại biến `basePath` đang được lấy thủ công thông qua `process.env.NEXT_PUBLIC_BASE_PATH` ở rải rác nhiều tệp tin khác nhau.
*   **Giải pháp**: Tập trung hóa việc quản lý đường dẫn bằng cách viết một hàm helper `getAssetPath(path)` trong thư mục `lib/utils.ts` để tự động hóa việc tính toán tiền tố đường dẫn dựa trên cấu hình deploy.

---

## 🛠️ Các bước thực hiện

#### Bước 1: Khởi tạo tệp Types chung [lib/types.ts](file:///c:/CongViec/profiles-source/lib/types.ts)
- Định nghĩa rõ cấu trúc dữ liệu cho: `HomeData`, `PersonalInfoItem`, `ExperienceItem`, `EducationItem`, `PortfolioWork`, `ReferenceItem`, `BlogPost`.

#### Bước 2: Viết Helper đường dẫn tĩnh [lib/utils.ts](file:///c:/CongViec/profiles-source/lib/utils.ts)
- Viết hàm `prefixAssetPath(path: string): string` tự động thêm `basePath` khi cần thiết.
- Thay thế các đoạn code ghép chuỗi `${basePath}/assets/...` thủ công bằng hàm helper này.

#### Bước 3: Sửa lỗi cảnh báo `metadataBase` lúc build
- Cấu hình trường `metadataBase` trong Metadata xuất ra ở `app/layout.tsx` để dứt điểm cảnh báo cảnh báo URL tuyệt đối khi Next.js build.

---

## 🧪 Kế hoạch xác nhận (Verification)
1. Biên dịch dự án bằng lệnh: `npm run build` và xác nhận không còn bất cứ cảnh báo nào (0 warnings, 0 errors).
2. Chạy công cụ kiểm tra chất lượng code: `npm run lint`.
3. Đảm bảo toàn bộ các đường dẫn ảnh và tài nguyên tĩnh hoạt động tốt ở cả chế độ chạy dev local (`npm run dev`) lẫn chạy build tĩnh.
