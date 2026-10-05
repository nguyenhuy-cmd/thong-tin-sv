import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Role {
    Admin = 'admin',
    User = 'user',
}

/**
 * Entity = "bản thiết kế" của 1 bảng trong DB.
 * - @Entity() là BẮT BUỘC, thiếu nó TypeORM không coi class này là bảng
 *   -> @InjectRepository(User) sẽ lỗi.
 * - Validate dữ liệu đầu vào (class-validator) để ở DTO, không để ở Entity.
 */
@Entity('users')
export class User {
    @PrimaryGeneratedColumn() // Tự sinh số tăng dần: 1, 2, 3...
    id: number;

    @Column({ unique: true, length: 50 })
    username: string;

    // Lưu chuỗi đã hash bằng bcrypt (luôn dài 60 ký tự)
    // KHÔNG unique: 2 người hoàn toàn có thể trùng mật khẩu
    // select: false -> mặc định các câu find() sẽ KHÔNG trả password ra ngoài
    @Column({ length: 100, select: false })
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User, // <-- Đặt mặc định là USER ở đây
    })
    role: Role;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date; // Tự động cập nhật mỗi khi bản ghi có thay đổi
}
