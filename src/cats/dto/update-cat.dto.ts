//import { PartialType } from '@nestjs/mapped-types';
//import { CreateCatDto } from './create-cat.dto';
import { PartialType } from '@nestjs/mapped-types';
//import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {
    
}

/* export class UpdateCatDto {

    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    age?: number;

    @IsOptional()
    breed?:string
} */
