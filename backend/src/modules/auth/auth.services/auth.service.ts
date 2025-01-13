import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../../interfaces/Auth.interface';
import * as bcrypt from "bcrypt";
import RegisterUserDTO from 'src/DTO/RegisterUserDTO';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from 'src/interfaces/tokenPayload.interface';
import { PostgresErrorCode } from 'src/enums/postgresql';
import { userRoles } from 'src/enums/userRolesEnum';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}
    async register(user: RegisterUserDTO): Promise<User> {
        try {
            const newUser = await this.userService.createUser(user);
            return newUser;
        } catch (e) {
            if (e?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
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
    async login(email: string, password: string): Promise<string> {
        try {
            const user = await this.userService.findUserByEmail(email);
            if (user) {
                // comparing the request password to hashed db password.
                await this.verifyPassword(password,user.password);
                // need to return access token instead of user.
                return this.getCookieWithJwtToken(user.id).auth;
            }
        } catch(e) {
            throw new HttpException('Wrong credentials provided' + e, HttpStatus.BAD_REQUEST);
        }
    }


    async alluser() {
        return await this.userService.getallUser();
    }



}