import { Product } from '../../../interfaces/Product.interface';
export declare class ProductService {
    private readonly Product;
    create(Product: Product): void;
    findAll(): Product[];
}
