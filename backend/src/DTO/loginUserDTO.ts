import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export default class  LoginUserDTO {
    id?: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}