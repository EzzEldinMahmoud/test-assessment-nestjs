import { Injectable } from '@nestjs/common';
import { Product } from '../../../interfaces/Product.interface';

@Injectable()
export class ProductService {
  private readonly Product: Product[] = [];

  create(Product: Product) {
    this.Product.push(Product);
  }

  findAll(): Product[] {
    return this.Product;
  }
}