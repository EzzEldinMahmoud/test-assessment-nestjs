import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get("register")
  register(): string {
    return 'This action returns all Auth';
  }

  @Post("login")
  login(): string {
    return 'This action returns all Auth';
  }
}