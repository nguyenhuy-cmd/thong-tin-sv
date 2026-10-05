import { IsEmail, IsNotEmpty, IsString, IsDateString, Matches } from 'class-validator';

export class CreateStudentDto {
    @IsString({ message: 'Mã sinh viên phải là chuỗi chữ' })
    @IsNotEmpty({ message: 'Mã sinh viên không được để trống' })
    studentCode: string;

    @IsString({ message: 'Họ tên phải là chuỗi chữ' })
    @IsNotEmpty({ message: 'Họ tên không được để trống' })
    fullName: string;

    @IsDateString({}, { message: 'Ngày sinh phải đúng định dạng (YYYY-MM-DD)' })
    @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
    birthday: string;

    @IsString({ message: 'Giới tính phải là chuỗi chữ' })
    @IsNotEmpty({ message: 'Giới tính không được để trống' })
    gender: string;

    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @IsString({ message: 'Số điện thoại phải là chuỗi số' })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, { message: 'Số điện thoại không hợp lệ' })
    phone: string;

    @IsString({ message: 'Địa chỉ phải là chuỗi chữ' })
    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    address: string;
}
