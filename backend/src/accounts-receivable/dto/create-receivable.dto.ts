import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreateReceivableDto {
    @IsString()
    description: string

    @IsNumber()
    value: number

    @IsString()
    category: string

    @IsString()
    status: string

    @IsDateString()
    @IsOptional()
    data_criacao: Date
}