import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.services/auth.service';
import { User } from 'src/interfaces/Auth.interface';
import RegisterUserDTO from 'src/DTO/RegisterUserDTO';
import LoginUserDTO from 'src/DTO/loginUserDTO';
import { LocalAuthGuard } from './guard/localAuth.guard';
import RequestWithUser from 'src/interfaces/requestWithUser.interface';
import { JwtStrategy } from './guard/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post("register")
  async register(@Body() user: RegisterUserDTO) {
    return  await this.authService.register(user);
  }
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() user: RegisterUserDTO) {
      return  await this.authService.login(user.email,user.password);
  }



  @UseGuards(JwtStrategy)
  @Get("user/all")
  async getallUsers() {
      return await this.authService.alluser();
  }

}