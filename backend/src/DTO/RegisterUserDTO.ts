import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';


class RegisterUserDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    role?: string
}
export default RegisterUserDTO;