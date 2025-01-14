import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductEntity from '../../../Entities/product.entity';
import { Repository } from 'typeorm';
import ProductDTO from '../../../DTO/ProductDTO';

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
  async getProductById(id:string): Promise<any> {
    const singleProduct = await this.ProductRepository.findOneBy({id:id});
    if(singleProduct) return singleProduct;
    else return HttpStatus.NOT_FOUND;
    
  }
  //admin
  async updateProductById(id:string, product: ProductDTO): Promise<ProductDTO> {
    const singleProduct = await this.ProductRepository.findOneBy({id:id});
    if(singleProduct) {
      product.updatedAt = new Date();
      await this.ProductRepository.update(id,product);
      const updatedProduct = await this.ProductRepository.findOneBy({id:id});
      return updatedProduct;
    } else if (!singleProduct) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND); 
      }
  }

  //admin 
  async deleteProductById(id:string) {
    await this.ProductRepository.delete({id:id});
    const singleProduct = await this.ProductRepository.findOneBy({id:id});

    if(singleProduct) throw new HttpException('Product can\'t be deleted', HttpStatus.FAILED_DEPENDENCY);
    else if(!singleProduct) return "Product already deleted";
    else return "Deleted Successfully!";
  }

}