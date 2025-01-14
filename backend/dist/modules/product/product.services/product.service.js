"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../../Entities/product.entity");
const typeorm_2 = require("typeorm");
let ProductService = class ProductService {
    constructor(ProductRepository) {
        this.ProductRepository = ProductRepository;
    }
    async createProduct(Product) {
        Product.createdAt = new Date();
        Product.updatedAt = new Date();
        try {
            const newProduct = this.ProductRepository.create({ ...Product });
            this.ProductRepository.save(Product);
            return newProduct;
        }
        catch (e) {
            throw new common_1.HttpException("Couldn't Create Product Due to Error.", common_1.HttpStatus.NOT_MODIFIED);
        }
    }
    async getProducts() {
        return await this.ProductRepository.find();
    }
    async getProductById(id) {
        const singleProduct = await this.ProductRepository.findOneBy({ id: id });
        return singleProduct;
    }
    async updateProductById(id, product) {
        const singleProduct = await this.ProductRepository.findOneBy({ id: id });
        if (singleProduct) {
            product.updatedAt = new Date();
            const updatedPost = await this.ProductRepository.update(id, product);
            return updatedPost.raw;
        }
        else {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteProductById(id) {
        try {
            await this.ProductRepository.delete({ id: id });
            return "Deleted Successfully!";
        }
        catch (e) {
            throw new common_1.HttpException('Product Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map