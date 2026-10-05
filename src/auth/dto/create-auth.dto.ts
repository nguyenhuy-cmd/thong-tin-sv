import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO đăng nhập: client chỉ cần gửi username + password.
 * Không validate quá chặt (độ dài, ký tự) vì chỉ cần so khớp với DB.
 */
export class CreateLoginDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsString({ message: 'Email phải là chuỗi' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  password: string;
}

/**
 * DTO đăng ký: validate chặt hơn đăng nhập.
 * Cố ý KHÔNG có `role` -> tránh user tự đăng ký làm ADMIN (lỗ hổng bảo mật).
 */
export class CreateRegisterDto {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @IsString({ message: 'Tên đăng nhập phải là chuỗi' })
  @MinLength(3, { message: 'Tên đăng nhập tối thiểu 3 ký tự' })
  @MaxLength(50, { message: 'Tên đăng nhập tối đa 50 ký tự' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Tên đăng nhập chỉ gồm chữ, số và dấu gạch dưới (_)',
  })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(32, { message: 'Mật khẩu tối đa 32 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;
}
