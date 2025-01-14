"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.services/product.service");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../Entities/product.entity");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("./Product_Guards/roles.guard");
const user_service_1 = require("../auth/auth.services/user.service");
const user_entity_1 = require("../../Entities/user.entity");
let productModule = class productModule {
};
exports.productModule = productModule;
exports.productModule = productModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, config_1.ConfigService, roles_guard_1.AdminRoleStrategy, user_service_1.UserService],
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.default, user_entity_1.default]), passport_1.PassportModule, jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                    },
                }),
            }),]
    })
], productModule);
//# sourceMappingURL=product.module.js.map