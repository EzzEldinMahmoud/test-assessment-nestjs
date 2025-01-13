import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../../interfaces/Auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ){}
    async register(user: User): Promise<User> {
        try {
            if(user.role.length == 0)  user.role = "user";
            const hashedpassword = await bcrypt.hash(user.password, 10);
            const newUser = await this.usersRepository.create({...user, password: hashedpassword});
            await this.usersRepository.save(newUser);
            newUser.password = undefined;
            return newUser;
        } catch (e) {
            if (e?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    createJWT() {
        
    }
    async verifyPassword(plainTextPassword:string,hashedPassword:string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }
    async login(email: string,password: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOneBy({email: email});
            if (user) {
                // comparing the request password to hashed db password.
                await this.verifyPassword(password,user.password);
                // need to return access token instead of user.
                user.password = undefined;
                return user;
            }
        } catch(e) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

}