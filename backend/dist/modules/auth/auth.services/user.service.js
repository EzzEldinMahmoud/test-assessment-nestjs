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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../Entities/user.entity");
const userRolesEnum_1 = require("../../../enums/userRolesEnum");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(user) {
        if (!user.role)
            user.role = userRolesEnum_1.userRoles.user.toString();
        const hashedpassword = await bcrypt.hash(user.password, 10);
        const toDayDateTime = new Date().toISOString();
        const newUser = this.usersRepository.create({ ...user, password: hashedpassword, createdAt: toDayDateTime, updatedAt: toDayDateTime });
        await this.usersRepository.save(newUser);
        newUser.password = undefined;
        return newUser;
    }
    async findUserById(id) {
        const user = await this.usersRepository.findOneBy({ id: id });
        user.password = undefined;
        if (user)
            return user;
        else
            throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async findUserByEmail(email) {
        const user = await this.usersRepository.findOneBy({ email: email });
        if (user)
            return user;
        else
            throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async getallUser() {
        const userlist = await this.usersRepository.find();
        return userlist;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map