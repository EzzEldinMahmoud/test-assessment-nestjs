import { User } from '../../../interfaces/Auth.interface';
import UserEntity from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import RegisterUserDTO from 'src/DTO/RegisterUserDTO';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(usersRepository: Repository<UserEntity>, jwtService: JwtService, configService: ConfigService);
    register(user: RegisterUserDTO): Promise<User>;
    getCookieWithJwtToken(userId: string): string;
    verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<void>;
    login(email: string, password: string): Promise<string>;
}
