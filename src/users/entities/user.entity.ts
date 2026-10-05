import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';
import { Admin } from "typeorm/driver/mongodb/typings.js";

export enum Role {
    Admin = 'admin',
    User = 'user',
}

export class User {
    @PrimaryGeneratedColumn() // Tự sinh số tăng dần: 1, 2, 3...
    id: number;

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

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User, // <-- Đặt mặc định là USER ở đây
    })
    role: Role

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date; // Tự động cập nhật mỗi khi bản ghi có thay đổi
}
