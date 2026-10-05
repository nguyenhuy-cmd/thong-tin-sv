import { Injectable, BadRequestException, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { User, Role } from '../users/entities/user.entity.js';
import { Student } from './entities/student.entity.js';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const existingStudent = await this.studentRepo.findOne({
      where: { studentCode: createStudentDto.studentCode }
    });
    if(existingStudent){
      throw new ConflictException(`Mã học sinh đã tồn tại`);
    }

    // Tạo object mới từ DTO
    const newStudent = this.studentRepo.create(createStudentDto);
    return await this.studentRepo.save(newStudent);
  }

  async findAll(current: string,limit: string,qs: string) {
    const page = Number(current) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (page - 1) * pageSize;

    // Nếu có query string (qs) thì tìm kiếm theo Tên hoặc Mã sinh viên
    const whereCondition = qs ? [
      { fullName: Like(`%${qs}%`) },
      { studentCode: Like(`%${qs}%`) }
    ] : {};

    const [result, totalItems] = await this.studentRepo.findAndCount({
      where: whereCondition,
      skip,
      take: pageSize,
    })

    return {
      meta: {
        current: page,
        pageSize,
        pages: Math.ceil(totalItems / pageSize),
        total: totalItems,
      },
      result,
    }
  }

  async findOne(id: number) {
    const exUser = await this.studentRepo.findOne({where: {id}});
    if(!exUser){
      throw new NotFoundException(`Mã id sai, không có học sinh này`)
    }
    return {
      id: id,
      exUser
    };
  }

  async update(id: number, updateStudentDto: UpdateStudentDto, currentUser: any) {
    // Lấy thông tin sinh viên trước
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Không tìm thấy sinh viên với ID ${id} để cập nhật`);
    }

    // Kiểm tra quyền: Nếu không phải Admin VÀ cũng không phải người tạo ra sinh viên này -> Báo lỗi
    if (currentUser.role !== Role.Admin && student.userId !== currentUser.id) {
      throw new ForbiddenException('Bạn chỉ được phép sửa thông tin sinh viên do chính bạn tạo ra!');
    }

    const updateResult = await this.studentRepo.update(id, updateStudentDto);
    return {
      id: id,
      updateResult
    };
  }

  async remove(id: number) {
    const deleteStudent = await this.studentRepo.delete(id);
    if(deleteStudent.affected === 0){
      throw new NotFoundException(`Không tìm thấy sinh viên với id là ${id}`)
    }
    return {
      id: id,
      deleteStudent
    };
  }
}
