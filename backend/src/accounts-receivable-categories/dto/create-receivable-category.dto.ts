import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreateReceivableCategoryDto {

    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsString()
    color: string
}