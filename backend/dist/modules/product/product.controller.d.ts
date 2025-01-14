import { ProductService } from './product.services/product.service';
import ProductDTO from 'src/DTO/ProductDTO';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(): Promise<ProductDTO[]>;
    getProductById(id: string): Promise<ProductDTO>;
    CreateProduct(Product: ProductDTO): Promise<ProductDTO>;
    UpdateProductDetails(id: string, Product: ProductDTO): Promise<ProductDTO>;
    DeleteProduct(id: string): Promise<string>;
}
