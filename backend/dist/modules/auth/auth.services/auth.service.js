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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const postgresql_1 = require("../../../enums/postgresql");
const user_service_1 = require("./user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(user) {
        try {
            const newUser = await this.userService.createUser(user);
            return newUser;
        }
        catch (e) {
            if (e?.code === postgresql_1.PostgresErrorCode.UniqueViolation) {
                throw new common_1.HttpException('User with that email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong' + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getCookieWithJwtToken(userId) {
        const payload = { userId };
        const token = this.jwtService.sign(payload);
        const accesstoken = {
            auth: token,
            MaxAge: this.configService.get('JWT_EXPIRATION_TIME'),
            redirectPath: "/"
        };
        return accesstoken;
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async login(email, password) {
        try {
            const user = await this.userService.findUserByEmail(email);
            if (user) {
                await this.verifyPassword(password, user.password);
                return this.getCookieWithJwtToken(user.id).auth;
            }
        }
        catch (e) {
            throw new common_1.HttpException('Wrong credentials provided' + e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map