import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateAuthDto, CreateRegisterDto } from './dto/create-auth.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { ResponseMessage } from '../common/decorators/response-message.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage("Đăng nhập thành công")
  @Post('login')
  async login(@Body()createRegisterDto: CreateRegisterDto ){
    return await this.authService.login(createRegisterDto)
  }

}
