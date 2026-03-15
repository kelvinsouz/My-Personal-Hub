import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreatePayableDto {

    @IsString()
    description: string

    @IsNumber()
    value: number

    @IsNumber()
    account_payable_category_id: number

    @IsString()
    status: string

    @IsDateString()
    @IsOptional()
    data_criacao: Date
}