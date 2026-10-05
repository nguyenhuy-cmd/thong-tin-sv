import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import type {} from 'express-session';
import { StudentsService } from './students.service.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { ResponseMessage } from '../common/decorators/response-message.decorator.js';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../users/entities/user.entity.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @ResponseMessage('Thêm sinh viên thành công')
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }



  @UseGuards(AuthenticatedGuard)
  @ResponseMessage("Xem tất cả học sinh thành công")
  @Get()
  async findAll(
    @Query('current') current: string,
    @Query('limit') limit: string,
    @Query('qs') qs: string

  ) {
    return await this.studentsService.findAll(current, limit, qs);
  }

  @UseGuards(AuthenticatedGuard)
  @ResponseMessage("Xem 1 học sinh thành công")
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentsService.findOne(+id);
  }

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateStudentDto: UpdateStudentDto,
    @Req() req: Request
  ) {
    const user = (req.session as any).user;
    return await this.studentsService.update(+id, updateStudentDto, user);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentsService.remove(+id);
  }
}
