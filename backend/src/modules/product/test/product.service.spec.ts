import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import * as Joi from '@hapi/joi';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../../modules/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '../product.services/product.service';
import ProductEntity from '../../../Entities/product.entity';
import ProductDTO from '../../../DTO/ProductDTO';
import { HttpException, HttpStatus } from '@nestjs/common';


let ProductRANDOM = {
	"name":"macbook M17",
	"description":"COMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMICOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONNG SOON",
	"price":"9299.98",
	"stock":54
};
let ProductPrice = {
	"price":9299.98,
};
let ProductName = {
	"name":"macbook M17",
};
let ProductStock = {

	"stock":54
};
let ProductDescription = {
	"description":"COMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMICOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONCOMING SOONNG SOON23",
};

describe('The Product service', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([ProductEntity]),
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().required(),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION_TIME: Joi.string().required(),
            PORT: Joi.number(),
          }),
        }),
        DatabaseModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
            },
          }),
        }),
      ],
      providers: [ProductService],
    }).compile();
    productService = await module.get<ProductService>(ProductService);
  });
  //create new product
  describe('it should Create new Product', () => {
    it('it should return the new Product', async () => {
      expect(typeof (await productService.createProduct({...ProductRANDOM,price:ProductPrice.price}))).toEqual(
        'object',
      );
    });
  });
//get all product
  describe('it should get all products', () => {
    it('it should return list of products', async () => {
      expect(typeof (await productService.getProducts())).toEqual(
        'object'
      );
    });
  });
  //get by ID product
  describe('it should get  product by ID', () => {
    it('it should return single product', async () => {
        const singleProduct: ProductDTO[] = await productService.getProducts();
        
        expect(await productService.getProductById(singleProduct[0].id)).toEqual(
        singleProduct[0]
        );
    });
  });
  //get by ID product
  describe('it shouldn\'t get  product as there is no ID', () => {
    it('it shouldn\'t return single product but null', async () => {
        expect(await productService.getProductById("ba633b9b-93ff-404f-8892-1efd505e1001")).toBe(
            HttpStatus.NOT_FOUND
        );
    });
  });

  //Delete success
    describe('it should delete  product by ID', () => {
    it('it should return deleted successfully', async () => {
        const singleProduct: ProductDTO[] = await productService.getProducts();
        const status = await productService.getProductById(singleProduct[0].id);
        if(status === "Deleted Successfully!") {
            expect(await productService.deleteProductById(singleProduct[0].id)).toBe(
                "Deleted Successfully!"
                );
        } else if(status === "Product already deleted") {
            expect(await productService.deleteProductById(singleProduct[0].id)).toEqual(
                "Product already deleted"
                );
        }
    });
    });

    //update product price
    describe('it should update product price', () => {
        it('it should match the updated  product', async () => {
            const singleProduct: ProductDTO[] = await productService.getProducts();
            const updatedProduct: ProductDTO = await productService.updateProductById(singleProduct[0].id,{...singleProduct[0],price:ProductPrice.price});
            expect(updatedProduct.price).toEqual(
                ProductPrice.price.toString()
            );

        });
    });

        //update product stock
    describe('it should update product stock', () => {
        it('it should match the updated  product', async () => {
            const singleProduct: ProductDTO[] = await productService.getProducts();
            const updatedProduct: ProductDTO = await productService.updateProductById(singleProduct[0].id,{...singleProduct[0],stock:ProductStock.stock});

            expect(updatedProduct.stock).toEqual(
                ProductStock.stock
            );
        });
    });
        //update product name
    describe('it should update product name', () => {
        it('it should match the updated  product', async () => {
            const singleProduct: ProductDTO[] = await productService.getProducts();
            const updatedProduct: ProductDTO = await productService.updateProductById(singleProduct[0].id,{...singleProduct[0],name:ProductName.name});
            expect(updatedProduct.name).toEqual(
                ProductName.name
            );
        });
    });
        
        //update product description
    describe('it should update product description', () => {
        it('it should match the updated  product', async () => {
            const singleProduct: ProductDTO[] = await productService.getProducts();
            const updatedProduct: ProductDTO = await productService.updateProductById(singleProduct[0].id,{...singleProduct[0],description: ProductDescription.description});

            expect(updatedProduct.description).toEqual(
                ProductDescription.description
            );
        });
      });
      //update product details all at once
      describe('it should update product description', () => {
        it('it should match the updated  product', async () => {
            const singleProduct: ProductDTO[] = await productService.getProducts();
            const updatedProduct: ProductDTO = await productService.updateProductById(singleProduct[0].id,{...ProductRANDOM,price:ProductPrice.price});
            expect({
                price: updatedProduct.price,
                stock:updatedProduct.stock,
                name:updatedProduct.name,
                description:updatedProduct.description
            
            }).toMatchObject(
                ProductRANDOM
            );

        });
    });
      

});

