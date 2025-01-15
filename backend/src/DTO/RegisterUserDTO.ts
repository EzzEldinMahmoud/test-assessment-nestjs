import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';


class RegisterUserDTO {
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
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
        type: String,
        description: 'This is an role optional property',
    })
    role?: string
}
export default RegisterUserDTO;