import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
  private readonly userRepo: Repository<User>,
  ){}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepo.create(createUserDto)
    
    return this.userRepo.save(newUser)
  }

  async findAll(current: string, limit: string, qs: string) {
    // Chuyển string từ query sang number, có giá trị mặc định
    const page = Number(current) || 1;
    const pageSize = Number(limit) || 10;
    const skip = (page - 1) * pageSize;

    // findAndCount trả về [danh sách, tổng số bản ghi]
    const [result, totalItems] = await this.userRepo.findAndCount({
      skip,
      take: pageSize,
    });

    return {
      meta: {
        current: page,
        pageSize,
        pages: Math.ceil(totalItems / pageSize),
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: number) {
    const findOneUser = await this.userRepo.findOne({where: {id}});
    if(!findOneUser){
      throw new NotFoundException(`Không tìm thấy user này`)
    }
    return {
      id: findOneUser.id
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepo.update(id, updateUserDto)
    if(updateUser.affected === 0){
      throw new NotFoundException(`Không tìm tấy user này`);
    }
    // UpdateResult chỉ có { raw, affected, generatedMaps }, KHÔNG có id
    // => dùng luôn id nhận từ tham số (đã chắc chắn tồn tại vì affected > 0)
    return {
      id,
    }
  }

  async remove(id: number) {
    const deleteUser = await this.userRepo.delete(id);
    if(deleteUser.affected === 0){
      throw new NotFoundException('ĐÃ xóa thành công user')
    }
    return {
      id
    }
  }
}
