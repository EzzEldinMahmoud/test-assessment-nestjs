import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '../../../interfaces/Product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from 'src/Entities/product.entity';
import { Repository } from 'typeorm';
import ProductDTO from 'src/DTO/ProductDTO';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>
  ) {}
  //admin + validation
  async createProduct(Product: ProductDTO) {
    Product.createdAt = new Date();
    Product.updatedAt = new Date();
    try {
        const newProduct =  this.ProductRepository.create({...Product});
        this.ProductRepository.save(Product);
        return newProduct;
    } catch (e){
        throw new HttpException("Couldn't Create Product Due to Error.", HttpStatus.NOT_MODIFIED); 

    }
    
  }
  //public
  async getProducts(): Promise<ProductDTO[]> {
    return await this.ProductRepository.find();
  }
  //public
  async getProductById(id:string): Promise<ProductDTO> {
    const singleProduct = await this.ProductRepository.findOneBy({id:id});
    return singleProduct;
  }
  //admin
  async updateProductById(id:string, product: ProductDTO): Promise<ProductDTO> {
    const singleProduct = await this.ProductRepository.findOneBy({id:id});
    if(singleProduct) {
      product.updatedAt = new Date();
      const updatedPost = await this.ProductRepository.update(id,product);
      return updatedPost.raw;
    } else {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND); 
    }
  }

  //admin 
  async deleteProductById(id:string) {
    try{
        await this.ProductRepository.delete({id:id});
        return "Deleted Successfully!";
    }catch(e) {
        throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND); 
    }
  }

}