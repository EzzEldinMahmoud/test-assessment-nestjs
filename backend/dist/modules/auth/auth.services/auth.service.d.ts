import { User } from '../../../interfaces/Auth.interface';
import RegisterUserDTO from 'src/DTO/RegisterUserDTO';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    register(user: RegisterUserDTO): Promise<User>;
    getCookieWithJwtToken(userId: string): {
        auth: string;
        MaxAge: any;
        redirectPath: string;
    };
    verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void>;
    login(email: string, password: string): Promise<string>;
}
