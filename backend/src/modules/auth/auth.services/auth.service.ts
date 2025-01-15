import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import RegisterUserDTO from '../../../DTO/RegisterUserDTO';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../../../interfaces/tokenPayload.interface';

import { UserService } from './user.service';
import LoginUserDTO from '../../../DTO/loginUserDTO';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}
    async register(user: RegisterUserDTO): Promise<RegisterUserDTO | string> {
        try {
            const findUser = await this.userService.findUserByEmail(user.email);
            if(!findUser) {
                const newUser = await this.userService.createUser(user);
                return newUser;
            } else {
                return "Email already registered";
            }
            
        } catch (e) {
            
            throw new HttpException('Something went wrong' + e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public getCookieWithJwtToken(userId: string) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        const accesstoken = {
            auth: token,
            MaxAge: this.configService.get('JWT_EXPIRATION_TIME'),
            redirectPath:"/"
        }
        return accesstoken;
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
    async login(userData:LoginUserDTO): Promise<string> {
        try {
            const singleuser: LoginUserDTO = await this.userService.findUserByEmail(userData.email);
            if (singleuser) {
                // comparing the request password to hashed db password.
                await this.verifyPassword(userData.password,singleuser.password);
                // need to return access token instead of user.
                return this.getCookieWithJwtToken(singleuser?.id).auth;
            }
        } catch(e) {
            throw new HttpException('Wrong credentials provided' + e, HttpStatus.BAD_REQUEST);
        }
    }





}