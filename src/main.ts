import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import session from 'express-session';

async function bootstrap() {
  // Đã tắt Observe (telemetry) nên không truyền instrument nữa
  const app = await NestFactory.create(AppModule);

  // 1. Bật session: server cấp cho mỗi trình duyệt 1 cookie `connect.sid`,
  //    dữ liệu thật (req.session.user) nằm trên server.
  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'doi-chuoi-bi-mat-nay-trong-file-env', // dùng để ký cookie, chống giả mạo
      resave: false,            // không lưu lại session nếu không có thay đổi
      saveUninitialized: false, // chưa đăng nhập thì không tạo session rỗng
      cookie: {
        httpOnly: true,              // JavaScript phía trình duyệt không đọc được cookie -> chống XSS
        maxAge: 1000 * 60 * 60 * 24, // sống 1 ngày
      },
    }),
  );

  /*Mọi HTTP request đi vào và response trả ra từ tất cả các Controller trong dự án đều phải 
  đi qua TransformInterceptor để tự động chuẩn hóa cấu trúc dữ liệu trả về cho client. */
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // 2. Thêm dòng này để tự động chặn các request thiếu trường bắt buộc
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Tự loại bỏ các trường không khai báo trong DTO
    forbidNonWhitelisted: true, // Báo lỗi nếu client gửi thừa trường không cho phép
  }));
  // Ưu tiên biến môi trường PORT, nếu không có thì dùng 6969
  await app.listen(process.env.PORT ?? 6969);
}
await bootstrap();
