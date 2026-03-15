import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreateReceivableDto {
    @IsString()
    description: string

    @IsNumber()
    value: number

    @IsNumber()
    account_receivable_category_id: number

    @IsString()
    status: string

    @IsDateString()
    @IsOptional()
    data_criacao: Date
}