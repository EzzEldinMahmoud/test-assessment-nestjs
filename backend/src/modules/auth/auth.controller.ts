import { Body, Controller, HttpCode, Post, SerializeOptions, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.services/auth.service';

import RegisterUserDTO from '../../DTO/RegisterUserDTO';
import { AuthGuard } from '@nestjs/passport';
import LoginUserDTO from '../../DTO/loginUserDTO';


@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll'
})
export class AuthController {
  constructor(private authService: AuthService){}
  @Post("register")
  async register(@Body() user: RegisterUserDTO) {
    return  await this.authService.register(user);
  }
  @HttpCode(200)
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() user:LoginUserDTO) {
      return  await this.authService.login(user);
  }


}
