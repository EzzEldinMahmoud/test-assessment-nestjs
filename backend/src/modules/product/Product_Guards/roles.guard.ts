import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { TokenPayload } from "src/interfaces/tokenPayload.interface";
import { UserService } from "../../auth/auth.services/user.service";
import { userRoles } from "src/enums/userRolesEnum";


@Injectable()
export class AdminRoleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromHeader("access_token"),
        secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  async validate(payload: TokenPayload) {
    const user = await this.userService.findUserById(payload.userId);
    if(user.role === userRoles.admin.toString()) {return user.id;}
    else if (user.role !== userRoles.admin.toString()) {return UnauthorizedException};
  }
}