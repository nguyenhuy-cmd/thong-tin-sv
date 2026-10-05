
import { ConflictException, Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Role, User } from '../users/entities/user.entity.js';
import { CreateLoginDto, CreateRegisterDto } from './dto/create-auth.dto.js';


@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        // 1 decorator = 1 entity, và phải gắn vào 1 tham số cụ thể
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }


    async register(dto: CreateRegisterDto) {
        const { username, email, password } = dto;

        // Kiểm tra xem đã có email đã tồn tại chưa 
        const exUser = await this.userRepo.findOne({ where: { email } });
        if (exUser) {
            throw new ConflictException("Email đã tồn tại");
        }

        // Bước 2: băm mật khẩu
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Bước 3: Tạo instance User  mới với mật khẩu đã mã hoá
        const newUser = this.userRepo.create({
            ...dto,
            password: hashedPassword
        })

        // Bước 4: lưu xuống database
        const saveUser = await this.userRepo.save(newUser);

        // Bước 5: Loại bỏ password trước khi trả về client
        const { password: _, ...result } = saveUser;
        return result;
    }

    /**
     * Đăng nhập: tìm theo email -> so khớp mật khẩu bằng bcrypt.compare.
     */
    async login(dto: CreateLoginDto) {
        const { email, password } = dto;

        // Cột password có select: false -> phải liệt kê select thì mới lấy được password để so sánh
        const exLogin = await this.userRepo.findOne({
            where: { email },
            select: { id: true, username: true, email: true, role: true, password: true, createdAt: true, updatedAt: true },
        })
        if (!exLogin) {
            throw new UnauthorizedException(`Tên đăng nhập hoặc mật khẩu không đúng`)
        }

        // Xem có khớp mật khẩu vs chuỗi băm không
        const isPassword = await bcrypt.compare(password, exLogin.password);
        if (!isPassword) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng')
        }

        // Mật khẩu đúng -> loại bỏ password trc khi đẩy lên client
        const { password: _, ...userInfo } = exLogin;
        return userInfo
    }

    // Lập tà khoản admin
    async onModuleInit() {
    const adminAccount = await this.userRepo.findOne({
      where: { username: 'admin' },
    });

    // Nếu chưa có tài khoản admin thì tự động tạo luôn
    if (!adminAccount) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const defaultAdmin = this.userRepo.create({
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: Role.Admin,
      });
      await this.userRepo.save(defaultAdmin);
      console.log('>>> Đã khởi tạo tài khoản Admin mặc định (admin / admin123)');
    }
  }
}
