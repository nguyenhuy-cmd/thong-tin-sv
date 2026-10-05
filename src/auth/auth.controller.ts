import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateLoginDto, CreateRegisterDto } from './dto/create-auth.dto.js';
import { ResponseMessage } from '../common/decorators/response-message.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ResponseMessage("Đăng nhập thành công")
  @Post('login')
  async login(@Body() createLoginDto: CreateLoginDto) {
    return await this.authService.login(createLoginDto)
  }

  @ResponseMessage("Đăng kí thành công")
  @Post('register')
  async register(@Body() createRegisterDto: CreateRegisterDto) {
    return await this.authService.register(createRegisterDto)
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Không thể đăng xuất');
      }
      res.clearCookie('connect.sid');
      return res.redirect('/auth/login');
    });
  }
}
