import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity.js";

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, name: 'student_code' })
    studentCode: string;

    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ type: 'date' })
    birthday: string;

    @Column()
    gender: string; // 'Nam', 'Nữ', 'Khác'

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    creator: User;

    @CreateDateColumn()
    createdAt: Date;
}
