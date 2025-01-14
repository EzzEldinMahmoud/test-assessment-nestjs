import ProductEntity from 'src/Entities/product.entity';
import { Repository } from 'typeorm';
import ProductDTO from 'src/DTO/ProductDTO';
export declare class ProductService {
    private ProductRepository;
    constructor(ProductRepository: Repository<ProductEntity>);
    createProduct(Product: ProductDTO): Promise<ProductEntity>;
    getProducts(): Promise<ProductDTO[]>;
    getProductById(id: string): Promise<ProductDTO>;
    updateProductById(id: string, product: ProductDTO): Promise<ProductDTO>;
    deleteProductById(id: string): Promise<string>;
}
