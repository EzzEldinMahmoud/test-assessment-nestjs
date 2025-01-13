import { Controller, Get } from '@nestjs/common';

@Controller('Product')
export class ProductController {
  @Get()
  findAll(): string {
    return 'This action returns all Product';
  }
}