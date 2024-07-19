import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    //Transformar
    @Type(()=>Number) //enableImplicitConversion: true
    limit?: number; 

    @IsOptional()
    @IsPositive()
    @Type(()=> Number)
    offset?: number;

}