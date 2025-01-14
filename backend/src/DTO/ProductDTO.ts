

import { IsUUID,Min, IsString, IsNotEmpty, MinLength, IsDecimal, IsNumber } from 'class-validator';

export default class ProductDTO {
    @IsUUID()
    id?:string;
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(50)
    description:string;
    @IsNumber()
    @IsNotEmpty()
    @Min(1.00)
    price:number;
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    stock:number;
    createdAt?:Date;
    updatedAt?: Date;
}