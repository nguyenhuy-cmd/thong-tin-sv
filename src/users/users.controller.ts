import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { ResponseMessage } from '../common/decorators/response-message.decorator.js';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from './entities/user.entity.js';

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ResponseMessage(`Thêm thành viên mới thành công`)
  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return {
      id: newUser.id
    }
  }

  // Thứ tự guard: đăng nhập trước -> rồi mới kiểm tra role
  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ResponseMessage(`Xem tất cả các thành viên`)
  @Get()
  async findAll(
    @Query('current') current: string,
    @Query('limit') limit: string,
    @Query('qs') qs: string
  ) {
    return await this.usersService.findAll(current, limit,qs);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ResponseMessage('Xem 1 thành viên')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ResponseMessage('Cập nhập user thành công')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ResponseMessage('Xóa thành công user')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
