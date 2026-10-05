// File khai báo kiểu (.d.ts): dạy TypeScript biết trong session có những gì.
// Nhờ file này mà viết `req.session.user` sẽ có gợi ý code và không bị báo đỏ.
import 'express-session';
import type { Role } from '../../users/entities/user.entity.js';

declare module 'express-session' {
  interface SessionData {
    // Chỉ lưu thông tin cần thiết vào session, KHÔNG lưu password
    user: {
      id: number;
      username: string;
      email: string;
      role: Role;
    };
  }
}
