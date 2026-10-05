import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/user.entity.js';

/**
 * DTO (Data Transfer Object) = "khuôn" dữ liệu client gửi lên khi TẠO user.
 * ValidationPipe trong main.ts sẽ tự kiểm tra các rule bên dưới
 * trước khi request vào tới Controller.
 */
export class CreateUserDto {
  // ===== USERNAME =====
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
  @MinLength(3, { message: 'Tên đăng nhập tối thiểu 3 ký tự' })
  @MaxLength(50, { message: 'Tên đăng nhập tối đa 50 ký tự' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Tên đăng nhập chỉ gồm chữ, số và dấu gạch dưới (_)',
  })
  username: string;

  // ===== PASSWORD =====
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(32, { message: 'Mật khẩu tối đa 32 ký tự' })
  password: string;

  // ===== EMAIL =====
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  // ===== ROLE (không bắt buộc) =====
  // Nếu client không gửi -> DB tự lấy mặc định Role.User (khai báo ở Entity)
  @IsOptional()
  @IsEnum(Role, {
    message: `Role chỉ được là: ${Object.values(Role).join(', ')}`,
  })
  role?: Role;
}
