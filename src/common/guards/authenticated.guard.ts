import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
// Nạp type của express-session để Request có thuộc tính `session`
import type {} from 'express-session';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    // Kiểm tra xem session có chứa thông tin user đăng nhập chưa
    const user = (request.session as any)?.user;

    if (!user) {
      // Đối với giao diện web (Render HTML): Chuyển hướng về trang đăng nhập
      response.redirect('/auth/login');
      return false;

      // (Nếu làm API thuần trả JSON thì dùng dòng dưới thay vì redirect)
      // throw new UnauthorizedException('Bạn cần đăng nhập để truy cập trang này');
    }

    return true; // Cho phép đi tiếp vào Controller
  }
}