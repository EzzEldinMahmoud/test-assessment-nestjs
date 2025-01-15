import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export default class  LoginUserDTO {
    id?: string;
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
                type: String,
                description: 'This is an email property',
            })
    email: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
            type: String,
            description: 'This is password property',
        })
    password: string;
}