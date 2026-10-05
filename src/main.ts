import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';

async function bootstrap() {
  // Đã tắt Observe (telemetry) nên không truyền instrument nữa
  const app = await NestFactory.create(AppModule);

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
