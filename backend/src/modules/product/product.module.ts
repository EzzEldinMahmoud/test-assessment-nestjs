import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.services/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService]
})
export class productModule {}