import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "src/Entities/user.entity";
import { userRoles } from "src/enums/userRolesEnum";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import RegisterUserDTO from "src/DTO/RegisterUserDTO";
import { User } from "src/interfaces/Auth.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>){}
    
    async createUser(user: RegisterUserDTO): Promise<User> {
        if(!user.role)  user.role = userRoles.user.toString();
        const hashedpassword = await bcrypt.hash(user.password, 10);
        const toDayDateTime = new Date().toISOString();
        const newUser = this.usersRepository.create({ ...user, password: hashedpassword, createdAt: toDayDateTime,updatedAt: toDayDateTime });
        await this.usersRepository.save(newUser);
        newUser.password = undefined;
        return newUser;
    }
    async findUserById(id: string) {

        const user = await this.usersRepository.findOneBy({id:id});
        user.password = undefined;
        if(user) return user;
        else throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
    async findUserByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({email:email});
        if(user) return user;
        else throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
    
    }