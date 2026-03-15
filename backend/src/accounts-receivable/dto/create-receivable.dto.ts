import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreateReceivableDto {
    @IsString()
    description: string

    @IsNumber()
    value: number

    @IsNumber()
    idaccount_receivable_category: number

    @IsString()
    status: string

    @IsDateString()
    @IsOptional()
    data_criacao: Date
}