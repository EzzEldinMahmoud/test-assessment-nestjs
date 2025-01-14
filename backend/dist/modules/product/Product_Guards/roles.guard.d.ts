import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { TokenPayload } from "src/interfaces/tokenPayload.interface";
import { UserService } from "../../auth/auth.services/user.service";
declare const AdminRoleStrategy_base: new (...args: any[]) => Strategy;
export declare class AdminRoleStrategy extends AdminRoleStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: TokenPayload): Promise<string | typeof UnauthorizedException>;
}
export {};
