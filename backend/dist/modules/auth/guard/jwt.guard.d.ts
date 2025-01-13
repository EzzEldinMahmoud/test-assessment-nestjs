import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-local";
import { TokenPayload } from "src/interfaces/tokenPayload.interface";
import { UserService } from "../auth.services/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: TokenPayload): Promise<import("../../../Entities/user.entity").default>;
}
export {};
