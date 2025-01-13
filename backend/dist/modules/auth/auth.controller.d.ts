import { AuthService } from './auth.services/auth.service';
import RegisterUserDTO from 'src/DTO/RegisterUserDTO';
import RequestWithUser from 'src/interfaces/requestWithUser.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(user: RegisterUserDTO): void;
    login(request: RequestWithUser, response: Response): string;
}
