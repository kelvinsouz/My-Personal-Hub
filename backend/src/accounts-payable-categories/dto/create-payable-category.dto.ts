import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreatePayableCategoryDto {

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsString()
    color: string
}