import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.services/product.service';
import { AuthGuard } from '@nestjs/passport';
import ProductDTO from 'src/DTO/ProductDTO';

@Controller('Products')
export class ProductController {
  constructor(private productService:ProductService){}
  /*-	POST	/products:	Add	a	new	product	(Admin	only).	
  -	GET	/products:	List	all	products	(Public).	
  -	GET	/products/:id:	Get	a	product	by	ID	(Public).	
  -	PUT	/products/:id:	Update	product	details	(Admin	only).	
  -	DELETE	/products/:id:	Delete	a	product	(Admin	only).	*/

  @Get()
  async getProducts(): Promise<ProductDTO[]> {
    return await this.productService.getProducts();
  }

  @Get(":id")
  async getProductById(@Param("id") id:string): Promise<ProductDTO> {
    return await this.productService.getProductById(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async CreateProduct(@Body() Product: ProductDTO): Promise<ProductDTO> {
    return await this.productService.createProduct(Product);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(":id")
  async UpdateProductDetails(@Param("id") id:string,@Body() Product:ProductDTO): Promise<ProductDTO>{
    return await this.productService.updateProductById(id,Product);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  async DeleteProduct(@Param("id") id:string):Promise<string> {
    return await this.productService.deleteProductById(id);
  }


}