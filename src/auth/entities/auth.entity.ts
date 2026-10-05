import { IsNotEmpty, IsString } from "class-validator";
import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class login {
    @IsNotEmpty({
        message: "Email bắt buộc phải nhập"
    })
    @IsString()
    email: string;

    @IsNotEmpty({
        message: "Password bắt buộc phải nhâoj"
    })
    @IsString()
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date; // Tự động cập nhật mỗi khi bản ghi có thay đổi
}

export class register {
    @IsNotEmpty({ message: 'Tên không được để trống' })
        @Column({ unique: true, length: 50 })
        @IsString()
        username: string;
    
        @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
        @Column({ unique: true, length: 50 })
        @IsString()
        password: string;
    
        @IsNotEmpty({ message: 'Email không được để trống' })
        @Column({ unique: true})
        @IsString()
        email: string
    
}
