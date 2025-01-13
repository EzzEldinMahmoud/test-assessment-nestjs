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
exports.AdminRoleStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const user_service_1 = require("../auth/auth.services/user.service");
const userRolesEnum_1 = require("../../enums/userRolesEnum");
let AdminRoleStrategy = class AdminRoleStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(configService, userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(request) => {
                    return request?.headers['Auth'];
                }]),
            secretOrKey: configService.get('JWT_SECRET')
        });
        this.configService = configService;
        this.userService = userService;
    }
    async validate(payload) {
        const user = await this.userService.findUserById(payload.userId);
        if (user.role === userRolesEnum_1.userRoles.admin.toString()) {
            return;
        }
        else if (user.role !== userRolesEnum_1.userRoles.admin.toString()) {
            return common_1.UnauthorizedException;
        }
        ;
    }
};
exports.AdminRoleStrategy = AdminRoleStrategy;
exports.AdminRoleStrategy = AdminRoleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService])
], AdminRoleStrategy);
//# sourceMappingURL=roles.guard.js.map