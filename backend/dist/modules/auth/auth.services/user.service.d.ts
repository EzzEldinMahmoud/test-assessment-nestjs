import UserEntity from "src/Entities/user.entity";
import { Repository } from "typeorm";
import RegisterUserDTO from "src/DTO/RegisterUserDTO";
import { User } from "src/interfaces/Auth.interface";
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    createUser(user: RegisterUserDTO): Promise<User>;
    findUserById(id: string): Promise<UserEntity>;
    findUserByEmail(email: string): Promise<User>;
}
