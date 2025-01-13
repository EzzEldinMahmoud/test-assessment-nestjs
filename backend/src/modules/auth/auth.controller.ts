import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.services/auth.service';
import { User } from 'src/interfaces/Auth.interface';
import RegisterUserDTO from 'src/DTO/RegisterUserDTO';
import LoginUserDTO from 'src/DTO/loginUserDTO';
import { LocalAuthGuard } from './guard/localAuth.guard';
import RequestWithUser from 'src/interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post("register")
  register(@Body() user: RegisterUserDTO) {
    this.authService.register(user).then((user)=>{
        return user;
    });
  }
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Req() request: RequestWithUser, @Res() response: Response): string {
      const {user} = request;
      const cookie = this.authService.getCookieWithJwtToken(user.id);
      return cookie;
  }
}