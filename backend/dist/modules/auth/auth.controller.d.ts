import { AuthService } from './auth.services/auth.service';
import { User } from 'src/interfaces/Auth.interface';
import RegisterUserDTO from 'src/DTO/RegisterUserDTO';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: RegisterUserDTO): Promise<User>;
    login(user: RegisterUserDTO): Promise<string>;
    getallUsers(): Promise<import("../../Entities/user.entity").default[]>;
}
