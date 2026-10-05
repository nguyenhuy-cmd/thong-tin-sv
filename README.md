# Hệ thống Quản lý Sinh Viên (Web App)

Dự án này là một ứng dụng Web để quản lý thông tin sinh viên, được xây dựng bằng **NestJS** (Backend API) và giao diện **HTML/CSS/JS thuần** kết hợp Bootstrap.

## 🛠️ Công nghệ sử dụng
- **Backend:** NestJS (TypeScript)
- **Cơ sở dữ liệu:** MySQL (sử dụng Docker)
- **ORM:** TypeORM
- **Authentication:** express-session, bcrypt
- **Frontend:** HTML5, Bootstrap 5, Vanilla JS (`fetch` API)

## 📦 Hướng dẫn cài đặt và chạy dự án

### Bước 1: Khởi động Database (Docker)
1. Mở terminal tại thư mục gốc của dự án.
2. Chạy lệnh để khởi động MySQL container:
   ```bash
   docker-compose up -d
   ```
   *(Lưu ý: Database sẽ được expose ở cổng `3307` trên localhost)*

### Bước 2: Cài đặt thư viện Node.js
Chạy lệnh sau để cài đặt tất cả các dependencies:
```bash
npm install
```

### Bước 3: Khởi động Server
Bật server Backend (NestJS):
```bash
npm run start:dev
```
Server sẽ tự động kết nối với MySQL và đồng bộ (tạo) cấu trúc bảng.

### Bước 4: Trải nghiệm Giao diện Web
Do Frontend đã được nhúng thẳng vào Backend bằng `ServeStaticModule`, bạn chỉ cần mở trình duyệt và truy cập vào:
👉 **http://localhost:6969**

## 👥 Tài khoản mặc định
Khi server khởi động lần đầu, hệ thống sẽ tự động tạo một tài khoản **Admin duy nhất**:
- **Email/Username:** `admin@gmail.com` (hoặc `admin`)
- **Mật khẩu:** `admin123`

Tất cả các tài khoản khác khi đăng ký từ giao diện mặc định sẽ là **User thường** (chỉ có quyền xem và sửa thông tin sinh viên do chính mình tạo ra).

---
*Lưu ý: Đính kèm file `student_management.sql` (bản dump từ MySQL) ở bên ngoài để chấm bài (nếu cần import thủ công).*
