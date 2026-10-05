import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    /*ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'student-management',
    }),*/

    // 1. Nạp file .env toàn cục
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép ConfigService dùng ở bất kỳ module nào mà không cần import lại
      envFilePath: '.env',
    }),

    // 2. Đăng ký kết nối MySQL bất đồng bộ qua TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'student_management'),
        
        // Tự động nhận diện tất cả Entity trong project (không cần khai báo mảng entities thủ công)
        autoLoadEntities: true,

        // Tự động đồng bộ cấu trúc bảng từ code Entity vào DB (chỉ bật khi dev)
        synchronize: configService.get<string>('NODE_ENV') !== 'production',

        // Bảng mã hỗ trợ tiếng Việt có dấu
        charset: 'utf8mb4_unicode_ci',
      }),
    }),

    UsersModule,

    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
