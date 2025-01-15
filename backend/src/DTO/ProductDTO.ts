

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID,Min, IsString, IsNotEmpty, MinLength, IsDecimal, IsNumber } from 'class-validator';

export default class ProductDTO {
    @IsUUID()
    id?:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
            type: String,
            description: 'This is name and it is a required property',
          })
    name:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(50)
    @ApiProperty({
        type: String,
        description: 'This is description and it is a required property',
      })
    description:string;
    @IsNumber()
    @IsNotEmpty()
    @Min(1.00)
    @ApiProperty({
        type: Number,
        description: 'This is price and it is a required property',
      })
    price:number;
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @ApiProperty({
        type: Number,
        description: 'This is stock and it is a required property',
      })
    stock:number;
    createdAt?:Date;
    updatedAt?: Date;
}